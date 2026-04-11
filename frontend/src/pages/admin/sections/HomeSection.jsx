import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { useSiteContent } from '../../../context/SiteContentContext';
import ImageUpload from '../../../components/admin/ImageUpload';

function Tip({ children }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-2 flex gap-3">
      <span className="text-blue-500 text-lg flex-shrink-0">💡</span>
      <p className="text-sm text-blue-700">{children}</p>
    </div>
  );
}

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";
const TEXTAREA = `${INPUT} resize-none`;

function SectionCard({ title, icon, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
        <h2 className="font-semibold text-slate-800">{icon} {title}</h2>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-slate-100 pt-4">{children}</div>}
    </div>
  );
}

export default function HomeSection() {
  const { content, refreshContent } = useSiteContent();
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (content?.home) setData(JSON.parse(JSON.stringify(content.home)));
  }, [content?.home]);

  const save = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      await api.put('/api/admin/content/home', { data });
      await refreshContent();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Lỗi lưu dữ liệu.');
    } finally { setSaving(false); }
  };

  const set = (path, value) => {
    const parts = path.split('.');
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) { obj = obj[parts[i]]; }
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const updateArray = (path, idx, field, value) => {
    const parts = path.split('.');
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let arr = next;
      for (const p of parts) arr = arr[p];
      arr[idx][field] = value;
      return next;
    });
  };

  const addItem = (path, template) => {
    const parts = path.split('.');
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let arr = next;
      for (const p of parts) arr = arr[p];
      arr.push(template);
      return next;
    });
  };

  const removeItem = (path, idx) => {
    const parts = path.split('.');
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let arr = next;
      for (const p of parts) arr = arr[p];
      arr.splice(idx, 1);
      return next;
    });
  };

  if (!data) return <div className="flex items-center justify-center py-20 text-slate-400">Đang tải...</div>;

  return (
    <div className="max-w-2xl space-y-4">
      <Tip>Chỉnh sửa nội dung trang chủ. Nhấn "Lưu thay đổi" để cập nhật ngay lên website.</Tip>

      {/* Hero */}
      <SectionCard title="Khu vực Hero (Banner đầu trang)" icon="🌟">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Dòng chữ nhỏ (badge)</label>
          <input className={INPUT} value={data.hero.badge} onChange={e => set('hero.badge', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề chính (Headline)</label>
          <textarea className={TEXTAREA} rows={2} value={data.hero.headline} onChange={e => set('hero.headline', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả phụ (Subheadline)</label>
          <textarea className={TEXTAREA} rows={3} value={data.hero.subheadline} onChange={e => set('hero.subheadline', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium text-slate-600 mb-1">Chữ nút CTA chính</label>
            <input className={INPUT} value={data.hero.ctaText} onChange={e => set('hero.ctaText', e.target.value)} /></div>
          <div><label className="block text-xs font-medium text-slate-600 mb-1">Link nút CTA chính</label>
            <input className={INPUT} value={data.hero.ctaLink} onChange={e => set('hero.ctaLink', e.target.value)} /></div>
          <div><label className="block text-xs font-medium text-slate-600 mb-1">Chữ nút phụ</label>
            <input className={INPUT} value={data.hero.ctaSecondText} onChange={e => set('hero.ctaSecondText', e.target.value)} /></div>
          <div><label className="block text-xs font-medium text-slate-600 mb-1">Link nút phụ</label>
            <input className={INPUT} value={data.hero.ctaSecondLink} onChange={e => set('hero.ctaSecondLink', e.target.value)} /></div>
        </div>
      </SectionCard>

      {/* Stats */}
      <SectionCard title="Thống kê (4 số liệu nổi bật)" icon="📊">
        <p className="text-xs text-slate-400">Ví dụ: 500+, 10+ năm, 100%, 0đ phí phạt. Tối đa 4 mục.</p>
        {data.hero.stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-500">Con số</label>
                <input className={INPUT} value={stat.value} onChange={e => updateArray('hero.stats', i, 'value', e.target.value)} /></div>
              <div><label className="text-xs text-slate-500">Nhãn</label>
                <input className={INPUT} value={stat.label} onChange={e => updateArray('hero.stats', i, 'label', e.target.value)} /></div>
            </div>
            <button onClick={() => removeItem('hero.stats', i)} className="text-red-400 hover:text-red-600 flex-shrink-0 mt-4">✕</button>
          </div>
        ))}
        {data.hero.stats.length < 4 && (
          <button onClick={() => addItem('hero.stats', { value: '', label: '' })} className="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Thêm số liệu</button>
        )}
      </SectionCard>

      {/* Trust Signals */}
      <SectionCard title="Điểm nổi bật (Trust Signals)" icon="✅">
        <p className="text-xs text-slate-400">3 điểm cam kết hiển thị dưới hero. Ví dụ: "Không phạt thuế muộn"</p>
        {data.hero.trustSignals.map((sig, i) => (
          <div key={i} className="flex gap-2">
            <input className={INPUT} value={sig} onChange={e => {
              const arr = [...data.hero.trustSignals]; arr[i] = e.target.value;
              set('hero.trustSignals', arr);
            }} />
            <button onClick={() => removeItem('hero.trustSignals', i)} className="text-red-400 hover:text-red-600">✕</button>
          </div>
        ))}
        <button onClick={() => addItem('hero.trustSignals', '')} className="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Thêm điểm nổi bật</button>
      </SectionCard>

      {/* Services */}
      <SectionCard title="Dịch vụ trên trang chủ (6 thẻ)" icon="📋">
        <p className="text-xs text-slate-400">Icon: nhập emoji bất kỳ (📋📊🏢📈💰💡). "Tag" là nhãn nhỏ như "Phổ biến" — để trống nếu không muốn hiển thị.</p>
        <div><label className="text-sm font-medium text-slate-700">Tiêu đề section</label>
          <input className={`${INPUT} mt-1`} value={data.services.title} onChange={e => set('services.title', e.target.value)} /></div>
        <div><label className="text-sm font-medium text-slate-700">Mô tả section</label>
          <input className={`${INPUT} mt-1`} value={data.services.subtitle} onChange={e => set('services.subtitle', e.target.value)} /></div>
        <div className="space-y-3 mt-2">
          {data.services.items.map((svc, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Dịch vụ {i + 1}</span>
                <button onClick={() => removeItem('services.items', i)} className="text-xs text-red-400 hover:text-red-600">Xóa</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-slate-500">Icon (emoji)</label>
                  <input className={INPUT} value={svc.icon} onChange={e => updateArray('services.items', i, 'icon', e.target.value)} /></div>
                <div><label className="text-xs text-slate-500">Tag (để trống nếu không cần)</label>
                  <input className={INPUT} value={svc.tag} onChange={e => updateArray('services.items', i, 'tag', e.target.value)} /></div>
              </div>
              <div><label className="text-xs text-slate-500">Tên dịch vụ</label>
                <input className={`${INPUT} mt-1`} value={svc.title} onChange={e => updateArray('services.items', i, 'title', e.target.value)} /></div>
              <div><label className="text-xs text-slate-500">Mô tả ngắn</label>
                <textarea className={`${TEXTAREA} mt-1`} rows={2} value={svc.desc} onChange={e => updateArray('services.items', i, 'desc', e.target.value)} /></div>
              <div><label className="text-xs text-slate-500">Giá từ</label>
                <input className={INPUT} value={svc.from} onChange={e => updateArray('services.items', i, 'from', e.target.value)} /></div>
            </div>
          ))}
          <button onClick={() => addItem('services.items', { icon: '📌', title: '', desc: '', from: '', tag: '' })} className="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Thêm dịch vụ</button>
        </div>
      </SectionCard>

      {/* How It Works */}
      <SectionCard title="Quy trình làm việc (3 bước)" icon="🔄">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs text-slate-500">Badge</label>
            <input className={`${INPUT} mt-1`} value={data.howItWorks.badge} onChange={e => set('howItWorks.badge', e.target.value)} /></div>
          <div><label className="text-xs text-slate-500">Tiêu đề</label>
            <input className={`${INPUT} mt-1`} value={data.howItWorks.title} onChange={e => set('howItWorks.title', e.target.value)} /></div>
        </div>
        <div><label className="text-xs text-slate-500">Mô tả phụ</label>
          <textarea className={`${TEXTAREA} mt-1`} rows={2} value={data.howItWorks.subtitle} onChange={e => set('howItWorks.subtitle', e.target.value)} /></div>
        {data.howItWorks.steps.map((step, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="text-sm font-medium text-slate-600">Bước {step.number}</div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-400">Icon (emoji)</label>
                <input className={INPUT} value={step.icon} onChange={e => updateArray('howItWorks.steps', i, 'icon', e.target.value)} /></div>
              <div><label className="text-xs text-slate-400">Thời gian (detail)</label>
                <input className={INPUT} value={step.detail} onChange={e => updateArray('howItWorks.steps', i, 'detail', e.target.value)} /></div>
            </div>
            <div><label className="text-xs text-slate-400">Tên bước</label>
              <input className={`${INPUT} mt-1`} value={step.title} onChange={e => updateArray('howItWorks.steps', i, 'title', e.target.value)} /></div>
            <div><label className="text-xs text-slate-400">Mô tả</label>
              <textarea className={`${TEXTAREA} mt-1`} rows={2} value={step.desc} onChange={e => updateArray('howItWorks.steps', i, 'desc', e.target.value)} /></div>
          </div>
        ))}
      </SectionCard>

      {/* Testimonials */}
      <SectionCard title="Đánh giá khách hàng" icon="⭐">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs text-slate-500">Tiêu đề section</label>
            <input className={`${INPUT} mt-1`} value={data.testimonials.title} onChange={e => set('testimonials.title', e.target.value)} /></div>
          <div><label className="text-xs text-slate-500">Mô tả phụ</label>
            <input className={`${INPUT} mt-1`} value={data.testimonials.subtitle} onChange={e => set('testimonials.subtitle', e.target.value)} /></div>
        </div>
        {data.testimonials.items.map((t, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">Đánh giá {i + 1}</span>
              <button onClick={() => removeItem('testimonials.items', i)} className="text-xs text-red-400 hover:text-red-600">Xóa</button>
            </div>
            <ImageUpload
              value={t.avatar}
              onChange={url => updateArray('testimonials.items', i, 'avatar', url)}
              label="Ảnh đại diện"
              hint="Upload ảnh khách hàng (vuông, tối thiểu 80x80px)"
            />
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-500">Họ tên</label>
                <input className={INPUT} value={t.name} onChange={e => updateArray('testimonials.items', i, 'name', e.target.value)} /></div>
              <div><label className="text-xs text-slate-500">Chức vụ / Công ty</label>
                <input className={INPUT} value={t.role} onChange={e => updateArray('testimonials.items', i, 'role', e.target.value)} /></div>
            </div>
            <div><label className="text-xs text-slate-500">Nội dung đánh giá</label>
              <textarea className={`${TEXTAREA} mt-1`} rows={3} value={t.content} onChange={e => updateArray('testimonials.items', i, 'content', e.target.value)} /></div>
            <div><label className="text-xs text-slate-500">Số sao (1-5)</label>
              <input className={INPUT} type="number" min={1} max={5} value={t.stars} onChange={e => updateArray('testimonials.items', i, 'stars', parseInt(e.target.value))} /></div>
          </div>
        ))}
        <button onClick={() => addItem('testimonials.items', { name: '', role: '', avatar: '', content: '', stars: 5 })} className="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Thêm đánh giá</button>
      </SectionCard>

      {/* FAQ */}
      <SectionCard title="Câu hỏi thường gặp (FAQ)" icon="❓">
        <div><label className="text-xs text-slate-500">Tiêu đề section</label>
          <input className={`${INPUT} mt-1`} value={data.faq.title} onChange={e => set('faq.title', e.target.value)} /></div>
        {data.faq.items.map((item, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-500">Câu hỏi {i + 1}</span>
              <button onClick={() => removeItem('faq.items', i)} className="text-xs text-red-400 hover:text-red-600">Xóa</button>
            </div>
            <div><label className="text-xs text-slate-400">Câu hỏi</label>
              <input className={`${INPUT} mt-1`} value={item.q} onChange={e => updateArray('faq.items', i, 'q', e.target.value)} /></div>
            <div><label className="text-xs text-slate-400">Câu trả lời</label>
              <textarea className={`${TEXTAREA} mt-1`} rows={3} value={item.a} onChange={e => updateArray('faq.items', i, 'a', e.target.value)} /></div>
          </div>
        ))}
        <button onClick={() => addItem('faq.items', { q: '', a: '' })} className="text-sm text-primary-600 hover:text-primary-700 font-medium">+ Thêm câu hỏi</button>
      </SectionCard>

      {/* Save */}
      <div className="flex items-center gap-3 sticky bottom-0 bg-slate-50 py-4">
        <button onClick={save} disabled={saving} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-60 flex items-center gap-2">
          {saving ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Đang lưu...</> : '💾 Lưu thay đổi'}
        </button>
        {saved && <span className="text-sm text-emerald-600 font-medium">✅ Đã lưu! Website đã cập nhật.</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
}
