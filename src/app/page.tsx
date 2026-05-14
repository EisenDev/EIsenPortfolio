import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { AiAutomationSection } from "@/components/sections/ai-automation-section";
import { ToolsSection } from "@/components/sections/tools-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <TechStackSection />
      <AiAutomationSection />
      <ToolsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
