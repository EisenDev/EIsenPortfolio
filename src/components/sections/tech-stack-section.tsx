import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";

export function TechStackSection() {
  const { techStack } = profileData;

  return (
    <section id="tech-stack" className="py-32 md:py-48">
      <Container>
        <MotionWrapper>
          <SectionHeader
            eyebrow="Core technologies"
            title={techStack.title}
            description={techStack.description}
            className="mb-24"
          />
        </MotionWrapper>

        <ul className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-border/20 p-px rounded-sm overflow-hidden list-none m-0">
          {techStack.categories.map((category, index) => (
            <li key={index} className="bg-background">
              <MotionWrapper delay={index * 0.1} className="h-full">
                <div className="p-8 h-full flex flex-col gap-8">
                  <h3 className="text-sm font-medium text-accent">
                    {category.name}
                  </h3>
                  <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                    {category.items.map((tech, techIndex) => (
                      <li key={techIndex}>
                        <Badge variant="default" className="bg-surface-elevated/50 border-transparent hover:border-accent/30 px-3 py-1.5 rounded-sm text-[13px] font-bold tracking-tight">
                          {tech}
                        </Badge>
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
