import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';

const team = [
  {
    name: 'Phan Việt Hùng',
    role: 'Founder & Giám đốc Điều hành',
    avatar: 'https://picsum.photos/seed/hung2026/200/200',
    desc: 'Người sáng lập SORATA Advisory. Tư vấn tài chính – kế toán với phương châm đồng hành thực sự, không chỉ xử lý số liệu.',
    certs: ['Founder SORATA', 'Tư vấn Tài chính Doanh nghiệp'],
    phone: '0977.457.676',
    email: 'phanviethungtk@gmail.com',
  },
  {
    name: 'Nguyễn Thị Hà',
    role: 'Trưởng phòng Vận hành',
    avatar: 'https://picsum.photos/seed/ha2026/200/200',
    desc: 'Phụ trách vận hành toàn bộ quy trình dịch vụ, đảm bảo mọi hồ sơ được xử lý đúng hạn và chính xác.',
    certs: ['Quản lý Vận hành', 'Kế toán viên hành nghề'],
    phone: '0352.355.060',
    email: 'hanguyen.hmh@gmail.com',
  },
  {
    name: 'Nguyễn Thanh Nga',
    role: 'Chuyên viên Kế toán',
    avatar: 'https://picsum.photos/seed/nga2026/200/200',
    desc: 'Chuyên xử lý kê khai thuế, hạch toán sổ sách và lập báo cáo tài chính. Thành thạo MISA và HTKK.',
    certs: ['Chứng chỉ Kế toán', 'Chứng chỉ MISA'],
    phone: '0988.655.191',
    email: 'thanhnga.dng@gmail.com',
  },
];

const milestones = [
  { year: '2013', event: 'Thành lập Công ty TNHH Kế Toán Thuế Sao Việt' },
  { year: '2015', event: 'Đạt 100 khách hàng đầu tiên, mở rộng dịch vụ toàn quốc' },
  { year: '2018', event: 'Ra mắt nền tảng kế toán online, hỗ trợ remote 24/7' },
  { year: '2020', event: 'Vượt mốc 300 khách hàng, nhận giải thưởng Dịch vụ xuất sắc' },
  { year: '2022', event: 'Mở thêm bộ phận Đào tạo, triển khai khóa học kế toán thực tế' },
  { year: '2024', event: 'Hơn 500 khách hàng, đội ngũ 20+ nhân viên, phủ khắp Việt Nam' },
];

const certs = [
  { title: 'Chứng chỉ Hành nghề Kế toán', issuer: 'Bộ Tài chính Việt Nam' },
  { title: 'Chứng nhận Đại lý Thuế', issuer: 'Tổng cục Thuế' },
  { title: 'Thành viên Hội Kế toán Kiểm toán Việt Nam (VAA)', issuer: 'VAA' },
  { title: 'ISO 9001:2015 — Quản lý chất lượng dịch vụ', issuer: 'Bureau Veritas' },
];

export default function About() {
  return (
    <div className="pt-nav">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Giới thiệu</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Về Kế Toán Sao Việt</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Hơn 10 năm đồng hành cùng doanh nghiệp Việt Nam. Chuyên nghiệp, tận tâm, đáng tin cậy.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollFade>
              <div className="inline-block bg-primary-50 text-primary-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Câu chuyện của chúng tôi</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Không chỉ "làm xong" — chúng tôi đồng hành thực sự</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">SORATA Advisory</strong> — viết tắt của <em>Solution-driven, Responsible, Aligned Together in Action</em> — được thành lập bởi Phan Việt Hùng với một mong muốn đơn giản: tạo ra dịch vụ kế toán mà khách hàng thực sự hiểu mình đang ở đâu về tài chính.
                </p>
                <p>
                  Phần lớn dịch vụ kế toán trên thị trường chỉ "làm xong là xong" — nộp báo cáo, thu phí, rồi im lặng. Chúng tôi tin rằng một đối tác kế toán tốt phải giúp khách hàng <strong className="text-slate-800">nhận ra rủi ro sớm, hiểu số liệu của mình</strong>, và đưa ra quyết định kinh doanh tự tin hơn.
                </p>
                <p>
                  Từ một đội nhỏ với từng khách hàng được chăm sóc trực tiếp, SORATA đang từng bước xây dựng nền tảng kế toán – tư vấn bền vững, hướng tới phục vụ hàng trăm doanh nghiệp Việt Nam đang phát triển.
                </p>
              </div>
            </ScrollFade>

            <ScrollFade direction="left">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-600 text-white rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold mb-1">500+</div>
                  <div className="text-blue-100 text-sm">Khách hàng</div>
                </div>
                <div className="bg-slate-800 text-white rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold mb-1">10+</div>
                  <div className="text-slate-300 text-sm">Năm kinh nghiệm</div>
                </div>
                <div className="bg-emerald-600 text-white rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold mb-1">100%</div>
                  <div className="text-emerald-100 text-sm">Đúng hạn</div>
                </div>
                <div className="bg-amber-500 text-white rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold mb-1">20+</div>
                  <div className="text-amber-100 text-sm">Nhân viên</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="bg-primary-50 border border-primary-100 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-primary-700">Tầm nhìn</h4>
                  </div>
                  <p className="text-slate-600 text-sm">Trở thành đối tác tư vấn tài chính – kế toán đáng tin cậy nhất cho các doanh nghiệp Việt Nam đang trên đà phát triển.</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-indigo-700">Sứ mệnh</h4>
                  </div>
                  <p className="text-slate-600 text-sm">Giúp khách hàng thực sự hiểu tài chính của họ, nhận diện rủi ro kịp thời và đưa ra quyết định kinh doanh sáng suốt — không chỉ "làm xong là xong".</p>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-12">
            <h2 className="section-title">Hành trình phát triển</h2>
          </ScrollFade>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200" aria-hidden />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <ScrollFade key={m.year} delay={i * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="w-16 flex-shrink-0 flex flex-col items-center">
                      <div className="w-4 h-4 bg-primary-600 rounded-full border-2 border-white shadow-md z-10" />
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex-1">
                      <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full mb-2">{m.year}</span>
                      <p className="text-slate-700 text-sm font-medium">{m.event}</p>
                    </div>
                  </div>
                </ScrollFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-12">
            <h2 className="section-title">Đội ngũ chuyên gia</h2>
            <p className="section-subtitle">Mỗi thành viên đều có chứng chỉ hành nghề và kinh nghiệm thực tế sâu sắc.</p>
          </ScrollFade>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <ScrollFade key={member.name} delay={i * 0.1}>
                <div className="card p-6 text-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-primary-100"
                  />
                  <h3 className="font-bold text-slate-800 mb-1">{member.name}</h3>
                  <p className="text-primary-600 text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4">{member.desc}</p>
                  <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                    {member.certs.map((c) => (
                      <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 pt-3 space-y-1.5">
                    <a href={`tel:${member.phone.replace(/\./g, '')}`} className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {member.phone}
                    </a>
                    <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {member.email}
                    </a>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Chứng chỉ & Công nhận</h2>
          </ScrollFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certs.map((cert, i) => (
              <ScrollFade key={cert.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-primary-100">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{cert.title}</div>
                    <div className="text-xs text-slate-400">{cert.issuer}</div>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <h2 className="text-3xl font-bold mb-4">Hãy để chúng tôi đồng hành cùng bạn</h2>
            <p className="text-blue-100 mb-6">Tư vấn miễn phí, không ràng buộc. Gặp gỡ đội ngũ của chúng tôi hôm nay.</p>
            <Link to="/lien-he" className="btn-white">Liên hệ ngay</Link>
          </ScrollFade>
        </div>
      </section>
    </div>
  );
}
