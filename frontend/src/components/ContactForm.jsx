import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const services = [
  'Kê khai thuế GTGT/TNCN',
  'Kế toán doanh nghiệp trọn gói',
  'Thành lập công ty',
  'Báo cáo tài chính',
  'Hoàn thuế',
  'Tư vấn tài chính',
  'Khác',
];

export default function ContactForm({ title = 'Nhận tư vấn miễn phí', subtitle = 'Điền thông tin bên dưới, chúng tôi sẽ liên hệ bạn trong vòng 30 phút.' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post('/api/contacts', form);
      setStatus('success');
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      {title && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-slate-800 mb-2">Gửi thành công!</h4>
          <p className="text-slate-500 text-sm mb-4">Chúng tôi sẽ liên hệ bạn trong vòng 30 phút làm việc.</p>
          <button onClick={() => setStatus(null)} className="btn-primary text-sm py-2">
            Gửi yêu cầu khác
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cf-name" className="block text-sm font-medium text-slate-700 mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label htmlFor="cf-phone" className="block text-sm font-medium text-slate-700 mb-1">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="0901 234 567"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cf-email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@company.vn"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="cf-service" className="block text-sm font-medium text-slate-700 mb-1">Dịch vụ quan tâm</label>
            <select
              id="cf-service"
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white"
            >
              <option value="">-- Chọn dịch vụ --</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="cf-message" className="block text-sm font-medium text-slate-700 mb-1">Nội dung</label>
            <textarea
              id="cf-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Mô tả nhu cầu của bạn..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-500 text-sm">Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp 0901.234.567</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Đang gửi...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Gửi yêu cầu tư vấn
              </>
            )}
          </button>
          <p className="text-xs text-slate-400 text-center">Thông tin của bạn được bảo mật tuyệt đối</p>
        </form>
      )}
    </div>
  );
}
