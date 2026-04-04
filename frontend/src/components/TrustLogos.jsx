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
  { icon: '🏪', label: 'Hộ kinh doanh', count: '120+' },
  { icon: '🏢', label: 'Công ty TNHH', count: '250+' },
  { icon: '🚀', label: 'Startup', count: '80+' },
  { icon: '🏭', label: 'Doanh nghiệp vừa', count: '50+' },
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
                  <div className="text-2xl mb-1">{c.icon}</div>
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
