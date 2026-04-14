import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { useSiteContent } from '../../../context/SiteContentContext';

function Tip({ children }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3">
      <span className="text-blue-500 text-lg flex-shrink-0">💡</span>
      <p className="text-sm text-blue-700">{children}</p>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-slate-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";

export default function SettingsSection() {
  const { content, refreshContent } = useSiteContent();
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);
  const [backupMsg, setBackupMsg] = useState(null);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await api.get('/api/admin/backup');
      const json = JSON.stringify(res.data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `saoviet-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setBackupMsg({ ok: false, text: 'Xuất thất bại, thử lại.' });
      setTimeout(() => setBackupMsg(null), 3000);
    } finally {
      setExporting(false);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const backup = JSON.parse(text);
      await api.post('/api/admin/restore', backup);
      await refreshContent();
      setBackupMsg({ ok: true, text: '✅ Khôi phục thành công! Dữ liệu đã được nạp lại.' });
      setTimeout(() => setBackupMsg(null), 5000);
    } catch {
      setBackupMsg({ ok: false, text: 'Nhập thất bại. Kiểm tra file JSON đúng định dạng.' });
      setTimeout(() => setBackupMsg(null), 4000);
    }
    e.target.value = '';
  };

  useEffect(() => {
    if (content?.settings) setData(JSON.parse(JSON.stringify(content.settings)));
  }, [content?.settings]);

  const save = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      await api.put('/api/admin/content/settings', { data });
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
      const next = { ...prev };
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) {
        obj[parts[i]] = { ...obj[parts[i]] };
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  };

  if (!data) return <div className="flex items-center justify-center py-20 text-slate-400">Đang tải...</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <Tip>Thông tin này hiển thị ở header, footer và toàn bộ website. Sau khi lưu, website cập nhật ngay lập tức.</Tip>

      {/* Company */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2">🏢 Thông tin công ty</h2>
        <Field label="Tên đầy đủ công ty">
          <input className={INPUT} value={data.companyFullName} onChange={e => set('companyFullName', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Mã số thuế">
            <input className={INPUT} value={data.mst} onChange={e => set('mst', e.target.value)} />
          </Field>
          <Field label="Giờ làm việc">
            <input className={INPUT} value={data.hours} onChange={e => set('hours', e.target.value)} placeholder="T2–T7: 8:00 – 17:30" />
          </Field>
        </div>
        <Field label="Địa chỉ">
          <input className={INPUT} value={data.address} onChange={e => set('address', e.target.value)} />
        </Field>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2">📞 Liên hệ</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Số điện thoại" hint="Hiển thị trên Navbar">
            <input className={INPUT} value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="0977.457.676" />
          </Field>
          <Field label="Số Zalo" hint="Không có dấu chấm, dùng cho link zalo.me">
            <input className={INPUT} value={data.zaloPhone} onChange={e => set('zaloPhone', e.target.value)} placeholder="0977457676" />
          </Field>
        </div>
        <Field label="Email">
          <input className={INPUT} type="email" value={data.email} onChange={e => set('email', e.target.value)} />
        </Field>
      </div>

      {/* Social */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800">🔗 Mạng xã hội</h2>
        <Field label="Facebook" hint="Nhập URL đầy đủ (https://facebook.com/...) hoặc # để ẩn">
          <input className={INPUT} value={data.facebook} onChange={e => set('facebook', e.target.value)} placeholder="https://facebook.com/saoviet" />
        </Field>
        <Field label="Zalo (link chat)" hint="https://zalo.me/[số điện thoại]">
          <input className={INPUT} value={data.zalo} onChange={e => set('zalo', e.target.value)} placeholder="https://zalo.me/0977457676" />
        </Field>
        <Field label="YouTube">
          <input className={INPUT} value={data.youtube} onChange={e => set('youtube', e.target.value)} placeholder="https://youtube.com/@saoviet" />
        </Field>
      </div>

      {/* Announcement Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">📢 Thanh thông báo (Announcement Bar)</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => set('announcement.visible', !data.announcement.visible)}
              className={`w-10 h-5 rounded-full transition-colors relative ${data.announcement.visible ? 'bg-primary-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.announcement.visible ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-slate-600">{data.announcement.visible ? 'Hiển thị' : 'Ẩn'}</span>
          </label>
        </div>
        <p className="text-xs text-slate-400">Thanh màu xanh hiển thị phía trên cùng website.</p>
        <Field label="Nhãn (label)" hint='Ví dụ: "Ưu đãi tháng 4:"'>
          <input className={INPUT} value={data.announcement.label} onChange={e => set('announcement.label', e.target.value)} />
        </Field>
        <Field label="Nội dung thông báo">
          <input className={INPUT} value={data.announcement.text} onChange={e => set('announcement.text', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Chữ nút CTA">
            <input className={INPUT} value={data.announcement.ctaText} onChange={e => set('announcement.ctaText', e.target.value)} />
          </Field>
          <Field label="Link nút CTA">
            <input className={INPUT} value={data.announcement.ctaLink} onChange={e => set('announcement.ctaLink', e.target.value)} placeholder="/lien-he" />
          </Field>
        </div>
      </div>

      {/* Backup & Restore */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 space-y-3">
        <h2 className="font-semibold text-slate-800">💾 Sao lưu & Khôi phục dữ liệu</h2>
        <p className="text-sm text-slate-500">
          Xuất toàn bộ nội dung website (cài đặt, trang, bài viết, khóa học) ra file JSON.
          Trước khi redeploy, hãy <strong>Xuất backup</strong> và sau khi deploy xong thì <strong>Nhập backup</strong> để khôi phục.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="bg-slate-700 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            {exporting ? <><span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Đang xuất...</> : '⬇️ Xuất backup'}
          </button>
          <label className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2">
            ⬆️ Nhập backup
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          {backupMsg && (
            <span className={`text-sm font-medium ${backupMsg.ok ? 'text-emerald-600' : 'text-red-500'}`}>
              {backupMsg.text}
            </span>
          )}
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button onClick={save} disabled={saving} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-60 flex items-center gap-2">
          {saving ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Đang lưu...</> : '💾 Lưu thay đổi'}
        </button>
        {saved && <span className="text-sm text-emerald-600 font-medium">✅ Đã lưu! Website đã cập nhật.</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
}
