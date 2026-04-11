import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';

const DEFAULT_FAQS = [
  { q: 'Dịch vụ kế toán thuê ngoài có an toàn và bảo mật không?', a: 'Hoàn toàn an toàn. Chúng tôi ký hợp đồng bảo mật thông tin với tất cả khách hàng.' },
  { q: 'Thời gian bàn giao báo cáo tài chính là bao lâu?', a: 'Báo cáo tháng: bàn giao trước ngày 20 tháng tiếp theo.' },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors" aria-expanded={isOpen}>
        <span className="font-medium text-slate-800 pr-4">{faq.q}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-6 py-4 text-slate-600 text-sm leading-relaxed bg-slate-50 border-t border-slate-100">{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { content } = useSiteContent();
  const faqs = content?.home?.faq?.items || DEFAULT_FAQS;

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <FAQItem key={i} faq={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
      ))}
    </div>
  );
}
