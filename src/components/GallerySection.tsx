/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Camera, Eye, X, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function GallerySection() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'coffee' | 'interior' | 'moments'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Filter images
  const filteredGallery = GALLERY_ITEMS.filter(
    (item) => filterCategory === 'all' || item.category === filterCategory
  );

  const filterTabs = [
    { id: 'all', label: 'همه تصاویر' },
    { id: 'coffee', label: 'هنر قهوه' },
    { id: 'interior', label: 'فضای کار و نشیمن' },
    { id: 'moments', label: 'لحظات باریستایی' },
  ];

  return (
    <section id="gallery" className="py-24 bg-cream-50 relative border-t border-cream-900 border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1 bg-coffee-100 text-coffee-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <Camera className="w-3.5 h-3.5 text-coffee-700" />
            <span>کاوش بصری کافه‌نو</span>
          </div>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-coffee-950 tracking-tight leading-tight mb-4">
            گوشه‌ای از اتمسفر و فضای کافه‌نو
          </h2>
          <p className="text-sm sm:text-base text-coffee-600 font-light max-w-md mx-auto">
            گالری تصاویر شامل جزئیات معماری مینیمال، کیفیت نوشیدنی‌های دست‌ساز و تیم پرانرژی ما. برای بزرگ‌نمایی روی هر کارت ضربه بزنید.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id as any)}
              className={`py-2 px-4 rounded-full text-xs font-headings font-semibold hover:scale-102 transition-all select-none cursor-pointer ${
                filterCategory === tab.id
                  ? 'bg-coffee-700 text-cream-50 shadow-md font-bold'
                  : 'text-coffee-600 bg-white border border-cream-900 border-opacity-10 hover:bg-cream-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Image Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] bg-cream-100 shadow-sm border border-cream-900 border-opacity-10"
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-95"
                />

                {/* Dark Slide Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-coffee-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-cream-50 duration-300">
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <span className="text-[9px] font-bold text-sky-primary bg-sky-light/20 uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {item.category === 'coffee' ? 'بار تخصصی قهوه' : item.category === 'interior' ? 'نشیمن دنج' : 'هنر باریستا'}
                      </span>
                      <h4 className="font-headings font-semibold text-xs text-cream-100 mt-1.5 truncate max-w-[160px]">
                        {item.title}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-cream-50 border border-white/10 shrink-0">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Full screen Lightbox Viewer (AnimatePresence) */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
              {/* Backglow layer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.92 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-coffee-950"
                onClick={() => setSelectedItem(null)}
              />

              {/* Close Button top-right */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 text-cream-100 hover:text-white p-2 rounded-full cursor-pointer z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md"
                aria-label="بستن پنجره تصویر"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Box frame */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                className="max-w-4xl w-full bg-transparent overflow-hidden rounded-2xl relative z-10 flex flex-col items-center"
              >
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-cream-900 border-opacity-20"
                />
                
                {/* Details subtitle card */}
                <div className="bg-coffee-900/40 backdrop-blur-md text-center text-cream-100 p-4 rounded-xl mt-4 max-w-md w-full border border-white/10" dir="rtl">
                  <span className="text-[10px] font-bold tracking-widest text-sky-primary uppercase">
                    تصاویر مربوط به {selectedItem.category === 'coffee' ? 'قهوه تخصصی' : selectedItem.category === 'interior' ? 'نشیمن دنج' : 'هنر باریستا'}
                  </span>
                  <h4 className="font-headings font-bold text-base text-cream-50 mt-1">
                    {selectedItem.title}
                  </h4>
                  <p className="text-xs text-cream-200 mt-1 font-light">
                    {selectedItem.alt}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
