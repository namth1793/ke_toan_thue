import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { useSiteContent } from '../../../context/SiteContentContext';
import ImageUpload from '../../../components/admin/ImageUpload';

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";
const TEXTAREA = `${INPUT} resize-none`;

function SectionCard({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50">
        <h2 className="font-semibold text-slate-800">{icon} {title}</h2>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-6 border-t border-slate-100 pt-4 space-y-4">{children}</div>}
    </div>
  );
}

export default function AboutSection() {
  const { content, refreshContent } = useSiteContent();
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (content?.about) setData(JSON.parse(JSON.stringify(content.about)));
  }, [content?.about]);

  const save = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      await api.put('/api/admin/content/about', { data });
      await refreshContent(); setSaved(true); setTimeout(() => setSaved(false), 3000);
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

  const updateArr = (path, idx, field, value) => setData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    const parts = path.split('.');
    let arr = next;
    for (const p of parts) arr = arr[p];
    arr[idx][field] = value;
    return next;
  });

  const addItem = (path, template) => setData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    const parts = path.split('.');
    let arr = next;
    for (const p of parts) arr = arr[p];
    arr.push(template);
    return next;
  });

  const removeItem = (path, idx) => setData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    const parts = path.split('.');
    let arr = next;
    for (const p of parts) arr = arr[p];
    arr.splice(idx, 1);
    return next;
  });

  const updateParagraph = (i, value) => setData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    next.story.paragraphs[i] = value;
    return next;
  });

  const updateCert = (i, field, value) => updateArr('certs', i, field, value);
  const updateMilestone = (i, field, value) => updateArr('milestones', i, field, value);
  const updateTeam = (i, field, value) => updateArr('team', i, field, value);
  const updateTeamCert = (memberIdx, certIdx, value) => setData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    next.team[memberIdx].certs[certIdx] = value;
    return next;
  });

  if (!data) return <div className="flex items-center justify-center py-20 text-slate-400">Đang tải...</div>;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <span className="text-blue-500 text-lg">💡</span>
        <p className="text-sm text-blue-700">Quản lý toàn bộ trang Giới thiệu: câu chuyện, đội ngũ (upload ảnh), mốc lịch sử, chứng chỉ.</p>
      </div>

      {/* Header */}
      <SectionCard title="Header trang" icon="📄">
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Tiêu đề</label>
          <input className={INPUT} value={data.header.title} onChange={e => set('header.title', e.target.value)} /></div>
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Mô tả phụ</label>
          <textarea className={TEXTAREA} rows={2} value={data.header.subtitle} onChange={e => set('header.subtitle', e.target.value)} /></div>
      </SectionCard>

      {/* Story */}
      <SectionCard title="Câu chuyện công ty" icon="📖">
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Tiêu đề đề mục</label>
          <input className={INPUT} value={data.story.headline} onChange={e => set('story.headline', e.target.value)} /></div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Đoạn văn</label>
          {data.story.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <textarea className={TEXTAREA} rows={3} value={p} onChange={e => updateParagraph(i, e.target.value)} />
              <button onClick={() => setData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.story.paragraphs.splice(i, 1); return next; })} className="text-red-400 hover:text-red-600 flex-shrink-0">✕</button>
            </div>
          ))}
          <button onClick={() => setData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.story.paragraphs.push(''); return next; })} className="text-sm text-primary-600 font-medium">+ Thêm đoạn</button>
        </div>
      </SectionCard>

      {/* Stats */}
      <SectionCard title="4 số liệu nổi bật" icon="📊">
        {data.stats.map((s, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
            <div><label className="text-xs text-slate-500">Con số</label>
              <input className={`${INPUT} mt-1`} value={s.value} onChange={e => updateArr('stats', i, 'value', e.target.value)} /></div>
            <div><label className="text-xs text-slate-500">Nhãn</label>
              <input className={`${INPUT} mt-1`} value={s.label} onChange={e => updateArr('stats', i, 'label', e.target.value)} /></div>
          </div>
        ))}
      </SectionCard>

      {/* Vision & Mission */}
      <SectionCard title="Tầm nhìn & Sứ mệnh" icon="🎯">
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Tầm nhìn (Vision)</label>
          <textarea className={TEXTAREA} rows={3} value={data.vision} onChange={e => set('vision', e.target.value)} /></div>
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Sứ mệnh (Mission)</label>
          <textarea className={TEXTAREA} rows={3} value={data.mission} onChange={e => set('mission', e.target.value)} /></div>
      </SectionCard>

      {/* Milestones */}
      <SectionCard title="Mốc lịch sử phát triển" icon="📅" defaultOpen={false}>
        {data.milestones.map((m, i) => (
          <div key={i} className="flex gap-3 items-start">
            <input className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500" value={m.year} onChange={e => updateMilestone(i, 'year', e.target.value)} placeholder="2024" />
            <input className={`${INPUT} flex-1`} value={m.event} onChange={e => updateMilestone(i, 'event', e.target.value)} placeholder="Sự kiện..." />
            <button onClick={() => removeItem('milestones', i)} className="text-red-400 hover:text-red-600 mt-2">✕</button>
          </div>
        ))}
        <button onClick={() => addItem('milestones', { year: '', event: '' })} className="text-sm text-primary-600 font-medium">+ Thêm mốc</button>
      </SectionCard>

      {/* Team */}
      <SectionCard title="Đội ngũ nhân sự" icon="👥" defaultOpen={false}>
        {data.team.map((member, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-700 text-sm">Thành viên {i + 1}</span>
              <button onClick={() => removeItem('team', i)} className="text-xs text-red-400 hover:text-red-600">Xóa</button>
            </div>
            <ImageUpload
              value={member.avatar}
              onChange={url => updateTeam(i, 'avatar', url)}
              label="Ảnh đại diện"
              hint="Ảnh vuông, tối thiểu 200x200px"
            />
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-500">Họ tên</label>
                <input className={`${INPUT} mt-1`} value={member.name} onChange={e => updateTeam(i, 'name', e.target.value)} /></div>
              <div><label className="text-xs text-slate-500">Chức vụ</label>
                <input className={`${INPUT} mt-1`} value={member.role} onChange={e => updateTeam(i, 'role', e.target.value)} /></div>
            </div>
            <div><label className="text-xs text-slate-500">Mô tả</label>
              <textarea className={`${TEXTAREA} mt-1`} rows={2} value={member.desc} onChange={e => updateTeam(i, 'desc', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-500">Số điện thoại</label>
                <input className={`${INPUT} mt-1`} value={member.phone} onChange={e => updateTeam(i, 'phone', e.target.value)} /></div>
              <div><label className="text-xs text-slate-500">Email</label>
                <input className={`${INPUT} mt-1`} value={member.email} onChange={e => updateTeam(i, 'email', e.target.value)} /></div>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-2">Chứng chỉ / chuyên môn</label>
              {member.certs.map((c, ci) => (
                <div key={ci} className="flex gap-2 mb-2">
                  <input className={INPUT} value={c} onChange={e => updateTeamCert(i, ci, e.target.value)} />
                  <button onClick={() => setData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.team[i].certs.splice(ci, 1); return next; })} className="text-red-400 hover:text-red-600">✕</button>
                </div>
              ))}
              <button onClick={() => setData(prev => { const next = JSON.parse(JSON.stringify(prev)); next.team[i].certs.push(''); return next; })} className="text-xs text-primary-600 font-medium">+ Thêm chứng chỉ</button>
            </div>
          </div>
        ))}
        <button onClick={() => addItem('team', { name: '', role: '', avatar: '', desc: '', certs: [], phone: '', email: '' })} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-500 hover:border-primary-300 hover:text-primary-600 transition-colors">
          + Thêm thành viên
        </button>
      </SectionCard>

      {/* Certs */}
      <SectionCard title="Chứng chỉ & Công nhận" icon="🏅" defaultOpen={false}>
        {data.certs.map((c, i) => (
          <div key={i} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-500">Tên chứng chỉ</label>
                <input className={`${INPUT} mt-1`} value={c.title} onChange={e => updateCert(i, 'title', e.target.value)} /></div>
              <div><label className="text-xs text-slate-500">Đơn vị cấp</label>
                <input className={`${INPUT} mt-1`} value={c.issuer} onChange={e => updateCert(i, 'issuer', e.target.value)} /></div>
            </div>
            <button onClick={() => removeItem('certs', i)} className="text-red-400 hover:text-red-600 mt-5">✕</button>
          </div>
        ))}
        <button onClick={() => addItem('certs', { title: '', issuer: '' })} className="text-sm text-primary-600 font-medium">+ Thêm chứng chỉ</button>
      </SectionCard>

      {/* CTA */}
      <SectionCard title="Nút kêu gọi hành động (CTA)" icon="🎯" defaultOpen={false}>
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Tiêu đề</label>
          <input className={INPUT} value={data.ctaTitle} onChange={e => set('ctaTitle', e.target.value)} /></div>
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Mô tả phụ</label>
          <input className={INPUT} value={data.ctaSubtitle} onChange={e => set('ctaSubtitle', e.target.value)} /></div>
      </SectionCard>

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
