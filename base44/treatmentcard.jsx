import { IndianRupee } from 'lucide-react';

export default function TreatmentCostCard({ treatment, hospitalName }) {
  const total = treatment.total || 0;
  const surgeonPct = Math.round((treatment.surgeon_fee / total) * 100) || 0;
  const facilityPct = Math.round((treatment.facility_fee / total) * 100) || 0;
  const anesthesiaPct = Math.round((treatment.anesthesia / total) * 100) || 0;
  const postOpPct = Math.round((treatment.post_op / total) * 100) || 0;

  const fmt = (n) => n ? `₹${n.toLocaleString('en-IN')}` : '—';

  return (
    <div className="glass-card rounded-2xl p-6 hover-lift hover-glow transition-all">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 bg-teal/10 rounded-lg flex items-center justify-center">
          <IndianRupee className="w-4 h-4 text-teal" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">{treatment.name}</h3>
          <p className="text-xs text-muted-foreground">{hospitalName}</p>
        </div>
      </div>

      {/* Bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-0.5">
        {surgeonPct > 0 && <div style={{width:`${surgeonPct}%`}} className="bg-teal rounded-l-full" />}
        {facilityPct > 0 && <div style={{width:`${facilityPct}%`}} className="bg-teal/70" />}
        {anesthesiaPct > 0 && <div style={{width:`${anesthesiaPct}%`}} className="bg-teal/50" />}
        {postOpPct > 0 && <div style={{width:`${postOpPct}%`}} className="bg-gold/70 rounded-r-full" />}
      </div>

      {/* Breakdown */}
      <div className="space-y-2 mb-5">
        {[
          { color: 'bg-teal', label: 'Surgeon Fee', val: treatment.surgeon_fee },
          { color: 'bg-teal/70', label: 'Facility Fee', val: treatment.facility_fee },
          { color: 'bg-teal/50', label: 'Anesthesia', val: treatment.anesthesia },
          { color: 'bg-gold/70', label: 'Post-Op Care', val: treatment.post_op },
        ].map(item => (
          <div key={item.label} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
            <span className="font-medium">{fmt(item.val)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between font-bold text-base">
          <span>Total Estimated Cost</span>
          <span className="text-teal">{fmt(total)}</span>
        </div>
        {treatment.insurance_rate && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Insurance Negotiated Rate</span>
            <span>{fmt(treatment.insurance_rate)}</span>
          </div>
        )}
        {treatment.out_of_pocket && (
          <div className="flex justify-between text-sm font-medium">
            <span>Est. Out-of-Pocket</span>
            <span className="text-emerald-600">{fmt(treatment.out_of_pocket)}</span>
          </div>
        )}
      </div>
    </div>
  );
}