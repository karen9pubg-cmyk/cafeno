/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Users, Ticket, Check, MapPin, Clock, X, ArrowRight } from 'lucide-react';
import { COMMUNITY_EVENTS } from '../data';
import { CommunityEvent } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function CommunitySection() {
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [bookedTicket, setBookedTicket] = useState<{ id: string; eventName: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep track of decrementing local event spots
  const [eventsList, setEventsList] = useState<CommunityEvent[]>(COMMUNITY_EVENTS);

  const handleOpenBooking = (event: CommunityEvent) => {
    setSelectedEvent(event);
    setBookedTicket(null);
    setEmail('');
    setFullName('');
  };

  const handleBookSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim() || !selectedEvent) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = 'EVT-' + Math.floor(Math.random() * 90000 + 10000);
      
      // Update spots left locally
      setEventsList((prev) =>
        prev.map((ev) =>
          ev.id === selectedEvent.id ? { ...ev, spotsLeft: Math.max(0, ev.spotsLeft - 1) } : ev
        )
      );

      setBookedTicket({ id: ticketId, eventName: selectedEvent.title });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <section id="community" className="py-24 bg-cream-100/40 relative border-t border-cream-900 border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="accent-line"></div>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-coffee-950 tracking-tight leading-tight mb-4">
            جامعه بزرگ کافه‌نو
          </h2>
          <p className="text-sm sm:text-base text-coffee-600 font-light max-w-md mx-auto">
            ما فراتر از یک مکان ساده برای سرو قهوه هستیم. برای گسترش دانش و فرهنگ صحیح قهوه‌نوشی، کارگاه‌های هفتگی، جلسات آموزشی و چشایی برگزار می‌کنیم.
          </p>
        </div>

        {/* Events Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {eventsList.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-md border geometric-border flex flex-col justify-between group"
            >
              {/* Event Cover Image */}
              <div className="h-52 relative overflow-hidden bg-cream-100">
                <img
                  src={event.image}
                  alt={event.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-coffee-800 text-cream-100 font-headings text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow">
                  {event.category}
                </span>

                {/* Spots warning banner */}
                <span className={`absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm shadow flex items-center gap-1.5 ${
                  event.spotsLeft <= 4 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-coffee-950/40 text-cream-100'
                }`}>
                  <span className={`h-2 w-2 rounded-full ${event.spotsLeft <= 4 ? 'bg-white animate-ping' : 'bg-emerald-400'}`} />
                  <span>{event.spotsLeft} صندلی باقی‌مانده</span>
                </span>
              </div>

              {/* Event Text Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-coffee-600 mb-3 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-sky-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-sky-primary" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <h3 className="font-headings font-bold text-lg text-coffee-950 mb-3 leading-snug group-hover:text-coffee-700 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-coffee-600 font-light leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>

                {/* Ticket and CTA */}
                <div className="pt-4 border-t border-cream-50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-coffee-500 font-semibold block uppercase">هزینه ثبت‌نام</span>
                    <span className="font-mono text-lg font-extrabold text-coffee-950">
                      {event.price === 0 ? 'رایگان' : `$${event.price.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleOpenBooking(event)}
                    disabled={event.spotsLeft === 0}
                    className={`font-headings text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 ${
                      event.spotsLeft === 0
                        ? 'bg-cream-400 text-coffee-400 cursor-not-allowed'
                        : 'bg-coffee-700 text-cream-50 hover:bg-coffee-800'
                    }`}
                  >
                    <Ticket className="w-4 h-4" />
                    <span>{event.spotsLeft === 0 ? 'تکمیل ظرفیت' : 'رزرو و ثبت‌نام'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spot Reservation Modal (AnimatePresence) */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-coffee-950"
                onClick={() => setSelectedEvent(null)}
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-cream-50 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-cream-900 border-opacity-35"
              >
                {/* Header card with close */}
                <div className="p-5 border-b border-cream-850 flex items-center justify-between bg-coffee-800 text-cream-50">
                  <h4 className="font-headings font-bold text-base text-cream-50">ثبت‌نام در رویداد تخصصی</h4>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-1.5 rounded-full hover:bg-coffee-700 transition-colors text-cream-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4 text-sm text-coffee-800 max-h-[80vh] overflow-y-auto">
                  {bookedTicket ? (
                    // Booking Success Screen
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-5 py-4"
                    >
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-1">
                        <Check className="w-6 h-6 stroke-[3px]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-headings font-bold text-lg text-coffee-950">ثبت‌نام شما نهایی شد!</h4>
                        <p className="text-xs text-coffee-600">بلیط دیجیتال حاوی جزییات برگزاری به آدرس ایمیل شما ارسال گردید.</p>
                      </div>

                      {/* Cool ticket design */}
                      <div className="bg-white border border-dashed border-coffee-200 rounded-xl p-4 shadow-sm relative overflow-hidden max-w-xs mx-auto text-right" dir="rtl">
                        <div className="absolute top-1/2 -left-2.5 w-5 h-5 bg-cream-50 rounded-full border-r border-coffee-100 transform -translate-y-1/2"></div>
                        <div className="absolute top-1/2 -right-2.5 w-5 h-5 bg-cream-50 rounded-full border-l border-coffee-100 transform -translate-y-1/2"></div>
                        
                        <div className="pb-3 border-b border-dashed border-coffee-150">
                          <span className="font-mono text-[9px] font-bold text-sky-primary px-2 py-0.5 bg-sky-light rounded uppercase">
                            VIP PASS • بلیط ویژه
                          </span>
                          <h5 className="font-headings font-bold text-sm text-coffee-950 mt-1 truncate">
                            {bookedTicket.eventName}
                          </h5>
                        </div>

                        <div className="py-3 space-y-1.5 text-xs text-coffee-800 border-b border-dashed border-coffee-150 font-medium">
                          <div className="flex justify-between">
                            <span className="text-coffee-500">مهمان</span>
                            <span>{fullName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-coffee-500">تاریخ</span>
                            <span>{selectedEvent.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-coffee-500">ساعت</span>
                            <span>{selectedEvent.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-coffee-500">مکان برگزاری</span>
                            <span className="text-right">اسپرسو بار کافه‌نو</span>
                          </div>
                        </div>

                        <div className="pt-3 flex justify-between items-center bg-coffee-50/50 p-2 rounded-lg mt-3">
                          <div className="font-mono text-[9px] text-coffee-600">
                            کد رهگیری: <strong>{bookedTicket.id}</strong>
                          </div>
                          <Ticket className="w-5 h-5 text-coffee-800" />
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="w-full bg-coffee-700 text-cream-50 font-headings font-bold py-2.5 px-4 rounded-xl shadow-md hover:bg-coffee-800 transition-all text-xs"
                      >
                        بازگشت به سایت
                      </button>
                    </motion.div>
                  ) : (
                    // Registration inputs
                    <form onSubmit={handleBookSpot} className="space-y-4">
                      {/* Summary recap snippet */}
                      <div className="bg-cream-100 p-3.5 rounded-xl space-y-1 border border-cream-900 border-opacity-5">
                        <h5 className="font-headings font-bold text-coffee-950 text-xs">
                          {selectedEvent.title}
                        </h5>
                        <div className="text-[11px] text-coffee-600 font-medium flex flex-wrap gap-x-3 gap-y-1 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-coffee-700" /> {selectedEvent.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-coffee-700" /> {selectedEvent.time}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="evt-name" className="block text-xs font-semibold text-coffee-700">نام و نام خانوادگی *</label>
                        <input
                          id="evt-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="مثلاً مریم کریمی"
                          className="w-full bg-white border border-cream-900 border-opacity-25 rounded-xl px-3 py-2 text-xs text-coffee-950 focus:outline-none focus:ring-1 focus:ring-coffee-700 text-right"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="evt-email" className="block text-xs font-semibold text-coffee-700">آدرس ایمیل *</label>
                        <input
                          id="evt-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full bg-white border border-cream-900 border-opacity-25 rounded-xl px-3 py-2 text-xs text-coffee-950 focus:outline-none focus:ring-1 focus:ring-coffee-700 text-right font-mono"
                        />
                      </div>

                      <div className="pt-2 border-t border-cream-850 flex items-center justify-between text-xs font-medium">
                        <span className="text-coffee-600">مجموع هزینه</span>
                        <span className="font-mono font-bold text-base text-coffee-950">
                          {selectedEvent.price === 0 ? 'رایگان' : `$${selectedEvent.price.toFixed(2)}`}
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !email.trim() || !fullName.trim()}
                        className={`w-full font-headings font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 text-xs ${
                          email.trim() && fullName.trim()
                            ? 'bg-coffee-700 text-cream-50 hover:bg-coffee-800'
                            : 'bg-cream-400 text-coffee-500 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-cream-50 border-t-transparent lg:border-t-transparent rounded-full animate-spin"></div>
                            در حال صدور صندلی...
                          </>
                        ) : (
                          <>
                            <Ticket className="w-4 h-4" />
                            تایید ثبت‌نام و دریافت بلیط
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
