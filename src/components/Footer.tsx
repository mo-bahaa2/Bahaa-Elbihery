import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#141413] text-[#E8E4DF] py-14 lg:py-18 border-t-2 border-[#B8860B] relative overflow-hidden select-none">
      {/* Subtle Warm Amber Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#B8860B]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3.5">
              <img 
                src="/img11111.png" 
                alt="شعار المستشار بهاء البحيري" 
                className="w-13 h-13 rounded-xl object-contain shadow-gold shrink-0 bg-white" 
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl text-white tracking-tight">المستشار بهاء البحيري</span>
                <span className="text-xs text-[#D4A84B] font-bold">محامٍ بالنقض والدستورية والإدارية العليا</span>
              </div>
            </div>
            <p className="text-[#9E9B94] leading-relaxed text-sm">
              مستشار قانوني ومحامٍ بالنقض متخصص في الاستشارات القانونية للشركات والأفراد، بخبرة تمتد لسنوات في المحاكم المصرية وتفانٍ في العمل وتكريس للجهد لضمان حقوق الموكلين.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-12 after:h-[2px] after:bg-[#B8860B]">
              روابط سريعة
            </h3>
            <ul className="space-y-3.5 text-sm text-[#9E9B94]">
              <li><a href="/" className="hover:text-[#D4A84B] transition-colors">الرئيسية</a></li>
              <li><a href="/services" className="hover:text-[#D4A84B] transition-colors">خدماتنا القانونية</a></li>
              <li><a href="/booking" className="hover:text-[#D4A84B] transition-colors">حجز استشارة</a></li>
              <li><a href="/about" className="hover:text-[#D4A84B] transition-colors">عن المحامي والسيرة المهنية</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-12 after:h-[2px] after:bg-[#B8860B]">
              تواصل معنا
            </h3>
            <ul className="space-y-4 text-sm text-[#9E9B94]">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                <span>المهندسين، الجيزة</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#B8860B] shrink-0" />
                <span dir="ltr" className="font-mono text-white">+20 122 374 7594</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#B8860B] shrink-0" />
                <span dir="ltr" className="font-mono text-white">info@adala-law.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#262624] text-center text-sm text-[#807D77]">
          <p>المستشار بهاء صلاح البحيري للمحاماة والاستشارات القانونية.<br />جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
