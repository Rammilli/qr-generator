const QR_TYPES = [
    { icon: "🔗", name: "Website Link", desc: "Drive traffic to any URL", color: "from-blue-500/20 to-blue-500/5" },
    { icon: "📝", name: "Plain Text", desc: "Encode any text message", color: "from-purple-500/20 to-purple-500/5" },
    { icon: "👤", name: "vCard Contact", desc: "Share contact info instantly", color: "from-green-500/20 to-green-500/5" },
    { icon: "📄", name: "PDF Document", desc: "Link to any document or file", color: "from-orange-500/20 to-orange-500/5" },
    { icon: "✉️", name: "Email", desc: "Open pre-filled email compose", color: "from-pink-500/20 to-pink-500/5" },
    { icon: "📞", name: "Phone Call", desc: "Direct dial on scan", color: "from-cyan-500/20 to-cyan-500/5" },
    { icon: "💬", name: "SMS Message", desc: "Pre-written text message", color: "from-yellow-500/20 to-yellow-500/5" },
    { icon: "💚", name: "WhatsApp", desc: "Open WhatsApp chat directly", color: "from-emerald-500/20 to-emerald-500/5" },
    { icon: "📶", name: "WiFi Network", desc: "Connect guests without password", color: "from-violet-500/20 to-violet-500/5" },
    { icon: "▶️", name: "YouTube Video", desc: "Link to videos or channels", color: "from-red-500/20 to-red-500/5" },
]

export default function QRTypesGrid() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-block px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-4">
                        QR Types
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                        10+ QR Code <span className="gradient-text">Types Supported</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto">
                        One platform, endless content types. Create the right QR code for every situation.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {QR_TYPES.map((qt) => (
                        <div
                            key={qt.name}
                            className={`card-lift relative rounded-2xl p-5 border border-white/5 hover:border-primary/20 overflow-hidden cursor-pointer group`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${qt.color} opacity-60`} />
                            <div className="relative">
                                <div className="text-3xl mb-3">{qt.icon}</div>
                                <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-primary transition-colors">{qt.name}</h3>
                                <p className="text-white/35 text-[11px] leading-snug">{qt.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
