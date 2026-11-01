import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import dynamic from "next/dynamic";
import { GrainOverlay } from "@/components/grain-overlay";
import { ScrollProgress } from "@/components/scroll-progress";
import { PreloaderProvider } from "@/components/preloader";

const CustomCursor = dynamic(() =>
  import("@/components/custom-cursor").then((m) => m.CustomCursor)
);
const BottomDock = dynamic(() =>
  import("@/components/bottom-dock").then((m) => m.BottomDock)
);
const EasterEggs = dynamic(() =>
  import("@/components/easter-eggs").then((m) => m.EasterEggs)
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aditya-portfolio-rho-seven.vercel.app"),
  title: "Aditya Yashovardhan",
  description:
    "BTech Computer Science Engineering Student at NMIMS University. Passionate about AI, Machine Learning, and Data Analytics.",
  openGraph: {
    title: "Aditya Yashovardhan",
    description:
      "BTech Computer Science Engineering Student. Passionate about AI, Machine Learning, and Data Analytics.",
    url: "https://aditya-portfolio-rho-seven.vercel.app",
    siteName: "Aditya Yashovardhan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Yashovardhan",
    description:
      "BTech Computer Science Engineering Student. AI, ML, and Data Analytics enthusiast.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aditya Yashovardhan",
              url: "https://aditya-portfolio-rho-seven.vercel.app",
              jobTitle: "BTech Computer Science Engineering Student",
              description:
                "BTech CSE Student at NMIMS University. Passionate about AI, Machine Learning, and Data Analytics.",
              sameAs: [
                "https://github.com/Adityya21/",
                "https://www.linkedin.com/in/aditya-yashovardhan-859276296/",
              ],
              knowsAbout: [
                "Python",
                "C++",
                "TensorFlow",
                "XGBoost",
                "LangChain",
                "Data Analytics",
                "Machine Learning",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <PreloaderProvider>
          <GrainOverlay />
          <CustomCursor />
          <ScrollProgress />
          <EasterEggs />
          {children}
          <Analytics />
          <SpeedInsights />
          <BottomDock />
        </PreloaderProvider>
      </body>
    </html>
  );
}
