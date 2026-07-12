import { Container } from "@/components/layout/container";
import { MotionWrapper } from "@/components/motion/motion-wrapper";
import { profileData } from "@/data/profile";
import { Code2, Globe, FileText, ArrowUpRight, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const { contact } = profileData;

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "github": return <Code2 className="w-5 h-5" />;
      case "linkedin": return <Globe className="w-5 h-5" />;
      case "onlinejobs.ph": return <UserCircle className="w-5 h-5" />;
      case "resume": return <FileText className="w-5 h-5" />;
      default: return <ArrowUpRight className="w-5 h-5" />;
    }
  };

  return (
    <section id="contact" className="py-32 md:py-48 relative overflow-hidden bg-[#111111] dark:bg-[#F6F3ED] text-[#F6F3ED] dark:text-[#111111] transition-colors duration-300">
      <Container className="relative z-10">
        <MotionWrapper>
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-medium text-[#A68A64] mb-8">
              {contact.eyebrow}
            </span>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight text-balance">
              {contact.title}
            </h2>
            
            <p className="text-lg md:text-xl text-[#B8B1A5] dark:text-[#6F6A62] mb-12 max-w-2xl leading-relaxed font-medium text-balance">
              {contact.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {contact.socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-3 h-14 px-8 rounded-full transition-all font-bold",
                    social.name === "GitHub"
                      ? "bg-[#F6F3ED] dark:bg-[#111111] text-[#111111] dark:text-[#F6F3ED] hover:scale-105"
                      : social.name === "Resume"
                      ? "bg-[#A68A64] text-white hover:scale-105"
                      : "border-2 border-[#F6F3ED]/20 dark:border-[#111111]/10 text-[#F6F3ED] dark:text-[#111111] hover:bg-[#F6F3ED]/10 dark:hover:bg-[#111111]/5"
                  )}
                >
                  {getSocialIcon(social.name)}
                  {social.name}
                  {social.name === "Resume" && <ArrowUpRight className="w-4 h-4 opacity-70" />}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-32 text-center border-t border-[#F6F3ED]/10 dark:border-[#111111]/5 pt-12">
             <p className="text-[11px] font-medium tracking-[0.16em] text-[#F6F3ED]/35 dark:text-[#111111]/35">
                &copy; 2026 {profileData.name} | AI Application Developer Portfolio
             </p>
          </div>
        </MotionWrapper>
      </Container>
    </section>
  );
}
