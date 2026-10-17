import { Award, BookOpen, Briefcase, Scale, ShieldCheck, GraduationCap, FileText } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 lg:py-20 relative overflow-hidden">
      {/* Background warm glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#B8860B]/5 blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="mb-4 flex items-center justify-center gap-4 max-w-xs mx-auto">
            <span className="h-px flex-1 bg-[#E8E4DF]" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B8860B]">
              المسيرة والخبرة
            </span>
            <span className="h-px flex-1 bg-[#E8E4DF]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">عن المحامي</h1>
          <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            خبرة قانونية ممتدة لأكثر من 30 عاماً في ساحات المحاكم المصرية، وتخصص دقيق في قضايا النقض والاستشارات القانونية المعقدة.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Content (Right Side in RTL) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Bio Section with Image */}
            <section className="bg-white rounded-3xl p-8 lg:p-10 border border-[#E8E4DF] shadow-soft relative overflow-hidden flex flex-col md:flex-row gap-8">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#B8860B]"></div>
              
              <div className="w-full md:w-1/3 shrink-0">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-[#E8E4DF] relative">
                  <img 
                    src="/bahaa.png" 
                    alt="المستشار بهاء البحيري" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/80 via-[#141413]/25 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                    <div className="font-bold text-base sm:text-lg">المستشار / بهاء البحيري</div>
                    <div className="text-xs text-[#D4A84B] font-semibold">محامٍ بالنقض والدستورية العليا</div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-[#B8860B]" />
                  السيرة المهنية
                </h2>
                <div className="space-y-4 text-[#6B6B6B] leading-loose text-justify text-sm sm:text-base">
                  <p>
                    <strong className="text-[#1A1A1A]">المستشار / بهاء صلاح البحيري</strong> المحامي المقيد بالنقض والدستورية والإدارية العليا. تخرج من كلية الحقوق جامعة القاهرة، وأسس صرحه القانوني ليكون مرجعاً موثوقاً في تقديم الاستشارات القانونية والمرافعة القضائية الرفيعة.
                  </p>
                  <p>
                    يتمتع بخبرة قضائية ممتدة لأكثر من 30 عاماً تغطي التخصصات المحورية: <strong>القضايا الجنائية  (جنائي و جنح)، القضايا والمنازعات المدنية والتعويضات (مدني)، قضايا الأسرة والأحوال الشخصية والمواريث (أسرة)،و القضايا العمالية ودعاوى القضاء الإداري ومجلس الدولة والطعون الدستورية</strong>، بجانب تخصصه البارز في كتابة أسباب الطعن والمرافعة أمام محكمة النقض.
                  </p>
                  <p>
                    يؤمن بأن حماية حقوق الموكل هي أمانة وواجب دستوري وأخلاقي، مع التزام المكتب المطلق بالسرية والشفافية التامة في كافة مراحل النزاع القانوني.
                  </p>
                </div>
              </div>
            </section>

            {/* Achievements Section */}
            <section className="bg-white rounded-3xl p-8 lg:p-10 border border-[#E8E4DF] shadow-soft">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#B8860B]" />
               المهارات و الخبرات
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-[#FAFAF8] rounded-2xl border border-[#E8E4DF] hover:border-[#B8860B]/40 hover:shadow-soft transition-all">
                  <div className="w-12 h-12 bg-[#FDF9F0] border border-[#B8860B]/20 rounded-xl shadow-sm flex items-center justify-center text-[#B8860B] mb-4">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] mb-2">خبره ثلاثون عاما في قضايا الجنايات و الجنح و القضايا المدنيه و الايجارات و قضايا الاسرة و القضاء الإداري</h3>
                  {/* <p className="text-sm text-[#6B6B6B] leading-relaxed">نجاح في قبول العشرات من الطعون بالنقض وتصحيح أحكام نهائية معيبة في قضايا جنائية ومدنية كبرى.</p> */}
                </div>
                <div className="p-6 bg-[#FAFAF8] rounded-2xl border border-[#E8E4DF] hover:border-[#B8860B]/40 hover:shadow-soft transition-all">
                  <div className="w-12 h-12 bg-[#FDF9F0] border border-[#B8860B]/20 rounded-xl shadow-sm flex items-center justify-center text-[#B8860B] mb-4">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] mb-2">محكم دولي معتمد بمجلس الوحده الاقتصاديه بمنظمة جامعة الدول العربية</h3>
                  {/* <p className="text-sm text-[#6B6B6B] leading-relaxed">الإشراف القانوني الكامل على دمج وتأسيس كيانات تجارية عملاقة برأس مال يتجاوز مئات الملايين.</p> */}
                </div>
                <div className="p-6 bg-[#FAFAF8] rounded-2xl border border-[#E8E4DF] hover:border-[#B8860B]/40 hover:shadow-soft transition-all sm:col-span-2">
                  <div className="w-12 h-12 bg-[#FDF9F0] border border-[#B8860B]/20 rounded-xl shadow-sm flex items-center justify-center text-[#B8860B] mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] mb-2">كتابه جميع العقود بين الافراد و عقود الشركات بجميع انواعها - مستشار قانوني للعديد من الشركات </h3>
                  {/* <p className="text-sm text-[#6B6B6B] leading-relaxed">الحصول على أحكام براءة في قضايا مالية واقتصادية معقدة بفضل التحليل الدقيق لأوراق القضية وبناء الدفوع القانونية المحكمة.</p> */}
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar (Left Side in RTL) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Info Card (Luxury Charcoal) */}
            <div className="bg-[#141413] rounded-3xl p-8 text-white shadow-hover border-t-4 border-t-[#B8860B] relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#B8860B]/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <h3 className="text-xl font-bold mb-8 border-b border-[#2A2925] pb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
               نبذه عن المحامي
              </h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#242320] border border-[#3A3833] flex items-center justify-center text-[#B8860B] shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9E9B94] mb-1">الدرجة القضائية</div>
                    <div className="font-bold text-sm text-white">محامٍ بالنقض والدستورية والإدارية العليا</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#242320] border border-[#3A3833] flex items-center justify-center text-[#B8860B] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9E9B94] mb-1">الاعتماد والتحكيم</div>
                    <div className="font-bold text-sm text-white">محكم دولي معتمد وخبير استشارات شركات</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
