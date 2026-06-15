/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quote, Sparkles, Heart, Bean } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-cream-50 overflow-hidden relative border-t border-cream-900 border-opacity-10">
      {/* Decorative Warm Backglow */}
      <div className="absolute top-1/2 -left-1/4 w-1/2 h-1/2 bg-coffee-200/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Image & Floating Badges (5 cols on large) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Frame */}
            <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] sm:aspect-square md:aspect-[4/3] shadow-lg geometric-border">
              <img
                src="/src/assets/images/about_cafe_image_1781544730192.jpg"
                alt="کار باریستای حرفه‌ای ما در حال لاته آرت"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95 hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/40 via-transparent to-transparent" />
            </div>

            {/* Decorative Floating Card: Highlights local roasting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-[20px] p-4 shadow-xl max-w-xs flex gap-3 h-auto items-center geometric-border"
            >
              <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center text-coffee-700 shrink-0">
                <Bean className="w-5 h-5" />
              </div>
              <div className="text-right text-xs">
                <span className="font-headings font-bold text-coffee-950 block">رستری اختصاصی</span>
                <span className="text-coffee-600 font-light block mt-0.5" dir="rtl">تهیه شده با اصول تجارت مستقیم عادلانه. برشته‌کاری اختصاصی دو بار در هفته.</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Column 2: Story & Brand Values (7 cols on large) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <div className="accent-line"></div>
              <h2 className="font-headings font-bold text-3xl sm:text-4xl text-coffee-950 tracking-tight leading-tight">
                داستان ما: الهام گرفته از قهوه، ساخته شده برای همدلی
              </h2>
            </div>

            <div className="text-sm sm:text-base text-coffee-800/95 font-light leading-relaxed space-y-4">
              <p>
                کافه‌نو در سال ۱۳۹۷ متولد شد تا در دنیای پرسرعت امروزی، مأمنی آرامش‌بخش برای مخاطبانش باشد. ما فضایی صمیمی و محلی را تصویر کردیم که استانداردهای فنی دقیق دم‌آوری قهوه تخصصی را با مهمان‌نوازی و گرمای سنتی پیوند می‌زند.
              </p>
              <p>
                نام <strong>کافه‌نو</strong>، نماینده‌ای از ترکیب طعم غنی قهوه و ارتباطات اصیل انسانی است. ما مرزهای متکلفانه اصطلاحات تخصصی قهوه را کنار زده‌ایم تا مایکرو-لات‌های دمی و اسپرسوی تک‌خاستگاه با بالاترین سطح دسترسی برای هر کس لذت‌بخش باشد. فرقی نمی‌کند که به دنبال یک شات اسپرسوی سریع صبحگاهی هستید یا مایلید ساعت‌ها خلوت کنید؛ کافه‌نو خانه ایده‌آل شماست.
              </p>
            </div>

            {/* Mission Statement Block */}
            <div className="p-6 bg-white rounded-[20px] border-r-[6px] border-coffee-700 shadow-sm space-y-2 mt-4 relative overflow-hidden geometric-border">
              <div className="absolute top-1 left-2 opacity-5 text-coffee-950">
                <Quote className="w-20 h-20" />
              </div>
              <h4 className="font-headings font-bold text-sm text-coffee-950 flex items-center gap-1.5 uppercase tracking-wider">
                <Heart className="w-4 h-4 text-coffee-700 fill-coffee-700" />
                <span>ماموریت ما</span>
              </h4>
              <p className="text-xs sm:text-sm text-coffee-700 italic font-medium leading-relaxed">
                «تبدیل عادت‌های روزانه به لحظاتی لذت‌بخش و خاطره‌ساز. ما دانه‌های قهوه را مستقیم و بدون واسطه از مزارع خانوادگی اخلاق‌مدار در سراسر جهان تهیه کرده و در بَچ‌های کوچک برشته می‌کنیم تا حامی معیشت پایدار کشاورزان و ارائه‌کننده بالاترین کیفیت ممکن باشیم.»
              </p>
            </div>

            {/* Quick Milestones Checklist */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-cream-850">
              <div>
                <span className="font-headings font-extrabold text-2xl text-coffee-950 block">۸+</span>
                <span className="text-[10px] uppercase font-bold text-coffee-600 tracking-wider block mt-1">تنوع دانه‌های دمی</span>
              </div>
              <div>
                <span className="font-headings font-extrabold text-2xl text-coffee-950 block">۱۰۰٪</span>
                <span className="text-[10px] uppercase font-bold text-coffee-600 tracking-wider block mt-1">لیوان‌های تجزیه‌پذیر</span>
              </div>
              <div>
                <span className="font-headings font-extrabold text-2xl text-coffee-950 block">۴.۹ ★</span>
                <span className="text-[10px] uppercase font-bold text-coffee-600 tracking-wider block mt-1">بیش از ۱,۲۰۰ رضایت کاربر</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
