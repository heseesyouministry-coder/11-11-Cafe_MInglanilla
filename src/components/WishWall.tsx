import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Flame, Send, Star, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WishItem } from '../types';
import { INITIAL_WISHES } from '../data/menuData';

export const WishWall: React.FC = () => {
  const [wishes, setWishes] = useState<WishItem[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState<WishItem['category']>('Studies');
  const [hasWished, setHasWished] = useState(false);
  const [candlesLit, setCandlesLit] = useState(1111);

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      name: name.trim() || 'Anonymous Dreamer',
      text: text.trim(),
      timestamp: '11:11 Just now',
      category,
      likes: 1,
    };

    setWishes([newWish, ...wishes]);
    setText('');
    setName('');
    setHasWished(true);
    setCandlesLit((prev) => prev + 1);

    // Fire golden starburst confetti
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C9A227', '#F5EFE6', '#D9A79C', '#3B2A20'],
      });
    } catch (err) {
      // fallback
    }

    setTimeout(() => setHasWished(false), 5000);
  };

  const handleLike = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  return (
    <section id="wish-wall" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#C9A227]/30">
          <Clock size={13} className="text-[#C9A227]" />
          <span>The 11:11 Ritual</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2D1F17] tracking-tight mb-4">
          Make a Wish. Leave a Mark.
        </h2>
        <p className="text-[#5C4433] text-base sm:text-lg leading-relaxed">
          Tradition says when you look at the clock and see 11:11, you make a wish.
          Here in Minglanilla, write what your heart is hoping for.
        </p>

        <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-[#3B2A20]/10 shadow-sm text-sm text-[#2D1F17]">
          <Flame size={18} className="text-[#E67E22] fill-[#E67E22] animate-pulse" />
          <span>
            <strong className="font-bold text-[#C9A227]">{candlesLit}</strong> wishes glowing together
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Wish Composer Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-[#3B2A20]/10 shadow-xl shadow-[#3B2A20]/5 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="font-heading text-xl font-bold text-[#2D1F17] mb-2 flex items-center gap-2">
            <Sparkles size={20} className="text-[#C9A227]" />
            Cast Your 11:11 Wish
          </h3>
          <p className="text-xs text-[#5C4433]/80 mb-5">
            Your wish will be pinned to the Minglanilla cafe board.
          </p>

          <form onSubmit={handleSubmitWish} className="space-y-4">
            <div>
              <label htmlFor="wish-category-select" className="block text-xs font-semibold text-[#2D1F17] uppercase tracking-wider mb-2">
                Wish Intention
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {(['Studies', 'Career', 'Love', 'Peace', 'Creativity'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    id={`wish-cat-${cat.toLowerCase()}`}
                    onClick={() => setCategory(cat)}
                    className={`py-1.5 px-2 text-xs rounded-xl font-medium transition-all text-center ${
                      category === cat
                        ? 'bg-[#2D1F17] text-[#F5EFE6] shadow-sm'
                        : 'bg-[#F5EFE6]/80 text-[#5C4433] hover:bg-[#F5EFE6]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="wish-name-input" className="block text-xs font-semibold text-[#2D1F17] uppercase tracking-wider mb-1">
                Your Name / Initial (Optional)
              </label>
              <input
                id="wish-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aly, Table 3 Dreamer"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6]/60 border border-[#3B2A20]/15 text-sm text-[#2D1F17] placeholder:text-[#5C4433]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all"
              />
            </div>

            <div>
              <label htmlFor="wish-text-input" className="block text-xs font-semibold text-[#2D1F17] uppercase tracking-wider mb-1">
                Your Wish
              </label>
              <textarea
                id="wish-text-input"
                rows={3}
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What are you manifesting over coffee today?..."
                className="w-full px-4 py-3 rounded-xl bg-[#F5EFE6]/60 border border-[#3B2A20]/15 text-sm text-[#2D1F17] placeholder:text-[#5C4433]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all resize-none"
              />
            </div>

            <button
              id="submit-wish-btn"
              type="submit"
              className="w-full py-3 px-6 rounded-2xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2D1F17]/20 transition-all active:scale-[0.99]"
            >
              <Sparkles size={16} className="text-[#C9A227]" />
              <span>Send Wish to Board</span>
              <Send size={15} />
            </button>
          </form>

          <AnimatePresence>
            {hasWished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-4 p-3 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#786017] text-xs font-medium flex items-center gap-2 text-center justify-center"
              >
                <Star size={15} className="fill-[#C9A227] text-[#C9A227]" />
                <span>Your wish has been lit on the 11:11 cafe wall! ✨</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Live Wish Stream Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C4433]">
              Recent Minglanilla Wishes
            </span>
            <span className="text-xs text-[#5C4433]/70">Tap ❤️ to send good vibes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
            {wishes.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-white/75 backdrop-blur-md border border-[#3B2A20]/10 hover:border-[#C9A227]/50 shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F5EFE6] text-[#786017] border border-[#C9A227]/20">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-[#5C4433]/60">{item.timestamp}</span>
                  </div>
                  <p className="text-sm text-[#2D1F17] font-medium leading-relaxed font-body italic mb-3">
                    "{item.text}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#3B2A20]/5 mt-auto">
                  <span className="text-xs font-script font-bold text-[#3B2A20]">
                    — {item.name}
                  </span>
                  <button
                    id={`like-wish-${item.id}`}
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-1.5 text-xs text-[#5C4433]/80 hover:text-[#D9A79C] transition-colors"
                  >
                    <Heart size={14} className="group-hover:scale-110 transition-transform fill-[#D9A79C]/20 text-[#D9A79C]" />
                    <span>{item.likes}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
