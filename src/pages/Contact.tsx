import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, MapPin, MessageCircle, Phone, Send, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Strict anti-link validation to reject any URL/domain/markdown/html
  const containsLink = (text: string): boolean => {
    if (!text) return false;
    const linkPattern = /(https?:\/\/|ftp:\/\/|www\.|\b[a-zA-Z0-9.\-_]+(\.(com|net|org|edu|gov|io|ai|app|me|co|xyz|site|online|tech|info|biz|ru|uk|de|fr|ly|page|dev|link|top|tv|shop))\b|<a\s+href|href\s*=)/i;
    return linkPattern.test(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Strict Anti-Link Check on ALL fields (Refuse before even calling the backend)
    if (containsLink(name)) {
      toast.error("عفواً، غير مسموح بوضع أي روابط في حقل الاسم لحماية الموقع من البريد المزعج.");
      return;
    }
    if (containsLink(phone)) {
      toast.error("عفواً، غير مسموح بوضع روابط في حقل الهاتف.");
      return;
    }
    if (containsLink(subject)) {
      toast.error("عفواً، لا يُسمح بإرفاق أي روابط في موضوع الاستفسار.");
      return;
    }
    if (containsLink(message)) {
      toast.error("عفواً، لا يُسمح بإرفاق أي روابط أو مواقع إلكترونية في نص الرسالة نهائياً.");
      return;
    }

    // 2. Data Validation
    if (name.trim().split(/\s+/).length < 2) {
      toast.error("الرجاء إدخال الاسم ثنائي على الأقل.");
      return;
    }

    if (!/^(010|011|012|015)\d{8}$/.test(phone.trim())) {
      toast.error("الرجاء إدخال رقم هاتف محمول مصري صحيح (11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015)");
      return;
    }

    if (subject.trim().length < 3) {
      toast.error("الرجاء إدخال موضوع الاستفسار بوضوح (3 أحرف على الأقل).");
      return;
    }

    if (message.trim().length < 5) {
      toast.error("الرجاء كتابة تفاصيل استفسارك (5 أحرف على الأقل).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('https://backend-test-six-alpha.vercel.app/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          subject: subject.trim(),
          message: message.trim()
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || 'فشل إرسال الرسالة، يرجى المحاولة لاحقاً');
      }

      toast.success("تم إرسال استفسارك بنجاح! سيتواصل معك فريق المستشار في أقرب وقت.");
      setName('');
      setPhone('');
      setSubject('');
      setMessage('');
      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء إرسال الرسالة');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] py-12 lg:py-20 relative overflow-hidden">
      {/* Background warm glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#B8860B]/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#B8860B]/5 blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="mb-4 flex items-center justify-center gap-4 max-w-xs mx-auto">
            <span className="h-px flex-1 bg-[#E8E4DF]" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B8860B]">
              تواصل ومتابعة
            </span>
            <span className="h-px flex-1 bg-[#E8E4DF]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">تواصل معنا</h1>
          <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            نحن هنا للرد على استفساراتك العامة. للحصول على استشارة قانونية مفصلة، يُرجى استخدام صفحة الحجز لضمان تفرغ المستشار لقضيتك.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details (Right Side in RTL) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E8E4DF] shadow-soft hover:shadow-hover transition-all group">
              <div className="w-14 h-14 bg-[#FDF9F0] border border-[#B8860B]/20 rounded-2xl flex items-center justify-center text-[#B8860B] mb-6 group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white transition-all shadow-sm">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">مقر المكتب</h3>
              <p className="text-[#6B6B6B] leading-relaxed mb-4 text-sm sm:text-base">
                المهندسين، الجيزة،<br />
                جمهورية مصر العربية
              </p>
              <a href="#" className="text-[#B8860B] hover:text-[#996515] font-bold text-sm hover:underline">
                عرض على الخريطة
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DF] shadow-soft hover:shadow-hover transition-all group">
                <div className="w-12 h-12 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl flex items-center justify-center text-[#25D366] mb-5 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">واتساب</h3>
                <p className="text-[#6B6B6B] text-sm font-mono" dir="ltr">+20 122 374 7594</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DF] shadow-soft hover:shadow-hover transition-all group">
                <div className="w-12 h-12 bg-[#FDF9F0] border border-[#B8860B]/20 rounded-2xl flex items-center justify-center text-[#B8860B] mb-5 group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">الهاتف المباشر</h3>
                <p className="text-[#6B6B6B] text-sm font-mono" dir="ltr">+20 122 374 7594</p>
              </div>
            </div>

            <div className="bg-[#141413] rounded-3xl p-8 text-white shadow-hover border-t-4 border-t-[#B8860B] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="w-12 h-12 bg-[#242320] border border-[#3A3833] rounded-2xl flex items-center justify-center text-[#B8860B] mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
              <p className="text-[#9E9B94] text-sm mb-2">للمراسلات الرسمية والشركات</p>
              <a href="mailto:info@adala-law.com" className="text-white font-mono hover:text-[#D4A84B] transition-colors">info@adala-law.com</a>
            </div>
          </div>

          {/* Contact Form (Left Side in RTL) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-12 border border-[#E8E4DF] border-t-4 border-t-[#B8860B] shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">أرسل استفسارك</h2>
              <div className="flex items-center gap-1.5 text-xs text-[#B8860B] font-semibold bg-[#FDF9F0] border border-[#B8860B]/20 px-3 py-1 rounded-full">
                <ShieldAlert className="w-3.5 h-3.5" />
                محمي ضد الروابط المزعجة
              </div>
            </div>
            <p className="text-xs text-[#8A8883] mb-8">
              املأ البيانات التالية للتواصل مباشرة مع مكتب المستشار. غير مسموح بإرفاق أي روابط.
            </p>
            
            {isSubmitted && (
              <div className="mb-6 p-4 rounded-2xl bg-[#FDF9F0] border border-[#B8860B]/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B8860B] shrink-0" />
                <p className="text-sm font-bold text-[#1A1A1A]">
                  تم استلام رسالتك السابقة بنجاح! يمكنك إرسال استفسار جديد إذا أردت.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1A1A1A]">الاسم بالكامل</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[#E8E4DF] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-[#1A1A1A] font-medium transition-all" 
                    placeholder="الاسم ثلاثي" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1A1A1A]">رقم الهاتف</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[#E8E4DF] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-[#1A1A1A] font-medium transition-all text-left" 
                    placeholder="01012345678" 
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1A1A1A]">الموضوع</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[#E8E4DF] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-[#1A1A1A] font-medium transition-all" 
                  placeholder="عن ماذا تستفسر؟" 
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1A1A1A]">الرسالة</label>
                <textarea 
                  rows={5} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[#E8E4DF] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-[#1A1A1A] font-medium transition-all resize-none" 
                  placeholder="اكتب رسالتك هنا بوضوح (بدون وضع أي روابط)..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#996515] text-white px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-sm hover:shadow-gold disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري إرسال الرسالة...
                  </>
                ) : (
                  <>
                    إرسال الرسالة
                    <Send className="w-5 h-5 -scale-x-100 group-hover:-translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
