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
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-18 md:pt-40 md:pb-20 lg:pt-56 lg:pb-32">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-[480px] w-[480px] -translate-y-1/2 translate-x-1/4 rounded-full bg-accent/5 blur-[96px] sm:h-[620px] sm:w-[620px] lg:h-[800px] lg:w-[800px] lg:blur-[120px]" />
      </div>
      
      <Container className="relative z-10">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <MotionWrapper delay={0.05}>
              <Badge variant="muted" className="mb-5 mx-auto flex max-w-fit font-medium border-accent/20 text-accent lg:mx-0">
                Building practical AI-powered systems
              </Badge>
            </MotionWrapper>
            <MotionWrapper delay={0.12}>
              <h1 className="mx-auto mb-4 max-w-[10ch] text-center text-[2.75rem] font-bold leading-[0.98] tracking-tight text-foreground sm:max-w-none sm:text-6xl md:text-[4.5rem] lg:text-7xl">
                {hero.headline}
              </h1>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <p className="mx-auto mb-6 max-w-[18ch] text-center text-xl font-bold tracking-tight text-accent sm:mb-8 sm:max-w-none sm:text-2xl">
                {hero.subheadline}
              </p>
            </MotionWrapper>
            <MotionWrapper delay={0.28}>
              <p className="mx-auto mb-10 max-w-[580px] text-center text-base leading-relaxed text-muted sm:text-lg lg:mx-0 lg:mb-12 lg:text-left">
                {hero.description}
              </p>
            </MotionWrapper>
            <MotionWrapper delay={0.36}>
              <div className="mx-auto flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:mx-0 lg:justify-start">
                <Link
                  href={hero.primaryCTA.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-sm font-bold tracking-tight transition-all duration-300",
                    buttonVariants.variants.primary,
                    buttonVariants.sizes.lg,
                    "w-full px-10 sm:w-auto sm:min-w-[11rem]"
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
                    "w-full border-2 border-accent/20 px-10 text-accent hover:bg-accent hover:text-white sm:w-auto sm:min-w-[11rem]"
                  )}
                >
                  {hero.secondaryCTA.text}
                </Link>
              </div>
            </MotionWrapper>
            <MotionWrapper delay={0.46}>
              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-border pt-8 sm:mt-14 md:grid-cols-4 lg:max-w-4xl">
                {hero.stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm font-medium text-accent mb-1">
                      {stat.label}
                    </span>
                    <span className="max-w-[12ch] text-2xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </MotionWrapper>
          </div>

          <div className="relative px-2 sm:px-6 lg:col-span-5 lg:px-0">
            <MotionWrapper delay={0.2} className="relative">
              {/* Visual Identity Block - AI Integration Focus */}
              <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[440px]">
                {/* Main Card */}
                <Card variant="elevated" className="absolute inset-0 flex flex-col overflow-hidden rounded-[2rem] border-2 border-border/50 bg-surface p-4 sm:p-6 lg:p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-lg font-bold text-white shadow-[0_0_20px_rgba(166,138,100,0.3)] sm:mb-6 sm:h-14 sm:w-14 sm:text-xl lg:mb-8 lg:h-16 lg:w-16 lg:rounded-2xl lg:text-2xl">
                    AE
                  </div>
                  <div className="mb-auto space-y-3 sm:space-y-4">
                    <div className="h-2 w-full bg-accent/20 rounded-full overflow-hidden">
                       <div className="h-full bg-accent animate-[shimmer_2s_infinite]" style={{ width: '60%' }} />
                    </div>
                    <div className="h-2 w-3/4 bg-border/40 rounded-full" />
                    <div className="h-2 w-5/6 bg-border/40 rounded-full" />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:mt-8">
                    <div className="group/icon flex aspect-square items-center justify-center rounded-[1.4rem] border border-border/50 bg-surface-elevated transition-colors hover:border-accent">
                      <Cpu className="h-6 w-6 text-accent transition-transform group-hover/icon:scale-110 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                    </div>
                    <div className="group/icon flex aspect-square items-center justify-center rounded-[1.4rem] border border-border/50 bg-surface-elevated transition-colors hover:border-accent">
                      <BrainCircuit className="h-6 w-6 text-accent transition-transform group-hover/icon:scale-110 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                    </div>
                  </div>
                </Card>

                {/* Floating Tags */}
                <div className="absolute -top-3 right-0 sm:-top-4 sm:-right-3 lg:-right-8">
                  <MotionWrapper delay={0.4}>
                    <Card variant="default" className="flex items-center gap-2 rounded-2xl border-accent/20 bg-surface/90 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:gap-3 sm:px-5 sm:py-3">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[11px] font-medium tracking-tight sm:text-[13px]">Workflow logic</span>
                    </Card>
                  </MotionWrapper>
                </div>

                <div className="absolute -bottom-5 left-0 sm:-bottom-6 sm:-left-4 lg:-left-8">
                  <MotionWrapper delay={0.6}>
                    <Card variant="default" className="space-y-2 rounded-2xl border-accent/20 bg-surface/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:space-y-3 sm:px-6 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Bot className="w-4 h-4 text-accent" />
                        <span className="text-[11px] font-medium tracking-tight sm:text-[13px]">System integration</span>
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
