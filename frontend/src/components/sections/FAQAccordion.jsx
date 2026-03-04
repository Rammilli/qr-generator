import { useState } from "react"

const FAQS = [
    {
        q: "Is QRCraft really free?",
        a: "Yes, completely free! You can generate unlimited QR codes, download them in PNG or SVG, add your logo, and customize colors — all without paying anything or creating an account.",
    },
    {
        q: "Do my QR codes expire?",
        a: "Static QR codes (like links, text, vCards, WiFi) never expire. They're encoded directly into the image and will work as long as the destination URL is active.",
    },
    {
        q: "Can I add my logo to a QR code?",
        a: "Absolutely! Just click 'Your Logo' in the designer panel, upload your image (PNG, JPG, or SVG), and adjust the size. We automatically use H-level error correction to ensure the QR remains scannable.",
    },
    {
        q: "What file formats can I download?",
        a: "You can download your QR code as PNG (great for web, social media, and most print use cases) or SVG (vector format, perfect for large-format printing or design software).",
    },
    {
        q: "How do I create a WiFi QR code?",
        a: "Select the 'WiFi' tab in the QR type selector. Enter your network name (SSID), password, and security type. Generate and print the QR — guests can scan it to connect instantly.",
    },
    {
        q: "Are the QR codes high resolution?",
        a: "Yes! You can adjust the QR size up to 1000px in the Options tab. SVG downloads are infinitely scalable, making them perfect for any print size.",
    },
    {
        q: "What is error correction?",
        a: "Error correction allows QR codes to be read even if they're partially damaged or covered (like by a logo). We default to 'H' (30% recovery) so your designs still scan reliably.",
    },
    {
        q: "Can I use these QR codes commercially?",
        a: "Yes! All QR codes generated on QRCraft are free for commercial use. No watermarks, no attribution required.",
    },
]

function FAQItem({ faq, index, open, onToggle }) {
    return (
        <div className="border border-white/5 rounded-xl overflow-hidden">
            <button
                type="button"
                onClick={() => onToggle(index)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${open ? "bg-primary/10" : "bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
            >
                <span className={`font-medium text-sm ${open ? "text-primary" : "text-white/80"}`}>
                    {faq.q}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all ${open ? "bg-primary text-white rotate-45" : "bg-white/10 text-white/50"
                    }`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            </button>
            <div className={`accordion-content ${open ? "open" : ""}`}>
                <div className="px-6 py-4 text-sm text-white/45 leading-relaxed border-t border-white/5">
                    {faq.a}
                </div>
            </div>
        </div>
    )
}

export default function FAQAccordion() {
    const [openIdx, setOpenIdx] = useState(0)

    const handleToggle = (idx) => {
        setOpenIdx(openIdx === idx ? null : idx)
    }

    return (
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-4">
                        FAQ
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                        Got <span className="gradient-text">questions?</span>
                    </h2>
                    <p className="text-white/40">Everything you need to know about QRCraft.</p>
                </div>

                <div className="space-y-2">
                    {FAQS.map((faq, i) => (
                        <FAQItem
                            key={i}
                            faq={faq}
                            index={i}
                            open={openIdx === i}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>

                <p className="mt-8 text-center text-sm text-white/30">
                    Still have questions?{" "}
                    <a href="mailto:hello@qrcraft.io" className="text-primary hover:underline">
                        Contact us
                    </a>
                </p>
            </div>
        </section>
    )
}
