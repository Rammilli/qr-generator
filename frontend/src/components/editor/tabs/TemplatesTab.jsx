import { useQR } from "../../../QRContext"

const TGROUPS = [
    {
        name: "Social",
        items: [
            { id: "facebook", fg: "#1877f2", bg: "#ffffff", pattern: "squares", label: "Facebook" },
            { id: "twitter", fg: "#1da1f2", bg: "#ffffff", pattern: "dots", label: "Twitter" },
            { id: "instagram", fg: "#e1306c", bg: "#ffffff", pattern: "rounded", label: "Instagram" },
            { id: "linkedin", fg: "#0077b5", bg: "#ffffff", pattern: "squares", label: "LinkedIn" },
            { id: "youtube", fg: "#ff0000", bg: "#ffffff", pattern: "rounded", label: "YouTube" },
            { id: "tiktok", fg: "#000000", bg: "#ffffff", pattern: "diamonds", label: "TikTok" }
        ]
    },
    {
        name: "Payments & Commerce",
        items: [
            { id: "paypal", fg: "#003087", bg: "#ffffff", pattern: "dots", label: "PayPal" },
            { id: "stripe", fg: "#635bff", bg: "#ffffff", pattern: "rounded", label: "Stripe" },
            { id: "bitcoin", fg: "#f7931a", bg: "#ffffff", pattern: "squares", label: "Crypto" },
            { id: "amazon", fg: "#ff9900", bg: "#ffffff", pattern: "rounded", label: "Shop" },
            { id: "applepay", fg: "#000000", bg: "#ffffff", pattern: "dots", label: "Apple Pay" },
            { id: "gpay", fg: "#4285f4", bg: "#ffffff", pattern: "squares", label: "Google Pay" }
        ]
    },
    {
        name: "Utilities",
        items: [
            { id: "wifi", fg: "#10b981", bg: "#f0fdf4", pattern: "dots", label: "WiFi" },
            { id: "vcard", fg: "#8b5cf6", bg: "#f5f3ff", pattern: "rounded", label: "Contact" },
            { id: "menu", fg: "#d97706", bg: "#fffbeb", pattern: "diamonds", label: "Menu" },
            { id: "pdf", fg: "#ef4444", bg: "#fef2f2", pattern: "squares", label: "PDF" },
            { id: "app", fg: "#3b82f6", bg: "#eff6ff", pattern: "dots", label: "App Store" },
            { id: "location", fg: "#14b8a6", bg: "#f0fdfa", pattern: "rounded", label: "Location" }
        ]
    },
    {
        name: "Colorful Designs",
        items: [
            { id: "sunset", fg: "#f43f5e", bg: "#fff1f2", gradientColor: "#f97316", pattern: "dots" },
            { id: "ocean", fg: "#0ea5e9", bg: "#f0f9ff", gradientColor: "#3b82f6", pattern: "rounded" },
            { id: "nature", fg: "#22c55e", bg: "#f0fdf4", gradientColor: "#10b981", pattern: "squares" },
            { id: "midnight", fg: "#a855f7", bg: "#1e1b4b", gradientColor: "#6366f1", pattern: "dots" },
            { id: "matrix", fg: "#22c55e", bg: "#000000", gradientColor: "#4ade80", pattern: "diamonds" },
            { id: "mono", fg: "#1e293b", bg: "#f8fafc", gradientColor: "#475569", pattern: "rounded" }
        ]
    }
]

export default function TemplatesTab() {
    const { state, applyTemplate } = useQR()

    const isSelected = (tpl) => {
        return state.fgColor === tpl.fg && state.bgColor === tpl.bg && state.pattern === tpl.pattern &&
            ((!tpl.gradientColor && !state.gradient) || (tpl.gradientColor === state.gradientColor && state.gradient))
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {TGROUPS.map((g, gi) => (
                <div key={gi}>
                    <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                        {g.name}
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                        {g.items.map(tpl => (
                            <button
                                key={tpl.id}
                                type="button"
                                onClick={() => applyTemplate({
                                    fgColor: tpl.fg, bgColor: tpl.bg, pattern: tpl.pattern, gradientColor: tpl.gradientColor
                                })}
                                style={{
                                    background: tpl.bg,
                                    border: isSelected(tpl) ? "2px solid #2563eb" : "1px solid #e2e8f0",
                                    borderRadius: "8px",
                                    padding: "16px 8px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    cursor: "pointer",
                                    aspectRatio: "1/1",
                                    boxShadow: isSelected(tpl) ? "0 4px 12px rgba(37,99,235,0.15)" : "none"
                                }}
                            >
                                {/* SVG mock mini QR */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill={tpl.fg}>
                                    {tpl.pattern === "dots" ? (
                                        <>
                                            <circle cx="5" cy="5" r="3" fill={tpl.gradientColor ? `url(#grad-${tpl.id})` : tpl.fg} />
                                            <circle cx="19" cy="5" r="3" fill={tpl.gradientColor ? `url(#grad-${tpl.id})` : tpl.fg} />
                                            <circle cx="5" cy="19" r="3" fill={tpl.gradientColor ? `url(#grad-${tpl.id})` : tpl.fg} />
                                            <circle cx="14" cy="14" r="2" /><circle cx="10" cy="10" r="2" /><circle cx="19" cy="14" r="2" />
                                        </>
                                    ) : tpl.pattern === "rounded" ? (
                                        <>
                                            <rect x="2" y="2" width="6" height="6" rx="2" fill={tpl.gradientColor ? `url(#grad-${tpl.id})` : tpl.fg} />
                                            <rect x="16" y="2" width="6" height="6" rx="2" fill={tpl.gradientColor ? `url(#grad-${tpl.id})` : tpl.fg} />
                                            <rect x="2" y="16" width="6" height="6" rx="2" fill={tpl.gradientColor ? `url(#grad-${tpl.id})` : tpl.fg} />
                                            <rect x="12" y="12" width="4" height="4" rx="1" /><rect x="8" y="8" width="4" height="4" rx="1" /><rect x="16" y="12" width="4" height="4" rx="1" />
                                        </>
                                    ) : tpl.pattern === "diamonds" ? (
                                        <>
                                            <polygon points="5,2 8,5 5,8 2,5" fill={tpl.fg} />
                                            <polygon points="19,2 22,5 19,8 16,5" fill={tpl.fg} />
                                            <polygon points="5,16 8,19 5,22 2,19" fill={tpl.fg} />
                                            <rect x="12" y="12" width="3" height="3" transform="rotate(45 13.5 13.5)" />
                                        </>
                                    ) : (
                                        <>
                                            <rect x="2" y="2" width="6" height="6" fill={tpl.gradientColor ? `url(#grad-${tpl.id})` : tpl.fg} />
                                            <rect x="16" y="2" width="6" height="6" fill={tpl.gradientColor ? `url(#grad-${tpl.id})` : tpl.fg} />
                                            <rect x="2" y="16" width="6" height="6" fill={tpl.gradientColor ? `url(#grad-${tpl.id})` : tpl.fg} />
                                            <rect x="12" y="12" width="4" height="4" /><rect x="8" y="8" width="4" height="4" /><rect x="16" y="12" width="4" height="4" />
                                        </>
                                    )}
                                    {tpl.gradientColor && (
                                        <defs>
                                            <linearGradient id={`grad-${tpl.id}`} x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor={tpl.fg} />
                                                <stop offset="100%" stopColor={tpl.gradientColor} />
                                            </linearGradient>
                                        </defs>
                                    )}
                                </svg>
                                {tpl.label && <span style={{ fontSize: "10px", fontWeight: 600, color: tpl.fg }}>{tpl.label}</span>}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
