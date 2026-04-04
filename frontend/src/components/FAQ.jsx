import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'Dịch vụ kế toán thuê ngoài có an toàn và bảo mật không?',
    a: 'Hoàn toàn an toàn. Chúng tôi ký hợp đồng bảo mật thông tin với tất cả khách hàng. Dữ liệu kế toán được mã hóa và lưu trữ trên hệ thống bảo mật. Nhân viên kế toán được đào tạo về nguyên tắc bảo mật và chịu trách nhiệm pháp lý.',
  },
  {
    q: 'Thời gian bàn giao báo cáo tài chính là bao lâu?',
    a: 'Báo cáo tháng: bàn giao trước ngày 20 tháng tiếp theo. Báo cáo quyết toán năm: hoàn thành trước 31/3 năm sau. Kê khai thuế: hoàn thành và nộp đúng hạn theo quy định của Tổng cục Thuế.',
  },
  {
    q: 'Tôi cần chuẩn bị tài liệu gì để sử dụng dịch vụ?',
    a: 'Để bắt đầu, bạn cần cung cấp: Giấy phép kinh doanh, Mã số thuế, Tài khoản ngân hàng doanh nghiệp, Hóa đơn mua vào/bán ra trong kỳ, Bảng lương (nếu có nhân viên). Chúng tôi sẽ hướng dẫn chi tiết khi ký hợp đồng.',
  },
  {
    q: 'Chi phí dịch vụ có thay đổi trong quá trình sử dụng không?',
    a: 'Chi phí được cố định trong suốt thời hạn hợp đồng (thường 1 năm). Khi gia hạn, chúng tôi thông báo trước ít nhất 30 ngày nếu có điều chỉnh giá. Không có chi phí phát sinh ẩn ngoài hợp đồng.',
  },
  {
    q: 'Công ty ở tỉnh/thành khác có sử dụng dịch vụ được không?',
    a: 'Được. Chúng tôi phục vụ khách hàng trên toàn quốc qua hình thức online. Trao đổi qua Zalo, email, điện thoại. Tài liệu được gửi qua email hoặc phần mềm quản lý chung. Nhiều khách hàng ở Hà Nội, Đà Nẵng, Cần Thơ đang sử dụng dịch vụ của chúng tôi.',
  },
  {
    q: 'Nếu bị cơ quan thuế kiểm tra, Sao Việt có hỗ trợ không?',
    a: 'Có. Chúng tôi đồng hành cùng bạn trong suốt quá trình thanh tra thuế: chuẩn bị hồ sơ, giải trình, làm việc với cơ quan thuế. Nếu lỗi phát sinh do phía chúng tôi, chúng tôi chịu hoàn toàn trách nhiệm pháp lý và chi phí phạt.',
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-slate-800 pr-4">{faq.q}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 text-slate-600 text-sm leading-relaxed bg-slate-50 border-t border-slate-100">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <FAQItem
          key={i}
          faq={faq}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
