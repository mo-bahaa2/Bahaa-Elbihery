import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, CalendarCheck, ShieldCheck, FileText } from 'lucide-react';

export default function ServiceDetails() {
  const { id } = useParams();

  const service = {
    title: id === '3' ? 'دراسة قضية نقض' : id === '2' ? 'مراجعة عقد أو مستند' : 'استشارة قانونية عامة',
    description: 'نقدم في هذه الخدمة دراسة مستفيضة وشاملة لجميع الجوانب القانونية المتعلقة بموقفك. يتم مراجعة كافة المستندات والأوراق بدقة عالية لضمان حفظ حقوقك وتوجيهك للطريق القانوني الأمثل ومناقشة كل الاحتمالات بشفافية تامة.',
    features: [
      'دراسة وتحليل المستندات والأوراق بدقة شديدة',
      'تحديد نقاط القوة والضعف في الموقف القانوني',
      'وضع استراتيجية قانونية واضحة للخطوات القادمة',
      'سرية تامة لجميع البيانات والمستندات'
    ],
    duration: id === '3' ? '7 أيام' : id === '2' ? '48 ساعة' : '30 - 60 دقيقة',
    icon: <FileText className="w-10 h-10 text-[#B8860B]" />
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 lg:py-20 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#B8860B]/5 blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/services" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#B8860B] font-bold mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 -scale-x-100 group-hover:translate-x-1 transition-transform" />
          العودة للخدمات
        </Link>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-[#E8E4DF] border-t-4 border-t-[#B8860B] shadow-hover relative">
          <div className="w-18 h-18 rounded-2xl bg-[#FDF9F0] border border-[#B8860B]/20 flex items-center justify-center mb-8 shadow-sm">
            {service.icon}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-6">{service.title}</h1>
          <p className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed mb-10 text-justify">
            {service.description}
          </p>

          <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
            ماذا تتضمن هذه الخدمة؟
          </h3>
          <ul className="space-y-4 mb-12">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                <span className="text-[#1A1A1A] font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#FAFAF8] p-6 rounded-2xl border border-[#E8E4DF] mb-10">
            <div className="flex items-center gap-3 text-[#1A1A1A] w-full sm:w-auto">
              <Clock className="w-6 h-6 text-[#B8860B]" />
              <span className="font-bold">المدة المتوقعة: {service.duration}</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-[#E8E4DF] mx-4"></div>
            <div className="flex items-center gap-3 text-[#1A1A1A] w-full sm:w-auto">
              <ShieldCheck className="w-6 h-6 text-[#B8860B]" />
              <span className="font-bold">ضمان السرية التامة 100%</span>
            </div>
          </div>

          <Link 
            to="/booking"
            className="w-full flex items-center justify-center gap-2.5 bg-[#B8860B] hover:bg-[#996515] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-gold hover:-translate-y-0.5 transition-all duration-300 shadow-sm group"
          >
            <CalendarCheck className="w-6 h-6" />
            احجز هذه الخدمة الآن
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 mr-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
