/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Coffee, Instagram, Facebook, ArrowRight, Heart, Sparkles, Check } from 'lucide-react';
import { CAFE_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;

    setSubscribed(true);
    setNewsEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4500);
  };

  const footerLinks = [
    { name: 'صفحه اصلی', href: '#home' },
    { name: 'پیشنهادات ویژه', href: '#featured' },
    { name: 'منوی کافه‌نو', href: '#menu' },
    { name: 'رویدادهای جمعی', href: '#community' },
    { name: 'درباره ما', href: '#about' },
    { name: 'نقشه و تماس با ما', href: '#contact' }
  ];

  return (
    <footer className="bg-coffee-950 text-cream-100/90 pt-16 pb-10 border-t-2 border-coffee-900 relative" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core items split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-coffee-900">
          
          {/* Logo & Slogan Column (5 grid cols) */}
          <div className="md:col-span-4 space-y-4 text-right">
            <a href="#home" className="flex items-center gap-2 group max-w-max">
              <div className="w-10 h-10 rounded-xl bg-coffee-700 flex items-center justify-center text-cream-50 group-hover:scale-105 transition-all duration-300 shadow-md">
                <Coffee className="w-5 h-5 text-cream-100" />
              </div>
              <span className="font-headings font-bold text-xl tracking-tight text-white">
                کافه<span className="text-coffee-500">نو</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-cream-205/85 font-light leading-relaxed max-w-sm">
              ما دوانه‌های مرغوب تک‌خاستگاه ارگانیک را روزانه با متدهای نوین استخراج عمیق دم‌آوری می‌کنیم. به شعبه ولیعصر ما سر بزنید تا قهوه باکیفیت و کیک‌های فرانسوی پخت روز را لمس کنید.
            </p>

            {/* Social media links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CAFE_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-coffee-900 hover:bg-coffee-800 text-cream-100 hover:text-white flex items-center justify-center transition-all hover:scale-105 border border-coffee-800/10"
                aria-label="صفحه اینستاگرام"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href={CAFE_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-coffee-900 hover:bg-coffee-800 text-cream-100 hover:text-white flex items-center justify-center transition-all hover:scale-105 border border-coffee-800/10"
                aria-label="صفحه فیسبوک"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (3 grid cols) */}
          <div className="md:col-span-3 space-y-4 text-right">
            <h4 className="font-headings font-bold text-sm text-white tracking-wider uppercase">
              بخش‌های کاربری
            </h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-cream-205">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors relative max-w-max"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Roastery Newsletter Subscription (5 grid cols) */}
          <div className="md:col-span-5 space-y-4 text-right">
            <h4 className="font-headings font-bold text-sm text-white tracking-wider uppercase flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-4 h-4 text-sky-primary" />
              <span>عضویت در باشگاه کافه‌نو</span>
            </h4>
            <p className="text-xs text-cream-205 max-w-md">
              دعوت‌نامه‌های اختصاصی برای رویدادهای چشایی و کاپینگ قهوه و اولویت خرید دانه‌های بسیار مرغوب مایکرو-لات را دریافت کنید.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 max-w-md">
              <div className="flex items-stretch bg-coffee-900 rounded-xl overflow-hidden border border-coffee-800 p-1">
                <input
                  type="email"
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="آدرس ایمیل شما..."
                  className="bg-transparent text-cream-100 text-xs px-3 py-2 flex-1 outline-none placeholder-coffee-500 font-mono text-right"
                />
                <button
                  type="submit"
                  className="bg-coffee-700 hover:bg-coffee-600 text-cream-100 text-xs font-bold font-headings px-4 py-2 rounded-lg shadow transition-all flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>ثبت‌نام</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>

              {/* Toast Success message */}
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold py-1 px-1"
                  >
                    <Check className="w-4 h-4 stroke-[3px]" />
                    <span>به باشگاه ما خوش آمدید! ایمیلتان را جهت تخفیف ۱۰٪ اولین نوشیدنی بررسی کنید.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Closing details & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-coffee-500 font-mono space-y-4 sm:space-y-0 text-right">
          <div>
            &copy; {new Date().getFullYear()} کافه‌نو. تمامی حقوق محفوظ است.
          </div>
          <div className="flex items-center gap-1 leading-none text-coffee-600">
            <span>تهیه شده با</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>برای دوست‌داران قهوه اصیل و مدرن در ایران.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
