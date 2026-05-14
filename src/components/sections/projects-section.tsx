import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const { projects } = profileData;

  return (
    <section id="projects" className="py-32 md:py-48">
      <Container>
        <MotionWrapper>
          <SectionHeader
            eyebrow="Selected work"
            title={projects.title}
            description={projects.description}
            className="mb-24"
          />
        </MotionWrapper>

        <ul className="grid gap-12 grid-cols-1 lg:grid-cols-2 list-none p-0 m-0">
          {projects.items.map((project, index) => (
            <li key={index}>
              <MotionWrapper delay={index * 0.1}>
                <Card variant="elevated" className="h-full flex flex-col group overflow-hidden border-border/40 hover:border-accent/40 transition-all duration-500 rounded-xl">
                  {/* CSS Placeholder Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-elevated flex items-center justify-center">
                     <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)] blur-3xl transform -translate-y-1/2" />
                     </div>
                     <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-16 h-1 bg-accent/40 rounded-full group-hover:w-24 transition-all duration-700" />
                        <span className="text-[10px] font-semibold tracking-[0.16em] text-muted">Project {index + 1}</span>
                        <div className="w-16 h-1 bg-accent/40 rounded-full group-hover:w-12 transition-all duration-700" />
                     </div>
                  </div>

                  <CardHeader className="p-8 md:p-12">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <Badge variant="accent" className="text-[10px] font-semibold tracking-[0.12em]">
                        {project.category}
                      </Badge>
                      <Badge variant="muted">
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl font-bold group-hover:text-accent transition-colors tracking-tight mb-4">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted text-base leading-relaxed mb-8">
                      {project.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tech.map((t, tIndex) => (
                        <span key={tIndex} className="text-[10px] font-semibold tracking-[0.12em] text-muted border border-border/60 px-3 py-1 rounded-full bg-background/40">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <ul className="space-y-4 mb-12 list-none p-0">
                      {project.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-4 text-sm text-muted">
                          <ArrowRight className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="font-medium">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <Link
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View repository for ${project.title}`}
                        className={cn(
                          "w-full gap-3 group/btn py-6",
                          "inline-flex items-center justify-center rounded-sm font-bold tracking-tight transition-all duration-300",
                          buttonVariants.variants.primary,
                          buttonVariants.sizes.md
                        )}
                      >
                        View Repository
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </CardHeader>
                </Card>
              </MotionWrapper>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
