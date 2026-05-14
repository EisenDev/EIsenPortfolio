import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";

export function SkillsSection() {
  const { skills } = profileData;

  return (
    <section id="skills" className="py-32 md:py-48">
      <Container>
        <MotionWrapper>
          <SectionHeader
            eyebrow="Capabilities"
            title={skills.title}
            description={skills.description}
            align="center"
            className="mb-24"
          />
        </MotionWrapper>

        <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
          {skills.categories.map((category, index) => (
            <li key={index} className="relative">
              <MotionWrapper delay={index * 0.1}>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-accent/40" />
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      {category.name}
                    </h3>
                  </div>
                  
                  <ul className="flex flex-col gap-3 list-none p-0 m-0">
                    {category.items.map((skill, skillIndex) => (
                      <li key={skillIndex}>
                        <div className="group flex items-center justify-between py-2 border-b border-border/40 hover:border-accent transition-colors">
                           <span className="text-muted group-hover:text-foreground transition-colors font-medium">
                              {skill}
                           </span>
                           <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent transition-all" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionWrapper>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
