import { Link } from 'react-router-dom';
import { MapPin, Star, Phone, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HospitalListItem({ hospital, index = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const fallback = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80";

  const typeColors = {
    Specialty: 'bg-teal/10 text-teal border-teal/20',
    General: 'bg-blue-50 text-blue-600 border-blue-100',
    Teaching: 'bg-purple-50 text-purple-600 border-purple-100',
    Government: 'bg-green-50 text-green-700 border-green-100',
    Private: 'bg-orange-50 text-orange-600 border-orange-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
    >
      <Link to={`/hospital/${hospital.id}`}>
        <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.65)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(13,148,136,0.08), inset 0 1px 0 rgba(255,255,255,0.9)'; e.currentTarget.style.border = '1px solid rgba(13,148,136,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.65)'; }}
        >
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="w-full sm:w-52 h-44 sm:h-auto flex-shrink-0 relative overflow-hidden img-shimmer">
              {!imgLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-muted/30 animate-pulse" />
              )}
              <img
                src={imgError ? fallback : hospital.image_url}
                alt={hospital.name}
                onLoad={() => setImgLoaded(true)}
                onError={() => { setImgError(true); setImgLoaded(true); }}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
            </div>

            {/* Info */}
            <div className="flex-1 p-5 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-1">
                  <h3 className="font-bold text-foreground text-base group-hover:text-teal transition-colors duration-200 leading-tight flex-1">
                    {hospital.name}
                  </h3>
                  {hospital.verified && (
                    <div className="flex items-center gap-1 text-teal text-xs font-semibold whitespace-nowrap flex-shrink-0 px-2 py-0.5 rounded-full"
                      style={{background:'hsla(175,82%,30%,0.08)', border:'1px solid hsla(175,82%,30%,0.15)'}}>
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3 text-teal/60" />
                  <span>{hospital.address}</span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${typeColors[hospital.type] || 'bg-muted text-muted-foreground border-border'}`}>
                    {hospital.type}
                  </span>
                  {hospital.er_available && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-red-50 text-emergency border border-red-100">
                      ER Available
                    </span>
                  )}
                  {hospital.er_wait_minutes && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-muted/70 text-muted-foreground border border-border flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~{hospital.er_wait_minutes} min
                    </span>
                  )}
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium border"
                    style={{background: hospital.tier === 'india' ? 'rgba(251,191,36,0.1)' : 'rgba(13,148,136,0.08)',
                      color: hospital.tier === 'india' ? 'hsl(43,80%,35%)' : 'hsl(175,82%,28%)',
                      borderColor: hospital.tier === 'india' ? 'rgba(251,191,36,0.3)' : 'rgba(13,148,136,0.2)'}}>
                    {hospital.tier === 'india' ? '🏆 Top India' : '📍 Dehradun'}
                  </span>
                </div>

                {/* Treatments preview */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {hospital.treatments.slice(0, 3).map(t => (
                    <span key={t.name} className="text-[10px] px-2 py-0.5 bg-muted/50 text-muted-foreground rounded-md border border-border/50">
                      {t.name}
                    </span>
                  ))}
                  {hospital.treatments.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 bg-teal/8 text-teal rounded-md border border-teal/15"
                      style={{background:'hsla(175,82%,30%,0.08)', borderColor:'hsla(175,82%,30%,0.15)'}}>
                      +{hospital.treatments.length - 3} more
                    </span>
                  )}
                </div>

                {/* Rating & Phone */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                    <span className="text-sm font-bold">{hospital.rating}</span>
                    <span className="text-xs text-muted-foreground">({hospital.review_count.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{hospital.phone}</span>
                  </div>
                </div>
              </div>

              {/* Clarity Score */}
              <div className="flex sm:flex-col items-center sm:justify-center gap-2 sm:gap-0 flex-shrink-0">
                <div className="w-16 h-16 rounded-full flex items-center justify-center relative"
                  style={{
                    background: `conic-gradient(hsl(175,82%,30%) 0% ${hospital.clarity_score}%, #e5e7eb ${hospital.clarity_score}% 100%)`,
                    padding: '3px'
                  }}>
                  <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
                    <div className="text-lg font-extrabold text-teal leading-none">{hospital.clarity_score}</div>
                    <div className="text-[9px] text-muted-foreground font-semibold leading-none mt-0.5">Clarity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}