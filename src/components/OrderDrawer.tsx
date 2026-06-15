/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Coffee, Clock, CheckCircle2, Ticket } from 'lucide-react';
import { CartItem } from '../types';
import { AnimatePresence, motion } from 'motion/react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function OrderDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: OrderDrawerProps) {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [ticketDetails, setTicketDetails] = useState<{ id: string; time: string } | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((total, item) => {
    let price = item.menuItem.price;
    if (item.selectedSize === 'medium') price += 0.50;
    if (item.selectedSize === 'large') price += 0.90;
    if (item.selectedMilk && item.selectedMilk !== 'None' && item.selectedMilk !== 'Whole Milk') {
      price += 0.60;
    }
    return total + (price * item.quantity);
  }, 0);

  const totalTax = subtotal * 0.09; // 9% localized tax rate
  const grandTotal = subtotal + totalTax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    setIsSubmitting(true);
    // Simulate API connection
    setTimeout(() => {
      const orderId = 'CN-' + Math.floor(Math.random() * 90000 + 10000);
      const readyTime = new Date();
      readyTime.setMinutes(readyTime.getMinutes() + 12);
      const timeStr = readyTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setTicketDetails({ id: orderId, time: timeStr });
      setIsSubmitting(false);
      setIsCheckedOut(true);
    }, 1200);
  };

  const handleReset = () => {
    onClearCart();
    setIsCheckedOut(false);
    setTicketDetails(null);
    setCustomerName('');
    setSpecialInstructions('');
  };

  const translateSize = (size: string) => {
    if (size === 'small') return 'کوچک';
    if (size === 'medium') return 'متوسط';
    return 'بزرگ';
  };

  const translateMilk = (milk?: string) => {
    if (!milk || milk === 'None') return 'بدون شیر اضافه';
    if (milk === 'Whole Milk') return 'شیر کامل';
    if (milk === 'Oat Milk') return 'شیر جو دوسر';
    if (milk === 'Almond Milk') return 'شیر بادام';
    return milk;
  };

  const translateSweetness = (sweet?: string) => {
    if (!sweet || sweet === 'Regular') return 'شیرینی نرمال';
    if (sweet === 'Less Sweet') return 'کم‌شیرین';
    if (sweet === 'Extra Sweet') return 'شیرین‌تر';
    return sweet;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-coffee-950 z-[100]"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream-50 text-coffee-900 shadow-2xl z-[101] flex flex-col border-r border-cream-900 border-opacity-40"
            dir="rtl"
          >
            {/* Header */}
            <div className="p-5 border-b border-cream-850 flex items-center justify-between bg-coffee-800 text-cream-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cream-100" />
                <h3 className="font-headings font-bold text-base text-cream-50">سینی خرید شما</h3>
                <span className="bg-coffee-700 text-cream-100 text-xs font-semibold px-2 border border-cream-100 border-opacity-10 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-coffee-700 transition-colors text-cream-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-right">
              {isCheckedOut && ticketDetails ? (
                // Checkout Success / Ticket screen
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 pt-3"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-1 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-headings font-bold text-xl text-coffee-950">سفارش شما تایید شد!</h4>
                    <p className="text-sm text-coffee-600">لطفاً هنگام مراجعه به کافه، این رسید دیجیتال را به باریستا نشان دهید.</p>
                  </div>

                  {/* Aesthetic Coffee Ticket */}
                  <div className="bg-white border-2 border-dashed border-coffee-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
                    {/* Retro ticket side notches */}
                    <div className="absolute top-1/2 -left-3.5 w-6 h-6 bg-cream-50 rounded-full border-r border-coffee-100 transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 -right-3.5 w-6 h-6 bg-cream-50 rounded-full border-l border-coffee-100 transform -translate-y-1/2"></div>
                    
                    <div className="flex justify-between items-start pb-4 border-b border-dashed border-coffee-100">
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase text-sky-primary bg-sky-light px-2 py-0.5 rounded-full inline-block mb-1">
                          تحویل اکسپرس کافه‌نو
                        </span>
                        <h5 className="font-headings font-bold text-base text-coffee-900">شعبه مرکزی کافه‌نو</h5>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-coffee-500 block">کد پیگیری</span>
                        <span className="font-mono font-bold text-sm text-coffee-900">{ticketDetails.id}</span>
                      </div>
                    </div>

                    {/* Ticket Items */}
                    <div className="py-4 space-y-3 text-sm border-b border-dashed border-coffee-100">
                      <div className="text-xs font-semibold text-coffee-500 uppercase tracking-widest mb-1">اقلام سفارش</div>
                      {cart.map((item, id) => (
                        <div key={id} className="flex justify-between items-start">
                          <span className="text-coffee-800 text-right">
                            <strong>{item.quantity}x</strong> {item.menuItem.name} 
                            <span className="block text-[10px] text-coffee-500">
                              اندازه: {translateSize(item.selectedSize)} • {translateMilk(item.selectedMilk)} • {translateSweetness(item.sweetnessLevel)}
                            </span>
                          </span>
                          <span className="font-mono text-coffee-950 font-medium">
                            ${(item.menuItem.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Customer info & Timing */}
                    <div className="py-4 space-y-2 text-sm border-b border-dashed border-coffee-100">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-coffee-500">زمان تحویل تقریبی</span>
                        <span className="text-coffee-500">نام مشتری</span>
                      </div>
                      <div className="flex justify-between items-center font-semibold">
                        <div className="flex items-center gap-1.5 text-coffee-900">
                          <Clock className="w-4 h-4 text-coffee-700" />
                          <span>~ {ticketDetails.time}</span>
                        </div>
                        <span className="text-coffee-900">{customerName}</span>
                      </div>
                    </div>

                    {/* Grand info */}
                    <div className="pt-4 flex justify-between items-center">
                      <span className="font-headings font-bold text-coffee-800">مبلغ کل پرداختنی</span>
                      <span className="font-mono font-extrabold text-lg text-coffee-950">${grandTotal.toFixed(2)}</span>
                    </div>

                    {/* Simulated Barcode */}
                    <div className="mt-5 pt-3 flex flex-col items-center justify-center gap-1 border-t border-coffee-50 bg-coffee-50/50 rounded-lg p-2">
                      <div className="h-10 w-full flex gap-[1px] items-stretch justify-center">
                        {Array.from({ length: 36 }).map((_, idx) => (
                          <div 
                            key={idx} 
                            style={{ width: `${(idx % 3 === 0 ? 3 : (idx % 2 === 0 ? 1 : 2))}px` }} 
                            className="bg-coffee-900 h-full"
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[9px] text-coffee-500 uppercase tracking-widest mt-1">
                        *اسکن جهت تحویل سفارش در بوفه کافه*
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleReset}
                      className="w-full bg-coffee-700 text-cream-50 font-headings font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-coffee-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      <Coffee className="w-4 h-4 text-cream-100" />
                      سفارش آیتم‌های دیگر
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full text-center text-xs font-semibold text-coffee-600 hover:text-coffee-800 py-2 transition-colors"
                    >
                      بازگشت به سایت
                    </button>
                  </div>
                </motion.div>
              ) : cart.length === 0 ? (
                // Empty State
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center text-coffee-700 mx-auto">
                    <Coffee className="w-8 h-8 opacity-60" />
                  </div>
                  <div>
                    <h4 className="font-headings font-bold text-base text-coffee-950">سبد خرید شما خالی است</h4>
                    <p className="text-xs text-coffee-600 max-w-xs mx-auto mt-2">
                      از منوی متنوع ما، برای سفارش قهوه اصیل پخت‌روز یا کیک‌های تازه، مواردی را انتخاب کنید!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-coffee-700 hover:bg-coffee-800 text-cream-50 px-5 py-2.5 rounded-xl font-headings text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
                  >
                    مشاهده منوی کافه
                  </button>
                </div>
              ) : (
                // Items Tray List & Customization
                <div className="space-y-5">
                  <div className="flex justify-between items-center text-xs font-semibold text-coffee-600 uppercase tracking-widest border-b border-cream-850 pb-2">
                    <span>محصولات در سبد خرید</span>
                    <button onClick={onClearCart} className="text-red-600 hover:text-red-700 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <Trash2 className="w-3.5 h-3.5" /> حذف کل سبد
                    </button>
                  </div>

                  <div className="divide-y divide-cream-850">
                    {cart.map((item, idx) => {
                      const computedSinglePrice = item.menuItem.price + 
                        (item.selectedSize === 'medium' ? 0.50 : item.selectedSize === 'large' ? 0.90 : 0) +
                        (item.selectedMilk && item.selectedMilk !== 'None' && item.selectedMilk !== 'Whole Milk' ? 0.60 : 0);

                      return (
                        <div key={idx} className="flex gap-3 py-4 first:pt-0 group">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-xl object-cover bg-cream-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h5 className="font-headings font-bold text-coffee-950 text-sm truncate pr-1">
                                {item.menuItem.name}
                              </h5>
                              <span className="font-mono text-sm font-bold text-coffee-950 shrink-0">
                                ${(computedSinglePrice * item.quantity).toFixed(2)}
                              </span>
                            </div>

                            <p className="text-[10px] text-coffee-500 font-semibold mt-1">
                              اندازه: {translateSize(item.selectedSize)} {item.selectedMilk && item.selectedMilk !== 'None' ? `• شیر: ${translateMilk(item.selectedMilk)}` : ''} {item.sweetnessLevel && item.sweetnessLevel !== 'Regular' ? `• شیرینی: ${translateSweetness(item.sweetnessLevel)}` : ''}
                            </p>

                            {item.specialNotes && (
                              <p className="text-[10px] italic text-coffee-500 truncate mt-1 bg-cream-150/50 rounded px-1.5 py-0.5 inline-block max-w-[200px]">
                                «{item.specialNotes}»
                              </p>
                            )}

                            {/* Quantity Trigger */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-1.5 bg-cream-100 rounded-lg p-1 border border-cream-900 border-opacity-10">
                                <button
                                  onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                                  className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-cream-50 text-coffee-700 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-5 text-center text-xs font-bold font-mono text-coffee-950">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                  className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-cream-50 text-coffee-700 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(idx)}
                                className="text-xs text-coffee-400 hover:text-red-500 p-1 rounded-lg transition-colors"
                              >
                                حذف آیتم
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Ordering & Timing info */}
                  <div className="p-3 bg-cream-650 rounded-xl flex items-center gap-2.5 text-coffee-800">
                    <Clock className="w-4 h-4 text-sky-primary flex-shrink-0" />
                    <div className="text-xs">
                      <span className="font-semibold block text-coffee-950">تحویل در بوفه حدود ۱۲ دقیقه</span>
                      <span>سفارش شما در بوفه اکسپرس ولیعصر آماده می‌شود.</span>
                    </div>
                  </div>

                  {/* Customer Checkout Form */}
                  <form onSubmit={handleCheckout} className="pt-4 border-t border-cream-850 space-y-3">
                    <div className="text-xs font-semibold text-coffee-600 uppercase tracking-widest">جزئیات تحویل گیرنده</div>
                    <div className="space-y-2">
                      <label htmlFor="checkout-name" className="block text-xs font-semibold text-coffee-700">نام و نام خانوادگی شما *</label>
                      <input
                        id="checkout-name"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="مثلاً مریم کریمی"
                        className="w-full bg-white border border-cream-900 border-opacity-25 rounded-xl px-3 py-2 text-sm text-coffee-950 placeholder-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-700 focus:border-coffee-700 text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="checkout-notes" className="block text-xs font-semibold text-coffee-700">یادداشت باریستا</label>
                      <input
                        id="checkout-notes"
                        type="text"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="مثلاً: خامه روی لاته نریزید، بدون نی، داغ‌تر باشد..."
                        className="w-full bg-white border border-cream-900 border-opacity-25 rounded-xl px-3 py-2 text-sm text-coffee-950 placeholder-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-700 focus:border-coffee-700 text-right"
                      />
                    </div>

                    {/* Summary Math */}
                    <div className="pt-4 border-t border-dashed border-cream-850 space-y-2 text-xs font-medium text-coffee-700">
                      <div className="flex justify-between">
                        <span>جمع کل اقلام</span>
                        <span className="font-mono text-coffee-950">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>مالیات و عوارض محلی (۹٪)</span>
                        <span className="font-mono text-coffee-950">${totalTax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold text-coffee-950 pt-1 border-t border-cream-850">
                        <span className="font-headings">مبلغ خالص نهایی</span>
                        <span className="font-mono font-bold text-lg text-coffee-950">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Submit checkout CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !customerName.trim()}
                      className={`w-full font-headings font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 select-none text-xs cursor-pointer ${
                        customerName.trim() 
                          ? 'bg-coffee-700 text-cream-50 hover:bg-coffee-800 active:scale-[0.98]' 
                          : 'bg-cream-400 text-coffee-500 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-cream-50 border-t-transparent rounded-full animate-spin"></div>
                          در حال صدور رسید...
                        </>
                      ) : (
                        <>
                          <Ticket className="w-4 h-4 text-cream-100" />
                          تایید سفارش نهایی • ${grandTotal.toFixed(2)}
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-coffee-500">
                      پرداخت نهایی پس از ارایه رسید دیجیتالی سفارش در بوفه کافه انجام می‌شود.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
