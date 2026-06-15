/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, MessageSquareQuote, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-cream-100/40 relative border-t border-cream-900 border-opacity-10">
      {/* Background decoration */}
      <div className="absolute bottom-10 right-1/10 text-cream-900 text-opacity-10 pointer-events-none">
        <MessageSquareQuote className="w-56 h-56" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="accent-line"></div>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-coffee-950 tracking-tight leading-tight mb-4">
            محبوبِ دوست‌داران قهوه تخصصی
          </h2>
          <p className="text-sm sm:text-base text-coffee-600 font-light max-w-md mx-auto">
            تنها به گفته ما بسنده نکنید؛ نظرات صمیمی مشتریان و کافه‌گردان محلی را درباره کیفیت منو و فضای کافه‌نو بخوانید.
          </p>
        </div>

        {/* Testimonials Grid (3 columns on desktop, responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-[20px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 geometric-border flex flex-col justify-between group relative"
            >
              {/* Giant quote mark mark */}
              <div className="absolute top-6 right-6 opacity-5 text-coffee-850 group-hover:opacity-10 transition-opacity">
                <Quote className="w-10 h-10" />
              </div>

              {/* Review block */}
              <div className="space-y-4">
                {/* Visual Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className="w-4 h-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-coffee-700 leading-relaxed italic font-light">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-cream-50 mt-6 shrink-0">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full bg-cream-50 object-cover"
                />
                <div>
                  <h4 className="font-headings font-semibold text-sm text-coffee-950">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] text-coffee-500 font-serif font-light">
                    {testimonial.role} • {testimonial.date}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
