import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';
import ContactForm from '../components/ContactForm';

const services = [
  {
    id: 'ke-khai-thue',
    icon: '📋',
    title: 'Kê Khai Thuế',
    color: 'border-blue-500 bg-blue-50',
    iconBg: 'bg-blue-100 text-blue-600',
    desc: 'Dịch vụ kê khai và nộp thuế đầy đủ theo đúng quy định của Tổng cục Thuế. Đảm bảo không phát sinh phạt do nộp trễ hoặc sai sót.',
    benefits: [
      'Kê khai thuế GTGT theo tháng/quý',
      'Kê khai thuế Thu nhập cá nhân (TNCN)',
      'Kê khai thuế Thu nhập doanh nghiệp (TNDN)',
      'Kê khai lệ phí môn bài hàng năm',
      'Nộp hồ sơ qua mạng (eTax), không cần ra cơ quan thuế',
      'Theo dõi và nhắc lịch kê khai định kỳ',
    ],
    pricing: 'Từ 500.000đ/tháng',
    pricingNote: 'Tùy theo quy mô giao dịch và loại hình doanh nghiệp',
  },
  {
    id: 'ke-toan-dich-vu',
    icon: '📊',
    title: 'Dịch Vụ Kế Toán',
    color: 'border-indigo-500 bg-indigo-50',
    iconBg: 'bg-indigo-100 text-indigo-600',
    desc: 'Dịch vụ kế toán trọn gói từ hạch toán chứng từ đến lập báo cáo tài chính cuối năm. Doanh nghiệp không cần tuyển dụng kế toán nội bộ.',
    benefits: [
      'Hạch toán toàn bộ chứng từ phát sinh',
      'Lập sổ sách kế toán theo chuẩn VAS',
      'Báo cáo tài chính hàng tháng/quý/năm',
      'Quyết toán thuế TNDN cuối năm',
      'Lưu trữ hồ sơ kế toán điện tử',
      'Sử dụng phần mềm MISA/Fast theo yêu cầu',
    ],
    pricing: 'Từ 1.500.000đ/tháng',
    pricingNote: 'Phụ thuộc số lượng hóa đơn và phức tạp của nghiệp vụ',
  },
  {
    id: 'thanh-lap-cong-ty',
    icon: '🏢',
    title: 'Thành Lập Công Ty',
    color: 'border-emerald-500 bg-emerald-50',
    iconBg: 'bg-emerald-100 text-emerald-600',
    desc: 'Hỗ trợ đăng ký thành lập doanh nghiệp nhanh chóng, đúng quy định pháp luật. Hoàn thiện toàn bộ hồ sơ ban đầu chỉ trong 5 ngày làm việc.',
    benefits: [
      'Tư vấn chọn loại hình doanh nghiệp phù hợp',
      'Soạn thảo Điều lệ và hồ sơ thành lập',
      'Nộp hồ sơ trực tuyến qua Cổng quốc gia',
      'Nhận Giấy phép đăng ký kinh doanh',
      'Khắc dấu pháp nhân tròn + chữ ký',
      'Đăng ký thuế, hóa đơn điện tử ban đầu',
    ],
    pricing: 'Trọn gói từ 1.000.000đ',
    pricingNote: 'Không bao gồm lệ phí Nhà nước (50.000đ)',
  },
  {
    id: 'bao-cao-tai-chinh',
    icon: '📈',
    title: 'Báo Cáo Tài Chính',
    color: 'border-amber-500 bg-amber-50',
    iconBg: 'bg-amber-100 text-amber-600',
    desc: 'Lập báo cáo tài chính theo chuẩn mực kế toán Việt Nam (VAS), phục vụ mục đích nội bộ, ngân hàng, và cơ quan thuế.',
    benefits: [
      'Bảng cân đối kế toán (Balance Sheet)',
      'Báo cáo kết quả hoạt động kinh doanh',
      'Báo cáo lưu chuyển tiền tệ',
      'Thuyết minh báo cáo tài chính',
      'Phân tích các chỉ số tài chính quan trọng',
      'Hỗ trợ kiểm toán nếu cần thiết',
    ],
    pricing: 'Từ 2.000.000đ/bộ báo cáo',
    pricingNote: 'Tùy theo quy mô và số lượng bút toán trong kỳ',
  },
  {
    id: 'hoan-thue',
    icon: '💰',
    title: 'Hoàn Thuế GTGT',
    color: 'border-cyan-500 bg-cyan-50',
    iconBg: 'bg-cyan-100 text-cyan-600',
    desc: 'Hỗ trợ lập hồ sơ hoàn thuế GTGT cho doanh nghiệp xuất khẩu hoặc có số thuế đầu vào lớn hơn đầu ra trong thời gian dài.',
    benefits: [
      'Kiểm tra điều kiện đủ để hoàn thuế',
      'Lập hồ sơ đề nghị hoàn thuế đầy đủ',
      'Nộp hồ sơ và theo dõi tiến trình',
      'Làm việc với cơ quan thuế khi kiểm tra',
      'Tư vấn tối ưu dòng tiền từ hoàn thuế',
      'Xử lý các vướng mắc phát sinh',
    ],
    pricing: 'Phí dịch vụ 2–5% số tiền hoàn',
    pricingNote: 'Hoặc theo phương án thoả thuận cụ thể',
  },
  {
    id: 'tu-van-tai-chinh',
    icon: '💡',
    title: 'Tư Vấn Tài Chính',
    color: 'border-purple-500 bg-purple-50',
    iconBg: 'bg-purple-100 text-purple-600',
    desc: 'Tư vấn chiến lược tài chính, lập kế hoạch thuế dài hạn và tối ưu cấu trúc doanh nghiệp để tiết kiệm chi phí hợp pháp.',
    benefits: [
      'Phân tích tình hình tài chính doanh nghiệp',
      'Lập kế hoạch tối ưu thuế hợp pháp',
      'Tư vấn cơ cấu vốn và huy động đầu tư',
      'Hỗ trợ vay vốn ngân hàng (chuẩn bị hồ sơ)',
      'Tư vấn đầu tư & mở rộng kinh doanh',
      'Giải pháp giảm chi phí, tăng lợi nhuận',
    ],
    pricing: 'Từ 500.000đ/buổi tư vấn',
    pricingNote: 'Hoặc gói tư vấn theo tháng từ 2.000.000đ',
  },
];

export default function Services() {
  return (
    <div className="pt-nav">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Dịch vụ</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dịch vụ kế toán thuế</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Giải pháp kế toán và thuế toàn diện cho mọi loại hình doanh nghiệp. Chuyên nghiệp, đúng hạn, bảo mật.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((svc, i) => (
              <ScrollFade key={svc.id}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className={`inline-flex items-center gap-3 mb-4`}>
                      <span className={`w-12 h-12 rounded-xl ${svc.iconBg} flex items-center justify-center text-2xl`}>{svc.icon}</span>
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

                  <div className={`border-l-4 ${svc.color} rounded-2xl p-6 ${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <h4 className="font-semibold text-slate-700 mb-4">Bao gồm:</h4>
                    <ul className="space-y-3">
                      {svc.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3">
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
            ))}
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
