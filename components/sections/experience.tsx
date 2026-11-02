"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { ExperienceEntry } from "@/types/portfolio";

interface ExperienceProps {
  experience?: ExperienceEntry[];
}

export function Experience({ experience }: ExperienceProps) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <h2 className="mb-12 text-xs font-normal tracking-widest uppercase text-foreground/40">
          Experience
        </h2>
      </ScrollReveal>

      <div className="space-y-8">
        {experience.map((item, i) => (
          <ScrollReveal key={`${item.company}-${i}`} delay={i * 0.1}>
            <motion.div
              whileHover="hovered"
              initial="idle"
              className="group relative flex flex-col gap-4 border-t border-border py-8 sm:py-10"
            >
              {/* Accent left border on hover */}
              <motion.div
                variants={{
                  idle: { scaleY: 0 },
                  hovered: { scaleY: 1 },
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="absolute top-0 left-0 h-full w-[2px] origin-top bg-accent/50"
              />

              <div className="flex items-start gap-4">
                <motion.div
                  variants={{
                    idle: { scale: 1 },
                    hovered: { scale: 1.15 },
                  }}
                  transition={{ duration: 0.2 }}
                  className="mt-1"
                >
                  <Briefcase
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-foreground/40 transition-colors group-hover:text-accent/70"
                  />
                </motion.div>

                <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    {item.category && (
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider text-accent">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {item.category}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-medium text-white transition-colors group-hover:text-white">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-base text-white/80">
                      {item.company}
                    </p>
                    {item.description && (
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60">
                        {item.description}
                      </p>
                    )}
                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="mt-3 max-w-2xl space-y-1.5 border-l border-foreground/10 pl-4">
                        {item.highlights.map((point, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/50"
                          >
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-row flex-wrap items-center gap-4 text-xs font-mono text-foreground/40 sm:flex-col sm:items-end sm:gap-1.5">
                    {item.date && (
                      <span className="inline-flex items-center gap-1.5 text-white/80">
                        <Calendar size={13} strokeWidth={1.5} className="text-foreground/40" />
                        {item.date}
                      </span>
                    )}
                    {item.location && (
                      <span className="inline-flex items-center gap-1.5 text-foreground/50">
                        <MapPin size={13} strokeWidth={1.5} className="text-foreground/40" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

