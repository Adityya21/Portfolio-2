"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { EducationEntry } from "@/types/portfolio";

interface EducationProps {
  education: EducationEntry[];
}

export function Education({ education }: EducationProps) {
  return (
    <section id="education" className="px-6 py-32 sm:px-12 lg:px-24">
      <ScrollReveal>
        <h2 className="mb-12 text-xs font-normal tracking-widest uppercase text-foreground/40">
          Education
        </h2>
      </ScrollReveal>

      <div className="space-y-0">
        {education.map((item, i) => (
          <ScrollReveal key={`${item.title}-${i}`} delay={i * 0.08}>
            <motion.div
              whileHover="hovered"
              initial="idle"
              className="group relative flex items-start gap-4 border-t border-border py-6"
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

              <motion.div
                variants={{
                  idle: { scale: 1 },
                  hovered: { scale: 1.2 },
                }}
                transition={{ duration: 0.2 }}
              >
                <GraduationCap
                  size={18}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-foreground/40 transition-colors group-hover:text-accent/60"
                />
              </motion.div>

              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-medium text-white">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                      >
                        <span>{item.title}</span>
                        <ArrowUpRight size={14} className="text-foreground/40 group-hover:text-accent" />
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="text-sm text-white/70">
                    {item.institution}
                  </p>
                </div>
                <motion.span
                  variants={{
                    idle: { x: 0, opacity: 1 },
                    hovered: { x: -4, opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-sm text-white"
                >
                  {item.year}
                </motion.span>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

