import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { useSiteContent } from '../../../context/SiteContentContext';

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";
const TEXTAREA = `${INPUT} resize-none`;

export default function ServicesSection() {
  const { content, refreshContent } = useSiteContent();
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (content?.services) setData(JSON.parse(JSON.stringify(content.services)));
  }, [content?.services]);

  const save = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      await api.put('/api/admin/content/services', { data });
      await refreshContent();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { setError(err.response?.data?.error || 'Lỗi lưu.'); }
    finally { setSaving(false); }
  };

  const set = (path, value) => {
    const parts = path.split('.');
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const updateBenefit = (svcIdx, bIdx, value) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next.services[svcIdx].benefits[bIdx] = value;
      return next;
    });
  };
  const addBenefit = (svcIdx) => setData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.services[svcIdx].benefits.push(''); return next; });
  const removeBenefit = (svcIdx, bIdx) => setData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.services[svcIdx].benefits.splice(bIdx, 1); return next; });
  const addService = () => setData(prev => ({ ...JSON.parse(JSON.stringify(prev)), services: [...prev.services, { icon: '📌', title: '', desc: '', benefits: [], pricing: '', pricingNote: '' }] }));
  const removeService = (i) => setData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.services.splice(i, 1); return next; });
  const updateService = (i, field, value) => setData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.services[i][field] = value; return next; });

  if (!data) return <div className="flex items-center justify-center py-20 text-slate-400">Đang tải...</div>;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <span className="text-blue-500 text-lg">💡</span>
        <p className="text-sm text-blue-700">Quản lý toàn bộ nội dung trang Dịch vụ. Mỗi dịch vụ có danh sách "Bao gồm" có thể thêm/xóa từng dòng. Icon là emoji bất kỳ.</p>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800">📄 Header trang Dịch vụ</h2>
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Tiêu đề trang</label>
          <input className={INPUT} value={data.header.title} onChange={e => set('header.title', e.target.value)} /></div>
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Mô tả phụ</label>
          <textarea className={TEXTAREA} rows={2} value={data.header.subtitle} onChange={e => set('header.subtitle', e.target.value)} /></div>
      </div>

      {/* Services list */}
      <div className="space-y-4">
        {data.services.map((svc, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-800">Dịch vụ {i + 1}: {svc.title || '(chưa đặt tên)'}</h3>
              <button onClick={() => removeService(i)} className="text-xs text-red-400 hover:text-red-600 px-2 py-1 border border-red-200 rounded">Xóa</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div><label className="text-xs text-slate-500">Icon</label>
                <input className={`${INPUT} mt-1`} value={svc.icon} onChange={e => updateService(i, 'icon', e.target.value)} /></div>
              <div className="col-span-3"><label className="text-xs text-slate-500">Tên dịch vụ</label>
                <input className={`${INPUT} mt-1`} value={svc.title} onChange={e => updateService(i, 'title', e.target.value)} /></div>
            </div>
            <div><label className="text-xs text-slate-500">Mô tả</label>
              <textarea className={`${TEXTAREA} mt-1`} rows={3} value={svc.desc} onChange={e => updateService(i, 'desc', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-500">Giá</label>
                <input className={`${INPUT} mt-1`} value={svc.pricing} onChange={e => updateService(i, 'pricing', e.target.value)} /></div>
              <div><label className="text-xs text-slate-500">Ghi chú giá</label>
                <input className={`${INPUT} mt-1`} value={svc.pricingNote} onChange={e => updateService(i, 'pricingNote', e.target.value)} /></div>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-2">Danh sách "Bao gồm"</label>
              <div className="space-y-2">
                {svc.benefits.map((b, bi) => (
                  <div key={bi} className="flex gap-2">
                    <input className={INPUT} value={b} onChange={e => updateBenefit(i, bi, e.target.value)} />
                    <button onClick={() => removeBenefit(i, bi)} className="text-red-400 hover:text-red-600">✕</button>
                  </div>
                ))}
                <button onClick={() => addBenefit(i)} className="text-xs text-primary-600 hover:text-primary-700 font-medium">+ Thêm mục</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addService} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-500 hover:border-primary-300 hover:text-primary-600 transition-colors">
          + Thêm dịch vụ mới
        </button>
      </div>

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
