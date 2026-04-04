import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function renderContent(content) {
  if (!content) return null;
  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-slate-800 mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="font-semibold text-slate-700 my-2">{line.slice(2, -2)}</p>);
    } else if (/^\d+\./.test(line)) {
      elements.push(<p key={i} className="text-slate-600 my-1 pl-4">• {line.replace(/^\d+\.\s*/, '')}</p>);
    } else if (line.startsWith('- ')) {
      elements.push(<p key={i} className="text-slate-600 my-1 pl-4">• {line.slice(2)}</p>);
    } else {
      elements.push(<p key={i} className="text-slate-600 leading-relaxed my-3">{line}</p>);
    }
    i++;
  }
  return elements;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios.get(`/api/blog/${slug}`)
      .then((r) => setPost(r.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="pt-nav min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (notFound) return (
    <div className="pt-nav min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl font-bold text-slate-700">Bài viết không tồn tại</p>
      <Link to="/blog" className="btn-primary">← Về danh sách blog</Link>
    </div>
  );

  return (
    <div className="pt-nav">
      {/* Thumbnail */}
      <div className="w-full h-72 md:h-96 relative overflow-hidden bg-slate-100">
        <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          <span className="inline-block bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{post.category}</span>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
            <span>{formatDate(post.created_at)}</span>
            <span>{post.views.toLocaleString()} lượt xem</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded-r-lg mb-8">
          <p className="text-slate-700 italic">{post.excerpt}</p>
        </div>

        <article className="prose-custom">
          {renderContent(post.content)}
        </article>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/blog" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Xem tất cả bài viết
          </Link>
          <Link to="/lien-he" className="btn-primary text-sm py-2">
            Cần tư vấn thêm? Liên hệ ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
