const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'ke_toan_thue.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    thumbnail TEXT,
    category TEXT DEFAULT 'Thuế',
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    duration TEXT,
    price INTEGER,
    target TEXT,
    description TEXT,
    level TEXT DEFAULT 'Cơ bản',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
  );
`);

// Seed blog posts
const postCount = db.prepare('SELECT COUNT(*) as c FROM blog_posts').get().c;
if (postCount === 0) {
  const insertPost = db.prepare(`
    INSERT INTO blog_posts (title, slug, excerpt, content, thumbnail, category, views)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const posts = [
    {
      title: 'Hướng dẫn kê khai thuế GTGT theo quý năm 2024',
      slug: 'ke-khai-thue-gtgt-theo-quy-2024',
      excerpt: 'Cập nhật đầy đủ quy trình kê khai thuế giá trị gia tăng theo quý, những thay đổi mới nhất và cách tránh các lỗi phổ biến.',
      content: `Thuế giá trị gia tăng (GTGT) là một trong những loại thuế quan trọng nhất mà doanh nghiệp cần kê khai định kỳ. Từ năm 2024, có một số thay đổi quan trọng mà kế toán cần nắm rõ.

## Đối tượng kê khai thuế GTGT theo quý

Doanh nghiệp có doanh thu năm trước dưới 50 tỷ đồng được phép kê khai thuế GTGT theo quý thay vì theo tháng.

## Thời hạn nộp tờ khai

- Quý I: Nộp trước ngày 30/4
- Quý II: Nộp trước ngày 31/7
- Quý III: Nộp trước ngày 31/10
- Quý IV: Nộp trước ngày 31/1 năm sau

## Các lỗi thường gặp cần tránh

1. Khai sai mã số thuế của bên mua/bán
2. Không kê khai hóa đơn điều chỉnh
3. Bỏ sót hóa đơn đầu vào của tháng trước
4. Nhập sai số tiền trên hóa đơn`,
      thumbnail: 'https://picsum.photos/seed/tax-gvat/800/450',
      category: 'Thuế',
      views: 1240,
    },
    {
      title: 'Những thay đổi quan trọng trong Luật Thuế TNDN 2024',
      slug: 'thay-doi-luat-thue-tndn-2024',
      excerpt: 'Tổng hợp các điểm mới trong chính sách thuế thu nhập doanh nghiệp năm 2024 mà mọi chủ doanh nghiệp cần biết.',
      content: `Năm 2024, Luật Thuế Thu nhập doanh nghiệp có một số điều chỉnh quan trọng ảnh hưởng trực tiếp đến chi phí thuế của doanh nghiệp.

## Ưu đãi thuế cho doanh nghiệp nhỏ và vừa

Doanh nghiệp có tổng doanh thu năm không quá 3 tỷ đồng được áp dụng thuế suất ưu đãi 15%.

## Chi phí được trừ khi tính thuế

- Chi phí quảng cáo, marketing: tối đa 15% tổng chi phí hợp lý
- Chi phí phúc lợi cho người lao động: tối đa 1 triệu đồng/người/tháng
- Chi phí khấu hao tài sản cố định theo đúng chế độ

## Lưu ý quan trọng

Doanh nghiệp cần lưu trữ đầy đủ hóa đơn, chứng từ để chứng minh chi phí hợp lý khi cơ quan thuế thanh tra.`,
      thumbnail: 'https://picsum.photos/seed/tax-tndn/800/450',
      category: 'Thuế',
      views: 987,
    },
    {
      title: 'Kế toán doanh nghiệp: 7 lỗi phổ biến cần tránh ngay',
      slug: 'ke-toan-doanh-nghiep-loi-pho-bien',
      excerpt: 'Từ kinh nghiệm thực tế, chúng tôi tổng hợp 7 lỗi kế toán phổ biến nhất mà doanh nghiệp nhỏ thường mắc phải và cách khắc phục.',
      content: `Trong quá trình tư vấn cho hàng trăm doanh nghiệp, chúng tôi nhận thấy có 7 lỗi kế toán mà hầu hết doanh nghiệp nhỏ đều mắc phải.

## Lỗi 1: Không tách biệt tài khoản cá nhân và doanh nghiệp

Đây là lỗi nghiêm trọng nhất. Khi trộn lẫn tài chính cá nhân với doanh nghiệp, bạn không thể theo dõi lợi nhuận thực sự.

## Lỗi 2: Không hạch toán doanh thu ngay khi phát sinh

Nhiều chủ doanh nghiệp chỉ ghi nhận doanh thu khi nhận được tiền, nhưng theo chuẩn mực kế toán Việt Nam, doanh thu phải ghi nhận khi hoàn thành dịch vụ.

## Lỗi 3: Bỏ qua chi phí nhỏ lẻ

Những khoản chi dưới 200,000đ thường bị bỏ qua nhưng tích lũy lại rất đáng kể.

## Lỗi 4: Không lưu trữ hóa đơn đầy đủ

Hóa đơn là bằng chứng hợp lệ cho mọi giao dịch. Mất hóa đơn đồng nghĩa với mất chi phí được trừ thuế.`,
      thumbnail: 'https://picsum.photos/seed/accounting-err/800/450',
      category: 'Kế toán',
      views: 2150,
    },
    {
      title: 'Thủ tục thành lập công ty TNHH một thành viên 2024',
      slug: 'thu-tuc-thanh-lap-cong-ty-tnhh-mot-thanh-vien-2024',
      excerpt: 'Hướng dẫn chi tiết từng bước thủ tục đăng ký thành lập công ty TNHH một thành viên, hồ sơ cần chuẩn bị và thời gian xử lý.',
      content: `Thành lập công ty TNHH một thành viên là lựa chọn phổ biến của nhiều doanh nhân Việt Nam. Dưới đây là quy trình đầy đủ nhất năm 2024.

## Hồ sơ cần chuẩn bị

1. Giấy đề nghị đăng ký doanh nghiệp
2. Điều lệ công ty
3. Bản sao CCCD/hộ chiếu của chủ sở hữu
4. Giấy tờ về địa chỉ trụ sở (hợp đồng thuê/sổ đỏ)

## Quy trình thực hiện

**Bước 1**: Chuẩn bị hồ sơ (2-3 ngày)
**Bước 2**: Nộp hồ sơ tại Sở KHĐT (trực tuyến hoặc trực tiếp)
**Bước 3**: Nhận Giấy chứng nhận đăng ký doanh nghiệp (3 ngày làm việc)
**Bước 4**: Khắc dấu pháp nhân
**Bước 5**: Mở tài khoản ngân hàng doanh nghiệp
**Bước 6**: Đăng ký chữ ký số và phần mềm hóa đơn điện tử

## Chi phí ước tính

- Phí đăng ký: 50,000đ (nộp online)
- Dịch vụ trọn gói: từ 1,000,000đ - 2,000,000đ`,
      thumbnail: 'https://picsum.photos/seed/company-reg/800/450',
      category: 'Kinh doanh',
      views: 3420,
    },
    {
      title: 'Hóa đơn điện tử: Cập nhật quy định mới nhất 2024',
      slug: 'hoa-don-dien-tu-quy-dinh-moi-2024',
      excerpt: 'Tất cả doanh nghiệp bắt buộc sử dụng hóa đơn điện tử từ 2022. Cập nhật những điểm mới nhất về quy định và cách xử lý hóa đơn sai sót.',
      content: `Kể từ ngày 01/07/2022, toàn bộ doanh nghiệp Việt Nam bắt buộc phải sử dụng hóa đơn điện tử thay thế hóa đơn giấy.

## Các loại hóa đơn điện tử

1. **Hóa đơn GTGT**: Dành cho cơ sở kinh doanh kê khai theo phương pháp khấu trừ
2. **Hóa đơn bán hàng**: Dành cho cơ sở kê khai theo phương pháp trực tiếp
3. **Hóa đơn xuất khẩu**: Cho hàng hóa, dịch vụ xuất khẩu

## Cách xử lý hóa đơn sai sót

- **Sai thông tin người mua**: Lập hóa đơn điều chỉnh hoặc thay thế
- **Sai số tiền**: Lập hóa đơn điều chỉnh giảm/tăng
- **Hóa đơn đã gửi CQT nhưng sai**: Lập biên bản điều chỉnh + hóa đơn mới

## Lưu ý quan trọng

Không được xóa, sửa trực tiếp hóa đơn đã phát hành. Mọi điều chỉnh phải thông qua hóa đơn điều chỉnh hoặc thay thế.`,
      thumbnail: 'https://picsum.photos/seed/einvoice/800/450',
      category: 'Kế toán',
      views: 1876,
    },
    {
      title: 'So sánh các loại hình doanh nghiệp: Nên chọn loại nào?',
      slug: 'so-sanh-loai-hinh-doanh-nghiep',
      excerpt: 'TNHH hay cổ phần? Doanh nghiệp tư nhân hay hộ kinh doanh? Phân tích chi tiết ưu nhược điểm từng loại để giúp bạn đưa ra lựa chọn phù hợp.',
      content: `Khi khởi nghiệp, việc lựa chọn loại hình doanh nghiệp phù hợp sẽ ảnh hưởng lớn đến chi phí, trách nhiệm pháp lý và khả năng phát triển.

## 1. Hộ Kinh Doanh

**Phù hợp**: Buôn bán nhỏ lẻ, dịch vụ cá nhân
**Ưu điểm**: Thủ tục đơn giản, chi phí thấp
**Nhược điểm**: Chịu trách nhiệm vô hạn, không được phép mở chi nhánh

## 2. Công ty TNHH Một Thành Viên

**Phù hợp**: Doanh nghiệp nhỏ, khởi nghiệp cá nhân
**Ưu điểm**: Chịu trách nhiệm hữu hạn, cơ cấu đơn giản
**Nhược điểm**: Khó huy động vốn từ nhiều nhà đầu tư

## 3. Công ty TNHH Hai Thành Viên Trở Lên

**Phù hợp**: Hợp tác kinh doanh nhóm
**Ưu điểm**: Chia sẻ rủi ro, góp vốn linh hoạt
**Nhược điểm**: Cần thỏa thuận rõ ràng giữa các thành viên

## 4. Công ty Cổ Phần

**Phù hợp**: Doanh nghiệp lớn, cần huy động vốn
**Ưu điểm**: Dễ huy động vốn, có thể niêm yết
**Nhược điểm**: Thủ tục phức tạp, quản trị chặt chẽ hơn`,
      thumbnail: 'https://picsum.photos/seed/business-type/800/450',
      category: 'Kinh doanh',
      views: 2680,
    },
  ];

  for (const p of posts) {
    insertPost.run(p.title, p.slug, p.excerpt, p.content, p.thumbnail, p.category, p.views);
  }
  console.log('✅ Seeded 6 blog posts');
}

// Seed courses
const courseCount = db.prepare('SELECT COUNT(*) as c FROM courses').get().c;
if (courseCount === 0) {
  const insertCourse = db.prepare(`
    INSERT INTO courses (name, slug, duration, price, target, description, level)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const courses = [
    {
      name: 'Kê Khai Thuế Cơ Bản',
      slug: 'ke-khai-thue-co-ban',
      duration: '1 tháng (8 buổi)',
      price: 1500000,
      target: 'Người mới bắt đầu, chủ hộ kinh doanh',
      description: 'Khóa học giúp bạn nắm vững các loại thuế cơ bản: GTGT, TNCN, TNDN. Thực hành trực tiếp trên phần mềm HTKK và iHTKK của Tổng cục Thuế.',
      level: 'Cơ bản',
    },
    {
      name: 'Kế Toán Doanh Nghiệp Thực Tế',
      slug: 'ke-toan-doanh-nghiep-thuc-te',
      duration: '3 tháng (24 buổi)',
      price: 3500000,
      target: 'Kế toán viên mới, sinh viên mới ra trường',
      description: 'Đào tạo kế toán từ A-Z: hạch toán, lập báo cáo tài chính, quyết toán năm. Thực hành trên phần mềm MISA và Fast Accounting.',
      level: 'Trung cấp',
    },
    {
      name: 'Thuế Nâng Cao Cho Doanh Nghiệp',
      slug: 'thue-nang-cao-doanh-nghiep',
      duration: '2 tháng (16 buổi)',
      price: 2500000,
      target: 'Quản lý tài chính, kế toán trưởng, chủ doanh nghiệp',
      description: 'Các chiến lược tối ưu thuế hợp pháp, lập kế hoạch thuế cho doanh nghiệp, cách ứng xử khi bị thanh tra thuế.',
      level: 'Nâng cao',
    },
    {
      name: 'Phần Mềm Kế Toán MISA',
      slug: 'phan-mem-ke-toan-misa',
      duration: '1 tháng (8 buổi)',
      price: 1800000,
      target: 'Kế toán viên, nhân viên văn phòng',
      description: 'Hướng dẫn sử dụng thành thạo phần mềm MISA SME.NET: nhập liệu, hạch toán, in sổ sách và báo cáo tài chính tự động.',
      level: 'Cơ bản',
    },
    {
      name: 'Thành Lập & Quản Lý Doanh Nghiệp',
      slug: 'thanh-lap-quan-ly-doanh-nghiep',
      duration: '2 buổi',
      price: 500000,
      target: 'Người muốn khởi nghiệp, chủ doanh nghiệp mới',
      description: 'Workshop 1 ngày: hướng dẫn chọn loại hình doanh nghiệp, đăng ký kinh doanh, mở tài khoản ngân hàng và các thủ tục ban đầu.',
      level: 'Cơ bản',
    },
    {
      name: 'Kế Toán Quản Trị & Phân Tích Tài Chính',
      slug: 'ke-toan-quan-tri-phan-tich-tai-chinh',
      duration: '2 tháng (16 buổi)',
      price: 3000000,
      target: 'Quản lý cấp trung, giám đốc tài chính',
      description: 'Xây dựng hệ thống kế toán quản trị, đọc và phân tích báo cáo tài chính, dự báo tài chính và ra quyết định kinh doanh.',
      level: 'Nâng cao',
    },
  ];

  for (const c of courses) {
    insertCourse.run(c.name, c.slug, c.duration, c.price, c.target, c.description, c.level);
  }
  console.log('✅ Seeded 6 courses');
}

// ─── ADMINS TABLE ─────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT DEFAULT 'Admin'
  );
  CREATE TABLE IF NOT EXISTS site_content (
    section TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const adminCount = db.prepare('SELECT COUNT(*) as c FROM admins').get().c;
if (adminCount === 0) {
  db.prepare('INSERT INTO admins (username, password, name) VALUES (?, ?, ?)').run(
    'admin',
    bcrypt.hashSync('admin123', 10),
    'Quản trị viên'
  );
  console.log('✅ Seeded admin account (admin / admin123)');
}

// ─── SITE CONTENT SEED ────────────────────────────────────────────────────────
const contentCount = db.prepare('SELECT COUNT(*) as c FROM site_content').get().c;
if (contentCount === 0) {
  const insertContent = db.prepare('INSERT INTO site_content (section, data) VALUES (?, ?)');

  // SETTINGS
  insertContent.run('settings', JSON.stringify({
    companyFullName: 'Công Ty TNHH SORATA Advisory',
    mst: '0312345678',
    address: '123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh',
    phone: '0977.457.676',
    zaloPhone: '0977457676',
    email: 'phanviethungtk@gmail.com',
    hours: 'T2–T7: 8:00 – 17:30',
    facebook: '#',
    zalo: '#',
    youtube: '#',
    announcement: {
      visible: true,
      label: 'Ưu đãi tháng 4:',
      text: 'Miễn phí tháng đầu khi đăng ký gói Chuyên Nghiệp trở lên',
      ctaText: 'Đăng ký ngay →',
      ctaLink: '/lien-he',
    },
  }));

  // HOME
  insertContent.run('home', JSON.stringify({
    hero: {
      badge: 'Hơn 500 doanh nghiệp tin dùng',
      headline: 'Kế toán – Thuế chuyên nghiệp cho doanh nghiệp Việt',
      subheadline: 'Chúng tôi xử lý toàn bộ kế toán – thuế để bạn tập trung kinh doanh. Đúng hạn, bảo mật, không phạt.',
      ctaText: 'Tư vấn miễn phí',
      ctaLink: '/lien-he',
      ctaSecondText: 'Xem dịch vụ',
      ctaSecondLink: '/dich-vu',
      stats: [
        { value: '500+', label: 'Doanh nghiệp' },
        { value: '10+', label: 'Năm kinh nghiệm' },
        { value: '100%', label: 'Đúng hạn nộp thuế' },
        { value: '0đ', label: 'Phí phạt phát sinh' },
      ],
      trustSignals: ['Không phạt thuế muộn', 'Bảo mật thông tin tuyệt đối', 'Tư vấn không giới hạn'],
    },
    services: {
      title: 'Giải pháp toàn diện cho mọi nhu cầu',
      subtitle: 'Từ khai thuế hàng tháng đến thành lập công ty — chúng tôi lo trọn gói.',
      items: [
        { icon: '📋', title: 'Kê khai thuế GTGT', desc: 'Kê khai theo tháng/quý đúng hạn, nộp qua eTax, không phạt muộn.', from: '500.000đ/tháng', tag: 'Phổ biến' },
        { icon: '📊', title: 'Kế toán trọn gói', desc: 'Hạch toán, sổ sách, báo cáo tài chính — không cần kế toán nội bộ.', from: '1.500.000đ/tháng', tag: '' },
        { icon: '🏢', title: 'Thành lập công ty', desc: 'Hoàn thiện hồ sơ thành lập doanh nghiệp đầy đủ chỉ trong 5 ngày.', from: '1.000.000đ/hồ sơ', tag: '' },
        { icon: '📈', title: 'Báo cáo tài chính', desc: 'Lập báo cáo tài chính theo chuẩn VAS đúng quy định pháp luật.', from: '2.000.000đ/bộ', tag: '' },
        { icon: '💰', title: 'Hoàn thuế GTGT', desc: 'Lập hồ sơ và theo dõi quá trình hoàn thuế GTGT cho doanh nghiệp.', from: '2–5% số tiền hoàn', tag: '' },
        { icon: '💡', title: 'Tư vấn tài chính', desc: 'Tối ưu cấu trúc thuế, lập kế hoạch tài chính để tiết kiệm chi phí.', from: '500.000đ/buổi', tag: '' },
      ],
    },
    howItWorks: {
      badge: 'Bắt đầu chỉ trong 24 giờ',
      title: 'Ba bước đơn giản để yên tâm kinh doanh',
      subtitle: 'Không cần hiểu biết về kế toán. Không cần thêm nhân viên. Chỉ cần một cuộc gọi.',
      steps: [
        { number: '01', icon: '💬', title: 'Liên hệ & Tư vấn miễn phí', desc: 'Gọi điện, nhắn Zalo hoặc điền form. Chuyên viên sẽ lắng nghe và đề xuất gói dịch vụ phù hợp nhất với quy mô và ngân sách của bạn.', detail: 'Trong vòng 30 phút' },
        { number: '02', icon: '📝', title: 'Ký hợp đồng & Bàn giao tài liệu', desc: 'Hợp đồng rõ ràng, minh bạch về phạm vi công việc và chi phí. Bạn chỉ cần cung cấp hóa đơn và chứng từ — chúng tôi lo phần còn lại.', detail: 'Trong ngày làm việc' },
        { number: '03', icon: '✅', title: 'Chúng tôi xử lý toàn bộ', desc: 'Đội kế toán chuyên nghiệp xử lý hạch toán, kê khai thuế, lập báo cáo — đúng hạn 100%. Bạn nhận thông báo kết quả và tập trung vào kinh doanh.', detail: 'Liên tục hàng tháng' },
      ],
    },
    testimonials: {
      title: 'Khách hàng nói gì về chúng tôi',
      subtitle: 'Hàng trăm doanh nghiệp đã tin tưởng và đồng hành cùng SORATA.',
      items: [
        { name: 'Trần Minh Tuấn', role: 'Giám đốc Công ty TNHH Tuấn Phát', avatar: 'https://picsum.photos/seed/tuan/80/80', content: 'Tôi đã dùng dịch vụ kế toán thuê ngoài của SORATA được 3 năm nay. Báo cáo tài chính luôn đúng hạn, không bao giờ bị phạt thuế muộn. Đội ngũ tư vấn rất chuyên nghiệp và nhiệt tình.', stars: 5 },
        { name: 'Nguyễn Thị Hoa', role: 'Chủ hộ kinh doanh thời trang', avatar: 'https://picsum.photos/seed/hoa/80/80', content: 'Trước đây tôi rất lo lắng về việc kê khai thuế vì không hiểu gì cả. Từ khi có SORATA hỗ trợ, mọi thứ trở nên đơn giản hơn rất nhiều. Chi phí cũng rất hợp lý so với thị trường.', stars: 5 },
        { name: 'Lê Quốc Bảo', role: 'Startup công nghệ — CEO & Co-founder', avatar: 'https://picsum.photos/seed/bao/80/80', content: 'Chúng tôi là startup giai đoạn đầu, ngân sách hạn chế. SORATA đã tư vấn gói dịch vụ phù hợp, giúp chúng tôi tiết kiệm đáng kể so với thuê kế toán full-time. Rất recommend!', stars: 5 },
        { name: 'Phạm Thị Lan', role: 'Chủ nhà hàng — Nhà hàng Hương Quê', avatar: 'https://picsum.photos/seed/lan/80/80', content: 'SORATA giúp tôi thành lập công ty chỉ trong 5 ngày làm việc, tư vấn tối ưu thuế giúp tiết kiệm được vài chục triệu mỗi năm. Đội ngũ luôn sẵn sàng giải đáp mọi câu hỏi.', stars: 5 },
      ],
    },
    faq: {
      title: 'Câu hỏi thường gặp',
      subtitle: 'Giải đáp những thắc mắc phổ biến nhất về dịch vụ kế toán thuê ngoài.',
      items: [
        { q: 'Dịch vụ kế toán thuê ngoài có an toàn và bảo mật không?', a: 'Hoàn toàn an toàn. Chúng tôi ký hợp đồng bảo mật thông tin với tất cả khách hàng. Dữ liệu kế toán được mã hóa và lưu trữ trên hệ thống bảo mật. Nhân viên kế toán được đào tạo về nguyên tắc bảo mật và chịu trách nhiệm pháp lý.' },
        { q: 'Thời gian bàn giao báo cáo tài chính là bao lâu?', a: 'Báo cáo tháng: bàn giao trước ngày 20 tháng tiếp theo. Báo cáo quyết toán năm: hoàn thành trước 31/3 năm sau. Kê khai thuế: hoàn thành và nộp đúng hạn theo quy định của Tổng cục Thuế.' },
        { q: 'Tôi cần chuẩn bị tài liệu gì để sử dụng dịch vụ?', a: 'Để bắt đầu, bạn cần cung cấp: Giấy phép kinh doanh, Mã số thuế, Tài khoản ngân hàng doanh nghiệp, Hóa đơn mua vào/bán ra trong kỳ, Bảng lương (nếu có nhân viên). Chúng tôi sẽ hướng dẫn chi tiết khi ký hợp đồng.' },
        { q: 'Chi phí dịch vụ có thay đổi trong quá trình sử dụng không?', a: 'Chi phí được cố định trong suốt thời hạn hợp đồng (thường 1 năm). Khi gia hạn, chúng tôi thông báo trước ít nhất 30 ngày nếu có điều chỉnh giá. Không có chi phí phát sinh ẩn ngoài hợp đồng.' },
        { q: 'Công ty ở tỉnh/thành khác có sử dụng dịch vụ được không?', a: 'Được. Chúng tôi phục vụ khách hàng trên toàn quốc qua hình thức online. Trao đổi qua Zalo, email, điện thoại. Tài liệu được gửi qua email hoặc phần mềm quản lý chung.' },
        { q: 'Nếu bị cơ quan thuế kiểm tra, SORATA có hỗ trợ không?', a: 'Có. Chúng tôi đồng hành cùng bạn trong suốt quá trình thanh tra thuế: chuẩn bị hồ sơ, giải trình, làm việc với cơ quan thuế. Nếu lỗi phát sinh do phía chúng tôi, chúng tôi chịu hoàn toàn trách nhiệm pháp lý và chi phí phạt.' },
      ],
    },
    trustLogos: {
      title: 'Được chứng nhận & liên kết với',
      partners: [
        { name: 'Bộ Tài Chính', abbr: 'BTC' },
        { name: 'Tổng Cục Thuế', abbr: 'TCT' },
        { name: 'MISA', abbr: 'MISA' },
        { name: 'Hội KT-KT Việt Nam', abbr: 'VAA' },
        { name: 'Cổng DV Công Quốc Gia', abbr: 'DVCQG' },
        { name: 'Ngân hàng VietcomBank', abbr: 'VCB' },
      ],
      clientsTitle: 'Hơn 500 khách hàng đang tin dùng',
      clientTypes: [
        { icon: '🛒', label: 'Hộ kinh doanh', count: '120+' },
        { icon: '🏢', label: 'Công ty TNHH', count: '250+' },
        { icon: '⚡', label: 'Startup', count: '80+' },
        { icon: '🏭', label: 'Doanh nghiệp vừa', count: '50+' },
      ],
    },
  }));

  // SERVICES PAGE
  insertContent.run('services', JSON.stringify({
    header: { title: 'Dịch vụ kế toán thuế', subtitle: 'Giải pháp kế toán và thuế toàn diện cho mọi loại hình doanh nghiệp. Chuyên nghiệp, đúng hạn, bảo mật.' },
    services: [
      { icon: '📋', title: 'Kê Khai Thuế', desc: 'Dịch vụ kê khai và nộp thuế đầy đủ theo đúng quy định của Tổng cục Thuế. Đảm bảo không phát sinh phạt do nộp trễ hoặc sai sót.', benefits: ['Kê khai thuế GTGT theo tháng/quý', 'Kê khai thuế Thu nhập cá nhân (TNCN)', 'Kê khai thuế Thu nhập doanh nghiệp (TNDN)', 'Kê khai lệ phí môn bài hàng năm', 'Nộp hồ sơ qua mạng (eTax), không cần ra cơ quan thuế', 'Theo dõi và nhắc lịch kê khai định kỳ'], pricing: 'Từ 500.000đ/tháng', pricingNote: 'Tùy theo quy mô giao dịch và loại hình doanh nghiệp' },
      { icon: '📊', title: 'Dịch Vụ Kế Toán', desc: 'Dịch vụ kế toán trọn gói từ hạch toán chứng từ đến lập báo cáo tài chính cuối năm. Doanh nghiệp không cần tuyển dụng kế toán nội bộ.', benefits: ['Hạch toán toàn bộ chứng từ phát sinh', 'Lập sổ sách kế toán theo chuẩn VAS', 'Báo cáo tài chính hàng tháng/quý/năm', 'Quyết toán thuế TNDN cuối năm', 'Lưu trữ hồ sơ kế toán điện tử', 'Sử dụng phần mềm MISA/Fast theo yêu cầu'], pricing: 'Từ 1.500.000đ/tháng', pricingNote: 'Phụ thuộc số lượng hóa đơn và phức tạp của nghiệp vụ' },
      { icon: '🏢', title: 'Thành Lập Công Ty', desc: 'Hỗ trợ đăng ký thành lập doanh nghiệp nhanh chóng, đúng quy định pháp luật. Hoàn thiện toàn bộ hồ sơ ban đầu chỉ trong 5 ngày làm việc.', benefits: ['Tư vấn chọn loại hình doanh nghiệp phù hợp', 'Soạn thảo Điều lệ và hồ sơ thành lập', 'Nộp hồ sơ trực tuyến qua Cổng quốc gia', 'Nhận Giấy phép đăng ký kinh doanh', 'Khắc dấu pháp nhân tròn + chữ ký', 'Đăng ký thuế, hóa đơn điện tử ban đầu'], pricing: 'Trọn gói từ 1.000.000đ', pricingNote: 'Không bao gồm lệ phí Nhà nước (50.000đ)' },
      { icon: '📈', title: 'Báo Cáo Tài Chính', desc: 'Lập báo cáo tài chính theo chuẩn mực kế toán Việt Nam (VAS), phục vụ mục đích nội bộ, ngân hàng, và cơ quan thuế.', benefits: ['Bảng cân đối kế toán (Balance Sheet)', 'Báo cáo kết quả hoạt động kinh doanh', 'Báo cáo lưu chuyển tiền tệ', 'Thuyết minh báo cáo tài chính', 'Phân tích các chỉ số tài chính quan trọng', 'Hỗ trợ kiểm toán nếu cần thiết'], pricing: 'Từ 2.000.000đ/bộ báo cáo', pricingNote: 'Tùy theo quy mô và số lượng bút toán trong kỳ' },
      { icon: '💰', title: 'Hoàn Thuế GTGT', desc: 'Hỗ trợ lập hồ sơ hoàn thuế GTGT cho doanh nghiệp xuất khẩu hoặc có số thuế đầu vào lớn hơn đầu ra trong thời gian dài.', benefits: ['Kiểm tra điều kiện đủ để hoàn thuế', 'Lập hồ sơ đề nghị hoàn thuế đầy đủ', 'Nộp hồ sơ và theo dõi tiến trình', 'Làm việc với cơ quan thuế khi kiểm tra', 'Tư vấn tối ưu dòng tiền từ hoàn thuế', 'Xử lý các vướng mắc phát sinh'], pricing: 'Phí dịch vụ 2–5% số tiền hoàn', pricingNote: 'Hoặc theo phương án thoả thuận cụ thể' },
      { icon: '💡', title: 'Tư Vấn Tài Chính', desc: 'Tư vấn chiến lược tài chính, lập kế hoạch thuế dài hạn và tối ưu cấu trúc doanh nghiệp để tiết kiệm chi phí hợp pháp.', benefits: ['Phân tích tình hình tài chính doanh nghiệp', 'Lập kế hoạch tối ưu thuế hợp pháp', 'Tư vấn cơ cấu vốn và huy động đầu tư', 'Hỗ trợ vay vốn ngân hàng (chuẩn bị hồ sơ)', 'Tư vấn đầu tư & mở rộng kinh doanh', 'Giải pháp giảm chi phí, tăng lợi nhuận'], pricing: 'Từ 500.000đ/buổi tư vấn', pricingNote: 'Hoặc gói tư vấn theo tháng từ 2.000.000đ' },
    ],
  }));

  // ABOUT PAGE
  insertContent.run('about', JSON.stringify({
    header: { title: 'Về SORATA Advisory', subtitle: 'Hơn 10 năm đồng hành cùng doanh nghiệp Việt Nam. Chuyên nghiệp, tận tâm, đáng tin cậy.' },
    story: {
      headline: 'Không chỉ "làm xong" — chúng tôi đồng hành thực sự',
      paragraphs: [
        'SORATA Advisory — viết tắt của Solution-driven, Responsible, Aligned Together in Action — được thành lập bởi Phan Việt Hùng với một mong muốn đơn giản: tạo ra dịch vụ kế toán mà khách hàng thực sự hiểu mình đang ở đâu về tài chính.',
        'Phần lớn dịch vụ kế toán trên thị trường chỉ "làm xong là xong" — nộp báo cáo, thu phí, rồi im lặng. Chúng tôi tin rằng một đối tác kế toán tốt phải giúp khách hàng nhận ra rủi ro sớm, hiểu số liệu của mình, và đưa ra quyết định kinh doanh tự tin hơn.',
        'Từ một đội nhỏ với từng khách hàng được chăm sóc trực tiếp, SORATA đang từng bước xây dựng nền tảng kế toán – tư vấn bền vững, hướng tới phục vụ hàng trăm doanh nghiệp Việt Nam đang phát triển.',
      ],
    },
    stats: [
      { value: '500+', label: 'Khách hàng' },
      { value: '10+', label: 'Năm kinh nghiệm' },
      { value: '100%', label: 'Đúng hạn' },
      { value: '20+', label: 'Nhân viên' },
    ],
    vision: 'Trở thành đối tác tư vấn tài chính – kế toán đáng tin cậy nhất cho các doanh nghiệp Việt Nam đang trên đà phát triển.',
    mission: 'Giúp khách hàng thực sự hiểu tài chính của họ, nhận diện rủi ro kịp thời và đưa ra quyết định kinh doanh sáng suốt — không chỉ "làm xong là xong".',
    milestones: [
      { year: '2013', event: 'Thành lập Công ty TNHH SORATA Advisory' },
      { year: '2015', event: 'Đạt 100 khách hàng đầu tiên, mở rộng dịch vụ toàn quốc' },
      { year: '2018', event: 'Ra mắt nền tảng kế toán online, hỗ trợ remote 24/7' },
      { year: '2020', event: 'Vượt mốc 300 khách hàng, nhận giải thưởng Dịch vụ xuất sắc' },
      { year: '2022', event: 'Mở thêm bộ phận Đào tạo, triển khai khóa học kế toán thực tế' },
      { year: '2024', event: 'Hơn 500 khách hàng, đội ngũ 20+ nhân viên, phủ khắp Việt Nam' },
    ],
    team: [
      { name: 'Phan Việt Hùng', role: 'Founder & Giám đốc Điều hành', avatar: 'https://picsum.photos/seed/hung2026/200/200', desc: 'Người sáng lập SORATA Advisory. Tư vấn tài chính – kế toán với phương châm đồng hành thực sự, không chỉ xử lý số liệu.', certs: ['Founder SORATA', 'Tư vấn Tài chính Doanh nghiệp'], phone: '0977.457.676', email: 'phanviethungtk@gmail.com' },
      { name: 'Nguyễn Thị Hà', role: 'Trưởng phòng Vận hành', avatar: 'https://picsum.photos/seed/ha2026/200/200', desc: 'Phụ trách vận hành toàn bộ quy trình dịch vụ, đảm bảo mọi hồ sơ được xử lý đúng hạn và chính xác.', certs: ['Quản lý Vận hành', 'Kế toán viên hành nghề'], phone: '0352.355.060', email: 'hanguyen.hmh@gmail.com' },
      { name: 'Nguyễn Thanh Nga', role: 'Chuyên viên Kế toán', avatar: 'https://picsum.photos/seed/nga2026/200/200', desc: 'Chuyên xử lý kê khai thuế, hạch toán sổ sách và lập báo cáo tài chính. Thành thạo MISA và HTKK.', certs: ['Chứng chỉ Kế toán', 'Chứng chỉ MISA'], phone: '0988.655.191', email: 'thanhnga.dng@gmail.com' },
    ],
    certs: [
      { title: 'Chứng chỉ Hành nghề Kế toán', issuer: 'Bộ Tài chính Việt Nam' },
      { title: 'Chứng nhận Đại lý Thuế', issuer: 'Tổng cục Thuế' },
      { title: 'Thành viên Hội Kế toán Kiểm toán Việt Nam (VAA)', issuer: 'VAA' },
      { title: 'ISO 9001:2015 — Quản lý chất lượng dịch vụ', issuer: 'Bureau Veritas' },
    ],
    ctaTitle: 'Hãy để chúng tôi đồng hành cùng bạn',
    ctaSubtitle: 'Tư vấn miễn phí, không ràng buộc. Gặp gỡ đội ngũ của chúng tôi hôm nay.',
  }));

  // TRAINING PAGE
  insertContent.run('training', JSON.stringify({
    header: { title: 'Khóa học kế toán & thuế', subtitle: 'Các khóa học thực tế từ chuyên gia 10+ năm kinh nghiệm. Học xong là làm được ngay.' },
    features: [
      { icon: '👤', title: 'Giảng viên thực chiến', desc: 'Giảng viên là kế toán trưởng 10+ năm kinh nghiệm, không chỉ lý thuyết.' },
      { icon: '💻', title: 'Thực hành ngay trên phần mềm', desc: 'Thực hành trực tiếp trên MISA, Fast, HTKK — phần mềm dùng thực tế.' },
      { icon: '🏅', title: 'Cấp chứng chỉ hoàn thành', desc: 'Chứng chỉ có giá trị trong hồ sơ xin việc và thăng tiến.' },
      { icon: '🔄', title: 'Học lại miễn phí', desc: 'Học sinh được phép học lại toàn bộ khoá học nếu cần ôn tập.' },
    ],
  }));

  console.log('✅ Seeded site content (settings, home, services, about, training)');
}

module.exports = db;
