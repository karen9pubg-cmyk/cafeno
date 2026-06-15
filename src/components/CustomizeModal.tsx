/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { AnimatePresence, motion } from 'motion/react';

interface CustomizeModalProps {
  menuItem: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    item: MenuItem,
    size: 'small' | 'medium' | 'large',
    milk: string,
    sweetness: string,
    notes: string,
    quantity: number
  ) => void;
}

export default function CustomizeModal({
  menuItem,
  isOpen,
  onClose,
  onAdd
}: CustomizeModalProps) {
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedMilk, setSelectedMilk] = useState('Whole Milk');
  const [sweetnessLevel, setSweetnessLevel] = useState('Regular');
  const [specialNotes, setSpecialNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Reset defaults on open
  useEffect(() => {
    if (menuItem) {
      setSelectedSize('medium');
      setSelectedMilk(menuItem.category === 'bakery' ? 'None' : 'Whole Milk');
      setSweetnessLevel(menuItem.category === 'bakery' ? 'None' : 'Regular');
      setSpecialNotes('');
      setQuantity(1);
    }
  }, [menuItem, isOpen]);

  if (!menuItem) return null;

  const handleAdd = () => {
    onAdd(menuItem, selectedSize, selectedMilk, sweetnessLevel, specialNotes, quantity);
    onClose();
  };

  const extraCosts = 
    (selectedSize === 'medium' ? 0.50 : selectedSize === 'large' ? 0.90 : 0) +
    (selectedMilk !== 'None' && selectedMilk !== 'Whole Milk' ? 0.60 : 0);

  const pricePerItem = menuItem.price + extraCosts;
  const totalPrice = pricePerItem * quantity;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-coffee-950 z-[110]"
            onClick={onClose}
          />

          {/* Modal Card */}
          <div className="fixed inset-0 z-[111] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-cream-50 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-cream-900 border-opacity-35 max-h-[90vh]"
              dir="rtl"
            >
              {/* Header with drink image */}
              <div className="h-44 relative bg-coffee-900 text-right">
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85"
                />
                <button
                  onClick={onClose}
                  className="absolute top-3 left-3 bg-coffee-900/40 text-cream-50 p-1.5 rounded-full hover:bg-coffee-900/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-coffee-950 to-transparent p-4 pt-12 text-cream-50">
                  <span className="text-[10px] font-bold tracking-widest text-sky-primary bg-sky-light/20 uppercase px-2.5 py-0.5 rounded-full inline-block backdrop-blur-sm mb-1">
                    {menuItem.subCategory}
                  </span>
                  <h4 className="font-headings font-bold text-lg text-cream-50 leading-tight">
                    شخصی‌سازی {menuItem.name}
                  </h4>
                </div>
              </div>

              {/* Scrollable content areas */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1 text-sm text-coffee-800 text-right">
                <p className="text-xs text-coffee-600 italic">
                  {menuItem.description}
                </p>

                {/* Size options */}
                <div className="space-y-2">
                  <div className="font-headings font-bold text-coffee-950 flex justify-between items-center text-xs tracking-wider">
                    <span>انتخاب اندازه نوشیدنی</span>
                    <span className="text-[10px] text-coffee-500 font-normal">اندازه متوسط استاندارد است</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { value: 'small', label: 'کوچک' },
                      { value: 'medium', label: 'متوسط' },
                      { value: 'large', label: 'بزرگ' }
                    ] as const).map((size) => {
                      const hasCostLabel = size.value !== 'small';
                      const costLabel = size.value === 'medium' ? '+$۰.۵۰' : '+$۰.۹۰';
                      return (
                        <button
                          key={size.value}
                          onClick={() => setSelectedSize(size.value)}
                          className={`border rounded-xl p-2.5 text-center transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                            selectedSize === size.value
                              ? 'border-coffee-700 bg-coffee-50 text-coffee-900 font-bold'
                              : 'border-cream-900 border-opacity-25 hover:bg-cream-100 text-coffee-700'
                          }`}
                        >
                          <span className="text-xs font-bold">{size.label}</span>
                          <span className="text-[10px] opacity-75 font-mono mt-0.5" dir="ltr">
                            {hasCostLabel ? costLabel : 'قیمت پایه'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dairy Options / Toast options */}
                {menuItem.category === 'drinks' && (
                  <div className="space-y-2">
                    <div className="font-headings font-bold text-coffee-950 flex justify-between items-center text-xs tracking-wider">
                      <span>ترجیح نوع شیر</span>
                      <span className="text-[10px] text-coffee-500 font-normal">شیر گیاهی +$۰.۶۰</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Whole Milk', label: 'شیر کامل عادی' },
                        { name: 'Oat Milk', label: 'شیر جو دوسر' },
                        { name: 'Almond Milk', label: 'شیر بادام' },
                        { name: 'None (Black)', label: 'بدون شیر (قهوه سیاه)' }
                      ].map((milk) => (
                        <button
                          key={milk.name}
                          onClick={() => setSelectedMilk(milk.name)}
                          className={`border rounded-xl p-2.5 text-right transition-all flex items-center justify-between text-xs cursor-pointer ${
                            selectedMilk === milk.name
                              ? 'border-coffee-700 bg-coffee-50 text-coffee-900 font-bold'
                              : 'border-cream-900 border-opacity-25 hover:bg-cream-100 text-coffee-700'
                          }`}
                        >
                          <span>{milk.label}</span>
                          {selectedMilk === milk.name && <Check className="w-3.5 h-3.5 text-coffee-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bakery warmth option */}
                {menuItem.category === 'bakery' && (
                  <div className="space-y-2">
                    <div className="font-headings font-bold text-coffee-950 text-xs tracking-wider">
                      <span>نحوه سرو کیک/شیرینی</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'گرم شده (پیشنهادی)', value: 'Warm Up' },
                        { label: 'سرد / همان‌طور که هست', value: 'As-Is' }
                      ].map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setSelectedMilk(item.value)}
                          className={`border rounded-xl p-2.5 text-right transition-all flex items-center justify-between text-xs cursor-pointer ${
                            selectedMilk === item.value || (selectedMilk === 'None' && item.value === 'As-Is')
                              ? 'border-coffee-700 bg-coffee-50 text-coffee-900 font-bold'
                              : 'border-cream-900 border-opacity-25 hover:bg-cream-100 text-coffee-700'
                          }`}
                        >
                          <span>{item.label}</span>
                          {(selectedMilk === item.value || (selectedMilk === 'None' && item.value === 'As-Is')) && (
                            <Check className="w-3.5 h-3.5 text-coffee-700" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sweetener Level */}
                {menuItem.category === 'drinks' && (
                  <div className="space-y-2">
                    <div className="font-headings font-bold text-coffee-950 text-xs tracking-wider">
                      <span>میزان شیرینی نوشیدنی</span>
                    </div>
                    <div className="flex bg-cream-100 border border-cream-900 border-opacity-15 rounded-xl p-1 gap-1">
                      {[
                        { value: 'Regular', label: 'عادی' },
                        { value: 'Less Sweet', label: 'کم‌شیرین' },
                        { value: 'Sugar Free', label: 'بدون شکر' }
                      ].map((sweetness) => (
                        <button
                          key={sweetness.value}
                          onClick={() => setSweetnessLevel(sweetness.value)}
                          className={`flex-1 text-center py-2 text-xs rounded-lg transition-all cursor-pointer ${
                            sweetnessLevel === sweetness.value
                              ? 'bg-white text-coffee-950 font-bold shadow-sm'
                              : 'text-coffee-600 hover:text-coffee-900'
                          }`}
                        >
                          {sweetness.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Instructions */}
                <div className="space-y-2">
                  <label htmlFor="custom-notes" className="font-headings font-bold text-coffee-950 text-xs tracking-wider block">
                    درخواست ویژه از باریستا
                  </label>
                  <input
                    id="custom-notes"
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="مثلاً: فوق‌العاده داغ ترجیح می‌دهم، درب پلاستیکی نگذارید..."
                    className="w-full bg-white border border-cream-900 border-opacity-25 rounded-xl px-3 py-2 text-xs text-coffee-950 placeholder-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-700 text-right"
                  />
                </div>
              </div>

              {/* Bottom Drawer Control */}
              <div className="p-4 bg-cream-100 border-t border-cream-850 flex items-center justify-between gap-4">
                {/* Quantity Control */}
                <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-cream-900 border-opacity-15">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-cream-50 text-coffee-700 transition-all font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-bold font-mono text-coffee-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-cream-50 text-coffee-700 transition-all font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 bg-coffee-700 hover:bg-coffee-800 text-cream-50 font-headings font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] text-center text-xs flex justify-between items-center cursor-pointer"
                >
                  <span>افزودن به سینی خرید</span>
                  <span className="font-mono text-xs text-cream-100" dir="ltr">
                    ${totalPrice.toFixed(2)}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
