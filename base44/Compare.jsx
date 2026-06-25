import { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { HOSPITALS, searchHospitals } from '@/lib/hospitalData';
// HOSPITALS used for "show all" default state
import HospitalListItem from '@/components/compare/HospitalListItem';
import { motion } from 'framer-motion';

const TYPES = ['All Types', 'Specialty', 'General', 'Teaching', 'Government', 'Private'];
const SORTS = ['Clarity Score', 'Rating', 'ER Wait Time'];
const TIERS = ['All', 'Top India', 'Dehradun'];

export default function Compare() {
  const [query, setQuery]         = useState('');
  const [location, setLocation]   = useState('');
  const [pincode, setPincode]     = useState('');
  const [selectedType, setType]   = useState('All Types');
  const [sort, setSort]           = useState('Clarity Score');
  const [tier, setTier]           = useState('All');
  const [results, setResults]     = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t   = params.get('treatment') || '';
    const loc = params.get('location')  || '';
    setQuery(t);
    if (loc.match(/^\d{6}$/)) setPincode(loc);
    else setLocation(loc);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;

    // Only search if at least one filter is active
    const hasFilter = query.trim() || location.trim() || pincode.trim() || selectedType !== 'All Types' || tier !== 'All';

    if (!hasFilter) {
      setResults(HOSPITALS);
      return;
    }

    let filtered = searchHospitals({ treatment: query, pincode, city: location, query: '' });

    if (selectedType !== 'All Types') filtered = filtered.filter(h => h.type === selectedType);
    if (tier === 'Top India')         filtered = filtered.filter(h => h.tier === 'india');
    if (tier === 'Dehradun')          filtered = filtered.filter(h => h.tier === 'dehradun');

    if (sort === 'Rating')            filtered = [...filtered].sort((a,b) => b.rating - a.rating);
    else if (sort === 'ER Wait Time') filtered = [...filtered].sort((a,b) => (a.er_wait_minutes||99) - (b.er_wait_minutes||99));

    setResults(filtered);
  }, [query, location, pincode, selectedType, sort, tier, initialized]);

  const clearAll = () => { setQuery(''); setLocation(''); setPincode(''); setType('All Types'); setSort('Clarity Score'); setTier('All'); };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-10 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(8,145,178,0.18),transparent_60%)]" />
        {/* Triangle decorations */}
        <div className="tri-deco tri-teal-sm absolute" style={{ top: '18px', left: '12%', transform: 'rotate(10deg)', opacity: 0.7 }} />
        <div className="tri-deco tri-teal-md absolute" style={{ top: '30px', left: '18%', transform: 'rotate(-8deg)', opacity: 0.4 }} />
        <div className="tri-deco tri-white-sm absolute" style={{ bottom: '16px', right: '10%', transform: 'rotate(180deg)', opacity: 0.5 }} />
        <div className="tri-deco tri-teal-sm absolute" style={{ top: '20px', right: '15%', transform: 'rotate(30deg)', opacity: 0.45 }} />
        <div className="tri-deco tri-white-sm absolute" style={{ top: '50%', left: '3%', transform: 'rotate(90deg)', opacity: 0.3 }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">Compare Hospitals</h1>
            <p className="text-white/60 text-sm">Find and compare healthcare facilities by cost, rating, and transparency.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Filter card */}
        <motion.div
          initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="glass-card rounded-2xl p-4 mb-8 shadow-xl shadow-black/8"
        >
          <div className="flex flex-col gap-3">
            {/* Row 1: search inputs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2.5 glass-input rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-400/30 transition-all">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text" value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search treatment, hospital, specialty..."
                  className="flex-1 text-sm outline-none bg-transparent"
                />
                {query && <button onClick={() => setQuery('')}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" /></button>}
              </div>
              <div className="flex-1 flex items-center gap-2.5 glass-input rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-400/30 transition-all">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text" value={location}
                  onChange={e => { setLocation(e.target.value); setPincode(''); }}
                  placeholder="City or location..."
                  className="flex-1 text-sm outline-none bg-transparent"
                />
              </div>
              <div className="sm:w-40 flex items-center gap-2.5 glass-input rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-400/30 transition-all">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text" value={pincode} maxLength={6}
                  onChange={e => { setPincode(e.target.value); setLocation(''); }}
                  placeholder="PIN code..."
                  className="flex-1 text-sm outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Row 2: dropdowns */}
            <div className="flex flex-wrap gap-2">
              {[
                { value: selectedType, setter: setType,  options: TYPES,  label: 'Type' },
                { value: sort,         setter: setSort,  options: SORTS,  label: 'Sort' },
                { value: tier,         setter: setTier,  options: TIERS,  label: 'Region' },
              ].map(sel => (
                <select
                  key={sel.label}
                  value={sel.value}
                  onChange={e => sel.setter(e.target.value)}
                  className="glass-input rounded-xl px-3 py-2 text-sm outline-none text-foreground border-0 cursor-pointer hover:bg-white/90 transition-colors"
                >
                  {sel.options.map(o => <option key={o}>{o}</option>)}
                </select>
              ))}
              <button
                onClick={clearAll}
                className="text-xs text-muted-foreground hover:text-foreground px-3 py-2 rounded-xl hover:bg-muted/60 transition-colors font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        </motion.div>

        {/* Count */}
        <motion.p
          key={results.length}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`text-sm mb-5 font-semibold ${results.length === 0 ? 'text-red-500' : 'text-muted-foreground'}`}
        >
          {results.length === 0
            ? '0 hospitals found'
            : `${results.length} hospital${results.length !== 1 ? 's' : ''} found`}
        </motion.p>

        {/* List */}
        <div className="space-y-4 pb-16">
          {results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
              className="text-center py-20 glass-card rounded-2xl relative overflow-hidden"
            >
              {/* triangle bg decos */}
              <div className="tri-deco tri-teal-md absolute" style={{ top: '20px', left: '8%', opacity: 0.35, transform: 'rotate(20deg)' }} />
              <div className="tri-deco tri-teal-sm absolute" style={{ bottom: '24px', right: '10%', opacity: 0.3, transform: 'rotate(200deg)' }} />
              <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
              <p className="text-xl font-extrabold text-foreground mb-1">No hospitals found</p>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">Try different search terms, a different city, or clear all filters</p>
              <button onClick={clearAll} className="gradient-teal text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-teal-500/20">
                Clear filters
              </button>
            </motion.div>
          ) : (
            results.map((h, i) => <HospitalListItem key={h.id} hospital={h} index={i} />)
          )}
        </div>
      </div>
    </div>
  );
}