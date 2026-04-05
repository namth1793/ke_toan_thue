import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import ScrollFade from '../components/ScrollFade';

const categories = ['Tất cả', 'Thuế', 'Kế toán', 'Kinh doanh'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const catColors = {
  Thuế: 'bg-blue-100 text-blue-700',
  'Kế toán': 'bg-indigo-100 text-indigo-700',
  'Kinh doanh': 'bg-emerald-100 text-emerald-700',
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('Tất cả');
  const [loading, setLoading] = useState(true);
  const limit = 6;

  useEffect(() => {
    setLoading(true);
    const params = { page, limit };
    if (category !== 'Tất cả') params.category = category;
    api.get('/api/blog', { params })
      .then((r) => {
        setPosts(r.data.posts);
        setTotal(r.data.total);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, category]);

  const totalPages = Math.ceil(total / limit);

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <div className="pt-nav">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Blog & Kiến thức</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog kế toán & thuế</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Kiến thức thực tế về kế toán, thuế và quản lý tài chính doanh nghiệp. Cập nhật mỗi tuần.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg">Chưa có bài viết nào trong danh mục này.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <ScrollFade key={post.id} delay={(i % 6) * 0.07}>
                  <Link to={`/blog/${post.slug}`} className="card block overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${catColors[post.category] || 'bg-slate-100 text-slate-600'}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <span>{formatDate(post.created_at)}</span>
                        <span>{post.views.toLocaleString()} lượt xem</span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      <div className="mt-4 flex items-center text-primary-600 text-sm font-medium">
                        Đọc tiếp
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollFade>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    page === i + 1
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
