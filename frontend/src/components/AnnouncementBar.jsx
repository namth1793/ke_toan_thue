import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';

const DEFAULT = {
  visible: true,
  label: 'Ưu đãi tháng 4:',
  text: 'Miễn phí tháng đầu khi đăng ký gói Chuyên Nghiệp trở lên',
  ctaText: 'Đăng ký ngay →',
  ctaLink: '/lien-he',
};

export default function AnnouncementBar({ onDismiss }) {
  const [dismissed, setDismissed] = useState(false);
  const { content } = useSiteContent();
  const ann = content?.settings?.announcement || DEFAULT;

  const handleDismiss = () => { setDismissed(true); onDismiss?.(); };

  if (!ann.visible) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-r from-primary-700 via-primary-600 to-indigo-600 text-white overflow-hidden relative"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm">
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              {ann.label && <span className="font-semibold">{ann.label}</span>}
            </span>
            <span className="text-blue-50">{ann.text}</span>
            {ann.ctaText && ann.ctaLink && (
              <Link
                to={ann.ctaLink}
                className="hidden sm:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors border border-white/30 flex-shrink-0"
              >
                {ann.ctaText}
              </Link>
            )}
            <button
              onClick={handleDismiss}
              aria-label="Đóng thông báo"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
