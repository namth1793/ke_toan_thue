import ScrollFade from '../components/ScrollFade';
import ContactForm from '../components/ContactForm';

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Địa chỉ',
    lines: ['123 Nguyễn Văn Cừ, Phường 4', 'Quận 5, TP. Hồ Chí Minh'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Điện thoại',
    lines: ['0901.234.567 (Kinh doanh)', '0912.345.678 (Hỗ trợ kỹ thuật)'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email',
    lines: ['info@ketoanvsaoviet.vn', 'tuvanthuế@ketoanvsaoviet.vn'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Giờ làm việc',
    lines: ['Thứ 2 – Thứ 7: 8:00 – 17:30', 'Chủ nhật: 9:00 – 12:00 (hỗ trợ online)'],
  },
];

export default function Contact() {
  return (
    <div className="pt-nav">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Liên hệ</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Đội ngũ tư vấn sẵn sàng hỗ trợ bạn. Liên hệ qua biểu mẫu, điện thoại hoặc ghé thăm văn phòng.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollFade>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Thông tin liên hệ</h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex gap-4">
                      <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">{info.title}</h4>
                        {info.lines.map((line) => (
                          <p key={line} className="text-slate-500 text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollFade>

              <ScrollFade delay={0.2}>
                <div className="bg-primary-50 rounded-2xl p-6">
                  <h4 className="font-bold text-primary-700 mb-3">Kết nối với chúng tôi</h4>
                  <div className="flex gap-3">
                    {[
                      { label: 'Facebook', color: 'bg-blue-600', href: '#' },
                      { label: 'Zalo', color: 'bg-sky-500', href: '#' },
                      { label: 'YouTube', color: 'bg-red-600', href: '#' },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className={`${s.color} text-white text-xs font-medium px-3 py-2 rounded-lg hover:opacity-90 transition-opacity`}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollFade>

              {/* Map placeholder */}
              <ScrollFade delay={0.3}>
                <div className="bg-slate-100 rounded-2xl overflow-hidden h-48 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm">123 Nguyễn Văn Cừ, Q5, TP.HCM</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 text-xs hover:underline mt-1 inline-block">
                      Xem trên Google Maps →
                    </a>
                  </div>
                </div>
              </ScrollFade>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollFade direction="left">
                <ContactForm
                  title="Gửi yêu cầu tư vấn"
                  subtitle="Chúng tôi sẽ phản hồi trong vòng 30 phút trong giờ làm việc."
                />
              </ScrollFade>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Cần hỗ trợ ngay?</h2>
            <p className="text-slate-500 mb-6">Gọi trực tiếp để được tư vấn nhanh nhất.</p>
            <a
              href="tel:0901234567"
              className="btn-primary text-lg px-8 py-4 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Gọi ngay 0901.234.567
            </a>
          </ScrollFade>
        </div>
      </section>
    </div>
  );
}
