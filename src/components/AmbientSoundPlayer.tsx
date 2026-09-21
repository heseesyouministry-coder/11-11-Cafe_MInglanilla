import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, CloudRain, Coffee, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AmbientSoundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [activeSound, setActiveSound] = useState<'rain' | 'steam' | 'vinyl' | 'chime'>('steam');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const currentNodesRef = useRef<any[]>([]);

  const stopCurrentSound = () => {
    currentNodesRef.current.forEach((node) => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // ignore
      }
    });
    currentNodesRef.current = [];
  };

  const startSound = (soundType: 'rain' | 'steam' | 'vinyl' | 'chime') => {
    stopCurrentSound();

    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.connect(ctx.destination);
    }
    gainNodeRef.current.gain.setValueAtTime(volume, ctx.currentTime);

    const masterGain = gainNodeRef.current;

    if (soundType === 'steam') {
      // White noise with bandpass to simulate espresso machine steam hiss
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1800, ctx.currentTime);
      bandpass.Q.setValueAtTime(1.8, ctx.currentTime);

      const localGain = ctx.createGain();
      localGain.gain.setValueAtTime(0.35, ctx.currentTime);

      whiteNoise.connect(bandpass);
      bandpass.connect(localGain);
      localGain.connect(masterGain);

      whiteNoise.start();
      currentNodesRef.current = [whiteNoise, bandpass, localGain];
    } else if (soundType === 'rain') {
      // Gentle rain noise
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const pinkNoise = ctx.createBufferSource();
      pinkNoise.buffer = buffer;
      pinkNoise.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(900, ctx.currentTime);

      pinkNoise.connect(lowpass);
      lowpass.connect(masterGain);
      pinkNoise.start();
      currentNodesRef.current = [pinkNoise, lowpass];
    } else if (soundType === 'vinyl') {
      // Vinyl warmth crackle
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(60, ctx.currentTime); // warm low hum

      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.5, ctx.currentTime);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(15, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start();
      lfo.start();
      currentNodesRef.current = [osc, lfo, lfoGain, oscGain];
    } else if (soundType === 'chime') {
      // Harmonic cafe chime
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);

      const chimeGain = ctx.createGain();
      chimeGain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc.connect(chimeGain);
      chimeGain.connect(masterGain);
      osc.start();

      // Slow gentle frequency sweep for soothing ambiance
      osc.frequency.setTargetAtTime(554.37, ctx.currentTime + 1, 1.5);
      currentNodesRef.current = [osc, chimeGain];
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopCurrentSound();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startSound(activeSound);
    }
  };

  const changeSound = (sound: 'rain' | 'steam' | 'vinyl' | 'chime') => {
    setActiveSound(sound);
    if (isPlaying) {
      startSound(sound);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopCurrentSound();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="relative">
      <button
        id="ambient-sound-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D1F17]/80 hover:bg-[#2D1F17] text-[#F5EFE6] text-xs transition-all border border-white/10 shadow-md backdrop-blur-md"
        title="Cafe Soundscape Ambiance"
      >
        {isPlaying ? (
          <>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A227] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A227]"></span>
            </span>
            <Volume2 size={14} className="text-[#C9A227]" />
            <span className="hidden sm:inline font-medium capitalize">Ambiance: {activeSound}</span>
          </>
        ) : (
          <>
            <VolumeX size={14} className="text-stone-400" />
            <span className="hidden sm:inline font-medium">Cafe Sound</span>
          </>
        )}
      </button>

      {/* Floating Sound Panel Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-64 p-4 rounded-2xl bg-[#2D1F17] text-[#F5EFE6] shadow-2xl border border-stone-700/60 z-50 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#C9A227]" />
                <span className="font-heading font-semibold text-sm">Cafe Atmosphere</span>
              </div>
              <button
                id="ambient-sound-power-btn"
                onClick={togglePlay}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  isPlaying ? 'bg-[#C9A227] text-[#2D1F17]' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {isPlaying ? 'Playing' : 'Start'}
              </button>
            </div>

            <p className="text-xs text-stone-300/80 mb-3">
              Soothing acoustic sound generator for focused studying & cozy pause.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                id="sound-type-steam"
                onClick={() => changeSound('steam')}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs transition-all ${
                  activeSound === 'steam' ? 'bg-[#C9A227]/20 border border-[#C9A227] text-white' : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Coffee size={14} className={activeSound === 'steam' ? 'text-[#C9A227]' : 'text-stone-400'} />
                <span>Espresso Steam</span>
              </button>

              <button
                id="sound-type-rain"
                onClick={() => changeSound('rain')}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs transition-all ${
                  activeSound === 'rain' ? 'bg-[#C9A227]/20 border border-[#C9A227] text-white' : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <CloudRain size={14} className={activeSound === 'rain' ? 'text-[#C9A227]' : 'text-stone-400'} />
                <span>Gentle Rain</span>
              </button>

              <button
                id="sound-type-vinyl"
                onClick={() => changeSound('vinyl')}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs transition-all ${
                  activeSound === 'vinyl' ? 'bg-[#C9A227]/20 border border-[#C9A227] text-white' : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Disc size={14} className={activeSound === 'vinyl' ? 'text-[#C9A227]' : 'text-stone-400'} />
                <span>Vinyl Warmth</span>
              </button>

              <button
                id="sound-type-chime"
                onClick={() => changeSound('chime')}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs transition-all ${
                  activeSound === 'chime' ? 'bg-[#C9A227]/20 border border-[#C9A227] text-white' : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Sparkles size={14} className={activeSound === 'chime' ? 'text-[#C9A227]' : 'text-stone-400'} />
                <span>Zen Chimes</span>
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                id="ambient-volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
