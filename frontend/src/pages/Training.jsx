import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/api';
import ScrollFade from '../components/ScrollFade';
import { useSiteContent } from '../context/SiteContentContext';

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

const levelColors = {
  'Cơ bản': 'bg-emerald-100 text-emerald-700',
  'Trung cấp': 'bg-amber-100 text-amber-700',
  'Nâng cao': 'bg-rose-100 text-rose-700',
};

function RegisterModal({ course, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post(`/api/courses/${course.id}/register`, form);
      setSuccess(true);
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Đăng ký thành công!</h3>
            <p className="text-slate-500 text-sm mb-6">Chúng tôi sẽ liên hệ xác nhận lịch học trong vòng 24 giờ.</p>
            <button onClick={onClose} className="btn-primary">Đóng</button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Đăng ký khóa học</h3>
                <p className="text-primary-600 font-medium text-sm">{course.name}</p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="tel"
                placeholder="Số điện thoại *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <textarea
                placeholder="Ghi chú thêm (học ca nào, thắc mắc...)"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                {loading ? 'Đang gửi...' : 'Xác nhận đăng ký học'}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

const DEFAULT_HEADER = { title: 'Khóa học kế toán & thuế', subtitle: 'Các khóa học thực tế từ chuyên gia 10+ năm kinh nghiệm. Học xong là làm được ngay.' };
const DEFAULT_FEATURES = [
  { icon: '👤', title: 'Giảng viên thực chiến', desc: 'Giảng viên là kế toán trưởng 10+ năm kinh nghiệm, không chỉ lý thuyết.' },
  { icon: '💻', title: 'Thực hành ngay trên phần mềm', desc: 'Thực hành trực tiếp trên MISA, Fast, HTKK — phần mềm dùng thực tế.' },
  { icon: '🏅', title: 'Cấp chứng chỉ hoàn thành', desc: 'Chứng chỉ có giá trị trong hồ sơ xin việc và thăng tiến.' },
  { icon: '🔄', title: 'Học lại miễn phí', desc: 'Học sinh được phép học lại toàn bộ khoá học nếu cần ôn tập.' },
];

export default function Training() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { content } = useSiteContent();
  const header = content?.training?.header || DEFAULT_HEADER;
  const features = content?.training?.features || DEFAULT_FEATURES;

  useEffect(() => {
    api.get('/api/courses')
      .then((r) => setCourses(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-nav">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Đào tạo</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{header.title}</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">{header.subtitle}</p>
          </ScrollFade>
        </div>
      </section>

      {/* Courses grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, i) => (
                <ScrollFade key={course.id} delay={i * 0.1}>
                  <div className="card p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${levelColors[course.level] || 'bg-slate-100 text-slate-600'}`}>
                        {course.level}
                      </span>
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(course.price)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-3">{course.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{course.description}</p>

                    <div className="space-y-2 mb-5 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{course.target}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="btn-primary w-full justify-center"
                    >
                      Đăng ký học
                    </button>
                  </div>
                </ScrollFade>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why learn with us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade className="text-center mb-12">
            <h2 className="section-title">Tại sao học tại SORATA?</h2>
          </ScrollFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <ScrollFade key={i} delay={i * 0.1}>
                <div className="card p-6 text-center">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">{item.icon}</div>
                  <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Register modal */}
      <AnimatePresence>
        {selectedCourse && (
          <RegisterModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
