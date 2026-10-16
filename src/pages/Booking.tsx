import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Booking() {
  const [selectedService, setSelectedService] = useState('consultation');
  const [selectedDateObj, setSelectedDateObj] = useState<{dateStr: string, dayNum: number, dayName: string, isoDay: number, isWorkDay: boolean} | null>(null);
  const [selectedTimeObj, setSelectedTimeObj] = useState<{raw: string, formatted: string} | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  const [services, setServices] = useState<any[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{raw: string, formatted: string}[]>([]);
  const [workingDays, setWorkingDays] = useState<number[]>([1, 2, 3, 6, 7]); // Default: Mon, Tue, Wed, Sat, Sun
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 1. Fetch Services
  useEffect(() => {
    fetch('https://backend-test-six-alpha.vercel.app/api/services?active_only=true')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        if (data.length > 0) {
          setSelectedService(data[0].id);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingServices(false));
  }, []);

  // 2. Fetch Working Hours & Working Days from Settings
  useEffect(() => {
    fetch('https://backend-test-six-alpha.vercel.app/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.working_hours?.days && Array.isArray(data.working_hours.days)) {
          setWorkingDays(data.working_hours.days);
        }
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  // Generate upcoming available working days ONLY (excluding holidays completely)
  const dates = (() => {
    const list: {
      dateStr: string;
      dayName: string;
      dayNum: number;
      isoDay: number;
      isWorkDay: boolean;
    }[] = [];
    
    // Scan ahead up to 30 days to collect up to 7 valid working days
    for (let i = 0; i < 30 && list.length < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const day = d.getDay();
      const isoDay = day === 0 ? 7 : day; // 1=Mon, ..., 7=Sun
      if (workingDays.includes(isoDay)) {
        list.push({
          dateStr: d.toISOString().split('T')[0],
          dayName: d.toLocaleDateString('ar-EG', { weekday: 'short' }),
          dayNum: d.getDate(),
          isoDay,
          isWorkDay: true
        });
      }
    }
    return list;
  })();

  // Automatically select the first available working day initially or if current selected day is no longer in working days
  useEffect(() => {
    if (dates.length > 0) {
      if (!selectedDateObj || !dates.some(d => d.dateStr === selectedDateObj.dateStr)) {
        setSelectedDateObj(dates[0]);
      }
    }
  }, [workingDays]);

  // Fetch available slots when selected date changes
  useEffect(() => {
    if (selectedDateObj) {
      setSelectedTimeObj(null); // Reset time when date changes
      
      // If the day is an official day off, no need to fetch, slots are empty
      if (!selectedDateObj.isWorkDay) {
        setAvailableSlots([]);
        setLoadingSlots(false);
        return;
      }

      setLoadingSlots(true);
      const serviceParam = selectedService ? `&service_id=${selectedService}` : '';
      fetch(`https://backend-test-six-alpha.vercel.app/api/bookings/available-slots?date_str=${selectedDateObj.dateStr}${serviceParam}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const formatted = data.map((t: string) => {
              const [h, m] = t.split(':');
              let hour = parseInt(h);
              const ampm = hour >= 12 ? 'مساءً' : 'صباحاً';
              hour = hour % 12 || 12;
              return { raw: t, formatted: `${hour}:${m} ${ampm}` };
            });
            setAvailableSlots(formatted);
          } else {
            setAvailableSlots([]);
          }
        })
        .catch(err => {
          console.error(err);
          setAvailableSlots([]);
        })
        .finally(() => setLoadingSlots(false));
    }
  }, [selectedDateObj?.dateStr, selectedDateObj?.isWorkDay, selectedService]);

  const activeService = services.find(s => s.id === selectedService);

  const handleBookingSubmit = async () => {
    if (!selectedDateObj?.isWorkDay) {
      toast.error("عفواً، لا يمكن الحجز في يوم عطلة. يرجى اختيار يوم عمل متاح.");
      return;
    }

    // Client-side validation
    if (name.trim().split(/\s+/).length < 3) {
      toast.error("الرجاء إدخال الاسم ثلاثي على الأقل.");
      return;
    }
    if (!/^(010|011|012|015)\d{8}$/.test(phone.trim())) {
      toast.error("الرجاء إدخال رقم هاتف محمول مصري صحيح (11 رقم يبدأ بـ 010, 011, 012, 015)");
      return;
    }

    // Anti-spam Validation
    const hasLinks = (text: string) => /(http:\/\/|https:\/\/|www\.)/i.test(text);
    
    if (email && hasLinks(email)) {
      toast.error("عفواً، لا يُسمح بوضع روابط في حقل البريد الإلكتروني.");
      return;
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("الرجاء إدخال بريد إلكتروني صحيح.");
      return;
    }

    if (details && hasLinks(details)) {
      toast.error("عفواً، لا يُسمح بوضع روابط في تفاصيل الطلب للحماية من البريد المزعج.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://backend-test-six-alpha.vercel.app/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name,
          phone: phone,
          email: email || undefined,
          service_id: selectedService,
          booking_date: selectedDateObj?.dateStr,
          booking_time: selectedTimeObj?.raw,
          notes: details || undefined
        })
      });

      if (!response.ok) {
        throw new Error('فشل الحجز، يرجى المحاولة مرة أخرى.');
      }

      toast.success('تم تأكيد حجزك بنجاح! سنتواصل معك قريباً.');
      navigate('/');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 lg:py-20 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="mb-4 flex items-center justify-center gap-4 max-w-xs mx-auto">
            <span className="h-px flex-1 bg-[#E8E4DF]" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B8860B]">
              حجز موعد مؤكد
            </span>
            <span className="h-px flex-1 bg-[#E8E4DF]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">احجز استشارتك الآن</h1>
          <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            خطوات بسيطة لاختيار الموعد المناسب وتأكيد الحجز. الدفع يتم في مقر المكتب عند الاستشارة أو بالاتفاق المسبق.
          </p>
        </div>

        {/* Step Indicator (Sticky) */}
        <div className="mb-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-soft border border-[#E8E4DF] sticky top-20 z-30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-[#B8860B]">
              الخطوة {(!selectedDateObj || !selectedTimeObj) ? '1' : '2'} من 2
            </span>
            <span className="text-sm font-semibold text-[#6B6B6B]">
              {(!selectedDateObj || !selectedTimeObj) ? 'اختر الخدمة والموعد' : 'بياناتك الشخصية'}
            </span>
          </div>
          <div className="w-full bg-[#F5F3F0] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#B8860B] h-full rounded-full transition-all duration-500" 
              style={{ width: (!selectedDateObj || !selectedTimeObj) ? '50%' : '100%' }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 pb-24 lg:pb-0">
          
          {/* Main Booking Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-soft border border-[#E8E4DF] overflow-hidden">
            
            {/* Step 1: Service & Time */}
            <div className="p-6 sm:p-8 border-b border-[#E8E4DF]">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FDF9F0] border border-[#B8860B]/30 text-[#B8860B] flex items-center justify-center text-sm font-bold">1</span>
                اختر الخدمة والموعد
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-3">نوع الخدمة</label>
                  <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
                    {loadingServices ? (
                      <div className="w-full flex justify-center py-4 col-span-3">
                        <LoadingSpinner text="جاري تحميل الخدمات..." />
                      </div>
                    ) : services.map(service => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => {
                          setSelectedService(service.id);
                          setSelectedTimeObj(null);
                        }}
                        className={`min-w-[200px] sm:min-w-0 flex-shrink-0 snap-center p-4 text-right rounded-xl border-2 transition-all duration-200 flex flex-col justify-between ${
                          selectedService === service.id 
                            ? 'border-[#B8860B] bg-[#FDF9F0] shadow-sm' 
                            : 'border-[#E8E4DF] bg-white hover:border-[#D4CEBF]'
                        }`}
                      >
                        <div className={`font-bold text-sm ${selectedService === service.id ? 'text-[#B8860B]' : 'text-[#1A1A1A]'}`}>
                          {service.name}
                        </div>
                        <div className="text-xs text-[#6B6B6B] mt-2 font-medium">
                          {service.duration_minutes} دقيقة
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Day Selection Strip */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-bold text-[#1A1A1A]">اختر اليوم</label>
                    <span className="text-xs text-[#6B6B6B] font-medium">أيام العمل المتاحة للحجز</span>
                  </div>
                  
                  <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                    {dates.length === 0 ? (
                      <div className="p-4 text-sm text-[#8A8883] bg-[#F5F3F0] rounded-xl w-full text-center">
                        جاري تحميل مواعيد وأيام العمل المتاحة...
                      </div>
                    ) : (
                      dates.map((date, idx) => {
                        const isSelected = selectedDateObj?.dateStr === date.dateStr;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedDateObj(date)}
                            className={`flex-shrink-0 min-w-[70px] sm:min-w-[76px] h-24 rounded-xl border-2 flex flex-col items-center justify-between py-2.5 px-1.5 transition-all duration-200 ${
                              isSelected
                                ? 'border-[#B8860B] bg-[#B8860B] text-white shadow-gold scale-[1.02]'
                                : 'border-[#E8E4DF] bg-white text-[#1A1A1A] hover:border-[#B8860B]/50'
                            }`}
                          >
                            <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-[#6B6B6B]'}`}>
                              {date.dayName}
                            </span>
                            <span className="text-xl font-extrabold leading-none my-auto">
                              {date.dayNum}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-[#FDF9F0] text-[#B8860B] border border-[#B8860B]/20'}`}>
                              متاح
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Available Slots Section */}
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-3">الوقت المتاح</label>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 min-h-[50px]">
                    {loadingSlots ? (
                      <div className="col-span-3 sm:col-span-6">
                        <LoadingSpinner text="جاري التحقق من المواعيد..." />
                      </div>
                    ) : availableSlots.length === 0 ? (
                      /* Working day, but all slots are booked */
                      <div className="col-span-3 sm:col-span-6 p-5 rounded-2xl bg-[#FDF9F0] border border-[#B8860B]/30 flex items-start sm:items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B] shadow-sm shrink-0">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div className="flex-1 text-right">
                          <h4 className="font-extrabold text-sm sm:text-base text-[#1A1A1A]">
                            اكتملت جميع المواعيد لهذا اليوم
                          </h4>
                          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 leading-relaxed">
                            جميع الفترات الزمنية المتاحة لمقابلة المستشار في هذا اليوم محجوزة بالكامل. يُرجى اختيار يوم آخر متاح.
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Available Slots */
                      availableSlots.map((time, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedTimeObj(time)}
                          className={`py-2.5 px-1 text-center rounded-lg border-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                            selectedTimeObj?.raw === time.raw 
                              ? 'border-[#B8860B] bg-[#FDF9F0] text-[#B8860B] ring-1 ring-[#B8860B]' 
                              : 'border-[#E8E4DF] bg-white text-[#6B6B6B] hover:border-[#B8860B]/40'
                          }`}
                        >
                          {time.formatted}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: User Details */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FDF9F0] border border-[#B8860B]/30 text-[#B8860B] flex items-center justify-center text-sm font-bold">2</span>
                بياناتك الشخصية
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1A1A1A]">الاسم بالكامل</label>
                  <div className="relative">
                    <User className="absolute right-3.5 top-3 w-5 h-5 text-[#B8860B]" />
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="الاسم ثلاثي" 
                      className="w-full bg-[#FAFAF8] border border-[#E8E4DF] rounded-lg py-2.5 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-[#1A1A1A] font-medium transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1A1A1A]">رقم الهاتف (واتساب)</label>
                  <div className="relative">
                    <Phone className="absolute right-3.5 top-3 w-5 h-5 text-[#B8860B]" />
                    <input 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="01X XXXX XXXX" 
                      className="w-full bg-[#FAFAF8] border border-[#E8E4DF] rounded-lg py-2.5 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-[#1A1A1A] font-medium transition-all" 
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-[#1A1A1A]">البريد الإلكتروني (اختياري)</label>
                  <div className="relative">
                    <Mail className="absolute right-3.5 top-3 w-5 h-5 text-[#B8860B]" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="example@email.com" 
                      className="w-full bg-[#FAFAF8] border border-[#E8E4DF] rounded-lg py-2.5 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-[#1A1A1A] font-medium transition-all" 
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-[#1A1A1A]">وصف مبدئي للطلب (اختياري)</label>
                  <div className="relative">
                    <FileText className="absolute right-3.5 top-3 w-5 h-5 text-[#B8860B]" />
                    <textarea 
                      rows={3} 
                      value={details} 
                      onChange={(e) => setDetails(e.target.value)} 
                      placeholder="اكتب نبذة مختصرة عن موضوع الاستشارة..." 
                      className="w-full bg-[#FAFAF8] border border-[#E8E4DF] rounded-lg py-2.5 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-[#1A1A1A] font-medium transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar / Summary */}
          <div className="lg:col-span-4">
            
            {/* Desktop & Expanded Mobile View */}
            <div className={`bg-[#141413] border-t-4 border-t-[#B8860B] lg:rounded-2xl p-6 text-white shadow-hover transition-transform duration-300 ${
              isSummaryOpen 
                ? 'fixed inset-x-0 bottom-0 z-50 rounded-t-3xl max-h-[85vh] overflow-y-auto' 
                : 'translate-y-full lg:translate-y-0 fixed lg:static inset-x-0 bottom-0 z-50 lg:z-auto lg:sticky lg:top-36 hidden lg:block'
            }`}>
              
              {/* Mobile Drag Handle & Close */}
              <div className="lg:hidden flex justify-center mb-6" onClick={() => setIsSummaryOpen(false)}>
                <div className="w-12 h-1.5 bg-[#3A3833] rounded-full cursor-pointer"></div>
              </div>

              <h3 className="text-lg font-bold mb-6 border-b border-[#2A2925] pb-4 hidden lg:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
                ملخص الحجز
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <div className="text-[#9E9B94] text-sm">الخدمة</div>
                  <div className="font-bold text-left text-white">{activeService?.name || 'لم يحدد'}</div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="text-[#9E9B94] text-sm">الموعد</div>
                  <div className="font-bold text-left flex flex-col items-end gap-1.5">
                    {selectedDateObj ? (
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-white border ${
                        !selectedDateObj.isWorkDay 
                          ? 'bg-[#2A2318] border-[#996515]/50 text-[#D4A84B]' 
                          : 'bg-[#242320] border-[#3A3833]'
                      }`}>
                        <CalendarIcon className="w-3.5 h-3.5 text-[#B8860B]"/> 
                        {selectedDateObj.dayNum} ({selectedDateObj.dayName})
                        {!selectedDateObj.isWorkDay && ' - عطلة'}
                      </span>
                    ) : <span className="text-[#6B6B6B] text-sm">لم يحدد</span>}
                    {selectedTimeObj ? (
                      <span className="flex items-center gap-1.5 bg-[#242320] border border-[#3A3833] px-2.5 py-1 rounded text-xs text-[#D4A84B]">
                        <Clock className="w-3.5 h-3.5 text-[#D4A84B]"/> {selectedTimeObj.formatted}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="text-[#9E9B94] text-sm">المدة</div>
                  <div className="font-medium text-sm text-[#D6D3CC]">{activeService?.duration_minutes} دقيقة</div>
                </div>

                {(name || phone) && (
                  <>
                    <div className="border-t border-[#2A2925] my-4 pt-4 flex justify-between items-start">
                      <div className="text-[#9E9B94] text-sm">الاسم</div>
                      <div className="font-medium text-sm text-white text-left truncate max-w-[150px]">{name || '-'}</div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="text-[#9E9B94] text-sm">رقم الهاتف</div>
                      <div className="font-medium text-sm text-white text-left font-mono" dir="ltr">{phone || '-'}</div>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-[#201D16] border border-[#B8860B]/30 rounded-xl p-3.5 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                <p className="text-xs text-[#E8E4DF] leading-relaxed">
                  سيتم تسجيل حجزك فوراً. الدفع وتأكيد الحجز النهائي يتم في مقر المكتب عند الحضور أو قبل موعد الاستشارة.
                </p>
              </div>

              <button 
                type="button"
                onClick={handleBookingSubmit}
                className="w-full flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#996515] text-white px-6 py-4 rounded-xl font-bold text-base transition-all shadow-gold group disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedDateObj || !selectedDateObj.isWorkDay || !selectedTimeObj || !name.trim() || !phone.trim() || isSubmitting}
              >
                <CheckCircle2 className="w-5 h-5" />
                {isSubmitting ? 'جاري التأكيد...' : 'تأكيد الحجز'}
              </button>

              {(!selectedDateObj || !selectedDateObj.isWorkDay) ? (
                <p className="text-center text-xs text-[#D4A84B] mt-3 font-medium">
                  الرجاء اختيار يوم عمل متاح لتحديد الوقت وتأكيد الحجز
                </p>
              ) : (!selectedTimeObj || !name.trim() || !phone.trim()) && (
                <p className="text-center text-xs text-[#D4A84B] mt-3 font-medium">
                  أكمل اختيار الوقت وبياناتك الشخصية لتأكيد الحجز
                </p>
              )}

              <div className="mt-4 flex items-center justify-center gap-2 text-[#9E9B94] text-xs font-medium">
                <CalendarIcon className="w-4 h-4 text-[#B8860B]" />
                الدفع نقداً أو بالبطاقة في المكتب
              </div>
            </div>

            {/* Mobile Sticky Bottom Bar (Collapsed) */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#141413] border-t border-[#262624] p-4 z-40 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
              <div>
                <p className="text-[#9E9B94] text-xs font-medium mb-1">الخدمة المختارة</p>
                <p className="text-white font-bold text-sm truncate max-w-[150px]">{activeService?.name || 'لم يحدد'}</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsSummaryOpen(true)}
                className="bg-[#B8860B] hover:bg-[#996515] text-white px-7 py-3 rounded-xl font-bold text-sm shadow-gold"
              >
                مراجعة وتأكيد
              </button>
            </div>

            {/* Mobile Overlay */}
            {isSummaryOpen && (
              <div className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsSummaryOpen(false)}></div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
