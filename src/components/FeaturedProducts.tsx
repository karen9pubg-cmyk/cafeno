/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Coffee, Sparkles } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { motion } from 'motion/react';

interface FeaturedProductsProps {
  onSelectProduct: (product: MenuItem) => void;
}

export default function FeaturedProducts({ onSelectProduct }: FeaturedProductsProps) {
  // Get bestseller items
  const bestSellers = MENU_ITEMS.filter((item) => item.isBestSeller).slice(0, 4);

  return (
    <section id="featured" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <div className="accent-line"></div>
          <h2 className="font-headings font-bold text-3xl sm:text-4xl text-coffee-950 tracking-tight leading-tight mb-4">
            محبوب‌ترین‌های مهمانان ما و محصولات ویژه
          </h2>
          <p className="text-sm sm:text-base text-coffee-600 font-light leading-relaxed">
            باریستاهای ما هر روز دستگاه‌ها را به‌دقت تنظیم کرده و دانه‌های مرغوب تک‌خاستگاه را برای شما عصاره‌گیری می‌کنند تا طعم واقعی قهوه اصیل را بچشید.
          </p>
        </div>

        {/* Responsive Grid: Desk 4 cols, Tablet 2 cols, Mobile 1 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 geometric-border flex flex-col relative"
            >
              {/* Product Badge tag */}
              {product.tags.length > 0 && (
                <span className="absolute top-4 right-4 bg-sky-primary text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 z-10 rounded-full shadow-sm">
                  {product.tags[0]}
                </span>
              )}

              {/* Card Product Image with Zoom Hover */}
              <div className="h-56 relative overflow-hidden bg-cream-100">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Product Info Block */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold tracking-wider text-sky-primary bg-sky-light px-2.5 py-0.5 rounded-full uppercase">
                    {product.subCategory}
                  </span>
                  {/* Rating display */}
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3 className="font-headings font-bold text-base text-coffee-950 line-clamp-1 mb-2 group-hover:text-coffee-700 transition-colors">
                  {product.name}
                </h3>

                <p className="text-xs text-coffee-600 line-clamp-2 md:line-clamp-3 font-light mb-4 flex-1 leading-relaxed">
                  {product.description}
                </p>

                {/* Footer and Interactive trigger */}
                <div className="pt-4 border-t border-cream-50 flex items-center justify-between mt-auto">
                  <span className="font-mono text-base font-extrabold text-coffee-950">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="bg-coffee-700 hover:bg-coffee-800 text-cream-50 text-xs font-semibold font-headings py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    افزودن به سبد
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
