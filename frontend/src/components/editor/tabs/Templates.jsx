import { useQR } from "../../../QRContext"

// Social-media & purpose-driven templates
const SOCIAL_TEMPLATES = [
    // Social platforms
    {
        id: "whatsapp_style",
        name: "WhatsApp",
        fgColor: "#128C7E",
        bgColor: "#ffffff",
        pattern: "dots",
        frame: "scan",
        frameLabel: "WhatsApp",
        frameLabelColor: "#128C7E",
        badge: "💬",
        badgeBg: "#25D366",
    },
    {
        id: "instagram_style",
        name: "Instagram",
        fgColor: "#833AB4",
        bgColor: "#ffffff",
        pattern: "rounded",
        frame: "rounded",
        frameLabel: "Follow Us",
        frameLabelColor: "#833AB4",
        badge: "📸",
        badgeBg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    },
    {
        id: "tiktok_style",
        name: "TikTok",
        fgColor: "#010101",
        bgColor: "#ffffff",
        pattern: "dots",
        frame: "badge",
        frameLabel: "Follow Me",
        frameLabelColor: "#010101",
        badge: "🎵",
        badgeBg: "#010101",
    },
    {
        id: "youtube_style",
        name: "YouTube",
        fgColor: "#FF0000",
        bgColor: "#ffffff",
        pattern: "squares",
        frame: "badge",
        frameLabel: "Subscribe",
        frameLabelColor: "#FF0000",
        badge: "▶️",
        badgeBg: "#FF0000",
    },
    {
        id: "twitter_style",
        name: "X / Twitter",
        fgColor: "#000000",
        bgColor: "#ffffff",
        pattern: "rounded",
        frame: "scan",
        frameLabel: "Follow Us",
        frameLabelColor: "#000000",
        badge: "𝕏",
        badgeBg: "#000000",
    },
    {
        id: "spotify_style",
        name: "Spotify",
        fgColor: "#1DB954",
        bgColor: "#191414",
        pattern: "dots",
        frame: "rounded",
        frameLabel: "Listen Now",
        frameLabelColor: "#1DB954",
        badge: "🎧",
        badgeBg: "#1DB954",
    },
    {
        id: "linkedin_style",
        name: "LinkedIn",
        fgColor: "#0A66C2",
        bgColor: "#ffffff",
        pattern: "rounded",
        frame: "border",
        frameLabel: "Connect",
        frameLabelColor: "#0A66C2",
        badge: "💼",
        badgeBg: "#0A66C2",
    },
    {
        id: "github_style",
        name: "GitHub",
        fgColor: "#181717",
        bgColor: "#f6f8fa",
        pattern: "squares",
        frame: "shadow",
        frameLabel: "View Code",
        frameLabelColor: "#181717",
        badge: "⌨️",
        badgeBg: "#181717",
    },
    // Purpose templates
    {
        id: "wifi_style",
        name: "WiFi",
        fgColor: "#0ea5e9",
        bgColor: "#f0f9ff",
        pattern: "dots",
        frame: "scan",
        frameLabel: "Connect WiFi",
        frameLabelColor: "#0ea5e9",
        badge: "📶",
        badgeBg: "#0ea5e9",
    },
    {
        id: "download_style",
        name: "Download",
        fgColor: "#7c3aed",
        bgColor: "#faf5ff",
        pattern: "rounded",
        frame: "badge",
        frameLabel: "Download",
        frameLabelColor: "#7c3aed",
        badge: "⬇️",
        badgeBg: "#7c3aed",
    },
    {
        id: "menu_style",
        name: "Menu",
        fgColor: "#b45309",
        bgColor: "#fffbeb",
        pattern: "dots",
        frame: "scan",
        frameLabel: "View Menu",
        frameLabelColor: "#b45309",
        badge: "🍽️",
        badgeBg: "#f59e0b",
    },
    {
        id: "payment_style",
        name: "Pay",
        fgColor: "#059669",
        bgColor: "#ecfdf5",
        pattern: "squares",
        frame: "badge",
        frameLabel: "Pay Now",
        frameLabelColor: "#059669",
        badge: "💳",
        badgeBg: "#059669",
    },
    // Color themes
    {
        id: "ocean_style",
        name: "Ocean",
        fgColor: "#0369a1",
        bgColor: "#f0f9ff",
        pattern: "dots",
        frame: "rounded",
        frameLabel: "SCAN ME",
        frameLabelColor: "#0369a1",
        badge: "🌊",
        badgeBg: "#0369a1",
    },
    {
        id: "sunset_style",
        name: "Sunset",
        fgColor: "#9a3412",
        bgColor: "#fff7ed",
        pattern: "dots",
        frame: "scan",
        frameLabel: "SCAN ME",
        frameLabelColor: "#9a3412",
        badge: "🌅",
        badgeBg: "#ea580c",
    },
    {
        id: "midnight_style",
        name: "Midnight",
        fgColor: "#818cf8",
        bgColor: "#1e1b4b",
        pattern: "dots",
        frame: null,
        frameLabel: "SCAN ME",
        frameLabelColor: "#818cf8",
        badge: "🌙",
        badgeBg: "#4338ca",
    },
    {
        id: "neon_style",
        name: "Neon",
        fgColor: "#00ff88",
        bgColor: "#0a0a1a",
        pattern: "dots",
        frame: null,
        frameLabel: "SCAN ME",
        frameLabelColor: "#00ff88",
        badge: "⚡",
        badgeBg: "#00ff88",
    },
]

function MiniQR({ fgColor, bgColor, pattern }) {
    const cells = Array.from({ length: 25 }, (_, i) => {
        const fixed = [0, 1, 2, 3, 4, 5, 10, 9, 14, 15, 16, 17, 18, 19, 20, 24, 6, 12]
        return fixed.includes(i) || (i % 3 !== 0 && i % 7 !== 2)
    })
    const r = pattern === "dots" ? "50%" : pattern === "rounded" ? "2px" : "0"
    return (
        <div className="grid grid-cols-5 gap-0.5" style={{ width: 36, height: 36 }}>
            {cells.map((on, i) => (
                <div key={i} style={{ background: on ? fgColor : "transparent", borderRadius: r, width: 6, height: 6 }} />
            ))}
        </div>
    )
}

function TemplateCard({ tpl }) {
    const { state, update } = useQR()
    const isActive = state.fgColor === tpl.fgColor && state.bgColor === tpl.bgColor

    const apply = () => {
        update({
            fgColor: tpl.fgColor,
            bgColor: tpl.bgColor,
            pattern: tpl.pattern,
            frame: tpl.frame,
            frameLabel: tpl.frameLabel,
            frameLabelColor: tpl.frameLabelColor,
        })
    }

    return (
        <button
            type="button"
            onClick={apply}
            title={tpl.name}
            className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${isActive
                    ? "border-primary bg-primary/10 shadow-glow scale-105"
                    : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/5 hover:scale-105"
                }`}
        >
            {/* Badge emoji */}
            <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] absolute -top-1.5 -right-1.5 z-10"
                style={{ background: tpl.badgeBg }}
            >
                <span>{tpl.badge}</span>
            </div>

            {/* Mini QR preview */}
            <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: tpl.bgColor }}
            >
                <MiniQR fgColor={tpl.fgColor} bgColor={tpl.bgColor} pattern={tpl.pattern} />
            </div>

            {/* Name */}
            <span className={`text-[9px] font-semibold text-center leading-tight ${isActive ? "text-primary" : "text-white/50"}`}>
                {tpl.name}
            </span>

            {/* Active checkmark */}
            {isActive && (
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </button>
    )
}

export default function Templates() {
    const { update } = useQR()

    const reset = () => update({
        fgColor: "#000000",
        bgColor: "#ffffff",
        pattern: "squares",
        frame: null,
        frameLabel: "SCAN ME",
        frameLabelColor: "#000000",
    })

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-[11px] text-white/40 uppercase tracking-wider">Choose a Template</p>
                <button
                    type="button"
                    onClick={reset}
                    className="text-[10px] text-white/30 hover:text-white/60 transition"
                >
                    Reset
                </button>
            </div>

            {/* Social platforms row label */}
            <p className="text-[10px] text-white/25 uppercase tracking-widest">Social & Purpose</p>
            <div className="grid grid-cols-4 gap-2">
                {SOCIAL_TEMPLATES.slice(0, 12).map((tpl) => (
                    <TemplateCard key={tpl.id} tpl={tpl} />
                ))}
            </div>

            {/* Color themes */}
            <p className="text-[10px] text-white/25 uppercase tracking-widest pt-1">Color Themes</p>
            <div className="grid grid-cols-4 gap-2">
                {SOCIAL_TEMPLATES.slice(12).map((tpl) => (
                    <TemplateCard key={tpl.id} tpl={tpl} />
                ))}
            </div>
        </div>
    )
}
