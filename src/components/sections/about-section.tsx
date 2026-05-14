import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";

export function AboutSection() {
  const { about } = profileData;

  return (
    <section id="about" className="py-32 md:py-48 bg-surface-elevated/30">
      <Container>
        <div className="grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MotionWrapper>
              <SectionHeader
                eyebrow="Introduction"
                title={about.title}
                description={about.description}
              />
            </MotionWrapper>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-6 md:grid-cols-2">
              {about.highlights.map((highlight, index) => (
                <MotionWrapper key={index} delay={index * 0.15}>
                  <Card variant={index === 0 ? "elevated" : "default"} className="h-full group hover:border-accent/30 transition-colors">
                    <CardHeader className="pb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl tracking-tight leading-none group-hover:text-accent transition-colors">
                        {highlight.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted leading-relaxed italic">
                        &quot;{highlight.description}&quot;
                      </p>
                    </CardContent>
                  </Card>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* Centered Closing Statement with Line Above */}
        <MotionWrapper delay={0.5} className="mt-24 pt-16 border-t border-border/60 text-center">
          <p className="text-sm font-medium text-muted max-w-2xl mx-auto leading-relaxed">
            I build practical AI-powered systems through reliable implementation, automation workflows, and clear product thinking.
          </p>
        </MotionWrapper>
      </Container>
    </section>
  );
}
