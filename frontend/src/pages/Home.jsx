import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import HowItWorks from '../components/HowItWorks';
import ScrollFade from '../components/ScrollFade';
import TrustLogos from '../components/TrustLogos';

/* ─── Hero data ─────────────────────────────────────────────── */
const heroStats = [
  { value: '500+', label: 'Doanh nghiệp', icon: '🏢' },
  { value: '10+', label: 'Năm kinh nghiệm', icon: '⭐' },
  { value: '100%', label: 'Đúng hạn nộp thuế', icon: '✅' },
  { value: '0đ', label: 'Phí phạt phát sinh', icon: '🛡️' },
];

const trustSignals = [
  'Không phạt thuế muộn',
  'Bảo mật thông tin tuyệt đối',
  'Tư vấn không giới hạn',
];

/* ─── Services ──────────────────────────────────────────────── */
const services = [
  { icon: '📋', title: 'Kê khai thuế GTGT', desc: 'Kê khai theo tháng/quý đúng hạn, nộp qua eTax, không phạt muộn.', from: '500.000đ/tháng', tag: 'Phổ biến' },
  { icon: '📊', title: 'Kế toán trọn gói', desc: 'Hạch toán, sổ sách, báo cáo tài chính — không cần kế toán nội bộ.', from: '1.500.000đ/tháng', tag: '' },
  { icon: '🏢', title: 'Thành lập công ty', desc: 'Hồ sơ đăng ký doanh nghiệp nhanh trong 5 ngày làm việc.', from: '1.000.000đ', tag: '' },
  { icon: '🧾', title: 'Thuế TNDN', desc: 'Tối ưu thuế thu nhập doanh nghiệp hợp pháp, tiết kiệm đáng kể.', from: '500.000đ/tháng', tag: '' },
  { icon: '💰', title: 'Hoàn thuế GTGT', desc: 'Lập hồ sơ hoàn thuế, theo dõi tiến trình, nhận hoàn thuế nhanh.', from: '2–5% số hoàn', tag: '' },
  { icon: '💡', title: 'Tư vấn tài chính', desc: 'Kế hoạch thuế dài hạn, cơ cấu doanh nghiệp, vay vốn ngân hàng.', from: '500.000đ/buổi', tag: '' },
];

/* ─── Pain points ───────────────────────────────────────────── */
const painPoints = [
  { emoji: '😰', pain: 'Lo lắng bị phạt thuế', solution: 'Chúng tôi nộp đúng hạn 100%, cam kết không phát sinh phạt.' },
  { emoji: '😵', pain: 'Không hiểu luật thuế', solution: 'Đội ngũ chuyên gia cập nhật luật liên tục, xử lý thay bạn.' },
  { emoji: '💸', pain: 'Chi phí kế toán full-time cao', solution: 'Dịch vụ thuê ngoài tiết kiệm 70% so với tuyển dụng nội bộ.' },
  { emoji: '⏰', pain: 'Mất thời gian làm giấy tờ', solution: 'Bàn giao tài liệu 1 lần, chúng tôi lo toàn bộ hàng tháng.' },
];

/* ─── Testimonials ──────────────────────────────────────────── */
const testimonials = [
  {
    name: 'Trần Minh Tuấn',
    role: 'Giám đốc Công ty Tuấn Phát',
    avatar: 'https://picsum.photos/seed/tuan2/64/64',
    content: 'Dùng dịch vụ 3 năm, chưa một lần bị phạt thuế. Báo cáo luôn đúng hạn, đội ngũ nhiệt tình. Giá rất hợp lý so với tự làm.',
    stars: 5,
    tag: 'Dịch vụ kế toán trọn gói',
  },
  {
    name: 'Nguyễn Thị Hoa',
    role: 'Chủ cửa hàng thời trang',
    avatar: 'https://picsum.photos/seed/hoa2/64/64',
    content: 'Trước không biết gì về thuế, từ khi có Sao Việt mọi thứ rõ ràng hơn nhiều. Giá cả minh bạch, không phát sinh gì thêm.',
    stars: 5,
    tag: 'Kê khai thuế hộ kinh doanh',
  },
  {
    name: 'Lê Quốc Bảo',
    role: 'CEO Startup công nghệ',
    avatar: 'https://picsum.photos/seed/bao2/64/64',
    content: 'Startup giai đoạn đầu, ngân sách eo hẹp — Sao Việt tư vấn gói phù hợp, giúp tiết kiệm so với thuê kế toán full-time. Rất recommend!',
    stars: 5,
    tag: 'Gói Cơ Bản cho Startup',
  },
];

/* ─── Pricing ───────────────────────────────────────────────── */
const plans = [
  {
    name: 'Cơ Bản',
    monthly: 500000,
    desc: 'Hộ kinh doanh, doanh nghiệp mới thành lập',
    features: [
      { text: 'Kê khai thuế GTGT', ok: true },
      { text: 'Kê khai thuế TNCN', ok: true },
      { text: 'Lệ phí môn bài', ok: true },
      { text: 'Hỗ trợ qua Zalo/Email', ok: true },
      { text: 'Báo cáo tài chính đầy đủ', ok: false },
      { text: 'Quyết toán thuế năm', ok: false },
    ],
    cta: 'Bắt đầu',
    highlight: false,
  },
  {
    name: 'Chuyên Nghiệp',
    monthly: 1500000,
    desc: 'Doanh nghiệp nhỏ và vừa đang hoạt động',
    features: [
      { text: 'Tất cả dịch vụ Cơ Bản', ok: true },
      { text: 'Báo cáo tài chính tháng/quý', ok: true },
      { text: 'Quyết toán thuế năm', ok: true },
      { text: 'Tư vấn thuế không giới hạn', ok: true },
      { text: 'Hỗ trợ khi thanh tra thuế', ok: true },
      { text: 'Kế toán trưởng riêng', ok: false },
    ],
    cta: 'Đăng ký ngay',
    highlight: true,
    badge: 'Phổ biến nhất',
  },
  {
    name: 'Doanh Nghiệp',
    monthly: 3000000,
    desc: 'Doanh nghiệp giao dịch nhiều, phức tạp',
    features: [
      { text: 'Tất cả dịch vụ Chuyên Nghiệp', ok: true },
      { text: 'Kế toán trưởng riêng', ok: true },
      { text: 'Lập kế hoạch tài chính', ok: true },
      { text: 'Hỗ trợ vay vốn ngân hàng', ok: true },
      { text: 'Tư vấn M&A cơ bản', ok: true },
      { text: 'Ưu tiên xử lý trong ngày', ok: true },
    ],
    cta: 'Liên hệ tư vấn',
    highlight: false,
  },
];

function formatVND(n) {
  return new Intl.NumberFormat('vi-VN').format(n);
}

/* ─── Component ─────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="pt-nav">

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-900 text-white">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-sky-500/10 rounded-full blur-2xl" />
          {/* Subtle grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Left: Copy */}
            <div>
              {/* Social proof pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
              >
                <div className="flex -space-x-1.5">
                  {['picsum.photos/seed/a1/24/24','picsum.photos/seed/a2/24/24','picsum.photos/seed/a3/24/24'].map((s, i) => (
                    <img key={i} src={`https://${s}`} alt="" className="w-6 h-6 rounded-full border-2 border-white/40 object-cover" />
                  ))}
                </div>
                <span className="text-sm text-white/90">
                  <span className="font-bold text-white">500+</span> doanh nghiệp tin dùng
                </span>
                <span className="text-amber-400 text-xs font-bold tracking-wide">★★★★★</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-6xl font-extrabold text-white leading-[1.15] tracking-tight mb-5"
              >
                Kế toán thuế{' '}
                <span className="text-amber-400">chuyên nghiệp</span>
                <br className="hidden sm:block" />
                — để bạn tập trung{' '}
                <span className="relative inline-block text-emerald-300">
                  kinh doanh
                  <svg className="absolute -bottom-1 left-0 w-full h-2 text-emerald-400/60" viewBox="0 0 200 8" fill="currentColor" aria-hidden>
                    <path d="M0,6 Q50,0 100,4 Q150,8 200,2 L200,8 L0,8 Z"/>
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="text-lg text-blue-100 leading-relaxed mb-7 max-w-lg"
              >
                Đội ngũ kế toán 10+ năm kinh nghiệm xử lý thuế, sổ sách, báo cáo —{' '}
                <span className="font-semibold text-white">đúng hạn, đúng luật, không lo phạt</span>.
                Chỉ từ <span className="font-bold text-amber-300">500.000đ/tháng</span>.
              </motion.p>

              {/* Trust checkmarks */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="flex flex-wrap gap-x-5 gap-y-2 mb-8"
              >
                {trustSignals.map((s) => (
                  <span key={s} className="flex items-center gap-1.5 text-sm text-blue-100 font-medium">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {s}
                  </span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link to="/lien-he" className="btn-white text-base px-7 py-3.5 shadow-lg">
                  Tư vấn miễn phí ngay
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="tel:0901234567"
                  className="flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 font-semibold px-5 py-3.5 rounded-lg transition-all text-base"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Gọi: 0901.234.567
                </a>
              </motion.div>

              {/* Micro-stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-4 gap-3 pt-6 border-t border-white/20"
              >
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <div className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{s.value}</div>
                    <div className="text-xs text-blue-200 leading-snug mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=80&auto=format&fit=crop"
                  alt="Kế toán chuyên nghiệp"
                  className="w-full h-72 object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-800 font-semibold text-sm">Cam kết không phạt thuế</p>
                      <p className="text-slate-500 text-xs">Nếu lỗi từ chúng tôi — hoàn toàn chịu trách nhiệm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two small images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80&auto=format&fit=crop"
                    alt="Đội ngũ tư vấn"
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-white text-xs font-semibold">Đội ngũ chuyên gia</p>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format&fit=crop"
                    alt="Báo cáo tài chính"
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-white text-xs font-semibold">Báo cáo minh bạch</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ TRUST LOGOS ═══════════════════════════════════════════ */}
      <TrustLogos />

      {/* ══ PAIN POINTS → SOLUTION ════════════════════════════════ */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-12">
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">Nhận ra bản thân không?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Những vấn đề phổ biến nhất của<br className="hidden md:block" /> doanh nghiệp khi tự làm kế toán
            </h2>
          </ScrollFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {painPoints.map((p, i) => (
              <ScrollFade key={p.pain} delay={i * 0.1}>
                <div className="flex gap-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl p-5">
                  <div className="text-3xl flex-shrink-0">{p.emoji}</div>
                  <div>
                    <p className="font-semibold text-slate-300 text-sm mb-1 line-through decoration-slate-500">{p.pain}</p>
                    <p className="text-white text-sm leading-relaxed">
                      <span className="text-emerald-400 font-semibold">→ </span>
                      {p.solution}
                    </p>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════ */}
      <HowItWorks />

      {/* ══ SERVICES ══════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4 shadow-sm">
              Dịch vụ của chúng tôi
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Mọi nhu cầu kế toán — <span className="text-gradient">một đối tác</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">Từ hộ kinh doanh đến doanh nghiệp vừa, chúng tôi có giải pháp phù hợp.</p>
          </ScrollFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ScrollFade key={s.title} delay={i * 0.08}>
                <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-50 transition-all duration-300 relative overflow-hidden">
                  {s.tag && (
                    <span className="absolute top-4 right-4 bg-primary-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{s.tag}</span>
                  )}
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-primary-600 transition-colors">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-semibold text-sm">{s.from}</span>
                    <Link to="/dich-vu" className="text-xs text-slate-400 hover:text-primary-600 font-medium transition-colors flex items-center gap-1">
                      Chi tiết
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>

          <ScrollFade className="text-center mt-8">
            <Link to="/dich-vu" className="btn-secondary">
              Xem đầy đủ dịch vụ và bảng giá
            </Link>
          </ScrollFade>
        </div>
      </section>

      {/* ══ TESTIMONIALS (grid) ═══════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              ★★★★★ Đánh giá từ khách hàng thực
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Được tin dùng bởi hàng trăm doanh nghiệp Việt
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">Đừng nghe chúng tôi nói — nghe khách hàng chia sẻ trải nghiệm thực tế.</p>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {testimonials.map((t, i) => (
              <ScrollFade key={t.name} delay={i * 0.1}>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
                  {/* Quote mark */}
                  <div className="text-5xl text-primary-100 font-serif leading-none mb-4 select-none">"</div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 -mt-3">{t.content}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-100" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-800 text-sm truncate">{t.name}</div>
                      <div className="text-xs text-slate-400 truncate">{t.role}</div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.stars }).map((_, j) => (
                          <svg key={j} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-[10px] text-slate-400 text-right mt-0.5">{t.tag}</div>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>

          {/* Aggregate rating bar */}
          <ScrollFade className="max-w-sm mx-auto">
            <div className="flex items-center justify-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-6 py-3">
              <span className="text-3xl font-extrabold text-amber-500">4.9</span>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-slate-500">Dựa trên 300+ đánh giá của khách hàng</p>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ══ PRICING ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium px-4 py-1.5 rounded-full mb-4 shadow-sm">
              Bảng giá minh bạch — không phí ẩn
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Chọn gói phù hợp</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Hợp đồng cố định 1 năm, giá không đổi. Nâng hoặc hạ gói bất cứ lúc nào.
            </p>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {plans.map((plan, i) => (
              <ScrollFade key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl overflow-hidden ${
                    plan.highlight
                      ? 'ring-2 ring-primary-500 shadow-2xl shadow-primary-100 scale-[1.02]'
                      : 'bg-white border border-slate-100 shadow-sm'
                  }`}
                >
                  {plan.highlight && (
                    <div className="bg-gradient-to-r from-primary-600 to-indigo-600 py-1.5 text-center">
                      <span className="text-white text-xs font-bold tracking-wide uppercase">{plan.badge}</span>
                    </div>
                  )}
                  <div className={`p-7 ${plan.highlight ? 'bg-white' : ''}`}>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">{plan.name}</h3>
                    <p className="text-slate-400 text-xs mb-5">{plan.desc}</p>

                    <div className="mb-6">
                      <span className="text-4xl font-extrabold text-slate-900">{formatVND(plan.monthly)}</span>
                      <span className="text-slate-400 text-sm ml-1">đ/tháng</span>
                    </div>

                    <ul className="space-y-2.5 mb-7">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-center gap-2.5 text-sm">
                          {f.ok ? (
                            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-slate-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span className={f.ok ? 'text-slate-700' : 'text-slate-300'}>{f.text}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/lien-he"
                      className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-primary-600 to-indigo-600 text-white hover:opacity-90 shadow-lg shadow-primary-200'
                          : 'bg-slate-900 text-white hover:bg-slate-700'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>

          {/* Cost comparison insight */}
          <ScrollFade className="mt-10">
            <div className="max-w-2xl mx-auto bg-white border border-emerald-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
              <div className="text-4xl flex-shrink-0">💡</div>
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">So sánh chi phí với thuê kế toán nội bộ</p>
                <p className="text-slate-500 text-sm">Kế toán full-time tại TP.HCM: lương + BHXH ≈ <span className="font-bold text-red-500 line-through">12–18 triệu/tháng</span>. Gói Chuyên Nghiệp của chúng tôi: <span className="font-bold text-emerald-600">1.5 triệu/tháng</span> — tiết kiệm hơn 80%.</p>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Ưu đãi tháng này: Miễn phí tháng đầu tiên
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Sẵn sàng để ngừng lo về thuế?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Hơn 500 doanh nghiệp đã chọn Sao Việt để yên tâm kinh doanh. Đăng ký hôm nay, bắt đầu ngay trong tuần.
            </p>

            {/* Guarantee bar */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Hoàn tiền trong 30 ngày nếu không hài lòng', 'Không ràng buộc hợp đồng dài hạn', 'Hỗ trợ 7 ngày/tuần qua Zalo'].map((g) => (
                <span key={g} className="flex items-center gap-1.5 text-sm text-white/80">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {g}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/lien-he" className="btn-white px-8 py-4 text-base shadow-xl">
                Đăng ký tư vấn miễn phí
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-4 rounded-lg transition-all text-base"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
                Chat Zalo ngay
              </a>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Câu hỏi thường gặp</h2>
            <p className="text-slate-500">Không tìm thấy câu trả lời? <Link to="/lien-he" className="text-primary-600 hover:underline font-medium">Hỏi trực tiếp chuyên viên</Link></p>
          </ScrollFade>
          <ScrollFade>
            <FAQ />
          </ScrollFade>
        </div>
      </section>
    </div>
  );
}
