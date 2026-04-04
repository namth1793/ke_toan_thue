import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-bold text-white text-base">Kế Toán Sao Việt</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              Công ty TNHH Dịch Vụ Kế Toán Thuế Sao Việt — đối tác tin cậy cho hàng trăm doanh nghiệp trên cả nước.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Facebook', href: '#', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { label: 'Zalo', href: '#', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
                { label: 'YouTube', href: '#', icon: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 bg-slate-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Dịch vụ</h3>
            <ul className="space-y-2 text-sm">
              {['Kê khai thuế GTGT', 'Kế toán trọn gói', 'Thành lập công ty', 'Báo cáo tài chính', 'Hoàn thuế', 'Tư vấn tài chính'].map((s) => (
                <li key={s}>
                  <Link to="/dich-vu" className="text-slate-400 hover:text-primary-400 transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Trang</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Trang chủ' },
                { to: '/dao-tao', label: 'Đào tạo' },
                { to: '/blog', label: 'Blog & Tin tức' },
                { to: '/gioi-thieu', label: 'Giới thiệu' },
                { to: '/lien-he', label: 'Liên hệ' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-slate-400 hover:text-primary-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:0901234567" className="hover:text-primary-400 transition-colors">0901.234.567</a>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@ketoanvsaoviet.vn" className="hover:text-primary-400 transition-colors">info@ketoanvsaoviet.vn</a>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>T2–T7: 8:00 – 17:30</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Công Ty TNHH Dịch Vụ Kế Toán Thuế Sao Việt. Mã số thuế: 0312345678</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
