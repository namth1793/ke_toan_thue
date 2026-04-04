import ScrollFade from './ScrollFade';

const steps = [
  {
    number: '01',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Liên hệ & Tư vấn miễn phí',
    desc: 'Gọi điện, nhắn Zalo hoặc điền form. Chuyên viên sẽ lắng nghe và đề xuất gói dịch vụ phù hợp nhất với quy mô và ngân sách của bạn.',
    detail: 'Trong vòng 30 phút',
    color: 'from-blue-500 to-primary-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    number: '02',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Ký hợp đồng & Bàn giao tài liệu',
    desc: 'Hợp đồng rõ ràng, minh bạch về phạm vi công việc và chi phí. Bạn chỉ cần cung cấp hóa đơn và chứng từ — chúng tôi lo phần còn lại.',
    detail: 'Trong ngày làm việc',
    color: 'from-indigo-500 to-purple-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    number: '03',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Chúng tôi xử lý toàn bộ',
    desc: 'Đội kế toán chuyên nghiệp xử lý hạch toán, kê khai thuế, lập báo cáo — đúng hạn 100%. Bạn nhận thông báo kết quả và tập trung vào kinh doanh.',
    detail: 'Liên tục hàng tháng',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.05),rgba(255,255,255,0))]" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFade className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-primary-100">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Bắt đầu chỉ trong 24 giờ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Ba bước đơn giản để <span className="text-gradient">yên tâm kinh doanh</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Không cần hiểu biết về kế toán. Không cần thêm nhân viên. Chỉ cần một cuộc gọi.
          </p>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-14 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-emerald-200 z-0" aria-hidden />

          {steps.map((step, i) => (
            <ScrollFade key={step.number} delay={i * 0.15}>
              <div className={`relative ${step.bg} border ${step.border} rounded-2xl p-6 text-center z-10`}>
                {/* Step number badge */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-5 shadow-lg`}>
                  {step.icon}
                </div>

                <div className="absolute -top-3 -right-2">
                  <span className="text-xs font-black text-slate-300 text-5xl leading-none select-none">{step.number}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.desc}</p>
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white border ${step.border} text-slate-600`}>
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {step.detail}
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
}
