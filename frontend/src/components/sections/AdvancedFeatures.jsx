const FEATURES = [
    {
        title: "Logo & Brand Integration",
        desc: "Embed your logo, icon, or any image in the center of your QR code. Control size and border radius for perfect branding.",
        icon: "🖼️",
        bullets: ["PNG, JPG, SVG logos", "Size & radius control", "Auto error correction"]
    },
    {
        title: "Custom Frames & Labels",
        desc: "Add decorative frames with call-to-action text to increase scan rates. Choose fonts, colors, and sizes.",
        icon: "🖼",
        bullets: ["4 frame styles", "7 font options", "Custom CTA text"]
    },
    {
        title: "Advanced Color Control",
        desc: "Fine-tune every color in your QR code. Use hex codes, color pickers, or choose from curated palettes.",
        icon: "🎨",
        bullets: ["Foreground & background", "Gradient support", "10 preset palettes"]
    },
    {
        title: "Pattern Customization",
        desc: "Switch between 6 different module patterns — squares, dots, rounded, diamond, star, and fluid — to match your aesthetic.",
        icon: "✦",
        bullets: ["6 unique patterns", "Eye-finder styles", "Corner customization"]
    },
]

export default function AdvancedFeatures() {
    return (
        <section id="advanced" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-block px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-4">
                        Advanced Features
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                        Professional tools for<br /><span className="gradient-text">serious creators</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {FEATURES.map((f, i) => (
                        <div key={f.title} className="card-lift glass rounded-2xl p-8 border border-white/5 hover:border-primary/20 flex gap-6">
                            <div className="text-3xl mt-1 flex-shrink-0">{f.icon}</div>
                            <div>
                                <h3 className="font-display font-bold text-white text-xl mb-3">{f.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed mb-4">{f.desc}</p>
                                <ul className="space-y-2">
                                    {f.bullets.map((b) => (
                                        <li key={b} className="flex items-center gap-2 text-xs text-white/50">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
