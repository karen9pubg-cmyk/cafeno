/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Star, Coffee, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  onSelectProduct: (product: MenuItem) => void;
}

export default function MenuSection({ onSelectProduct }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'drinks' | 'bakery' | 'beans'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default order
  });

  const categories = [
    { id: 'all', name: 'همه محصولات' },
    { id: 'drinks', name: 'اسپرسو و نوشیدنی‌ها' },
    { id: 'bakery', name: 'شیرینی‌پزی آرتیزان' },
    { id: 'beans', name: 'دانه‌های قهوه کیسه‌ای' }
  ];

  return (
    <section id="menu" className="py-24 bg-cream-50 relative border-t border-cream-900 border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="accent-line"></div>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-coffee-950 tracking-tight leading-tight mb-4">
            کشف منوی سنتی و اصیل کافه‌نو
          </h2>
          <p className="text-sm sm:text-base text-coffee-600 font-light max-w-md mx-auto">
            تمامی محصولات ما به صورت ارگانیک، دست‌ساز و با رست اختصاصی آماده می‌شوند. برای انتخاب اندازه، نوع شیر و میزان شیرینی روی هر گزینه کلیک کنید.
          </p>
        </div>

        {/* Filter / Sort Control Desk Control Panel */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-cream-900 border-opacity-15 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-headings font-semibold transition-all select-none ${
                    activeCategory === cat.id
                      ? 'bg-coffee-700 text-cream-50 shadow-md scale-102 font-bold'
                      : 'text-coffee-600 hover:text-coffee-900 hover:bg-cream-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search, Sort and Filter side */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto md:max-w-md">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-coffee-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در منوی قهوه و شیرینی..."
                className="w-full bg-cream-50 border border-cream-900 border-opacity-15 rounded-xl pr-10 pl-4 py-2.5 text-xs text-coffee-950 placeholder-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-700 text-right"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0 flex items-center min-w-[140px] bg-cream-50 border border-cream-900 border-opacity-15 rounded-xl px-3 py-2.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-coffee-500 ml-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-coffee-800 focus:outline-none font-medium w-full cursor-pointer text-right"
              >
                <option value="default">مرتب‌سازی پیش‌فرض</option>
                <option value="price-asc">قیمت: کم به زیاد</option>
                <option value="price-desc">قیمت: زیاد به کم</option>
                <option value="rating">محبوبیت (★)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Menu Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {sortedItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-md border geometric-border transition-all flex flex-col group relative"
              >
                {/* Image panel */}
                <div className="h-48 overflow-hidden bg-cream-100 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  {item.isSeasonal && (
                    <span className="absolute top-3 right-3 bg-sky-primary text-cream-50 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                      محصول فصلی
                    </span>
                  )}
                  {item.nutritionalInfo && (
                    <span className="absolute bottom-3 left-3 bg-coffee-950/40 backdrop-blur-sm text-cream-50 text-[9px] font-mono px-2 py-0.5 rounded" dir="ltr">
                      {item.nutritionalInfo.calories} Cal • کافئین: {item.nutritionalInfo.caffeine}
                    </span>
                  )}
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold tracking-wider text-coffee-500 uppercase">
                        {item.subCategory}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-headings font-bold text-base text-coffee-950">
                      {item.name}
                    </h3>

                    <p className="text-xs text-coffee-600 font-light leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Ingredients chips */}
                    {item.ingredients && (
                      <div className="flex flex-wrap gap-1 pt-1 pb-3">
                        {item.ingredients.slice(0, 3).map((ing, idx) => (
                          <span key={idx} className="bg-cream-60/50 text-coffee-600 text-[9px] px-2 py-0.5 rounded-full border border-cream-900 border-opacity-5">
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Controls footer */}
                  <div className="pt-4 border-t border-cream-50 flex items-center justify-between mt-auto">
                    <span className="font-mono text-base font-extrabold text-coffee-950" dir="ltr">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onSelectProduct(item)}
                      className="bg-cream-100 hover:bg-coffee-700 hover:text-cream-50 text-coffee-800 text-[11px] font-bold font-headings py-2.5 px-4 rounded-xl transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>سفارش و شخصی‌سازی</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty Search Fallback */}
          {sortedItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-12 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-cream-100 rounded-full flex items-center justify-center text-coffee-400">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-headings font-semibold text-base text-coffee-950">موردی یافت نشد</h4>
              <p className="text-xs text-coffee-600 max-w-sm">
                متأسفانه هیچ محصولی متناسب با جستجوی شما برای «{searchQuery}» پیدا نکردیم. لطفاً عبارت دیگری بنویسید.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-xs text-coffee-700 underline font-semibold"
              >
                پاک کردن جستجو و فیلترها
              </button>
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
