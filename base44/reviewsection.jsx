import { useState } from 'react';
import { Star, ThumbsUp, IndianRupee } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
        >
          <Star className={`w-5 h-5 transition-colors ${(hover || value) >= n ? 'text-gold fill-gold' : 'text-border'}`} />
        </button>
      ))}
    </div>
  );
}

export default function ReviewSection({ hospitalId, hospitalName }) {
  const [form, setForm] = useState({ reviewer_name: '', rating: 0, comment: '', treatment: '', actual_cost: '', recommends: true });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['reviews', hospitalId],
    queryFn: () => base44.entities.Review.filter({ hospital_id: hospitalId }),
  });

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '—';
  const pctRecommend = reviews.length ? Math.round(reviews.filter(r => r.recommends).length / reviews.length * 100) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating || !form.comment) return;
    setSubmitting(true);
    await base44.entities.Review.create({
      ...form,
      hospital_id: hospitalId,
      hospital_name: hospitalName,
      actual_cost: form.actual_cost ? parseFloat(form.actual_cost) : null,
      review_date: new Date().toISOString().split('T')[0],
    });
    setSubmitting(false);
    setSubmitted(true);
    setForm({ reviewer_name: '', rating: 0, comment: '', treatment: '', actual_cost: '', recommends: true });
    refetch();
  };

  const ratingCounts = [5,4,3,2,1].map(n => ({ n, count: reviews.filter(r => r.rating === n).length }));

  return (
    <div className="space-y-8">
      {/* Summary */}
      {reviews.length > 0 && (
        <div className="bg-white border border-border rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-5 flex items-center gap-2">
            <Star className="w-4 h-4 text-gold" /> Review Summary
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-teal">{avgRating}</div>
              <div className="flex justify-center mt-1">
                {[1,2,3,4,5].map(n => <Star key={n} className={`w-3.5 h-3.5 ${n <= Math.round(avgRating) ? 'text-gold fill-gold' : 'text-border'}`} />)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{reviews.length} reviews</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-foreground">0.0</div>
              <div className="text-xs text-muted-foreground mt-1">Cost Accuracy<br/>out of 5</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-500">{pctRecommend}%</div>
              <ThumbsUp className="w-4 h-4 text-emerald-500 mx-auto mt-1" />
              <div className="text-xs text-muted-foreground mt-1">Would recommend</div>
            </div>
          </div>
          {/* Star breakdown */}
          <div className="space-y-2">
            {ratingCounts.map(({ n, count }) => (
              <div key={n} className="flex items-center gap-3 text-xs">
                <span className="w-3 text-right text-muted-foreground">{n}</span>
                <Star className="w-3 h-3 text-gold fill-gold" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full" style={{ width: reviews.length ? `${(count/reviews.length)*100}%` : '0%' }} />
                </div>
                <span className="w-4 text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review List */}
      {reviews.map(r => (
        <div key={r.id} className="bg-white border border-border rounded-2xl p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground text-sm">{r.reviewer_name || 'Anonymous'}</span>
                {r.recommends && (
                  <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ThumbsUp className="w-2.5 h-2.5" /> Recommends
                  </span>
                )}
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(n => <Star key={n} className={`w-3.5 h-3.5 ${n <= r.rating ? 'text-gold fill-gold' : 'text-border'}`} />)}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{r.review_date}</span>
          </div>
          <p className="text-sm text-foreground mb-2">{r.comment}</p>
          {r.actual_cost && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <IndianRupee className="w-3 h-3" /> Actual cost paid: ₹{r.actual_cost.toLocaleString('en-IN')}
            </div>
          )}
        </div>
      ))}

      {/* Review Form */}
      {!submitted ? (
        <div className="bg-white border border-border rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-5">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Your Name</label>
                <input
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors"
                  placeholder="e.g. Priya Sharma"
                  value={form.reviewer_name}
                  onChange={e => setForm({ ...form, reviewer_name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Treatment (optional)</label>
                <input
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors"
                  placeholder="e.g. MRI Scan"
                  value={form.treatment}
                  onChange={e => setForm({ ...form, treatment: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Rating *</label>
                <StarRating value={form.rating} onChange={v => setForm({ ...form, rating: v })} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Actual Cost Paid (₹)</label>
                <input
                  type="number"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors"
                  placeholder="e.g. 80000"
                  value={form.actual_cost}
                  onChange={e => setForm({ ...form, actual_cost: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Your Review *</label>
              <textarea
                rows={3}
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal transition-colors resize-none"
                placeholder="Share your experience..."
                value={form.comment}
                onChange={e => setForm({ ...form, comment: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="recommend" checked={form.recommends} onChange={e => setForm({ ...form, recommends: e.target.checked })} className="accent-teal" />
              <label htmlFor="recommend" className="text-sm text-muted-foreground">I would recommend this hospital</label>
            </div>
            <button
              type="submit"
              disabled={submitting || !form.rating || !form.comment}
              className="gradient-teal text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <div className="text-2xl mb-2">✓</div>
          <p className="font-semibold text-emerald-700">Thank you for your review!</p>
          <button className="text-sm text-emerald-600 mt-2 underline" onClick={() => setSubmitted(false)}>Write another</button>
        </div>
      )}
    </div>
  );
}