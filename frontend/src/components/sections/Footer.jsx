import { RiQrCodeLine, RiTwitterXLine, RiGithubLine, RiLinkedinBoxLine, RiInstagramLine } from "react-icons/ri"

const LINKS = {
    Product: ["Create QR Code", "Templates", "Use Cases", "API Access"],
    Company: ["About Us", "Blog", "Careers", "Press Kit"],
    Support: ["Documentation", "FAQ", "Contact Us", "Status"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
}

export default function Footer() {
    return (
        <footer className="border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* CTA Banner */}
                <div className="glass-light rounded-2xl p-8 sm:p-12 text-center mb-16 border border-primary/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
                    <div className="relative">
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                            Start creating your QR code <span className="gradient-text">right now</span>
                        </h2>
                        <p className="text-white/40 mb-6 text-sm">Free forever. No registration. No watermarks.</p>
                        <a
                            href="#hero-editor"
                            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm"
                        >
                            <RiQrCodeLine />
                            Create Free QR Code
                        </a>
                    </div>
                </div>

                {/* Footer grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 sm:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <RiQrCodeLine className="text-white text-lg" />
                            </div>
                            <div>
                                <div className="font-display font-bold text-white text-base leading-none">QRCraft</div>
                                <div className="text-[10px] text-primary uppercase tracking-widest">Pro</div>
                            </div>
                        </div>
                        <p className="text-xs text-white/30 leading-relaxed mb-5">
                            The most beautiful QR code generator on the web. Free forever.
                        </p>
                        <div className="flex gap-3">
                            {[RiTwitterXLine, RiGithubLine, RiLinkedinBoxLine, RiInstagramLine].map((Icon, i) => (
                                <button key={i} type="button" className="w-8 h-8 rounded-lg glass-light border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition">
                                    <Icon size={14} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(LINKS).map(([group, items]) => (
                        <div key={group}>
                            <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">{group}</h4>
                            <ul className="space-y-2.5">
                                {items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-xs text-white/35 hover:text-white/70 transition">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20">
                    <span>© 2025 QRCraft. All rights reserved.</span>
                    <span>Made with ❤️ for creators everywhere</span>
                </div>
            </div>
        </footer>
    )
}
