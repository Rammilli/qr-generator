import { useQR } from "../../../QRContext"

// 5×5 mini QR cell matrix for previews
const C1 = [1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1]
const C2 = [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1]

function MiniQR({ fg, bg, pat, size = 44 }) {
    const cs = size / 5
    const cells = (pat === "rounded" || pat === "diamond") ? C2 : C1
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", borderRadius: "4px" }}>
            <rect width={size} height={size} fill={bg} />
            {cells.map((on, i) => {
                if (!on) return null
                const col = i % 5, row = Math.floor(i / 5)
                const x = col * cs, y = row * cs
                if (pat === "dots") return <circle key={i} cx={x + cs / 2} cy={y + cs / 2} r={cs / 2 - 0.6} fill={fg} />
                return <rect key={i} x={x + 0.5} y={y + 0.5} width={cs - 1} height={cs - 1} rx={pat === "rounded" ? 2.5 : 0} fill={fg} />
            })}
        </svg>
    )
}

// ── All templates ─────────────────────────────────────────────────────────────
const TEMPLATES = [
    // Social
    { id: "whatsapp", name: "WhatsApp", grp: "Social", fg: "#128C7E", bg: "#fff", pat: "dots", frame: "badge", label: "WhatsApp", lc: "#128C7E", gc: null, emoji: "💬" },
    { id: "instagram", name: "Instagram", grp: "Social", fg: "#833AB4", bg: "#fff", pat: "rounded", frame: "rounded", label: "Follow Us", lc: "#833AB4", gc: "#F77737", emoji: "📸" },
    { id: "tiktok", name: "TikTok", grp: "Social", fg: "#010101", bg: "#fff", pat: "dots", frame: "badge", label: "Follow Me", lc: "#010101", gc: null, emoji: "🎵" },
    { id: "youtube", name: "YouTube", grp: "Social", fg: "#FF0000", bg: "#fff", pat: "squares", frame: "badge", label: "Subscribe", lc: "#FF0000", gc: null, emoji: "▶" },
    { id: "twitter", name: "X/Twitter", grp: "Social", fg: "#000000", bg: "#fff", pat: "rounded", frame: "scan", label: "Follow Us", lc: "#000000", gc: null, emoji: "𝕏" },
    { id: "linkedin", name: "LinkedIn", grp: "Social", fg: "#0A66C2", bg: "#e7f0fa", pat: "rounded", frame: "border", label: "Connect", lc: "#0A66C2", gc: null, emoji: "💼" },
    { id: "facebook", name: "Facebook", grp: "Social", fg: "#1877F2", bg: "#fff", pat: "dots", frame: "scan", label: "Like Us", lc: "#1877F2", gc: null, emoji: "👍" },
    { id: "snapchat", name: "Snapchat", grp: "Social", fg: "#010101", bg: "#FFFC00", pat: "dots", frame: "badge", label: "Add Me", lc: "#010101", gc: null, emoji: "👻" },
    { id: "github", name: "GitHub", grp: "Social", fg: "#181717", bg: "#f6f8fa", pat: "squares", frame: "shadow", label: "View Code", lc: "#181717", gc: null, emoji: "⌨" },
    // Brand
    { id: "spotify", name: "Spotify", grp: "Brand", fg: "#1DB954", bg: "#191414", pat: "dots", frame: "rounded", label: "Listen Now", lc: "#1DB954", gc: null, emoji: "🎧" },
    { id: "netflix", name: "Netflix", grp: "Brand", fg: "#E50914", bg: "#141414", pat: "squares", frame: "badge", label: "Watch Now", lc: "#E50914", gc: null, emoji: "🎬" },
    { id: "paypal", name: "PayPal", grp: "Brand", fg: "#003087", bg: "#fff", pat: "rounded", frame: "border", label: "Pay Now", lc: "#003087", gc: "#009CDE", emoji: "💳" },
    { id: "amazon", name: "Amazon", grp: "Brand", fg: "#FF9900", bg: "#fff", pat: "squares", frame: "badge", label: "Shop Now", lc: "#FF9900", gc: null, emoji: "🛒" },
    // Business
    { id: "wifi", name: "WiFi", grp: "Business", fg: "#0ea5e9", bg: "#f0f9ff", pat: "dots", frame: "scan", label: "Connect", lc: "#0ea5e9", gc: null, emoji: "📶" },
    { id: "menu", name: "Menu", grp: "Business", fg: "#b45309", bg: "#fffbeb", pat: "dots", frame: "scan", label: "View Menu", lc: "#b45309", gc: null, emoji: "🍽" },
    { id: "payment", name: "Pay", grp: "Business", fg: "#059669", bg: "#ecfdf5", pat: "squares", frame: "badge", label: "Pay Now", lc: "#059669", gc: null, emoji: "💰" },
    { id: "download", name: "Download", grp: "Business", fg: "#7c3aed", bg: "#faf5ff", pat: "rounded", frame: "badge", label: "Download", lc: "#7c3aed", gc: "#6366f1", emoji: "⬇" },
    { id: "contact", name: "Contact", grp: "Business", fg: "#1e293b", bg: "#f8fafc", pat: "rounded", frame: "border", label: "Contact Me", lc: "#1e293b", gc: null, emoji: "👤" },
    { id: "review", name: "Review", grp: "Business", fg: "#d97706", bg: "#fffbeb", pat: "dots", frame: "badge", label: "Rate Us", lc: "#d97706", gc: null, emoji: "⭐" },
    // Themes
    { id: "classic", name: "Classic", grp: "Theme", fg: "#000000", bg: "#ffffff", pat: "squares", frame: null, label: "SCAN ME", lc: "#000000", gc: null, emoji: "◾" },
    { id: "ocean", name: "Ocean", grp: "Theme", fg: "#0369a1", bg: "#f0f9ff", pat: "dots", frame: "rounded", label: "SCAN ME", lc: "#0369a1", gc: "#06b6d4", emoji: "🌊" },
    { id: "midnight", name: "Midnight", grp: "Theme", fg: "#818cf8", bg: "#1e1b4b", pat: "dots", frame: null, label: "SCAN ME", lc: "#818cf8", gc: "#06b6d4", emoji: "🌙" },
    { id: "neon", name: "Neon", grp: "Theme", fg: "#00ff88", bg: "#0a0a1a", pat: "dots", frame: null, label: "SCAN ME", lc: "#00ff88", gc: "#00ccff", emoji: "⚡" },
    { id: "sunset", name: "Sunset", grp: "Theme", fg: "#ea580c", bg: "#fff7ed", pat: "dots", frame: "scan", label: "SCAN ME", lc: "#ea580c", gc: "#f59e0b", emoji: "🌅" },
    { id: "rose", name: "Rose", grp: "Theme", fg: "#e11d48", bg: "#fff1f2", pat: "rounded", frame: "rounded", label: "SCAN ME", lc: "#e11d48", gc: null, emoji: "🌹" },
    { id: "grape", name: "Grape", grp: "Theme", fg: "#7c3aed", bg: "#faf5ff", pat: "dots", frame: null, label: "SCAN ME", lc: "#7c3aed", gc: "#ec4899", emoji: "🍇" },
]

const GROUPS = ["Social", "Brand", "Business", "Theme"]

function TemplateCard({ t }) {
    const { state, update } = useQR()
    const active = state.fgColor === t.fg && state.bgColor === t.bg && state.pattern === t.pat

    const apply = () => update({
        fgColor: t.fg, bgColor: t.bg, pattern: t.pat,
        frame: t.frame ?? null,
        frameLabel: t.label || "SCAN ME",
        frameLabelColor: t.lc || "#000000",
        gradient: Boolean(t.gc),
        gradientColor: t.gc || "#6366f1",
    })

    return (
        <button
            type="button"
            onClick={apply}
            title={t.name}
            style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
                padding: "8px 4px 6px", border: `2px solid ${active ? "#2563eb" : "#e5e7eb"}`,
                borderRadius: "10px", background: active ? "#eff6ff" : "#fff",
                cursor: "pointer", transition: "all 0.15s", position: "relative",
                boxShadow: active ? "0 0 0 1px #93c5fd" : "none",
            }}
        >
            {active && (
                <div style={{ position: "absolute", top: "-5px", right: "-5px", width: "14px", height: "14px", background: "#2563eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
            )}
            <MiniQR fg={t.fg} bg={t.bg} pat={t.pat} />
            <span style={{ fontSize: "9px", fontWeight: 600, color: active ? "#2563eb" : "#6b7280", lineHeight: 1, textAlign: "center", maxWidth: "100%" }}>
                {t.name}
            </span>
        </button>
    )
}

export default function TemplatesTab() {
    const { update } = useQR()
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button"
                    onClick={() => update({ fgColor: "#000000", bgColor: "#ffffff", pattern: "squares", frame: null, frameLabel: "SCAN ME", frameLabelColor: "#000000", gradient: false })}
                    style={{ fontSize: "11px", color: "#9ca3af", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}>
                    Reset to default
                </button>
            </div>
            {GROUPS.map(grp => (
                <div key={grp}>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 7px" }}>{grp}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px" }}>
                        {TEMPLATES.filter(t => t.grp === grp).map(t => <TemplateCard key={t.id} t={t} />)}
                    </div>
                </div>
            ))}
        </div>
    )
}
