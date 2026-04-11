import ScrollFade from './ScrollFade';
import { useSiteContent } from '../context/SiteContentContext';

const STEP_STYLES = [
  { color: 'from-blue-500 to-primary-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { color: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
];

const DEFAULT = {
  badge: 'Bắt đầu chỉ trong 24 giờ',
  title: 'Ba bước đơn giản để yên tâm kinh doanh',
  subtitle: 'Không cần hiểu biết về kế toán. Không cần thêm nhân viên. Chỉ cần một cuộc gọi.',
  steps: [
    { number: '01', icon: '💬', title: 'Liên hệ & Tư vấn miễn phí', desc: 'Gọi điện, nhắn Zalo hoặc điền form.', detail: 'Trong vòng 30 phút' },
    { number: '02', icon: '📝', title: 'Ký hợp đồng & Bàn giao tài liệu', desc: 'Hợp đồng rõ ràng, minh bạch.', detail: 'Trong ngày làm việc' },
    { number: '03', icon: '✅', title: 'Chúng tôi xử lý toàn bộ', desc: 'Đội kế toán xử lý hạch toán, kê khai thuế.', detail: 'Liên tục hàng tháng' },
  ],
};

export default function HowItWorks() {
  const { content } = useSiteContent();
  const d = content?.home?.howItWorks || DEFAULT;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.05),rgba(255,255,255,0))]" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFade className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-primary-100">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {d.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {d.title.split('yên tâm kinh doanh')[0]}
            {d.title.includes('yên tâm kinh doanh') && (
              <><span className="text-gradient">yên tâm kinh doanh</span>{d.title.split('yên tâm kinh doanh')[1]}</>
            )}
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">{d.subtitle}</p>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-14 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-emerald-200 z-0" aria-hidden />
          {d.steps.map((step, i) => {
            const style = STEP_STYLES[i] || STEP_STYLES[0];
            return (
              <ScrollFade key={step.number} delay={i * 0.15}>
                <div className={`relative ${style.bg} border ${style.border} rounded-2xl p-6 text-center z-10`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${style.color} text-white mb-5 shadow-lg text-2xl`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-2">
                    <span className="text-xs font-black text-slate-300 text-5xl leading-none select-none">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.desc}</p>
                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white border ${style.border} text-slate-600`}>
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {step.detail}
                  </div>
                </div>
              </ScrollFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
