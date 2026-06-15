/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Navigation } from 'lucide-react';
import { CAFE_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Real-time Status state: Open or Closed?
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    // Determine if open based on current local time
    const checkOpenStatus = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const currentHour = now.getHours();

      // Monday - Friday (1 - 5)
      if (currentDay >= 1 && currentDay <= 5) {
        setIsOpenNow(currentHour >= 7 && currentHour < 19);
      }
      // Saturday (6)
      else if (currentDay === 6) {
        setIsOpenNow(currentHour >= 8 && currentHour < 20);
      }
      // Sunday (0)
      else if (currentDay === 0) {
        setIsOpenNow(currentHour >= 8 && currentHour < 17);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // check hourly
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    // Simulate submission delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Cleanup
      setName('');
      setEmail('');
      setMessage('');

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-cream-50 relative border-t border-cream-900 border-opacity-10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="accent-line"></div>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-coffee-950 tracking-tight leading-tight mb-4">
            با ما در تماس باشید
          </h2>
          <p className="text-sm sm:text-base text-coffee-600 font-light max-w-md mx-auto">
            سوالی درباره رزرو گروهی، آلرژی به نوع خاص شیر، یا مشاوره خرید دانه‌های تخصصی قهوه دارید؟ با ما تماس بگیرید یا پیام خود را سریع ارسال کنید.
          </p>
        </div>

        {/* 2 Column Section: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Column 1: Details, hours, and vector mock map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card Address */}
              <div className="bg-white p-5 rounded-[20px] geometric-border space-y-3 shadow-sm text-right">
                <div className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-coffee-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-headings font-semibold text-sm text-coffee-950">موقعیت حضوری کافه‌نو</h4>
                <p className="text-xs text-coffee-600 font-light leading-relaxed">
                  {CAFE_INFO.address}
                </p>
              </div>

              {/* Card Contact info */}
              <div className="bg-white p-5 rounded-[20px] geometric-border space-y-3 shadow-sm text-right">
                <div className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-coffee-700">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-headings font-semibold text-sm text-coffee-950">ارتباط مستقیم و ایمیل</h4>
                <div className="text-xs text-coffee-600 font-light leading-relaxed space-y-1">
                  <p className="hover:text-coffee-800 transition-colors">
                    <a href={`tel:${CAFE_INFO.phone}`}>{CAFE_INFO.phone}</a>
                  </p>
                  <p className="hover:text-coffee-800 transition-colors">
                    <a href={`mailto:${CAFE_INFO.email}`}>{CAFE_INFO.email}</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Business Hours Details Card */}
            <div className="bg-white p-5 sm:p-6 rounded-[20px] geometric-border shadow-sm space-y-4 text-right">
              <div className="flex items-center justify-between border-b border-cream-50 pb-3">
                <h4 className="font-headings font-bold text-sm text-coffee-950 flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-coffee-700 font-bold" />
                  <span>ساعات کاری کافه</span>
                </h4>

                {/* Live Status indicator */}
                <div className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 select-none animate-pulse ${
                  isOpenNow 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${isOpenNow ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                  <span>{isOpenNow ? 'در حال حاضر باز است' : 'در حال حاضر بسته است'}</span>
                </div>
              </div>

              {/* Hours mapping */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-coffee-800">
                {CAFE_INFO.hours.map((item, idx) => (
                  <div key={idx} className="space-y-1 bg-cream-50 p-3 rounded-xl border border-cream-900 border-opacity-5">
                    <span className="text-coffee-500 font-semibold block uppercase tracking-wider text-[9px]">{item.days}</span>
                    <span className="font-headings font-bold text-coffee-950 block text-[11px] mt-1" dir="ltr">{item.open} - {item.close}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aesthetic responsive embedded Vector Map card */}
            <div className="bg-white rounded-[20px] geometric-border overflow-hidden shadow-sm flex-1 min-h-[220px] relative">
              {/* Vector Grid Map Illustration background */}
              <div className="absolute inset-0 bg-[#e5e9f0]/40 flex flex-col z-0 select-none overflow-hidden">
                {/* Simulated Roads Grid structure */}
                <svg className="w-full h-full opacity-60 text-white stroke-[4] stroke-white" fill="none">
                  {/* Grid Lines */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line key={`v-${i}`} x1={i * 80} y1="0" x2={i * 80 + 30} y2="400" />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60 - 20} />
                  ))}
                  {/* Main diagonal road */}
                  <line x1="0" y1="200" x2="800" y2="280" className="stroke-[#ccd3e0] stroke-[12]" />
                  <line x1="0" y1="200" x2="800" y2="280" className="stroke-white stroke-[7]" />
                  
                  {/* Linden Avenue (vertical primary) */}
                  <line x1="380" y1="0" x2="420" y2="400" className="stroke-[#ccd3e0] stroke-[16]" />
                  <line x1="380" y1="0" x2="420" y2="400" className="stroke-white stroke-[9]" />
                </svg>

                {/* Green park zone */}
                <div className="absolute bottom-4 right-6 w-32 h-20 bg-emerald-100/65 rounded-xl border border-emerald-200 backdrop-blur-[1px] flex items-center justify-center">
                  <span className="text-[10px] text-emerald-800 font-headings font-bold tracking-wider">فضای سبز مجاور کافه</span>
                </div>

                {/* CafePin point */}
                <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  {/* Pulse visual ring */}
                  <span className="absolute h-9 w-9 rounded-full bg-coffee-700/20 border border-coffee-700/40 animate-ping" />
                  <div className="bg-coffee-800 text-cream-50 p-2 rounded-full shadow-lg border border-white z-10">
                    <Navigation className="w-4.5 h-4.5 text-cream-100 fill-cream-100 transform rotate-45" />
                  </div>
                  <div className="bg-coffee-950 text-cream-50 font-headings font-semibold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded-md shadow mt-1.5 border border-white/10 z-10">
                    کافه‌نو (بار مرکزی)
                  </div>
                </div>
              </div>

              {/* Float Map Control Information */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3.5 rounded-xl flex items-center justify-between border border-cream-900 border-opacity-10 z-10 mr-1.5 shadow">
                <div className="text-right text-xs">
                  <span className="font-headings font-bold text-coffee-950 block">تهران، خیابان ولیعصر</span>
                  <span className="text-coffee-600 font-light block">فقط ۳ دقیقه پیاده‌روی از میدان ونک</span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CAFE_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-coffee-700 text-cream-50 font-headings font-bold text-[10px] py-2 px-3 rounded-lg shadow-sm hover:bg-coffee-800 hover:scale-102 transition-all flex items-center gap-1 cursor-pointer select-none"
                >
                  مسیریابی حضوری
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: Interactive Contact Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-[20px] p-6 sm:p-8 geometric-border shadow-sm flex flex-col justify-between text-right">
            <div className="space-y-4">
              <h3 className="font-headings font-bold text-lg text-coffee-950 border-b border-cream-50 pb-3">
                ارسال پیام برای کافه‌نو
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-coffee-700">نام و نام خانوادگی شما *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً مریم کریمی"
                    className="w-full bg-cream-50 border border-cream-900 border-opacity-15 rounded-xl px-3 py-2.5 text-xs text-coffee-950 placeholder-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-700 text-right"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-coffee-700">آدرس ایمیل شما *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="w-full bg-cream-50 border border-cream-900 border-opacity-15 rounded-xl px-3 py-2.5 text-xs text-coffee-950 placeholder-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-700 text-right font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-coffee-700">متن پیام شما برای تیم کافه‌نو *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="پیشنهادها، انتقادها یا ایده خود را با ما در میان بگذارید..."
                    className="w-full bg-cream-50 border border-cream-900 border-opacity-15 rounded-xl px-3 py-2.5 text-xs text-coffee-950 placeholder-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-700 text-right"
                  />
                </div>

                {/* Submitting button CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !email.trim() || !message.trim()}
                  className={`w-full font-headings font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs ${
                    name.trim() && email.trim() && message.trim()
                      ? 'bg-coffee-700 text-cream-50 hover:bg-coffee-800'
                      : 'bg-cream-400 text-coffee-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream-50 border-t-transparent rounded-full animate-spin"></div>
                      در حال ارسال پیام...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-cream-100" />
                      ارسال پیام تماس
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Live Visual Success Popup (AnimatePresence) */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-4 p-4 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-2.5 text-right w-full"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs flex-1">
                    <span className="font-headings font-bold block text-emerald-950">{name} عزیز، پیام شما دریافت شد!</span>
                    <span>پیام شما با موفقیت به باریستای ارشد ما تحویل داده شد. مطمئن باشید ظرف کمتر از ۲۴ ساعت بررسی و پاسخ خواهیم داد.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
