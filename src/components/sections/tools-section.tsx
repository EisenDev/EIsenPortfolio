import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";

export function ToolsSection() {
  const { tools } = profileData;

  return (
    <section id="tools" className="py-32 md:py-48 bg-surface">
      <Container>
        <MotionWrapper>
          <SectionHeader
            eyebrow="Tooling"
            title={tools.title}
            description={tools.description}
            align="center"
            className="mb-24"
          />
        </MotionWrapper>

        <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
          {tools.categories.map((category, index) => (
            <li key={index}>
              <MotionWrapper delay={index * 0.1}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-6 bg-accent rounded-full" />
                     <h3 className="text-sm font-medium text-foreground">
                       {category.name}
                     </h3>
                  </div>
                  <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                    {category.items.map((tool, toolIndex) => (
                      <li key={toolIndex}>
                        <Badge variant="outline" className="px-3 py-2 font-bold tracking-tight bg-background/40 hover:bg-background hover:text-accent transition-all cursor-default">
                          {tool}
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
