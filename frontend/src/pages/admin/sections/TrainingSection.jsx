import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { useSiteContent } from '../../../context/SiteContentContext';

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";
const TEXTAREA = `${INPUT} resize-none`;
const LEVELS = ['Cơ bản', 'Trung cấp', 'Nâng cao'];

function CourseForm({ course, onSave, onClose, onDelete }) {
  const [form, setForm] = useState(course || { name: '', slug: '', duration: '', price: '', target: '', description: '', level: 'Cơ bản' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const autoSlug = (name) => name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      if (course?.id) {
        await api.put(`/api/admin/courses/${course.id}`, form);
      } else {
        await api.post('/api/admin/courses', form);
      }
      onSave();
    } catch (err) { setError(err.response?.data?.error || 'Lỗi lưu.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-800">{course?.id ? 'Sửa khóa học' : 'Thêm khóa học mới'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Tên khóa học *</label>
            <input className={INPUT} value={form.name} required onChange={e => setForm({ ...form, name: e.target.value, slug: autoSlug(e.target.value) })} /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Slug (URL) *</label>
            <input className={INPUT} value={form.slug} required onChange={e => setForm({ ...form, slug: e.target.value })} />
            <p className="text-xs text-slate-400 mt-1">URL: /dao-tao/[slug]. Chỉ dùng chữ thường, số, dấu gạch ngang.</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Thời lượng</label>
              <input className={INPUT} value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="1 tháng (8 buổi)" /></div>
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Học phí (số, đơn vị đồng)</label>
              <input className={INPUT} type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="1500000" /></div>
          </div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Cấp độ</label>
            <select className={INPUT} value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Đối tượng học viên</label>
            <input className={INPUT} value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Mô tả khóa học</label>
            <textarea className={TEXTAREA} rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
              {saving ? 'Đang lưu...' : course?.id ? 'Cập nhật' : 'Thêm mới'}
            </button>
            {course?.id && (
              <button type="button" onClick={() => onDelete(course.id)} className="px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">Xóa</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TrainingSection() {
  const { content, refreshContent } = useSiteContent();
  const [trainingData, setTrainingData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (content?.training) setTrainingData(JSON.parse(JSON.stringify(content.training)));
  }, [content?.training]);

  useEffect(() => { loadCourses(); }, []);
  const loadCourses = async () => {
    try { const res = await api.get('/api/admin/courses'); setCourses(res.data); } catch {}
  };

  const saveContent = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      await api.put('/api/admin/content/training', { data: trainingData });
      await refreshContent(); setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (err) { setError(err.response?.data?.error || 'Lỗi lưu.'); }
    finally { setSaving(false); }
  };

  const deleteCourse = async (id) => {
    if (!confirm('Xác nhận xóa khóa học này?')) return;
    await api.delete(`/api/admin/courses/${id}`);
    await loadCourses();
    setShowForm(false); setEditCourse(null);
  };

  const handleSaveCourse = async () => {
    await loadCourses(); setShowForm(false); setEditCourse(null);
  };

  const updateFeature = (i, field, value) => setTrainingData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    next.features[i][field] = value;
    return next;
  });

  if (!trainingData) return <div className="flex items-center justify-center py-20 text-slate-400">Đang tải...</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <span className="text-blue-500 text-lg">💡</span>
        <p className="text-sm text-blue-700">Phần "Tại sao học tại SORATA" và tiêu đề trang được quản lý bên dưới. Danh sách khóa học thêm/sửa/xóa ở bảng Khóa học.</p>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800">📄 Header trang Đào tạo</h2>
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Tiêu đề trang</label>
          <input className={INPUT} value={trainingData.header.title} onChange={e => setTrainingData(p => ({ ...JSON.parse(JSON.stringify(p)), header: { ...p.header, title: e.target.value } }))} /></div>
        <div><label className="text-sm font-medium text-slate-700 mb-1 block">Mô tả phụ</label>
          <textarea className={TEXTAREA} rows={2} value={trainingData.header.subtitle} onChange={e => setTrainingData(p => ({ ...JSON.parse(JSON.stringify(p)), header: { ...p.header, subtitle: e.target.value } }))} /></div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800">✨ Tại sao học tại SORATA (4 điểm nổi bật)</h2>
        {trainingData.features.map((f, i) => (
          <div key={i} className="flex gap-3 items-center p-3 bg-slate-50 rounded-xl">
            <input className="w-14 px-2 py-2 border border-slate-200 rounded-lg text-sm text-center" value={f.icon} onChange={e => updateFeature(i, 'icon', e.target.value)} />
            <div className="flex-1 space-y-2">
              <input className={INPUT} placeholder="Tên điểm nổi bật" value={f.title} onChange={e => updateFeature(i, 'title', e.target.value)} />
              <textarea className={`${TEXTAREA}`} rows={2} placeholder="Mô tả" value={f.desc} onChange={e => updateFeature(i, 'desc', e.target.value)} />
            </div>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <button onClick={saveContent} disabled={saving} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-60 flex items-center gap-2">
            {saving ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Đang lưu...</> : '💾 Lưu nội dung'}
          </button>
          {saved && <span className="text-sm text-emerald-600 font-medium">✅ Đã lưu!</span>}
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">🎓 Danh sách khóa học ({courses.length})</h2>
          <button onClick={() => { setEditCourse(null); setShowForm(true); }} className="flex items-center gap-1.5 bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            + Thêm khóa học
          </button>
        </div>
        <div className="space-y-2">
          {courses.map(c => (
            <div key={c.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
              <div>
                <div className="font-medium text-slate-800 text-sm">{c.name}</div>
                <div className="text-xs text-slate-400">{c.duration} · {c.level} · {new Intl.NumberFormat('vi-VN').format(c.price)}đ</div>
              </div>
              <button onClick={() => { setEditCourse(c); setShowForm(true); }} className="text-xs text-primary-600 hover:text-primary-700 px-3 py-1.5 border border-primary-200 rounded-lg">Sửa</button>
            </div>
          ))}
          {courses.length === 0 && <p className="text-sm text-slate-400 text-center py-4">Chưa có khóa học nào.</p>}
        </div>
      </div>

      {showForm && (
        <CourseForm
          course={editCourse}
          onSave={handleSaveCourse}
          onClose={() => { setShowForm(false); setEditCourse(null); }}
          onDelete={deleteCourse}
        />
      )}
    </div>
  );
}
