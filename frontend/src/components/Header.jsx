import { RiQrCodeLine } from "react-icons/ri"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <RiQrCodeLine className="text-white text-lg" />
          </div>
          <div>
            <span className="font-display font-bold text-white text-lg leading-none tracking-tight">QRCraft</span>
            <div className="text-[10px] text-primary font-medium uppercase tracking-widest">Pro</div>
          </div>
        </a>
      </div>
    </header>
  )
}
