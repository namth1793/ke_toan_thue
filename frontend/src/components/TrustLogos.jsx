import ScrollFade from './ScrollFade';

const trustedBy = [
  { name: 'Bộ Tài Chính', abbr: 'BTC', color: 'text-red-700 bg-red-50 border-red-100' },
  { name: 'Tổng Cục Thuế', abbr: 'TCT', color: 'text-blue-700 bg-blue-50 border-blue-100' },
  { name: 'MISA', abbr: 'MISA', color: 'text-green-700 bg-green-50 border-green-100' },
  { name: 'Hội KT-KT Việt Nam', abbr: 'VAA', color: 'text-indigo-700 bg-indigo-50 border-indigo-100' },
  { name: 'Cổng DV Công Quốc Gia', abbr: 'DVCQG', color: 'text-amber-700 bg-amber-50 border-amber-100' },
  { name: 'Ngân hàng VietcomBank', abbr: 'VCB', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
];

const clientTypes = [
  {
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 006.54 17H17M17 17a2 2 0 100 4 2 2 0 000-4zm-9 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    label: 'Hộ kinh doanh', count: '120+',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    label: 'Công ty TNHH', count: '250+',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: 'Startup', count: '80+',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    label: 'Doanh nghiệp vừa', count: '50+',
  },
];

export default function TrustLogos() {
  return (
    <section className="py-14 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFade>
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-slate-400 mb-8">
            Được chứng nhận & liên kết với
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {trustedBy.map((org) => (
              <div
                key={org.name}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold ${org.color} whitespace-nowrap`}
              >
                <span className="font-black text-xs">{org.abbr}</span>
                <span className="hidden sm:inline text-xs font-medium opacity-80">{org.name}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-8">
            <p className="text-center text-xs font-semibold tracking-widest uppercase text-slate-400 mb-6">
              Hơn 500 khách hàng đang tin dùng
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {clientTypes.map((c) => (
                <div key={c.label} className="text-center">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2">{c.icon}</div>
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
