import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';
import { useSiteContent } from '../context/SiteContentContext';

const STAT_STYLES = [
  'bg-primary-600 text-white',
  'bg-slate-800 text-white',
  'bg-emerald-600 text-white',
  'bg-amber-500 text-white',
];
const STAT_SUB_STYLES = [
  'text-blue-100',
  'text-slate-300',
  'text-emerald-100',
  'text-amber-100',
];

const DEFAULT = {
  header: { title: 'Về SORATA Advisory', subtitle: 'Hơn 10 năm đồng hành cùng doanh nghiệp Việt Nam. Chuyên nghiệp, tận tâm, đáng tin cậy.' },
  story: {
    headline: 'Không chỉ "làm xong" — chúng tôi đồng hành thực sự',
    paragraphs: [
      'SORATA Advisory — viết tắt của Solution-driven, Responsible, Aligned Together in Action — được thành lập bởi Phan Việt Hùng.',
    ],
  },
  stats: [
    { value: '500+', label: 'Khách hàng' },
    { value: '10+', label: 'Năm kinh nghiệm' },
    { value: '100%', label: 'Đúng hạn' },
    { value: '20+', label: 'Nhân viên' },
  ],
  vision: 'Trở thành đối tác tư vấn tài chính – kế toán đáng tin cậy nhất cho các doanh nghiệp Việt Nam.',
  mission: 'Giúp khách hàng thực sự hiểu tài chính của họ và đưa ra quyết định kinh doanh sáng suốt.',
  milestones: [],
  team: [],
  certs: [],
  ctaTitle: 'Hãy để chúng tôi đồng hành cùng bạn',
  ctaSubtitle: 'Tư vấn miễn phí, không ràng buộc. Gặp gỡ đội ngũ của chúng tôi hôm nay.',
};

export default function About() {
  const { content } = useSiteContent();
  const d = content?.about || DEFAULT;
  const header = d.header || DEFAULT.header;
  const story = d.story || DEFAULT.story;
  const stats = d.stats || DEFAULT.stats;
  const milestones = d.milestones || DEFAULT.milestones;
  const team = d.team || DEFAULT.team;
  const certs = d.certs || DEFAULT.certs;

  return (
    <div className="pt-nav">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">Giới thiệu</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{header.title}</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">{header.subtitle}</p>
          </ScrollFade>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollFade>
              <div className="inline-block bg-primary-50 text-primary-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Câu chuyện của chúng tôi</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">{story.headline}</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                {(story.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </ScrollFade>

            <ScrollFade direction="left">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className={`${STAT_STYLES[i % STAT_STYLES.length]} rounded-2xl p-6 text-center`}>
                    <div className="text-4xl font-bold mb-1">{s.value}</div>
                    <div className={`${STAT_SUB_STYLES[i % STAT_SUB_STYLES.length]} text-sm`}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="bg-primary-50 border border-primary-100 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-primary-700">Tầm nhìn</h4>
                  </div>
                  <p className="text-slate-600 text-sm">{d.vision || DEFAULT.vision}</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-indigo-700">Sứ mệnh</h4>
                  </div>
                  <p className="text-slate-600 text-sm">{d.mission || DEFAULT.mission}</p>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* Timeline */}
      {milestones.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollFade className="text-center mb-12">
              <h2 className="section-title">Hành trình phát triển</h2>
            </ScrollFade>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200" aria-hidden />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <ScrollFade key={i} delay={i * 0.1}>
                    <div className="flex gap-6 items-start">
                      <div className="w-16 flex-shrink-0 flex flex-col items-center">
                        <div className="w-4 h-4 bg-primary-600 rounded-full border-2 border-white shadow-md z-10" />
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex-1">
                        <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full mb-2">{m.year}</span>
                        <p className="text-slate-700 text-sm font-medium">{m.event}</p>
                      </div>
                    </div>
                  </ScrollFade>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollFade className="text-center mb-12">
              <h2 className="section-title">Đội ngũ chuyên gia</h2>
              <p className="section-subtitle">Mỗi thành viên đều có chứng chỉ hành nghề và kinh nghiệm thực tế sâu sắc.</p>
            </ScrollFade>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team.map((member, i) => (
                <ScrollFade key={i} delay={i * 0.1}>
                  <div className="card p-6 text-center">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-primary-100" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4 text-primary-700 font-bold text-2xl ring-4 ring-primary-100">
                        {member.name?.[0]}
                      </div>
                    )}
                    <h3 className="font-bold text-slate-800 mb-1">{member.name}</h3>
                    <p className="text-primary-600 text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">{member.desc}</p>
                    <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                      {(member.certs || []).map((c, ci) => (
                        <span key={ci} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c}</span>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 pt-3 space-y-1.5">
                      {member.phone && (
                        <a href={`tel:${member.phone.replace(/\./g, '')}`} className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {member.phone}
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-primary-600 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {member.email}
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollFade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {certs.length > 0 && (
        <section className="py-16 bg-primary-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollFade className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-800">Chứng chỉ & Công nhận</h2>
            </ScrollFade>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certs.map((cert, i) => (
                <ScrollFade key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-primary-100">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{cert.title}</div>
                      <div className="text-xs text-slate-400">{cert.issuer}</div>
                    </div>
                  </div>
                </ScrollFade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <h2 className="text-3xl font-bold mb-4">{d.ctaTitle || DEFAULT.ctaTitle}</h2>
            <p className="text-blue-100 mb-6">{d.ctaSubtitle || DEFAULT.ctaSubtitle}</p>
            <Link to="/lien-he" className="btn-white">Liên hệ ngay</Link>
          </ScrollFade>
        </div>
      </section>
    </div>
  );
}
