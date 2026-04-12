import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import logo from '../../../assets/logo.png';

const navItems = [
  { id: 'settings', label: 'Cài đặt chung', icon: '⚙️', desc: 'Thông tin công ty, liên hệ, mạng xã hội' },
  { id: 'home', label: 'Trang chủ', icon: '🏠', desc: 'Hero, dịch vụ, FAQ, testimonials...' },
  { id: 'services', label: 'Dịch vụ', icon: '📋', desc: 'Các dịch vụ kế toán thuế' },
  { id: 'training', label: 'Đào tạo', icon: '🎓', desc: 'Khóa học và tính năng' },
  { id: 'blog', label: 'Blog', icon: '📝', desc: 'Bài viết tin tức' },
  { id: 'about', label: 'Giới thiệu', icon: '🏢', desc: 'Đội ngũ, mốc thời gian, chứng chỉ' },
  { id: 'inbox', label: 'Hộp thư', icon: '📬', desc: 'Form liên hệ & đăng ký học' },
  { id: 'changePassword', label: 'Đổi mật khẩu', icon: '🔑', desc: 'Cập nhật mật khẩu đăng nhập' },
];

export default function AdminLayout({ children, activeSection, onSectionChange }) {
  const { admin, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200
        lg:relative lg:translate-x-0 lg:flex lg:flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-slate-100">
          <img src={logo} alt="logo" className="h-10 w-auto" />
          <div>
            <div className="text-xs font-bold text-slate-800 leading-tight">Admin Panel</div>
            <div className="text-xs text-slate-400">SORATA Advisory</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onSectionChange(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                activeSection === item.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-slate-400 leading-tight">{item.desc}</div>
              </div>
            </button>
          ))}
        </nav>

        {/* Admin info */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-sm">
              {admin?.name?.[0] || 'A'}
            </div>
            <div>
              <div className="text-sm font-medium text-slate-800">{admin?.name}</div>
              <div className="text-xs text-slate-400">{admin?.username}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="font-semibold text-slate-800 text-sm">
                {navItems.find(n => n.id === activeSection)?.label || 'Admin'}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                {navItems.find(n => n.id === activeSection)?.desc}
              </p>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 transition-colors px-3 py-1.5 border border-slate-200 rounded-lg"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Xem website
          </a>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
