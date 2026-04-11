import { useState, useEffect } from 'react';
import api from '../../../lib/api';

function Badge({ children, color = 'slate' }) {
  const colors = { slate: 'bg-slate-100 text-slate-600', blue: 'bg-blue-50 text-blue-700', green: 'bg-green-50 text-green-700' };
  return <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${colors[color]}`}>{children}</span>;
}

function ContactsTab() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { const res = await api.get('/api/admin/contacts'); setContacts(res.data); }
    catch {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const deleteContact = async (id) => {
    if (!confirm('Xóa liên hệ này?')) return;
    await api.delete(`/api/admin/contacts/${id}`);
    await load();
  };

  if (loading) return <div className="text-sm text-slate-400 py-8 text-center">Đang tải...</div>;

  return (
    <div className="space-y-3">
      {contacts.length === 0 && <div className="text-sm text-slate-400 text-center py-8">Chưa có liên hệ nào.</div>}
      {contacts.map(c => (
        <div key={c.id} className="border border-slate-100 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-slate-800">{c.name}</span>
                {c.service && <Badge>{c.service}</Badge>}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-2">
                <a href={`tel:${c.phone}`} className="hover:text-primary-600 flex items-center gap-1">
                  📞 {c.phone}
                </a>
                {c.email && <a href={`mailto:${c.email}`} className="hover:text-primary-600">✉️ {c.email}</a>}
              </div>
              {c.message && <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 italic">"{c.message}"</p>}
              <p className="text-xs text-slate-400 mt-2">{new Date(c.created_at).toLocaleString('vi-VN')}</p>
            </div>
            <button onClick={() => deleteContact(c.id)} className="text-xs text-red-400 hover:text-red-600 flex-shrink-0">Xóa</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function RegistrationsTab() {
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { const res = await api.get('/api/admin/registrations'); setRegs(res.data); }
    catch {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const deleteReg = async (id) => {
    if (!confirm('Xóa đăng ký này?')) return;
    await api.delete(`/api/admin/registrations/${id}`);
    await load();
  };

  if (loading) return <div className="text-sm text-slate-400 py-8 text-center">Đang tải...</div>;

  return (
    <div className="space-y-3">
      {regs.length === 0 && <div className="text-sm text-slate-400 text-center py-8">Chưa có đăng ký học nào.</div>}
      {regs.map(r => (
        <div key={r.id} className="border border-slate-100 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-slate-800">{r.name}</span>
                {r.course_name && <Badge color="blue">{r.course_name}</Badge>}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-2">
                <a href={`tel:${r.phone}`} className="hover:text-primary-600">📞 {r.phone}</a>
                {r.email && <a href={`mailto:${r.email}`} className="hover:text-primary-600">✉️ {r.email}</a>}
              </div>
              {r.note && <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 italic">"{r.note}"</p>}
              <p className="text-xs text-slate-400 mt-2">{new Date(r.created_at).toLocaleString('vi-VN')}</p>
            </div>
            <button onClick={() => deleteReg(r.id)} className="text-xs text-red-400 hover:text-red-600 flex-shrink-0">Xóa</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function InboxSection() {
  const [activeTab, setActiveTab] = useState('contacts');

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <span className="text-blue-500 text-lg">💡</span>
        <p className="text-sm text-blue-700">Hộp thư đến gồm 2 loại: Form liên hệ tư vấn và Đăng ký khóa học. Có thể xóa các liên hệ đã xử lý.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          {[
            { id: 'contacts', label: '📩 Form liên hệ' },
            { id: 'registrations', label: '🎓 Đăng ký học' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3.5 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'contacts' ? <ContactsTab /> : <RegistrationsTab />}
        </div>
      </div>
    </div>
  );
}
