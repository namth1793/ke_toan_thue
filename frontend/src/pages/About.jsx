import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';

const team = [
  {
    name: 'Nguyễn Thị Minh Châu',
    role: 'Giám đốc & Kế toán trưởng',
    avatar: 'https://picsum.photos/seed/chau/200/200',
    desc: '15 năm kinh nghiệm kế toán doanh nghiệp. Cựu kiểm toán viên Big4. Chuyên gia thuế được công nhận.',
    certs: ['CPA Việt Nam', 'ACCA Part Qualified'],
  },
  {
    name: 'Trần Văn Hoàng',
    role: 'Trưởng phòng Thuế',
    avatar: 'https://picsum.photos/seed/hoang/200/200',
    desc: '12 năm kinh nghiệm tư vấn thuế. Chuyên xử lý các trường hợp hoàn thuế và thanh tra thuế phức tạp.',
    certs: ['Chứng chỉ Tư vấn Thuế', 'Kế toán viên hành nghề'],
  },
  {
    name: 'Lê Thị Thu Hà',
    role: 'Chuyên viên Kế toán cao cấp',
    avatar: 'https://picsum.photos/seed/ha/200/200',
    desc: '8 năm kinh nghiệm kế toán cho startup và SME. Thành thạo MISA, Fast Accounting, QuickBooks.',
    certs: ['Thạc sỹ Kế toán', 'Chứng chỉ MISA'],
  },
  {
    name: 'Phạm Quốc Dũng',
    role: 'Chuyên viên Tư vấn Doanh nghiệp',
    avatar: 'https://picsum.photos/seed/dung/200/200',
    desc: '7 năm tư vấn thành lập doanh nghiệp. Hơn 200 công ty được hỗ trợ thành lập thành công.',
    certs: ['Luật Kinh tế', 'Chứng chỉ Tư vấn Đầu tư'],
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Được thành lập từ niềm tin vào sự minh bạch</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Kế Toán Sao Việt được thành lập năm 2013 bởi bà Nguyễn Thị Minh Châu — một kế toán viên với 15 năm kinh nghiệm tại các tập đoàn lớn và công ty kiểm toán quốc tế.
                </p>
                <p>
                  Xuất phát từ nhu cầu thực tế của hàng nghìn doanh nghiệp nhỏ và vừa — thiếu nguồn lực để có kế toán chuyên nghiệp nhưng lại cần sự chính xác và đúng hạn — chúng tôi tạo ra một mô hình dịch vụ kế toán thuê ngoài với chi phí hợp lý nhất thị trường.
                </p>
                <p>
                  Sau hơn 10 năm, chúng tôi tự hào đã phục vụ hơn 500 khách hàng từ các hộ kinh doanh nhỏ đến doanh nghiệp có doanh thu hàng trăm tỷ đồng — không một lần để khách hàng bị phạt thuế do lỗi của chúng tôi.
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
                  <h4 className="font-bold text-primary-700 mb-2">🎯 Tầm nhìn</h4>
                  <p className="text-slate-600 text-sm">Trở thành đối tác kế toán tin cậy số 1 cho doanh nghiệp nhỏ và vừa tại Việt Nam.</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                  <h4 className="font-bold text-indigo-700 mb-2">💎 Sứ mệnh</h4>
                  <p className="text-slate-600 text-sm">Giúp mọi doanh nghiệp, dù nhỏ nhất, được tiếp cận dịch vụ kế toán chuyên nghiệp với chi phí hợp lý.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {member.certs.map((c) => (
                      <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c}</span>
                    ))}
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
