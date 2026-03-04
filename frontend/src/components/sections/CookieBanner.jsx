import { useState } from "react"

const KEY = "qr-cookie-choice"

export default function CookieBanner() {
    const [visible, setVisible] = useState(() => !localStorage.getItem(KEY))

    const accept = () => {
        localStorage.setItem(KEY, "accepted")
        setVisible(false)
    }

    const decline = () => {
        localStorage.setItem(KEY, "declined")   // ← persists decline too
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="cookie-banner animate-fade-in-up">
            <div className="glass-light border border-white/10 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-glow">
                <div className="text-2xl flex-shrink-0">🍪</div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white mb-0.5">We use cookies</p>
                    <p className="text-xs text-white/40 leading-relaxed">
                        We use cookies to enhance your experience and analyze site traffic.{" "}
                        <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <button type="button" onClick={decline} className="btn-secondary px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap">
                        Decline
                    </button>
                    <button type="button" onClick={accept} className="btn-primary px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap">
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    )
}
