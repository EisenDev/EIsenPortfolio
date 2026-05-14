"use client";

import Link from "next/link";
import { Container } from "./container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { profileData } from "@/data/profile";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "AI workflow", href: "#ai-automation" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  { name: "Resume", href: profileData.resumeHref },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <Container className="flex items-center justify-between">
        <div className={cn(
          "flex items-center justify-between w-full lg:w-auto px-6 py-3 rounded-full transition-all duration-500",
          isScrolled ? "glass-panel editorial-shadow" : "bg-transparent border-transparent"
        )}>
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-foreground hover:opacity-80 transition-opacity z-50"
            onClick={handleLinkClick}
            aria-label="Arjay Portfolio Home"
          >
            AE<span className="text-accent">.</span>
          </Link>

          {/* Mobile Toggle inside the pill if scrolled */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Desktop Links - Centered Pill Style */}
        <div className={cn(
          "hidden lg:flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500",
          isScrolled ? "glass-panel editorial-shadow" : "bg-transparent"
        )}>
          <ul className="flex items-center gap-1 list-none p-0 m-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  target={link.name === "Resume" ? "_blank" : undefined}
                  rel={link.name === "Resume" ? "noopener noreferrer" : undefined}
                  className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground hover:bg-surface-elevated rounded-full transition-all"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-2 pl-2 border-l border-border/50">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          id="mobile-menu"
          className={cn(
            "fixed inset-0 bg-background/98 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-500 lg:hidden z-40",
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          )}
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className="flex flex-col items-center gap-10 list-none p-0 m-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  target={link.name === "Resume" ? "_blank" : undefined}
                  rel={link.name === "Resume" ? "noopener noreferrer" : undefined}
                  className="text-4xl font-bold text-foreground hover:text-accent transition-colors tracking-tighter"
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
}
