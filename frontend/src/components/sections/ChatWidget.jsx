import { useState } from "react"
import { RiMessage3Line, RiCloseLine } from "react-icons/ri"

export default function ChatWidget() {
    const [open, setOpen] = useState(false)

    return (
        <div className="chat-widget">
            {open && (
                <div className="mb-3 w-72 glass-light border border-white/10 rounded-2xl overflow-hidden shadow-glow animate-scale-in animate-fade-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">
                            🤖
                        </div>
                        <div>
                            <div className="font-semibold text-white text-sm">QRCraft Support</div>
                            <div className="text-xs text-white/70 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Online · Typically replies instantly
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                        <div className="glass rounded-xl p-3 mb-4">
                            <p className="text-xs text-white/60 leading-relaxed">
                                👋 Hi there! I&apos;m the QRCraft assistant. How can I help you create the perfect QR code today?
                            </p>
                        </div>

                        {/* Quick replies */}
                        <div className="space-y-2 mb-4">
                            {["How do I add my logo?", "Can I change colors?", "Download not working?"].map((q) => (
                                <button
                                    key={q}
                                    type="button"
                                    className="w-full text-left text-xs px-3 py-2 rounded-lg border border-white/10 text-white/50 hover:border-primary/40 hover:text-white/70 transition"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="input-dark flex-1 rounded-lg px-3 py-2 text-xs"
                            />
                            <button type="button" className="btn-primary w-8 h-8 rounded-lg flex items-center justify-center text-xs flex-shrink-0">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-13 h-13 rounded-full flex items-center justify-center shadow-glow transition-all w-14 h-14 ${open
                        ? "bg-white/10 border border-white/20 text-white"
                        : "bg-gradient-to-br from-primary to-accent text-white"
                    } hover:scale-105`}
            >
                {open ? <RiCloseLine size={22} /> : <RiMessage3Line size={22} />}
            </button>
        </div>
    )
}
