import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Wifi, Sparkles, Moon, Heart, BookOpen } from 'lucide-react';

export const StorySection: React.FC = () => {
  const pillars = [
    {
      icon: Coffee,
      title: 'Artisan Espresso Roasts',
      description: 'Single-origin & calibrated house blends with rich crema, pulled on top-tier commercial machinery with fresh milk microfoam.',
    },
    {
      icon: Wifi,
      title: 'Study & Work Sanctuary',
      description: 'Outlets at almost every table, blazing fast 300 Mbps fiber connectivity, and cozy acoustic lighting for students & creatives.',
    },
    {
      icon: Moon,
      title: 'Late Night Openings',
      description: 'Open until 1:00 AM daily. Whether cramming for finals, drafting code, or catching up on deep conversations over hot cocoa.',
    },
    {
      icon: Heart,
      title: 'The 11:11 Angel Meaning',
      description: 'A reminder to pause, look up from your screen, smile at the barista, and make a conscious wish for where you are going.',
    },
  ];

  return (
    <section id="story" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold tracking-wider uppercase border border-[#C9A227]/30">
            <BookOpen size={13} className="text-[#C9A227]" />
            <span>Our Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2D1F17] tracking-tight leading-tight">
            Where Minglanilla comes to slow down.
          </h2>

          <p className="text-[#5C4433] text-base sm:text-lg leading-relaxed">
            11:11 Cafe was born from a simple conviction: life moves too fast, and everyone deserves a calm corner where time stands still just long enough for good coffee, honest thoughts, and gentle inspiration.
          </p>

          <p className="text-[#5C4433] text-base leading-relaxed">
            Whether you’re halfway through a thesis chapter, sharing laughter over loaded nachos, or waiting for the clock to strike 11:11, you have a table waiting for you here in Sangi, Minglanilla.
          </p>

          {/* Quote Card */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-[#3B2A20]/10 shadow-sm relative">
            <p className="font-script text-2xl sm:text-3xl text-[#2D1F17] leading-relaxed mb-2">
              "Coffee is a hug in a mug, and 11:11 is the universe whispering that your dream is on its way."
            </p>
            <span className="text-xs font-heading font-semibold uppercase tracking-widest text-[#786017]">
              — Barista Notes, Minglanilla Corner
            </span>
          </div>
        </motion.div>

        {/* Right Feature Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#3B2A20]/10 hover:border-[#C9A227]/50 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#2D1F17] group-hover:bg-[#2D1F17] group-hover:text-[#C9A227] flex items-center justify-center mb-4 transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#2D1F17] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C4433] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
