import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Sparkles, MapPin } from "lucide-react";

export function ExperienceSection() {
  const { experience } = profileData;

  return (
    <section id="experience" className="py-32 md:py-48 bg-surface">
      <Container>
        <MotionWrapper>
          <SectionHeader
            eyebrow="Professional path"
            title={experience.title}
            description={experience.description}
            className="mb-24"
          />
        </MotionWrapper>

        <ul className="relative space-y-16 before:absolute before:inset-y-0 before:left-0 md:before:left-1/2 before:-ml-px before:w-0.5 before:bg-border/60 list-none p-0 m-0">
          {experience.items.map((item, index) => {
            const isHighlighted = Boolean("highlighted" in item && item.highlighted);
            const isCurrent = Boolean("current" in item && item.current);
            const tags = "tags" in item && Array.isArray(item.tags) ? (item.tags as string[]) : [];
            const location = "location" in item && typeof item.location === "string" ? item.location : null;

            return (
              <li key={index} className="relative">
                <MotionWrapper delay={index * 0.12}>
                  <div className="md:flex md:items-center">
                    <div
                      className={cn(
                        "md:w-1/2 mb-8 md:mb-0 pl-8 md:pl-0",
                        isHighlighted
                          ? index % 2 === 0
                            ? "md:pr-12 text-left"
                            : "md:order-last md:pl-12 text-left"
                          : index % 2 === 0
                            ? "md:pr-16 md:text-right text-left"
                            : "md:order-last md:pl-16 text-left"
                      )}
                    >
                      {isHighlighted ? (
                        <div className="relative rounded-2xl p-6 sm:p-8 bg-surface-elevated/80 dark:bg-surface-elevated/50 border-2 border-accent/40 hover:border-accent/70 shadow-[0_8px_32px_rgba(166,138,100,0.12)] ring-1 ring-accent/20 backdrop-blur-xs transition-all duration-300">
                          {/* Corner ambient accent glow */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none -mr-4 -mt-4" />

                          {/* Badge header */}
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-background text-[11px] font-bold tracking-wider shadow-xs uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                                Current Role
                              </span>
                            )}
                            <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] font-bold tracking-wider">
                              {item.period}
                            </span>
                            {location && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted px-2.5 py-0.5 rounded-full bg-border/40">
                                <MapPin className="w-3 h-3 text-accent" />
                                {location}
                              </span>
                            )}
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 tracking-tight">
                            {item.role}
                          </h3>

                          {item.company ? (
                            <p className="text-accent font-bold text-sm sm:text-base tracking-tight mb-4 flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 shrink-0 text-accent" />
                              <span>{item.company}</span>
                            </p>
                          ) : null}

                          {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-1 rounded-sm text-[11px] font-bold tracking-tight bg-accent/10 text-accent border border-accent/20"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="text-foreground/80 dark:text-muted leading-relaxed max-w-xl text-sm sm:text-base">
                            {item.description}
                          </p>

                          {item.highlights ? (
                            <ul className="mt-5 space-y-3 list-none p-0 max-w-xl">
                              {item.highlights.map((highlight) => (
                                <li key={highlight} className="flex items-start gap-3 text-sm text-muted">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                  <span className="leading-relaxed">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ) : (
                        <div>
                          <span className="inline-block px-3 py-1 rounded-sm bg-accent/10 text-accent text-[11px] font-bold tracking-wider mb-4">
                            {item.period}
                          </span>
                          <h3 className="text-3xl font-bold text-foreground mb-1 tracking-tight">
                            {item.role}
                          </h3>
                          {item.company ? (
                            <p className="text-accent font-bold text-sm tracking-tight mb-4">
                              {item.company}
                            </p>
                          ) : null}
                          <p className="text-muted leading-relaxed max-w-lg ml-auto mr-0 md:mr-auto">
                            {item.description}
                          </p>
                          {item.highlights ? (
                            <ul className="mt-5 space-y-3 list-none p-0 max-w-lg ml-auto mr-0 md:mr-auto">
                              {item.highlights.map((highlight) => (
                                <li
                                  key={highlight}
                                  className={cn(
                                    "flex items-start gap-3 text-sm text-muted",
                                    index % 2 === 0 ? "md:flex-row-reverse md:text-right" : "flex-row text-left"
                                  )}
                                >
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      )}
                    </div>

                    {/* Timeline Node */}
                    {isHighlighted ? (
                      <div className="absolute left-0 md:left-1/2 -ml-3 z-10 flex items-center justify-center top-6 md:top-1/2 md:-translate-y-1/2">
                        <span className="absolute w-7 h-7 rounded-full bg-accent/35 animate-ping opacity-80" />
                        <div className="w-6 h-6 rounded-full bg-accent border-4 border-background flex items-center justify-center shadow-[0_0_16px_rgba(194,166,109,0.8)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-background" />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-background border-4 border-accent -ml-2 z-10 top-6 md:top-1/2 md:-translate-y-1/2" />
                    )}

                    <div className="md:w-1/2" />
                  </div>
                </MotionWrapper>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
