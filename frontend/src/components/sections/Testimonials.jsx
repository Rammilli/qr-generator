const TESTIMONIALS = [
    {
        name: "Sarah Chen",
        role: "Marketing Manager",
        company: "TechFlow Inc",
        avatar: "SC",
        rating: 5,
        text: "QRCraft completely transformed how we run our product campaigns. The custom logo QR codes look so professional on our packaging.",
        color: "from-blue-500 to-violet-500",
    },
    {
        name: "Marcus Johnson",
        role: "Restaurant Owner",
        company: "The Garden Bistro",
        avatar: "MJ",
        rating: 5,
        text: "We switched from paper menus to QRCraft QR codes. Customers love it, and we save money on printing every month.",
        color: "from-emerald-500 to-cyan-500",
    },
    {
        name: "Priya Patel",
        role: "Event Coordinator",
        company: "Stellar Events",
        avatar: "PP",
        rating: 5,
        text: "Used QRCraft for our conference tickets and attendee check-in. The WiFi QR code alone saved so many support requests!",
        color: "from-pink-500 to-rose-500",
    },
    {
        name: "Daniel Torres",
        role: "Freelance Designer",
        company: "Self-employed",
        avatar: "DT",
        rating: 5,
        text: "The design options are incredible. I make QR codes that actually look good and match my clients' branding. 10/10.",
        color: "from-orange-500 to-amber-500",
    },
    {
        name: "Aisha Williams",
        role: "Digital Marketer",
        company: "Growthbox Agency",
        avatar: "AW",
        rating: 5,
        text: "Finally a free QR generator that doesn't put a watermark on my files. The PNG quality is excellent for print campaigns.",
        color: "from-purple-500 to-indigo-500",
    },
    {
        name: "Leo Park",
        role: "Shop Owner",
        company: "Park Boutique",
        avatar: "LP",
        rating: 5,
        text: "Set up a WhatsApp QR code on my shop window. Customers scan and message us directly. Sales have gone up noticeably.",
        color: "from-teal-500 to-green-500",
    },
]

function Stars({ count }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    )
}

export default function Testimonials() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-block px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-4">
                        Testimonials
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                        Loved by <span className="gradient-text">150,000+ users</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto">
                        Don&apos;t just take our word for it — hear from the people who use QRCraft every day.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TESTIMONIALS.map((t) => (
                        <div key={t.name} className="card-lift glass rounded-2xl p-6 border border-white/5 hover:border-white/10 flex flex-col gap-4">
                            <Stars count={t.rating} />
                            <p className="text-white/60 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xs`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">{t.name}</div>
                                    <div className="text-[11px] text-white/35">{t.role} · {t.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
