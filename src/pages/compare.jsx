import { useState } from 'react';
import { X, Video } from 'lucide-react';

export default function ConsultationModal({ hospital, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', procedure: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-teal" />
            <h2 className="font-bold text-foreground">Book Virtual Consultation</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-1">{hospital.name}</p>
        <div className="h-0.5 w-full bg-gradient-to-r from-teal to-blue-400 rounded-full mb-5" />

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your Details</div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Full Name *</label>
              <input
                required
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Email Address *</label>
              <input
                required
                type="email"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Phone Number</label>
              <input
                type="tel"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Procedure to Discuss</label>
              <select
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors bg-white"
                value={form.procedure}
                onChange={e => setForm({ ...form, procedure: e.target.value })}
              >
                <option value="">Select a treatment...</option>
                {hospital.treatments?.map(t => (
                  <option key={t.name} value={t.name}>{t.name}</option>
                ))}
                <option value="other">Other / Not Listed</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full gradient-teal text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
            >
              Book Free Consultation
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="font-bold text-foreground text-lg mb-2">Consultation Booked!</h3>
            <p className="text-sm text-muted-foreground mb-4">We'll send confirmation to <strong>{form.email}</strong></p>
            <button onClick={onClose} className="text-sm text-teal font-medium hover:underline">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}