/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'خانه', href: '#home' },
    { name: 'منو', href: '#menu' },
    { name: 'رویدادها', href: '#community' },
    { name: 'درباره ما', href: '#about' },
    { name: 'تماس', href: '#contact' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/90 backdrop-blur-md shadow-md border-b border-cream-900 border-opacity-10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-coffee-700 flex items-center justify-center text-cream-50 group-hover:scale-105 transition-all duration-300 shadow-md">
            <Coffee className="w-5 h-5 text-cream-100" />
          </div>
          <span className="font-headings font-bold text-xl md:text-2xl tracking-tight text-coffee-950">
            Cafe<span className="text-coffee-700">No</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-headings text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-coffee-800 hover:text-coffee-600 relative py-1 group transition-colors"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-coffee-700 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Action Tray */}
        <div className="flex items-center gap-4">
          {/* Order Tray Button */}
          <button
            onClick={onOpenCart}
            className="p-2.5 rounded-xl bg-coffee-50 border border-cream-900 border-opacity-10 text-coffee-800 hover:bg-cream-100 active:scale-95 transition-all relative"
            aria-label="Open tray"
          >
            <ShoppingBag className="w-5 h-5 text-coffee-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-sky-primary text-cream-50 text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-cream-50 shadow animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick Order Now Button */}
          <a
            href="#menu"
            className="hidden sm:inline-block bg-coffee-700 hover:bg-coffee-800 text-cream-50 px-4 py-2 rounded-xl text-sm font-headings font-semibold transition-all shadow-md active:scale-98"
          >
            سفارش آنلاین
          </a>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-coffee-800 hover:bg-cream-100 md:hidden transition-all"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream-50 border-t border-cream-900 border-opacity-15"
          >
            <div className="px-4 pt-4 pb-6 space-y-3 font-headings font-semibold text-base text-coffee-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-cream-100 hover:text-coffee-950 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 px-3">
                <a
                  href="#menu"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center block bg-coffee-700 text-cream-50 py-2.5 rounded-xl text-sm font-bold shadow-md"
                >
                  سفارش فوری و هوشمند
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
