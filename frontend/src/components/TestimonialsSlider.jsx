import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';

const DEFAULT_ITEMS = [
  { name: 'Trần Minh Tuấn', role: 'Giám đốc Công ty TNHH Tuấn Phát', avatar: 'https://picsum.photos/seed/tuan/80/80', content: 'Báo cáo tài chính luôn đúng hạn, không bao giờ bị phạt thuế muộn. Đội ngũ tư vấn rất chuyên nghiệp.', stars: 5 },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const { content } = useSiteContent();
  const testimonials = content?.home?.testimonials?.items || DEFAULT_ITEMS;

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => { setCurrent(0); }, [testimonials.length]);

  if (!testimonials.length) return null;
  const t = testimonials[current];

  return (
    <div className="relative">
      <div className="overflow-hidden min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8"
          >
            <div className="flex items-start gap-4 mb-4">
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold flex-shrink-0">
                  {t.name?.[0]}
                </div>
              )}
              <div>
                <div className="font-semibold text-slate-800">{t.name}</div>
                <div className="text-sm text-slate-500">{t.role}</div>
                <StarRating count={t.stars || 5} />
              </div>
              <svg className="w-8 h-8 text-primary-100 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>
            </div>
            <p className="text-slate-600 leading-relaxed italic">"{t.content}"</p>
          </motion.div>
        </AnimatePresence>
      </div>
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Testimonial ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === current ? 'bg-primary-600 w-6' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`} />
          ))}
        </div>
      )}
    </div>
  );
}
