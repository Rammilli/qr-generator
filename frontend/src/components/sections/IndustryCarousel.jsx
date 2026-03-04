import { useState } from "react"

const INDUSTRIES = [
    { icon: "🍴", name: "Restaurant", desc: "Menu QR codes, table ordering, reviews" },
    { icon: "🛍️", name: "Retail", desc: "Product info, loyalty programs, promotions" },
    { icon: "🏥", name: "Healthcare", desc: "Patient info, appointments, health docs" },
    { icon: "🎓", name: "Education", desc: "Course links, campus maps, resources" },
    { icon: "🏨", name: "Hospitality", desc: "Check-in, room service, local guides" },
    { icon: "💼", name: "Corporates", desc: "Business cards, office wifi, events" },
    { icon: "🎪", name: "Events", desc: "Tickets, schedules, speaker profiles" },
    { icon: "🚗", name: "Automotive", desc: "Vehicle info, service records, deals" },
]

function Carousel({ items, renderItem, visibleCount = 3 }) {
    const [current, setCurrent] = useState(0)
    const maxIdx = Math.max(0, items.length - visibleCount)

    const prev = () => setCurrent(c => Math.max(0, c - 1))
    const next = () => setCurrent(c => Math.min(maxIdx, c + 1))

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    className="flex gap-4 transition-transform duration-500"
                    style={{ transform: `translateX(calc(-${current * (100 / visibleCount)}% - ${current * 16 / visibleCount}px))` }}
                >
                    {items.map(renderItem)}
                </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
                <button
                    type="button"
                    onClick={prev}
                    disabled={current === 0}
                    className="w-9 h-9 rounded-full glass-light border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 transition"
                >
                    ←
                </button>
                <div className="flex gap-1.5">
                    {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setCurrent(i)}
                            className={`h-1.5 rounded-full transition-all ${i === current ? "bg-primary w-5" : "bg-white/20 w-1.5"}`}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    onClick={next}
                    disabled={current === maxIdx}
                    className="w-9 h-9 rounded-full glass-light border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 transition"
                >
                    →
                </button>
            </div>
        </div>
    )
}

export default function IndustryCarousel() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-4">
                        Industries
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                        QR Codes for <span className="gradient-text">Every Industry</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto">From restaurants to hospitals, QR codes power modern customer experiences.</p>
                </div>

                <Carousel
                    items={INDUSTRIES}
                    visibleCount={3}
                    renderItem={(ind) => (
                        <div
                            key={ind.name}
                            className="card-lift flex-shrink-0 w-[calc(33.333%-11px)] glass rounded-2xl p-6 border border-white/5 hover:border-primary/20"
                        >
                            <div className="text-4xl mb-4">{ind.icon}</div>
                            <h3 className="font-display font-bold text-white text-lg mb-2">{ind.name}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">{ind.desc}</p>
                        </div>
                    )}
                />
            </div>
        </section>
    )
}
