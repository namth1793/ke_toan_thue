const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

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

module.exports = db;
