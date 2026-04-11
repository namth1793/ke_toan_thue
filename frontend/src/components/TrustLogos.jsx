import ScrollFade from './ScrollFade';
import { useSiteContent } from '../context/SiteContentContext';

const PARTNER_COLORS = [
  'text-red-700 bg-red-50 border-red-100',
  'text-blue-700 bg-blue-50 border-blue-100',
  'text-green-700 bg-green-50 border-green-100',
  'text-indigo-700 bg-indigo-50 border-indigo-100',
  'text-amber-700 bg-amber-50 border-amber-100',
  'text-emerald-700 bg-emerald-50 border-emerald-100',
];

const DEFAULT = {
  title: 'Được chứng nhận & liên kết với',
  partners: [
    { name: 'Bộ Tài Chính', abbr: 'BTC' },
    { name: 'Tổng Cục Thuế', abbr: 'TCT' },
    { name: 'MISA', abbr: 'MISA' },
    { name: 'Hội KT-KT Việt Nam', abbr: 'VAA' },
  ],
  clientsTitle: 'Hơn 500 khách hàng đang tin dùng',
  clientTypes: [
    { icon: '🛒', label: 'Hộ kinh doanh', count: '120+' },
    { icon: '🏢', label: 'Công ty TNHH', count: '250+' },
    { icon: '⚡', label: 'Startup', count: '80+' },
    { icon: '🏭', label: 'Doanh nghiệp vừa', count: '50+' },
  ],
};

export default function TrustLogos() {
  const { content } = useSiteContent();
  const d = content?.home?.trustLogos || DEFAULT;

  return (
    <section className="py-14 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFade>
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-slate-400 mb-8">
            {d.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {d.partners.map((org, i) => (
              <div key={org.abbr} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold ${PARTNER_COLORS[i % PARTNER_COLORS.length]} whitespace-nowrap`}>
                <span className="font-black text-xs">{org.abbr}</span>
                <span className="hidden sm:inline text-xs font-medium opacity-80">{org.name}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-8">
            <p className="text-center text-xs font-semibold tracking-widest uppercase text-slate-400 mb-6">
              {d.clientsTitle}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {d.clientTypes.map((c) => (
                <div key={c.label} className="text-center">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-2xl">{c.icon}</div>
                  <div className="text-xl font-bold text-primary-600">{c.count}</div>
                  <div className="text-xs text-slate-500">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}
