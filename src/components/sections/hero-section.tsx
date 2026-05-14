import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Cpu, Bot, BrainCircuit } from "lucide-react";

export function HeroSection() {
  const { hero } = profileData;

  return (
    <section className="relative pt-40 pb-20 md:pt-64 md:pb-40 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
      </div>
      
      <Container className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <MotionWrapper delay={0.05}>
              <Badge variant="muted" className="mb-6 font-medium border-accent/20 text-accent">
                Building practical AI-powered systems
              </Badge>
            </MotionWrapper>
            <MotionWrapper delay={0.12}>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-7xl mb-4 leading-[1.1] md:whitespace-nowrap">
                {hero.headline}
              </h1>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <p className="text-xl md:text-2xl font-bold text-accent mb-8 tracking-tight">
                {hero.subheadline}
              </p>
            </MotionWrapper>
            <MotionWrapper delay={0.28}>
              <p className="max-w-[580px] text-lg text-muted mb-12 leading-relaxed text-balance">
                {hero.description}
              </p>
            </MotionWrapper>
            <MotionWrapper delay={0.36}>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  href={hero.primaryCTA.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-sm font-bold tracking-tight transition-all duration-300",
                    buttonVariants.variants.primary,
                    buttonVariants.sizes.lg,
                    "px-10 w-full sm:w-auto"
                  )}
                >
                  {hero.primaryCTA.text}
                </Link>
                <Link
                  href={hero.secondaryCTA.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-sm font-bold tracking-tight transition-all duration-300",
                    buttonVariants.variants.outline,
                    buttonVariants.sizes.lg,
                    "px-10 w-full sm:w-auto border-2 border-accent/20 text-accent hover:bg-accent hover:text-white"
                  )}
                >
                  {hero.secondaryCTA.text}
                </Link>
              </div>
            </MotionWrapper>
            <MotionWrapper delay={0.46}>
              <div className="mt-16 flex items-center gap-12 border-t border-border pt-8 max-w-fit">
                {hero.stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm font-medium text-accent mb-1">
                      {stat.label}
                    </span>
                    <span className="text-2xl font-bold text-foreground tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </MotionWrapper>
          </div>

          <div className="lg:col-span-5 relative">
            <MotionWrapper delay={0.2} className="relative">
              {/* Visual Identity Block - AI Integration Focus */}
              <div className="relative aspect-square max-w-[440px] mx-auto">
                {/* Main Card */}
                <Card variant="elevated" className="absolute inset-0 bg-surface rounded-3xl overflow-hidden border-2 border-border/50 flex flex-col p-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-white text-2xl font-bold mb-8 shadow-[0_0_20px_rgba(166,138,100,0.3)]">
                    AE
                  </div>
                  <div className="space-y-4 mb-auto">
                    <div className="h-2 w-full bg-accent/20 rounded-full overflow-hidden">
                       <div className="h-full bg-accent animate-[shimmer_2s_infinite]" style={{ width: '60%' }} />
                    </div>
                    <div className="h-2 w-3/4 bg-border/40 rounded-full" />
                    <div className="h-2 w-5/6 bg-border/40 rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="aspect-square rounded-2xl bg-surface-elevated border border-border/50 flex items-center justify-center group/icon hover:border-accent transition-colors">
                      <Cpu className="w-8 h-8 text-accent group-hover/icon:scale-110 transition-transform" />
                    </div>
                    <div className="aspect-square rounded-2xl bg-surface-elevated border border-border/50 flex items-center justify-center group/icon hover:border-accent transition-colors">
                      <BrainCircuit className="w-8 h-8 text-accent group-hover/icon:scale-110 transition-transform" />
                    </div>
                  </div>
                </Card>

                {/* Floating Tags */}
                <div className="absolute -top-4 -right-4 sm:-right-8">
                  <MotionWrapper delay={0.4}>
                    <Card variant="default" className="py-3 px-5 rounded-2xl flex items-center gap-3 backdrop-blur-xl bg-surface/90 shadow-xl border-accent/20">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[13px] font-medium tracking-tight">Workflow logic</span>
                    </Card>
                  </MotionWrapper>
                </div>

                <div className="absolute -bottom-6 -left-4 sm:-left-8">
                  <MotionWrapper delay={0.6}>
                    <Card variant="default" className="py-4 px-6 rounded-2xl space-y-3 backdrop-blur-xl bg-surface/90 shadow-xl border-accent/20">
                      <div className="flex items-center gap-3">
                        <Bot className="w-4 h-4 text-accent" />
                        <span className="text-[13px] font-medium tracking-tight">System integration</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="h-1 w-4 bg-accent/20 rounded-full overflow-hidden">
                             <div className="h-full bg-accent" style={{ width: `${(i * 20) % 100}%` }} />
                          </div>
                        ))}
                      </div>
                    </Card>
                  </MotionWrapper>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </Container>
    </section>
  );
}
