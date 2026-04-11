import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import ImageUpload from '../../../components/admin/ImageUpload';

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";
const TEXTAREA = `${INPUT} resize-none`;
const CATEGORIES = ['Thuế', 'Kế toán', 'Kinh doanh', 'Pháp lý', 'Tin tức'];

function PostForm({ post, onSave, onClose, onDelete }) {
  const [form, setForm] = useState(post || { title: '', slug: '', excerpt: '', content: '', thumbnail: '', category: 'Kế toán' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const autoSlug = (name) => name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      if (post?.id) await api.put(`/api/admin/blog/${post.id}`, form);
      else await api.post('/api/admin/blog', form);
      onSave();
    } catch (err) { setError(err.response?.data?.error || 'Lỗi lưu.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-800">{post?.id ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Tiêu đề bài viết *</label>
            <input className={INPUT} value={form.title} required onChange={e => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })} /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Slug *</label>
            <input className={INPUT} value={form.slug} required onChange={e => setForm({ ...form, slug: e.target.value })} />
            <p className="text-xs text-slate-400 mt-1">URL: /blog/[slug]. Tự động tạo từ tiêu đề, có thể sửa lại.</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Danh mục</label>
              <select className={INPUT} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select></div>
          </div>
          <ImageUpload
            value={form.thumbnail}
            onChange={url => setForm({ ...form, thumbnail: url })}
            label="Ảnh thumbnail"
            hint="Ảnh hiển thị trong danh sách blog. Tỷ lệ 16:9, tối thiểu 800x450px."
          />
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Tóm tắt (excerpt)</label>
            <textarea className={TEXTAREA} rows={3} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Mô tả ngắn hiển thị trong danh sách bài viết..." /></div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Nội dung bài viết</label>
            <p className="text-xs text-slate-400 mb-2">Nhập nội dung dạng văn bản. Dùng ## Tiêu đề để tạo đề mục, xuống dòng để tách đoạn.</p>
            <textarea className={TEXTAREA} rows={12} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Nội dung bài viết..." />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
              {saving ? 'Đang lưu...' : post?.id ? 'Cập nhật bài viết' : 'Thêm bài viết'}
            </button>
            {post?.id && (
              <button type="button" onClick={() => onDelete(post.id)} className="px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">Xóa</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPost, setEditPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('Tất cả');

  const loadPosts = async () => {
    try { const res = await api.get('/api/admin/blog'); setPosts(res.data); }
    catch {} finally { setLoading(false); }
  };

  useEffect(() => { loadPosts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Xác nhận xóa bài viết này?')) return;
    await api.delete(`/api/admin/blog/${id}`);
    await loadPosts(); setShowForm(false); setEditPost(null);
  };

  const handleSave = async () => {
    await loadPosts(); setShowForm(false); setEditPost(null);
  };

  const cats = ['Tất cả', ...CATEGORIES];
  const filtered = filter === 'Tất cả' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <span className="text-blue-500 text-lg">💡</span>
        <p className="text-sm text-blue-700">Quản lý bài viết blog. Ảnh thumbnail upload lên Cloudinary. Nội dung nhập dạng văn bản thuần túy, dùng ## để tạo tiêu đề đề mục.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${filter === c ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{c}</button>
            ))}
          </div>
          <button onClick={() => { setEditPost(null); setShowForm(true); }} className="flex items-center gap-1.5 bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors ml-2">
            + Thêm bài
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />)}</div>
        ) : (
          <div className="space-y-2">
            {filtered.map(post => (
              <div key={post.id} className="flex items-center gap-4 p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                {post.thumbnail && <img src={post.thumbnail} alt="" className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 text-sm truncate">{post.title}</div>
                  <div className="text-xs text-slate-400">{post.category} · {post.views} lượt xem · {new Date(post.created_at).toLocaleDateString('vi-VN')}</div>
                </div>
                <button onClick={() => { setEditPost(post); setShowForm(true); }} className="text-xs text-primary-600 hover:text-primary-700 px-3 py-1.5 border border-primary-200 rounded-lg flex-shrink-0">Sửa</button>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-sm text-slate-400 text-center py-6">Chưa có bài viết nào.</p>}
          </div>
        )}
      </div>

      {showForm && (
        <PostForm
          post={editPost}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditPost(null); }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
