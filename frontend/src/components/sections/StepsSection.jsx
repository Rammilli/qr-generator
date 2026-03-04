const STEPS = [
    {
        step: "01",
        title: "Choose Your QR Type",
        desc: "Select from 10+ QR types: Link, vCard, WiFi, SMS, Email, WhatsApp, YouTube, and more.",
        icon: "🎯",
        color: "from-primary/20 to-primary/5",
    },
    {
        step: "02",
        title: "Customize the Design",
        desc: "Apply templates, upload your logo, change colors, patterns, and add custom frames.",
        icon: "🎨",
        color: "from-accent/20 to-accent/5",
    },
    {
        step: "03",
        title: "Generate & Download",
        desc: "Click generate and instantly download your QR code in PNG or SVG format.",
        icon: "⚡",
        color: "from-success/20 to-success/5",
    },
]

export default function StepsSection() {
    return (
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-block px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-4">
                        How It Works
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                        Create a QR code in <span className="gradient-text">3 simple steps</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto">
                        No account required. Create, customize, and download professional QR codes in under a minute.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Connector line */}
                    <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
                    <div className="hidden md:block absolute top-16 left-1/2 right-1/4 h-px bg-gradient-to-r from-accent/30 to-success/0" />

                    {STEPS.map((s, i) => (
                        <div
                            key={s.step}
                            className="card-lift glass rounded-2xl p-8 border border-white/5 relative overflow-hidden"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-50`} />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl">
                                        {s.icon}
                                    </div>
                                    <span className="text-5xl font-display font-black text-white/5">{s.step}</span>
                                </div>
                                <h3 className="font-display font-bold text-white text-xl mb-3">{s.title}</h3>
                                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
