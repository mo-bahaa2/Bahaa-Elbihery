import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, Gavel, CalendarCheck, Clock, ChevronDown, ShieldAlert, Users, Landmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://backend-test-six-alpha.vercel.app/api/services?active_only=true')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/booking');
  };

  const getServiceIcon = (index: number) => {
    const icons = [
      <Gavel className="w-7 h-7" />,
      <FileText className="w-7 h-7" />,
      <Scale className="w-7 h-7" />
    ];
    return icons[index % icons.length];
  };

  const practiceAreas = [
    {
      title: 'القضايا الجنائية (جنائي)',
      icon: <ShieldAlert className="w-7 h-7" />,
      desc: 'المرافعة في قضايا الجنايات والجنح المعقدة، قضايا الأموال العامة، وجلسات التحقيق بنيابة أمن الدولة ومحكمة النقض.'
    },
    {
      title: 'القضايا المدنية (مدني)',
      icon: <Scale className="w-7 h-7" />,
      desc: 'دعاوى التعويضات، منازعات العقود والملكية العقارية، قضايا الإيجارات والمطالبات المالية والتجارية الكبرى.'
    },
    {
      title: 'قضايا الأسرة (أحوال شخصية)',
      icon: <Users className="w-7 h-7" />,
      desc: 'دعاوى النفقات، الحضانة، الخلع، الطلاق، والوصايا وتقسيم المواريث والتركات بأعلى معايير السرية التامة.'
    },
    {
      title: 'القضاء الإداري ومجلس الدولة',
      icon: <Landmark className="w-7 h-7" />,
      desc: 'الطعن بالإلغاء على القرارات الإدارية، منازعات العاملين بالدولة والترقيات، تراخيص المشاريع والعقود الإدارية.'
    }
  ];

  return (
    <>
      {/* Subtle Warm Amber Glows */}
      <div className="absolute top-[-5%] right-[-5%] w-[550px] h-[550px] rounded-full bg-[#B8860B]/5 blur-[130px] -z-10 pointer-events-none animate-warm-1" />
      <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#B8860B]/4 blur-[150px] -z-10 pointer-events-none animate-warm-2" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col gap-7 text-center lg:text-right">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F5F3F0] border border-[#E8E4DF] text-[#B8860B] font-bold text-xs w-fit mx-auto lg:mx-0 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8860B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8860B]"></span>
              </span>
              المستشار بهاء صلاح البحيري | محامٍ بالنقض والدستورية والإدارية العليا
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.28] text-[#1A1A1A] tracking-tight">
              حماية حقوقك بقوة القانون <br />
              <span className="text-[#B8860B]">بكل ثقة واحترافية</span>
            </h1>
            
            <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              خبرة تمتد لأكثر من 20 عاماً في تقديم الاستشارات القانونية، المرافعة في أعقد القضايا، ومراجعة العقود لضمان حقوقك بأعلى معايير الأمان والشفافية.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-2">
              <Link 
                to="/booking" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#996515] text-white px-8 py-3.5 rounded-full font-bold text-base shadow-sm hover:shadow-gold hover:-translate-y-0.5 transition-all duration-300"
              >
                احجز استشارة الآن
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <a 
                href="#services" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#1A1A1A] border border-[#E8E4DF] px-8 py-3.5 rounded-full font-bold text-base hover:bg-[#F5F3F0] hover:border-[#B8860B] hover:text-[#B8860B] hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
              >
                تعرف على خدماتنا
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-4 pt-6 border-t border-[#E8E4DF]">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-extrabold text-[#1A1A1A]">20+</span>
                <span className="text-xs text-[#6B6B6B] font-semibold">سنة خبرة</span>
              </div>
              <div className="w-px h-10 bg-[#E8E4DF]"></div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-extrabold text-[#1A1A1A]">10k+</span>
                <span className="text-xs text-[#6B6B6B] font-semibold">قضية ناجحة</span>
              </div>
              <div className="w-px h-10 bg-[#E8E4DF]"></div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-extrabold text-[#1A1A1A]">100%</span>
                <span className="text-xs text-[#6B6B6B] font-semibold">سرية تامة</span>
              </div>
            </div>
          </div>

          {/* Mini Form Card (Editorial Card) */}
          <div className="relative lg:h-[580px] flex items-center justify-center isometric-parent">
            <div className="relative w-full max-w-md isometric-child">
              
              {/* Main Card */}
              <form onSubmit={handleQuickBook} className="bg-white rounded-2xl p-6 md:p-8 shadow-hover border border-[#E8E4DF] border-t-4 border-t-[#B8860B] relative z-10 text-right">
                <div className="mb-6 border-b border-[#E8E4DF] pb-4">
                  <div className="text-xs font-bold text-[#B8860B] mb-1">خدمة فورية ومباشرة</div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#1A1A1A] mb-1">طلب استشارة سريعة</h3>
                  <p className="text-[#6B6B6B] text-sm">حدد نوع الخدمة والموعد المناسب للبدء فوراً.</p>
                </div>
                
                <div className="space-y-5 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1A1A1A]">كيف يمكننا مساعدتك؟</label>
                    <div className="relative">
                      <select className="w-full bg-[#FAFAF8] border border-[#E8E4DF] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent appearance-none text-[#1A1A1A] font-bold shadow-sm transition-all">
                        {loading ? (
                          <option>جاري التحميل...</option>
                        ) : services.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute left-4 top-4 w-5 h-5 text-[#B8860B] pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#FDF9F0] rounded-xl p-4 mb-6 flex items-start gap-3 border border-[#B8860B]/20">
                  <CalendarCheck className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#1A1A1A] leading-relaxed font-medium">
                    الخطوة التالية: عرض الأيام والأوقات المتاحة للحجز الفوري والتأكيد مع المستشار.
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#996515] text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-sm hover:shadow-gold hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  عرض المواعيد المتاحة
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </button>
              </form>

              {/* Decorative Subtle Shadow */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#B8860B]/10 rounded-2xl blur-2xl -z-10"></div>
              
              {/* Floating Badge */}
              <div className="absolute -left-6 top-10 bg-white p-3.5 rounded-xl shadow-hover border border-[#E8E4DF] flex items-center gap-3 z-20 bounce-slow">
                <div className="w-10 h-10 rounded-full bg-[#FDF9F0] border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#6B6B6B] font-semibold">الاستجابة خلال</p>
                  <p className="text-sm font-extrabold text-[#1A1A1A]">30 دقيقة</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Practice Areas Section (جنائي - مدني - أسرة - قضاء إداري) */}
      <section className="py-20 bg-[#FDFDFD] border-t border-[#E8E4DF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="mb-4 flex items-center justify-center gap-4 max-w-xs mx-auto">
              <span className="h-px flex-1 bg-[#E8E4DF]" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B8860B]">
                مجالات الاختصاص
              </span>
              <span className="h-px flex-1 bg-[#E8E4DF]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">
              تخصصات قانونية رفيعة المستوى
            </h2>
            <p className="text-base text-[#6B6B6B] leading-relaxed">
              تغطية قضائية شاملة ومتخصصة أمام كافة درجات التقاضي، محاكم النقض، ومجلس الدولة.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceAreas.map((area, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E8E4DF] hover:border-[#B8860B]/40 hover:shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FDF9F0] border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B] mb-5">
                    {area.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{area.title}</h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed mb-4">{area.desc}</p>
                </div>
                <Link 
                  to="/booking" 
                  className="text-xs font-bold text-[#B8860B] hover:text-[#996515] flex items-center gap-1 pt-3 border-t border-[#F5F3F0] transition-colors"
                >
                  <span>طلب استشارة بالتخصص</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white border-y border-[#E8E4DF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Rule Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="mb-4 flex items-center justify-center gap-4 max-w-xs mx-auto">
              <span className="h-px flex-1 bg-[#E8E4DF]" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B8860B]">
                خدمات متخصصة
              </span>
              <span className="h-px flex-1 bg-[#E8E4DF]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">خدمات قانونية متكاملة</h2>
            <p className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed">
              نقدم حلولاً قانونية شاملة تناسب احتياجاتك بدقة وسرعة. اختر الخدمة واحجز موعدك فوراً.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3">
                <LoadingSpinner text="جاري تحميل الخدمات..." />
              </div>
            ) : services.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-[#6B6B6B] font-bold text-lg">لا توجد خدمات متاحة حالياً.</div>
            ) : services.map((service, index) => (
              <div 
                key={service.id} 
                className="group bg-[#FAFAF8] rounded-2xl p-8 border border-[#E8E4DF] border-t-2 border-t-transparent hover:border-t-[#B8860B] shadow-soft hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-[#E8E4DF] shadow-sm flex items-center justify-center text-[#B8860B] mb-6 group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300">
                  {getServiceIcon(index)}
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#B8860B] transition-colors">{service.name}</h3>
                <p className="text-[#6B6B6B] mb-6 text-sm leading-relaxed flex-grow">
                  {service.description || `خدمة قانونية مميزة بمدة ${service.duration_minutes} دقيقة`}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E8E4DF]">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-[#E8E4DF] text-[#1A1A1A]">
                    {service.duration_minutes} دقيقة
                  </span>
                  <Link 
                    to={`/booking?service=${service.id}`} 
                    className="text-[#B8860B] hover:text-[#996515] font-bold text-sm flex items-center gap-1.5 transition-colors"
                  >
                    احجز الآن
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section (Luxury Charcoal & Gold Banner) */}
      <section className="py-24 relative overflow-hidden bg-[#141413] border-t-2 border-[#B8860B]">
        {/* Subtle Warm Amber Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#B8860B]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <div className="mb-4 flex items-center justify-center gap-4 max-w-xs mx-auto">
            <span className="h-px flex-1 bg-[#3A3833]" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#D4A84B]">
              استشارة قانونية فورية
            </span>
            <span className="h-px flex-1 bg-[#3A3833]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">لا تترك حقوقك للصدفة</h2>
          <p className="text-lg md:text-xl text-[#D6D3CC] mb-10 max-w-2xl mx-auto leading-relaxed">
            احجز استشارتك الآن وتحدث مباشرة مع مستشارك القانوني لضمان موقفك بأسرع وقت وأعلى درجات الأمان.
          </p>
          <Link 
            to="/booking" 
            className="inline-flex items-center justify-center gap-2.5 bg-[#B8860B] hover:bg-[#996515] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-gold hover:scale-105 transition-all duration-300 shadow-xl group"
          >
            ابدأ حجز استشارتك
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
