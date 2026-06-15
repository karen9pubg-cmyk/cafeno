/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import AboutUs from './components/AboutUs';
import SpecialOffers from './components/SpecialOffers';
import MenuSection from './components/MenuSection';
import Testimonials from './components/Testimonials';
import GallerySection from './components/GallerySection';
import CommunitySection from './components/CommunitySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import OrderDrawer from './components/OrderDrawer';
import CustomizeModal from './components/CustomizeModal';
import { CartItem, MenuItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForCustomization, setSelectedProductForCustomization] = useState<MenuItem | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem('cafeno_cart');
      if (cached) {
        setCart(JSON.parse(cached));
      }
    } catch (e) {
      console.warn('Failed to restore tray state:', e);
    }
  }, []);

  // Sync cart with localStorage when modified
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('cafeno_cart', JSON.stringify(newCart));
    } catch (e) {
      console.warn('Failed to cache tray state:', e);
    }
  };

  const handleAddToCart = (
    item: MenuItem,
    size: 'small' | 'medium' | 'large',
    milk: string,
    sweetness: string,
    notes: string,
    quantity: number
  ) => {
    // Check if duplicate item exists (with identical options)
    const duplicateIndex = cart.findIndex(
      (cartItem) =>
        cartItem.menuItem.id === item.id &&
        cartItem.selectedSize === size &&
        cartItem.selectedMilk === milk &&
        cartItem.sweetnessLevel === sweetness
    );

    if (duplicateIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[duplicateIndex].quantity += quantity;
      // Append notes if separate
      if (notes && updatedCart[duplicateIndex].specialNotes !== notes) {
        updatedCart[duplicateIndex].specialNotes += ` | ${notes}`;
      }
      saveCart(updatedCart);
    } else {
      const newCartItem: CartItem = {
        menuItem: item,
        quantity,
        selectedSize: size,
        selectedMilk: milk,
        sweetnessLevel: sweetness,
        specialNotes: notes
      };
      saveCart([...cart, newCartItem]);
    }

    // Automatically slide open the tray drawer for physical response!
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (idx: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(idx);
    } else {
      const updated = [...cart];
      updated[idx].quantity = newQty;
      saveCart(updated);
    }
  };

  const handleRemoveItem = (idx: number) => {
    const updated = cart.filter((_, i) => i !== idx);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const scrollSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div dir="rtl" className="bg-cream-50 min-h-screen text-coffee-900 overflow-x-hidden antialiased">
      {/* Navbar header */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Blocks */}
      <main>
        {/* 1. Hero Landing Block */}
        <Hero onOpenCart={() => setIsCartOpen(true)} />

        {/* 2. Featured Best Sellers Grid */}
        <FeaturedProducts onSelectProduct={setSelectedProductForCustomization} />

        {/* 3. Special Seasonal Items & Vouchers */}
        <SpecialOffers onBrowseMenu={() => scrollSection('menu')} />

        {/* 4. Full interactive slowfood Menu Board Catalog */}
        <MenuSection onSelectProduct={setSelectedProductForCustomization} />

        {/* 5. Live Community Workshops Calendars */}
        <CommunitySection />

        {/* 6. Brand Story & Barista Craft block */}
        <AboutUs />

        {/* 7. Atmosphere Lightbox Photo Gallery */}
        <GallerySection />

        {/* 8. Yelp Testimonials Grid */}
        <Testimonials />

        {/* 9. Business Information & Messaging Contact Form */}
        <ContactSection />
      </main>

      {/* Footer copyright and Roastery email list */}
      <Footer />

      {/* Sidebar Tray Checkout Drawer Panel */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product customization overlay modal */}
      <CustomizeModal
        menuItem={selectedProductForCustomization}
        isOpen={selectedProductForCustomization !== null}
        onClose={() => setSelectedProductForCustomization(null)}
        onAdd={handleAddToCart}
      />
    </div>
  );
}
