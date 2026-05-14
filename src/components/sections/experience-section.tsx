import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";
import { cn } from "@/lib/utils";

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

        <ul className="relative space-y-12 before:absolute before:inset-y-0 before:left-0 md:before:left-1/2 before:-ml-px before:w-0.5 before:bg-border/60 list-none p-0 m-0">
          {experience.items.map((item, index) => (
            <li key={index} className="relative">
              <MotionWrapper delay={index * 0.15}>
                <div className="md:flex md:items-center">
                  <div className={cn(
                    "md:w-1/2 mb-8 md:mb-0",
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:order-last md:pl-16"
                  )}>
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
                          <li key={highlight} className="flex items-start gap-3 text-sm text-muted">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-background border-4 border-accent -ml-2 z-10" />
                  
                  <div className="md:w-1/2" />
                </div>
              </MotionWrapper>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
