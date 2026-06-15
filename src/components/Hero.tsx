/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Coffee, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenCart: () => void;
}

export default function Hero({ onOpenCart }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Dark Tint Overlay & Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/cafeno_hero_bg_1781544644400.jpg"
          alt="Cozy minimalist coffee counter"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/70 to-coffee-950/40" />
      </div>

      {/* Floating Coffee Accents or Subtle Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/10 animate-pulse bg-cream-50 h-2 w-2 rounded-full blur-sm" />
        <div className="absolute top-1/2 right-1/12 animate-pulse bg-cream-100 h-3 w-3 rounded-full blur-md" />
        <div className="absolute bottom-1/4 left-1/3 animate-ping bg-sky-primary h-1.5 w-1.5 rounded-full" />
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 z-10 text-center text-cream-50 flex flex-col items-center">
        {/* Geometric Accent Line */}
        <div className="accent-line"></div>
        
        {/* Aesthetic Small Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="badge bg-sky-primary text-white text-[11px] font-semibold font-headings uppercase px-4 py-1.5 rounded-full select-none mb-6 shadow-md tracking-wider"
        >
          هنر عصاره‌گیری برنده جایزه اسپرسو
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-headings font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight text-cream-50 mb-6 drop-shadow-lg leading-[1.08]"
        >
          قهوه تازه، <br />
          <span className="text-cream-100 underline decoration-sky-primary decoration-2 underline-offset-8">
            لحظه‌های تازه
          </span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-cream-100/90 font-light max-w-2xl mb-10 leading-relaxed font-sans"
        >
          به فضایی دنج و گرم که برای معاشرت، کار عمیق و طعم واقعی قهوه طراحی شده است، خوش آمدید. ما روزانه دانه‌های ارگانیک تک‌خاستگاه را با دقت دم می‌آوریم تا خوش‌ترین خاطرات را برایتان بسازیم.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-stretch select-none"
        >
          {/* CTA: View Menu */}
          <a
            href="#menu"
            className="sm:w-36 bg-transparent hover:bg-white/10 text-cream-105 border-2 border-cream-100 font-headings font-bold px-6 py-3 rounded-xl text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Coffee className="w-4 h-4 text-cream-105" />
            مشاهده منو
          </a>

          {/* CTA: Order Now */}
          <button
            onClick={onOpenCart}
            className="sm:w-44 bg-coffee-700 hover:bg-coffee-600 border border-coffee-800 text-cream-100 font-headings font-bold px-6 py-3 rounded-xl text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 group"
          >
            <span>سفارش آنلاین</span>
            <ArrowRight className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform rotate-180" />
          </button>
        </motion.div>

        {/* Dynamic Status Badges in Page Margin */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 flex items-center gap-6 text-xs text-cream-100 font-mono"
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>باز تا ساعت ۷:۰۰ عصر</span>
          </div>
          <div className="h-4 w-px bg-cream-100/30" />
          <div>تهران، خیابان ولیعصر، پلاک ۱۸۴</div>
        </motion.div>
      </div>

      {/* Decorative Wave Divider */}
      <div className="absolute bottom-0 inset-x-0 h-10 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-full w-full text-cream-50 fill-current">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
}
