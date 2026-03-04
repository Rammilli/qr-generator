const BENEFITS = [
    { icon: "🆓", title: "Forever Free", desc: "No hidden fees, no limits. Create unlimited QR codes at zero cost.", badge: "Free" },
    { icon: "🎨", title: "Full Customization", desc: "Change every pixel — colors, patterns, logos, frames, and more.", badge: "Design" },
    { icon: "⚡", title: "Instant Generation", desc: "QR codes are generated in milliseconds. No waiting, no queue.", badge: "Speed" },
    { icon: "🔒", title: "No Registration", desc: "Start without creating an account. Your data stays private.", badge: "Privacy" },
    { icon: "📥", title: "HD Downloads", desc: "Export in PNG or SVG at any size, perfect for print and digital media.", badge: "Quality" },
    { icon: "📱", title: "Mobile Friendly", desc: "The editor works beautifully on phones, tablets, and desktops.", badge: "Responsive" },
    { icon: "♾️", title: "Unlimited Validity", desc: "Static QR codes never expire. Share them forever without worry.", badge: "Permanent" },
    { icon: "🌐", title: "All QR Types", desc: "10+ QR types including Link, WiFi, vCard, WhatsApp and more.", badge: "Versatile" },
]

export default function BenefitsSection() {
    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-block px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-4">
                        Why QRCraft
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                        Everything you need,<br /><span className="gradient-text">nothing you don&apos;t</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto">
                        Built for creators, marketers, developers, and businesses who deserve a better QR experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {BENEFITS.map((b, i) => (
                        <div
                            key={b.title}
                            className="card-lift glass rounded-2xl p-6 border border-white/5 hover:border-primary/20 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-3xl">{b.icon}</div>
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary/70">
                                    {b.badge}
                                </span>
                            </div>
                            <h3 className="font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {b.title}
                            </h3>
                            <p className="text-white/35 text-xs leading-relaxed">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
