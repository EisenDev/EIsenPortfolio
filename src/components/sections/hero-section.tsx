"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-background">
      {/* Background Image Container */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-[75%] lg:w-[65%] z-0">
        <Image
          src="/arjayportimage.png"
          alt="Arjay Escabas"
          fill
          priority
          quality={100}
          className="object-cover object-[center_top] md:object-[right_top] grayscale opacity-[0.35] dark:opacity-[0.25] contrast-115 dark:contrast-125 transition-all duration-500"
        />
        {/* Shadows for contrast and hiding cutout edges */}
        {/* Top shadow (Stronger on hair) */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-background from-10% via-background/70 to-transparent" />
        {/* Bottom shadow */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-background from-10% via-background/70 to-transparent" />
        {/* Right shadow (Hair/edge on the right) */}
        <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-background via-background/60 to-transparent" />
        {/* Left shadow */}
        <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="w-full">
          <MotionWrapper delay={0.1}>
            <h1 className="text-[1.8rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7rem] font-light tracking-[0.15em] text-foreground uppercase leading-tight mb-8 whitespace-nowrap">
              Arjay Escabas
            </h1>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <div className="h-[1px] w-16 bg-accent mb-8 opacity-70" />
          </MotionWrapper>

          <MotionWrapper delay={0.4}>
            <p className="text-muted/90 text-lg sm:text-xl font-light tracking-wide max-w-lg mb-12 leading-relaxed">
              Building AI-powered software,<br className="hidden sm:block" />
              automation systems, and modern web applications.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.5}>
            <div className="flex flex-col items-start gap-4">
              <Link 
                href="#projects" 
                className="inline-flex items-center gap-4 text-accent hover:text-accent/80 transition-colors group"
              >
                <span className="text-lg tracking-wide">View Projects</span>
                <ArrowRight className="w-5 h-5 font-light group-hover:translate-x-2 transition-transform" />
              </Link>
              <div className="h-[1px] w-28 bg-accent opacity-40 mt-1" />
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </section>
  );
}
