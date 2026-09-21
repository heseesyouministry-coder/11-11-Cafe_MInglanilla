import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Check, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReservationDetails } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-08-18');
  const [time, setTime] = useState('11:11 AM');
  const [partySize, setPartySize] = useState(2);
  const [tableType, setTableType] = useState<ReservationDetails['tableType']>('Quiet Study Nook');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#C9A227', '#F5EFE6', '#2D1F17'],
      });
    } catch (err) {
      // fallback
    }

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2D1F17]/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#F5EFE6] text-[#2D1F17] rounded-3xl shadow-2xl p-6 sm:p-8 border border-[#3B2A20]/15 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              id="close-reservation-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#5C4433] hover:bg-[#3B2A20]/10 transition-colors"
              aria-label="Close reservation"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C9A227]/20 border border-[#C9A227] text-[#2D1F17] mx-auto flex items-center justify-center">
                  <Check size={32} className="text-[#786017]" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#2D1F17]">Table Confirmed!</h3>
                <p className="text-sm text-[#5C4433] leading-relaxed">
                  Thank you, <strong className="text-[#2D1F17]">{guestName || 'Guest'}</strong>. We have reserved your{' '}
                  <strong className="text-[#2D1F17]">{tableType}</strong> for {partySize} on{' '}
                  {date} at {time}.
                </p>
                <div className="p-3 rounded-2xl bg-white/80 border border-[#3B2A20]/10 text-xs font-semibold text-[#786017]">
                  Confirmation message logged for 11:11 Cafe Minglanilla. See you soon! ✨
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-bold uppercase tracking-wider mb-2 border border-[#C9A227]/30">
                    <Calendar size={13} />
                    <span>Table Reservation</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#2D1F17]">
                    Reserve Your Minglanilla Table
                  </h3>
                  <p className="text-xs text-[#5C4433]">
                    Guaranteed seating, dedicated power outlets, and fiber WiFi for your study or catch-up.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label htmlFor="res-name" className="block font-bold uppercase tracking-wider text-[#2D1F17] mb-1">
                      Full Name
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Clint Aldwin"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#3B2A20]/15 text-sm text-[#2D1F17] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="res-phone" className="block font-bold uppercase tracking-wider text-[#2D1F17] mb-1">
                        Phone Number
                      </label>
                      <input
                        id="res-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0917 123 4567"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#3B2A20]/15 text-sm text-[#2D1F17] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                      />
                    </div>

                    <div>
                      <label htmlFor="res-email" className="block font-bold uppercase tracking-wider text-[#2D1F17] mb-1">
                        Email
                      </label>
                      <input
                        id="res-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@email.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#3B2A20]/15 text-sm text-[#2D1F17] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label htmlFor="res-date" className="block font-bold uppercase tracking-wider text-[#2D1F17] mb-1">
                        Date
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#3B2A20]/15 text-xs text-[#2D1F17]"
                      />
                    </div>

                    <div>
                      <label htmlFor="res-time" className="block font-bold uppercase tracking-wider text-[#2D1F17] mb-1">
                        Time
                      </label>
                      <select
                        id="res-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-2 py-2 rounded-xl bg-white border border-[#3B2A20]/15 text-xs text-[#2D1F17]"
                      >
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="11:11 AM">11:11 AM (Special)</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="11:11 PM">11:11 PM (Late Night)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="res-guests" className="block font-bold uppercase tracking-wider text-[#2D1F17] mb-1">
                        Guests
                      </label>
                      <select
                        id="res-guests"
                        value={partySize}
                        onChange={(e) => setPartySize(parseInt(e.target.value, 10))}
                        className="w-full px-2 py-2 rounded-xl bg-white border border-[#3B2A20]/15 text-xs text-[#2D1F17]"
                      >
                        <option value={1}>1 Solo Study</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={6}>6+ Group</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="res-table-type" className="block font-bold uppercase tracking-wider text-[#2D1F17] mb-1">
                      Preferred Seating
                    </label>
                    <select
                      id="res-table-type"
                      value={tableType}
                      onChange={(e) => setTableType(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#3B2A20]/15 text-xs font-medium text-[#2D1F17]"
                    >
                      <option value="Quiet Study Nook">Quiet Study Nook (With Outlets)</option>
                      <option value="Window Sofa">Window Sofa (Natural Lighting)</option>
                      <option value="Main Cafe Table">Main Cafe Table (Social Area)</option>
                      <option value="Outdoor Balcony">Outdoor Balcony (Open Air)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="res-notes" className="block font-bold uppercase tracking-wider text-[#2D1F17] mb-1">
                      Special Requests / Notes
                    </label>
                    <input
                      id="res-notes"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Needs 2 laptop outlets, birthday treat..."
                      className="w-full px-4 py-2 rounded-xl bg-white border border-[#3B2A20]/15 text-xs text-[#2D1F17]"
                    />
                  </div>

                  <button
                    id="submit-reservation-btn"
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#2D1F17]/20 transition-all active:scale-[0.99] mt-2"
                  >
                    <Sparkles size={16} className="text-[#C9A227]" />
                    <span>Confirm Table Reservation</span>
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
