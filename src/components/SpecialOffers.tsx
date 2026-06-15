/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Tag, Sparkles, Check, Gift, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SpecialOffersProps {
  onBrowseMenu: () => void;
}

export default function SpecialOffers({ onBrowseMenu }: SpecialOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const offers = [
    {
      id: 'o1',
      title: 'جشنواره خنک نوشیدنی‌های تابستانه',
      badge: '۲۰٪ تخفیف نوشیدنی‌ها',
      code: 'SUMMERCHILL20',
      description: 'با ماچا لاته، اسپرسو ویژه اسطوخودوس و نوشیدنی‌های نیترو دم‌سرد خستگی را از تن به در کنید.',
      bgGradient: 'from-sky-700 to-sky-900',
      textColor: 'text-sky-100',
      accentColor: 'bg-sky-500',
      image: 'https://picsum.photos/seed/icedlatte/600/400'
    },
    {
      id: 'o2',
      title: 'آیین صبحگاهی نان و شیرینی کافه‌نو',
      badge: 'یکی بخر، دو تا ببر',
      code: 'BOGOBAKERY',
      description: 'هر روز بین ساعت ۷ تا ۹ صبح یک کرواسان فرانسوی عالی بخرید و دومی را کاملاً رایگان هدیه بگیرید.',
      bgGradient: 'from-amber-800 to-coffee-900',
      textColor: 'text-amber-100',
      accentColor: 'bg-amber-600',
      image: 'https://picsum.photos/seed/freshpastries/600/400'
    }
  ];

  const handleCopyCode = (code: string) => {
    setCopiedCode(code);
    navigator.clipboard.writeText(code).catch(() => {});
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  return (
    <section id="offers" className="py-20 bg-cream-100/60 border-y border-cream-900 border-opacity-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1 bg-coffee-100 text-coffee-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <Gift className="w-3.5 h-3.5 text-coffee-700" />
            <span>تخفیف‌های فصلی</span>
          </div>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-coffee-950 tracking-tight leading-tight mb-4">
            پیشنهادهای ویژه کافه‌نو
          </h2>
          <p className="text-sm sm:text-base text-coffee-600 font-light max-w-lg mx-auto">
            از قیمت‌های استثنایی و کدهای تخفیف دوره‌ای لذت ببرید. برای کپی شدن خودکار کد تخفیف روی آن کلیک کنید!
          </p>
        </div>

        {/* Promo Grid (3 columns on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className={`bg-gradient-to-br ${offer.bgGradient} rounded-[20px] overflow-hidden shadow-lg flex flex-col border geometric-border text-cream-50 relative`}
            >
              {/* Image side */}
              <div className="w-full h-44 relative overflow-hidden shrink-0">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90 saturate-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Text content side */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className={`${offer.accentColor} text-cream-50 text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full shadow inline-block`}>
                    {offer.badge}
                  </span>
                  <h3 className="font-headings font-bold text-lg leading-tight text-white">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-cream-105/90 font-light leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Interactive Voucher Coupon */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="bg-white/10 hover:bg-white/15 active:scale-98 transition-all border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono font-bold group select-none cursor-pointer"
                    aria-label={`Copy voucher code ${offer.code}`}
                  >
                    <Tag className="w-3.5 h-3.5 text-cream-100 group-hover:scale-105" />
                    <span>{offer.code}</span>
                    {copiedCode === offer.code ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3px]" />
                    ) : null}
                  </button>

                  <button
                    onClick={onBrowseMenu}
                    className="text-xs font-semibold hover:underline flex items-center gap-1 select-none cursor-pointer text-cream-100 hover:text-white"
                  >
                    <span>سفارش</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* 3rd Card: Premium Geometric Student discount card directly from design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-coffee-700 text-cream-100 rounded-[20px] p-6 flex flex-col justify-between geometric-border shadow-lg relative overflow-hidden group"
          >
            {/* Overlay Geometric Circles from theme visual style */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full border-4 border-white/5 opacity-40 translate-x-1/4 -translate-y-1/4 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border-2 border-white/5 opacity-20 pointer-events-none" />

            <div className="space-y-4">
              <span className="bg-sky-primary text-white text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full shadow inline-block">
                مقرون‌به‌صرفه‌ترین پیشنهاد
              </span>
              <div>
                <h3 className="font-headings font-bold text-lg text-white leading-tight">
                  تخفیف ویژه مطالعه دانشجویی
                </h3>
                <p className="text-xs text-cream-100/90 font-light leading-relaxed mt-2">
                  از قهوه‌های دست‌ساز و شیرینی‌جات لذیذ لذت ببرید. یک سوخت عالی برای زمان امتحانات و پروژه‌های کاری دانشجویان عزیز و سخت‌کوش.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-cream-100/10 mt-6 flex justify-between items-center bg-coffee-800/20 -mx-6 -mb-6 p-6">
              <div>
                <span className="text-[9px] uppercase font-bold text-cream-100/70 tracking-widest block">هر دوشنبه</span>
                <span className="text-xs font-medium text-white italic">با ارائه کارت دانشجویی معتبر</span>
              </div>
              <div className="text-4xl font-extrabold font-headings text-white tracking-tighter">
                ۲۰٪-
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Toast Alert */}
        <AnimatePresence>
          {copiedCode && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 20, x: '-50%' }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[105] bg-coffee-950 text-cream-50 font-headings font-semibold text-xs py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2 border border-cream-100 border-opacity-10"
            >
              <Sparkles className="w-4 h-4 text-sky-primary" />
              <span>کد تخفیف <strong>{copiedCode}</strong> با موفقیت کپی شد!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
