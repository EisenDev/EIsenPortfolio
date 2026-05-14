import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";
import { Sparkles, Cpu } from "lucide-react";

export function AiAutomationSection() {
  const { aiAutomation } = profileData;

  return (
    <section id="ai-automation" className="py-32 md:py-48 bg-surface-elevated/20">
      <Container>
        <MotionWrapper>
          <SectionHeader
            eyebrow="AI workflow"
            title={aiAutomation.title}
            description={aiAutomation.description}
            className="mb-24"
          />
        </MotionWrapper>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Featured AI Card */}
          <div className="lg:col-span-5">
             <MotionWrapper>
                <Card variant="elevated" className="h-full bg-foreground text-background p-10 flex flex-col justify-between border-none">
                   <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                         <Sparkles className="w-6 h-6 fill-accent" />
                      </div>
                      <h3 className="text-4xl font-bold leading-tight tracking-tighter">
                         AI in product <br/> workflows
                      </h3>
                      <p className="text-background/70 text-lg leading-relaxed">
                         Building systems where AI supports product actions, structured automation, and useful workflow outcomes.
                      </p>
                   </div>
                   <div className="mt-12 flex items-center gap-4">
                      <div className="flex -space-x-3">
                         {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full bg-background/10 border-2 border-foreground flex items-center justify-center">
                               <Cpu className="w-4 h-4 text-accent" />
                            </div>
                         ))}
                      </div>
                      <span className="text-xs font-semibold tracking-[0.16em] text-accent">
                         Workflow-focused systems
                      </span>
                   </div>
                </Card>
             </MotionWrapper>
          </div>

          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            {aiAutomation.items.map((item, index) => (
              <li key={index} className="list-none">
                <MotionWrapper delay={index * 0.1}>
                  <Card className="h-full group hover:border-accent/40 transition-all duration-500">
                    <CardHeader className="p-8">
                      <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted leading-relaxed text-sm mb-6">
                        {item.description}
                      </p>
                      <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                        {item.tags.map((tag, tagIndex) => (
                          <li key={tagIndex}>
                            <Badge variant="muted">
                              {tag}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </CardHeader>
                  </Card>
                </MotionWrapper>
              </li>
            ))}
          </div>
        </div>

        <MotionWrapper delay={0.4} className="mt-20 text-center border-t border-border pt-12">
          <p className="text-sm font-medium text-muted max-w-lg mx-auto leading-relaxed">
            AI is part of the product logic, while engineering judgment stays with me.
          </p>
        </MotionWrapper>
      </Container>
    </section>
  );
}
