
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { Sun, Moon, Briefcase, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useState } from 'react';

export function MainHeader() {
  const { setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block text-lg">{siteConfig.name}</span>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            {siteConfig.authLinks.map((link) => (
              <Button key={link.href} variant={link.label === "Sign Up" ? "default" : "outline"} size="sm" asChild>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-6">
                <Link href="/" className="mb-6 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                  <Briefcase className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">{siteConfig.name}</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {siteConfig.navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-lg text-foreground/80 hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-8 flex flex-col space-y-3">
                  {siteConfig.authLinks.map((link) => (
                     <SheetClose asChild key={link.href}>
                      <Button variant={link.label === "Sign Up" ? "default" : "outline"} asChild onClick={() => setMobileMenuOpen(false)}>
                        <Link href={link.href}>{link.label}</Link>
                      </Button>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
