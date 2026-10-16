import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, Gavel, Clock } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://backend-test-six-alpha.vercel.app/api/services?active_only=true')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getServiceIcon = (index: number) => {
    const icons = [
      <Gavel className="w-8 h-8" />,
      <FileText className="w-8 h-8" />,
      <Scale className="w-8 h-8" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* Header Section */}
      <section className="bg-white py-16 lg:py-20 border-b border-[#E8E4DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-4 max-w-xs mx-auto">
            <span className="h-px flex-1 bg-[#E8E4DF]" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B8860B]">
              اختصاصات متقدمة
            </span>
            <span className="h-px flex-1 bg-[#E8E4DF]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">الخدمات القانونية</h1>
          <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            نقدم مجموعة متكاملة من الخدمات القانونية بمدد زمنية محددة. اختر الخدمة الأنسب لاحتياجك واحجز موعدك فوراً.
          </p>
        </div>
      </section>

      {/* Services Content */}
      <section className="flex-grow py-16 relative">
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rounded-full bg-[#B8860B]/5 blur-[130px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3">
                <LoadingSpinner text="جاري تحميل الخدمات..." />
              </div>
            ) : services.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-[#6B6B6B] font-bold text-lg">لا توجد خدمات متاحة حالياً.</div>
            ) : services.map((service, index) => (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl p-8 border border-[#E8E4DF] border-t-2 border-t-[#B8860B] shadow-soft hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col relative overflow-hidden group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FDF9F0] border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B] mb-6 group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300 shadow-sm">
                  {getServiceIcon(index)}
                </div>
                
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#B8860B] transition-colors">{service.name}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed mb-8 flex-grow">
                  {service.description || `خدمة قانونية مميزة بمدة ${service.duration_minutes} دقيقة`}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm text-[#1A1A1A] bg-[#FAFAF8] p-3 rounded-xl border border-[#E8E4DF]">
                    <Clock className="w-5 h-5 text-[#B8860B]" />
                    <span className="font-semibold">المدة المتوقعة: {service.duration_minutes} دقيقة</span>
                  </div>
                </div>

                <Link 
                  to={`/booking?service=${service.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#B8860B] text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-gold group/btn"
                >
                  التفاصيل والحجز
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
