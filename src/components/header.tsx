"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "#catalog" },
  { name: "AI Advisor", href: "#advisor" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", isScrolled ? "bg-background/80 shadow-md backdrop-blur-sm" : "bg-transparent")}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Music className="h-8 w-8 text-accent" />
          <span className="text-2xl font-bold font-headline">AudioFlow</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-accent">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="hidden md:flex">Sign In</Button>
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 py-6">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Music className="h-8 w-8 text-accent" />
                  <span className="text-2xl font-bold font-headline">AudioFlow</span>
                </Link>
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-lg font-medium transition-colors hover:text-accent">
                    {link.name}
                  </Link>
                ))}
                 <Button variant="outline" className="mt-4">Sign In</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
