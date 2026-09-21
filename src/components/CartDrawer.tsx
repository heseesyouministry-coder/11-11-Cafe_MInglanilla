import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, Check, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway'>('Dine-in');
  const [tableNumber, setTableNumber] = useState('Table 11');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    let itemPrice = item.item.price;
    if (item.milkChoice.includes('+₱25')) itemPrice += 25;
    if (item.milkChoice.includes('+₱20')) itemPrice += 20;
    return sum + itemPrice * item.quantity;
  }, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#C9A227', '#F5EFE6', '#2D1F17'],
      });
    } catch (err) {
      // fallback
    }

    setTimeout(() => {
      onClearCart();
      setOrderSubmitted(false);
      onClose();
    }, 3500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2D1F17]/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#F5EFE6] text-[#2D1F17] shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#3B2A20]/10 flex items-center justify-between bg-white/60 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#2D1F17] text-[#C9A227] flex items-center justify-center font-bold">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#2D1F17]">Your Cafe Tray</h3>
                  <p className="text-xs text-[#5C4433]/70">{cart.length} item types selected</p>
                </div>
              </div>
              <button
                id="close-cart-drawer-btn"
                onClick={onClose}
                className="p-2 rounded-xl text-[#5C4433] hover:bg-[#3B2A20]/10 transition-colors"
                aria-label="Close cart tray"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            {orderSubmitted ? (
              <div className="p-8 my-auto text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C9A227]/20 border border-[#C9A227] text-[#2D1F17] mx-auto flex items-center justify-center">
                  <Check size={32} className="text-[#786017]" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#2D1F17]">Order Sent to Barista!</h3>
                <p className="text-sm text-[#5C4433] leading-relaxed">
                  Your artisanal order for <strong className="text-[#2D1F17]">{orderType} ({tableNumber})</strong> is being freshly crafted. Please relax and enjoy the 11:11 vibe!
                </p>
                <div className="p-3 rounded-2xl bg-white/70 border border-[#3B2A20]/10 text-xs font-semibold text-[#786017]">
                  Estimated preparation time: ~6–8 mins ☕
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="p-8 my-auto text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3B2A20]/5 text-[#5C4433]/40 mx-auto flex items-center justify-center">
                  <ShoppingBag size={30} />
                </div>
                <h4 className="font-heading font-bold text-base text-[#2D1F17]">Your tray is currently empty</h4>
                <p className="text-xs text-[#5C4433]">
                  Browse our handcrafted espresso, matcha clouds, and savory bites to add items to your table.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#2D1F17] text-[#F5EFE6] font-bold text-xs shadow-md"
                >
                  Explore Offerings
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map((cartItem, idx) => {
                    let singlePrice = cartItem.item.price;
                    if (cartItem.milkChoice.includes('+₱25')) singlePrice += 25;
                    if (cartItem.milkChoice.includes('+₱20')) singlePrice += 20;

                    return (
                      <div
                        key={`${cartItem.item.id}-${idx}`}
                        className="p-4 rounded-2xl bg-white/85 border border-[#3B2A20]/10 shadow-sm flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-[#3B2A20]/10">
                            <img
                              src={cartItem.item.image}
                              alt={cartItem.item.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-heading font-bold text-sm text-[#2D1F17] truncate">
                                {cartItem.item.name}
                              </h4>
                              <span className="font-heading font-extrabold text-sm text-[#2D1F17] shrink-0">
                                ₱{singlePrice * cartItem.quantity}
                              </span>
                            </div>
                            <p className="text-xs text-[#5C4433]/80 mt-0.5">
                              {cartItem.temperature} • {cartItem.sweetness} Sweet
                            </p>
                            <p className="text-[11px] text-[#786017] font-medium">
                              {cartItem.milkChoice}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#3B2A20]/5 mt-2">
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-xs text-rose-600/80 hover:text-rose-700 flex items-center gap-1"
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>

                          <div className="flex items-center gap-2 bg-[#F5EFE6] px-2 py-1 rounded-xl border border-[#3B2A20]/10">
                            <button
                              onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                              className="p-0.5 hover:text-[#2D1F17]"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-bold text-xs text-[#2D1F17] px-1">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                              className="p-0.5 hover:text-[#2D1F17]"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Controls & Order Form */}
                <div className="p-6 bg-white/90 border-t border-[#3B2A20]/10 space-y-4">
                  {/* Order Type Selector */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('Dine-in')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        orderType === 'Dine-in'
                          ? 'bg-[#2D1F17] text-[#F5EFE6]'
                          : 'bg-[#F5EFE6] text-[#5C4433]'
                      }`}
                    >
                      🍽️ Dine-in
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('Takeaway')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        orderType === 'Takeaway'
                          ? 'bg-[#2D1F17] text-[#F5EFE6]'
                          : 'bg-[#F5EFE6] text-[#5C4433]'
                      }`}
                    >
                      🛍️ Takeaway Cup
                    </button>
                  </div>

                  {orderType === 'Dine-in' && (
                    <div>
                      <label className="block text-xs font-bold text-[#2D1F17] mb-1">
                        Table or Study Corner
                      </label>
                      <select
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F5EFE6] border border-[#3B2A20]/15 text-xs font-semibold text-[#2D1F17] focus:outline-none"
                      >
                        <option value="Table 11 (Corner Study Nook)">Table 11 (Corner Study Nook)</option>
                        <option value="Table 4 (Window Sofa)">Table 4 (Window Sofa)</option>
                        <option value="Table 7 (Espresso Bar Seat)">Table 7 (Espresso Bar Seat)</option>
                        <option value="Table 2 (Garden Terrace)">Table 2 (Garden Terrace)</option>
                        <option value="Ordering at Front Counter">Ordering at Front Counter</option>
                      </select>
                    </div>
                  )}

                  {/* Subtotal summary */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-semibold text-[#5C4433]">Total Amount</span>
                    <span className="text-2xl font-heading font-extrabold text-[#2D1F17]">
                      ₱{subtotal}
                    </span>
                  </div>

                  {/* Submit button */}
                  <button
                    id="cart-checkout-btn"
                    onClick={handleCheckout}
                    className="w-full py-4 px-6 rounded-2xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#2D1F17]/20 transition-all active:scale-[0.99]"
                  >
                    <Sparkles size={16} className="text-[#C9A227]" />
                    <span>Send Order to Barista (₱{subtotal})</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
