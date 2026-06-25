import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Globe, Star, ShieldCheck, Clock, ChevronLeft, Video } from 'lucide-react';
import { HOSPITALS } from '@/lib/hospitalData';

import TreatmentCostCard from '@/components/hospital/TreatmentCostCard';
import ReviewSection from '@/components/hospital/ReviewSection';
import ConsultationModal from '@/components/hospital/ConsultationModal';
import { motion } from 'framer-motion';

export default function HospitalDetail() {
  const { id } = useParams();
  const hospital = HOSPITALS.find(h => h.id === id);
  const [activeTab, setActiveTab] = useState('treatments');
  const [showModal, setShowModal] = useState(false);

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Hospital not found</h2>
          <Link to="/compare" className="text-teal hover:underline">← Back to Compare</Link>
        </div>
      </div>
    );
  }

  const typeColors = {
    Specialty: 'bg-teal/10 text-teal',
    General: 'bg-blue-50 text-blue-600',
    Teaching: 'bg-purple-50 text-purple-600',
    Government: 'bg-green-50 text-green-600',
    Private: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link to="/compare" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-teal transition-colors mb-6 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Compare
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden h-64 sm:h-80 mb-6">
              <img src={hospital.image_url} alt={hospital.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">{hospital.name}</h1>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{hospital.address}</span>
                    <a href={`tel:${hospital.phone}`} className="flex items-center gap-1 hover:text-teal transition-colors">
                      <Phone className="w-3.5 h-3.5" />{hospital.phone}
                    </a>
                    {hospital.website && (
                      <a href={hospital.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-teal transition-colors">
                        <Globe className="w-3.5 h-3.5" />Website
                      </a>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-teal">{hospital.clarity_score}</div>
                  <div className="text-xs text-muted-foreground font-medium">Clarity Score</div>
                </div>
              </div>

              {/* Book button */}
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 gradient-teal text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all mb-5"
              >
                <Video className="w-4 h-4" /> Book Consultation
              </button>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${typeColors[hospital.type] || 'bg-muted text-muted-foreground'}`}>
                  {hospital.type} Center
                </span>
                {hospital.er_available && (
                  <span className="text-sm px-3 py-1 rounded-full font-medium bg-emergency/10 text-emergency">ER Available</span>
                )}
                {hospital.er_wait_minutes && (
                  <span className="text-sm px-3 py-1 rounded-full font-medium bg-muted text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> ~{hospital.er_wait_minutes} min ER wait
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="font-semibold">{hospital.rating}</span>
                  <span className="text-sm text-muted-foreground">({hospital.review_count.toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-5">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Specialties</div>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties?.map(s => (
                    <span key={s} className="text-xs px-3 py-1 bg-muted rounded-full text-foreground">{s}</span>
                  ))}
                </div>
              </div>

              {/* Insurance */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Insurance Accepted</div>
                <div className="flex flex-wrap gap-2">
                  {hospital.insurance_accepted?.map(ins => (
                    <span key={ins} className="text-xs px-3 py-1 bg-teal/10 text-teal rounded-full font-medium">{ins}</span>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-6 border-b border-border">
                {['treatments', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${
                      activeTab === tab
                        ? 'border-teal text-teal'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab === 'treatments' ? `Treatments (${hospital.treatments?.length || 0})` : `Reviews`}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'treatments' && (
                <div className="space-y-5">
                  {hospital.treatments?.length > 0
                    ? hospital.treatments.map(t => (
                        <TreatmentCostCard key={t.name} treatment={t} hospitalName={hospital.name} />
                      ))
                    : <p className="text-muted-foreground text-sm">No treatment data available yet.</p>
                  }
                </div>
              )}

              {activeTab === 'reviews' && (
                <ReviewSection hospitalId={hospital.id} hospitalName={hospital.name} />
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Virtual Consultation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <Video className="w-8 h-8 text-teal mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-1">Virtual Consultation</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Speak directly with a surgeon to discuss procedures and get a full cost breakdown before committing.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full gradient-teal text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-teal/25"
              >
                Book Free Consultation
              </button>
            </motion.div>

            {/* Emergency Line */}
            {hospital.emergency_line && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white border border-border rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 text-emergency mb-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-semibold">Emergency Line</span>
                </div>
                <div className="text-xl font-extrabold text-foreground">{hospital.emergency_line}</div>
              </motion.div>
            )}

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-border rounded-2xl p-5"
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal" /> Quick Stats
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Average Rating', value: `★ ${hospital.rating}` },
                  { label: 'Total Reviews', value: hospital.review_count.toLocaleString() },
                  { label: 'Clarity Score', value: hospital.clarity_score },
                  { label: 'Treatments Listed', value: hospital.treatments?.length || 0 },
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-semibold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showModal && <ConsultationModal hospital={hospital} onClose={() => setShowModal(false)} />}
    </div>
  );
}