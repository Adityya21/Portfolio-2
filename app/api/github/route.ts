import { NextResponse } from "next/server";
import type {
  ContributionDay,
  ContributionWeek,
  ContributionData,
} from "@/types/github";

export const revalidate = 3600;

const USERNAME = "Adityya21";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            weekday
          }
        }
      }
      startedAt
    }
    createdAt
  }
}`;

async function fetchFromGraphQL(token: string): Promise<ContributionData | null> {
  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors || !json.data?.user) return null;

    const user = json.data.user;
    const calendar = user.contributionsCollection.contributionCalendar;
    const codingSince = new Date(user.createdAt).getFullYear();

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      codingSince,
    };
  } catch {
    return null;
  }
}

async function fetchFromPublicPage(): Promise<ContributionData | null> {
  try {
    const res = await fetch(`https://github.com/users/${USERNAME}/contributions`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const html = await res.text();

    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in the last year/i);
    const totalContributions = totalMatch
      ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
      : 0;

    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
    const countMap = new Map<string, number>();
    let m: RegExpExecArray | null;
    while ((m = tooltipRegex.exec(html)) !== null) {
      const id = m[1];
      const text = m[2];
      const countMatch = text.match(/^(\d+)\s+contribution/);
      const count = countMatch ? parseInt(countMatch[1], 10) : 0;
      countMap.set(id, count);
    }

    const tdRegex = /<td\b([^>]*\bclass="[^"]*ContributionCalendar-day[^"]*"[^>]*)>/g;
    const days: ContributionDay[] = [];
    while ((m = tdRegex.exec(html)) !== null) {
      const attrs = m[1];
      const dateMatch = attrs.match(/data-date="([^"]+)"/);
      const idMatch = attrs.match(/id="([^"]+)"/);
      if (dateMatch && idMatch) {
        const date = dateMatch[1];
        const id = idMatch[1];
        const count = countMap.get(id) ?? 0;
        const d = new Date(date + "T00:00:00");
        days.push({
          date,
          contributionCount: count,
          weekday: d.getDay(),
        });
      }
    }

    if (days.length === 0) return null;

    days.sort((a, b) => a.date.localeCompare(b.date));

    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    for (const day of days) {
      if (day.weekday === 0 && currentWeek.length > 0) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
      currentWeek.push(day);
    }
    if (currentWeek.length > 0) {
      weeks.push({ contributionDays: currentWeek });
    }

    return {
      totalContributions,
      weeks,
      codingSince: 2022,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const token = process.env.GITHUB_PAT_1 || process.env.GITHUB_PAT_2 || process.env.GITHUB_TOKEN;

  let data: ContributionData | null = null;

  if (token) {
    data = await fetchFromGraphQL(token);
  }

  if (!data) {
    data = await fetchFromPublicPage();
  }

  if (!data) {
    return NextResponse.json(
      { error: "Failed to fetch contribution data" },
      { status: 502 }
    );
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
