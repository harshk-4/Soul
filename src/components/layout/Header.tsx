'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Menu, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const MobileNav = dynamic(() => import('@/components/layout/MobileNav'), {
  ssr: false,
});

const navLinks = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/what-we-offer', label: 'What We Offer' },
  { href: '/what-makes-us-different', label: 'Beyond the Ordinary' },
  { href: '/community', label: 'Join Our Community' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md border-b border-outline-variant/80 shadow-[0_1px_8px_rgba(31,42,36,0.04)]'
            : 'bg-surface/90 backdrop-blur-sm border-b border-outline-variant/50'
        )}
      >
        <div className="h-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
          <div className="flex items-center gap-6 xl:gap-10 min-w-0">
            <Link
              href="/"
              prefetch={true}
              aria-label="SoulfulI — Home"
              className="group inline-flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            >
              <Image
                src="/images/soulfulli-logo.png"
                alt="SoulfulI — bridging intellect & emotion"
                width={648}
                height={322}
                priority
                quality={95}
                sizes="(max-width: 640px) 105px, (max-width: 1024px) 120px, 130px"
                className="h-11 sm:h-12 lg:h-[54px] w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[15px] font-sans font-medium text-on-surface-variant whitespace-nowrap">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    className={cn(
                      'transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary',
                      isActive
                        ? "text-primary font-semibold after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1.5px] after:bg-tertiary"
                        : 'hover:text-primary'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Button
              href="/eq-audit"
              variant="primary"
              className="rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 text-[12px] sm:text-[13px] tracking-wide whitespace-nowrap"
            >
              Take the EQ Audit
            </Button>

            <Link
              href="/contact"
              prefetch={true}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-primary/25 text-primary text-[13px] font-sans font-medium hover:border-primary hover:bg-primary/5 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Contact Us"
            >
              <Phone className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span>Contact Us</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 text-on-surface-variant hover:text-primary rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
