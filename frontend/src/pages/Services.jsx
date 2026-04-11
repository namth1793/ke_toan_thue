import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';
import ContactForm from '../components/ContactForm';
import { useSiteContent } from '../context/SiteContentContext';

const SVC_COLORS = [
  { color: 'border-blue-500 bg-blue-50', iconBg: 'bg-blue-100 text-blue-600' },
  { color: 'border-indigo-500 bg-indigo-50', iconBg: 'bg-indigo-100 text-indigo-600' },
  { color: 'border-emerald-500 bg-emerald-50', iconBg: 'bg-emerald-100 text-emerald-600' },
  { color: 'border-amber-500 bg-amber-50', iconBg: 'bg-amber-100 text-amber-600' },
  { color: 'border-cyan-500 bg-cyan-50', iconBg: 'bg-cyan-100 text-cyan-600' },
  { color: 'border-purple-500 bg-purple-50', iconBg: 'bg-purple-100 text-purple-600' },
];

const DEFAULT_HEADER = { title: 'Dịch vụ kế toán thuế', subtitle: 'Giải pháp kế toán và thuế toàn diện cho mọi loại hình doanh nghiệp. Chuyên nghiệp, đúng hạn, bảo mật.' };

export default function Services() {
  const { content } = useSiteContent();
  const header = content?.services?.header || DEFAULT_HEADER;
  const services = content?.services?.services || [];

  return (
    <div className="pt-nav">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Dịch vụ</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{header.title}</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">{header.subtitle}</p>
          </ScrollFade>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((svc, i) => {
              const style = SVC_COLORS[i % SVC_COLORS.length];
              return (
                <ScrollFade key={i}>
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="inline-flex items-center gap-3 mb-4">
                        <span className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center text-2xl`}>{svc.icon}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{svc.title}</h2>
                      </div>
                      <p className="text-slate-500 leading-relaxed mb-6">{svc.desc}</p>
                      <div className="bg-slate-50 rounded-xl p-5 mb-6">
                        <div className="text-xl font-bold text-primary-600 mb-1">{svc.pricing}</div>
                        <div className="text-xs text-slate-400">{svc.pricingNote}</div>
                      </div>
                      <Link to="/lien-he" className="btn-primary">
                        Đăng ký dịch vụ này
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>

                    <div className={`border-l-4 ${style.color} rounded-2xl p-6 ${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <h4 className="font-semibold text-slate-700 mb-4">Bao gồm:</h4>
                      <ul className="space-y-3">
                        {(svc.benefits || []).map((b, bi) => (
                          <li key={bi} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-slate-600 text-sm">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Bắt đầu ngay hôm nay</h2>
            <p className="text-slate-500">Điền thông tin bên dưới, chuyên viên tư vấn sẽ liên hệ bạn trong 30 phút.</p>
          </ScrollFade>
          <ScrollFade>
            <ContactForm title="" subtitle="" />
          </ScrollFade>
        </div>
      </section>
    </div>
  );
}
