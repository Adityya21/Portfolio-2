import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Projects } from "@/components/sections/projects";
import { SectionDivider } from "@/components/section-divider";

const CommitGraph = dynamic(() =>
  import("@/components/sections/commit-graph").then((m) => m.CommitGraph)
);
const Education = dynamic(() =>
  import("@/components/sections/education").then((m) => m.Education)
);
const Certifications = dynamic(() =>
  import("@/components/sections/certifications").then((m) => m.Certifications)
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.Contact)
);

const data = portfolioData as PortfolioData;

export default function Home() {
  return (
    <main>
      <Hero personal={data.personal} socials={data.socials} />
      <SectionDivider />
      <CommitGraph />
      <SectionDivider />
      <About about={data.about} />
      <SectionDivider />
      <Work work={data.work} />
      <SectionDivider />
      <Projects projects={data.projects} />
      <SectionDivider />
      <Education education={data.education} />
      <SectionDivider />
      <Certifications certifications={data.certifications} />
      <SectionDivider />
      <Contact personal={data.personal} socials={data.socials} />
    </main>
  );
}
