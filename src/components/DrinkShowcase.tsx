import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Plus, Check, Thermometer, Flame, Snowflake, Coffee } from 'lucide-react';
import { MenuItem, Drink3DConfig, CartItem } from '../types';
import { ThreeCanvas } from './ThreeCanvas';

interface DrinkShowcaseProps {
  items: MenuItem[];
  onAddToCart: (item: CartItem) => void;
}

export const DrinkShowcase: React.FC<DrinkShowcaseProps> = ({ items, onAddToCart }) => {
  const drinkItems = items.filter((i) => i.category !== 'savory' && i.category !== 'pastries');
  const [selectedItem, setSelectedItem] = useState<MenuItem>(drinkItems[0]);
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>(
    selectedItem.temperature ? selectedItem.temperature[0] : 'Hot'
  );
  const [sweetness, setSweetness] = useState<CartItem['sweetness']>('50%');
  const [milkChoice, setMilkChoice] = useState<CartItem['milkChoice']>('Whole Milk');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Compute live 3D configuration based on custom options
  const computedConfig: Drink3DConfig = {
    ...selectedItem.config3D,
    hasIce: temperature === 'Iced',
    hasSteam: temperature === 'Hot',
  };

  const handleSelectDrink = (item: MenuItem) => {
    setSelectedItem(item);
    if (item.temperature && item.temperature.length > 0) {
      setTemperature(item.temperature[0]);
    }
  };

  const handleAdd = () => {
    onAddToCart({
      item: selectedItem,
      quantity: 1,
      temperature,
      sweetness,
      milkChoice,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <section id="drink-bar" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#C9A227]/30">
          <Coffee size={13} className="text-[#C9A227]" />
          <span>Interactive 3D Bar</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2D1F17] tracking-tight mb-4">
          Craft Your Signature Cup in 3D
        </h2>
        <p className="text-[#5C4433] text-base sm:text-lg">
          Select any artisan brew to explore its 360° geometry, customized foam art, steam, and flavor notes.
        </p>
      </div>

      {/* Main 3D Stage Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/70 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-[#3B2A20]/10 shadow-2xl shadow-[#3B2A20]/5 items-center">
        {/* Left Column: 3D Canvas Stage */}
        <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] w-full bg-radial from-[#FAF6EE] to-[#EFE7D8]/50 rounded-2xl overflow-hidden border border-[#3B2A20]/5 flex items-center justify-center">
          <ThreeCanvas activeConfig={computedConfig} drinkName={selectedItem.name} />

          {/* Floating Live Badge */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-[#3B2A20]/10 text-xs font-semibold text-[#2D1F17] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7D8D70]" />
            <span>{temperature} • {sweetness} Sweet</span>
          </div>

          <div className="absolute bottom-4 left-4 z-10 text-xs text-[#5C4433]/70 font-medium">
            ✦ Procedural 3D WebGL Shader
          </div>
        </div>

        {/* Right Column: Customizer & Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C9A227]/15 text-[#786017]">
                {selectedItem.tag || 'Specialty Roast'}
              </span>
              <span className="text-2xl font-heading font-extrabold text-[#2D1F17]">
                ₱{selectedItem.price}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#2D1F17] mb-2">
              {selectedItem.name}
            </h3>

            <p className="text-sm text-[#5C4433] leading-relaxed mb-4">
              {selectedItem.description}
            </p>

            {/* Tasting Notes */}
            {selectedItem.tastingNotes && (
              <div className="mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C4433]/80 block mb-2">
                  Tasting Profile
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="px-2.5 py-1 rounded-lg bg-[#F5EFE6] text-xs font-medium text-[#2D1F17] border border-[#3B2A20]/10"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Options */}
            <div className="space-y-4 pt-4 border-t border-[#3B2A20]/10">
              {/* Temperature Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D1F17] mb-2 flex items-center gap-1.5">
                  <Thermometer size={14} className="text-[#C9A227]" />
                  Temperature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="temp-hot-btn"
                    type="button"
                    onClick={() => setTemperature('Hot')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      temperature === 'Hot'
                        ? 'bg-[#2D1F17] text-[#F5EFE6] shadow-md'
                        : 'bg-[#F5EFE6] text-[#5C4433] hover:bg-[#F0E6D8]'
                    }`}
                  >
                    <Flame size={14} className="text-[#E67E22]" />
                    <span>Hot & Steamed</span>
                  </button>

                  <button
                    id="temp-iced-btn"
                    type="button"
                    onClick={() => setTemperature('Iced')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      temperature === 'Iced'
                        ? 'bg-[#2D1F17] text-[#F5EFE6] shadow-md'
                        : 'bg-[#F5EFE6] text-[#5C4433] hover:bg-[#F0E6D8]'
                    }`}
                  >
                    <Snowflake size={14} className="text-sky-500" />
                    <span>Iced & Refreshing</span>
                  </button>
                </div>
              </div>

              {/* Sweetness Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#2D1F17] mb-1.5">
                  <span>Sweetness Level</span>
                  <span className="text-[#C9A227]">{sweetness}</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {(['0%', '25%', '50%', '75%', '100%'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      id={`sweetness-${lvl}`}
                      type="button"
                      onClick={() => setSweetness(lvl)}
                      className={`py-1.5 text-xs rounded-lg font-medium transition-all ${
                        sweetness === lvl
                          ? 'bg-[#C9A227] text-[#2D1F17] font-bold'
                          : 'bg-[#F5EFE6] text-[#5C4433] hover:bg-[#EBE2D4]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Alternative */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D1F17] mb-1.5">
                  Milk Base
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {(['Whole Milk', 'Oat Milk (+₱25)', 'Almond Milk (+₱25)', 'Soy Milk (+₱20)'] as const).map(
                    (m) => (
                      <button
                        key={m}
                        id={`milk-${m.replace(/\s+/g, '-').toLowerCase()}`}
                        type="button"
                        onClick={() => setMilkChoice(m)}
                        className={`p-2 rounded-xl text-left truncate transition-all ${
                          milkChoice === m
                            ? 'bg-[#2D1F17] text-[#F5EFE6] font-semibold'
                            : 'bg-[#F5EFE6] text-[#5C4433] hover:bg-[#EBE2D4]'
                        }`}
                      >
                        {m}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Add to Order Button */}
          <button
            id="add-custom-drink-btn"
            onClick={handleAdd}
            className="w-full py-4 px-6 rounded-2xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#2D1F17]/25 transition-all active:scale-[0.99]"
          >
            {addedAnimation ? (
              <>
                <Check size={18} className="text-[#C9A227]" />
                <span>Added to Order Tray!</span>
              </>
            ) : (
              <>
                <Plus size={18} className="text-[#C9A227]" />
                <span>Add Custom Cup to Tray • ₱{selectedItem.price}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Drink Thumbnail Carousel Carousel */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5C4433]">
            Explore Drink Profiles in 3D
          </span>
          <span className="text-xs text-[#5C4433]/70">Click to preview in cup</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {drinkItems.slice(0, 6).map((drink) => {
            const isCurrent = drink.id === selectedItem.id;
            return (
              <button
                key={drink.id}
                id={`thumb-drink-${drink.id}`}
                onClick={() => handleSelectDrink(drink)}
                className={`p-2.5 rounded-2xl text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
                  isCurrent
                    ? 'bg-[#2D1F17] text-[#F5EFE6] shadow-lg ring-2 ring-[#C9A227]'
                    : 'bg-white/90 text-[#2D1F17] hover:bg-white border border-[#3B2A20]/10 hover:shadow-md'
                }`}
              >
                <div className="relative h-20 w-full rounded-xl overflow-hidden mb-2 bg-stone-200">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full border border-white/60 shadow-sm"
                    style={{ backgroundColor: drink.config3D.liquidColor }}
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs line-clamp-1 mb-0.5">
                    {drink.name}
                  </h4>
                  <span className={`text-[11px] ${isCurrent ? 'text-[#C9A227]' : 'text-[#786017]'} font-bold`}>
                    ₱{drink.price}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
