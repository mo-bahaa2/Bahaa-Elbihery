import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = 'جاري التحميل...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Loader2 className="w-9 h-9 text-[#B8860B] animate-spin" />
      <p className="text-[#6B6B6B] font-bold text-sm animate-pulse">{text}</p>
    </div>
  );
}
