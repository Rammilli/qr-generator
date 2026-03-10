import { useRef, useState } from "react"
import { useQR } from "../../../QRContext"

const LOGO_PRESETS = [
    { id: "whatsapp", label: "WhatsApp", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
    { id: "instagram", label: "Instagram", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" },
    { id: "facebook", label: "Facebook", icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
    { id: "linkedin", label: "LinkedIn", icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
    { id: "tiktok", label: "TikTok", icon: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" },
    { id: "youtube", label: "YouTube", icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" },
    { id: "google", label: "Google", icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" },
    { id: "telegram", label: "Telegram", icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" },
    { id: "pinterest", label: "Pinterest", icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" },
    { id: "snapchat", label: "Snapchat", icon: "https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg" },
    { id: "wikipedia", label: "Wikipedia", icon: "https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg" },
    { id: "line", label: "Line", icon: "https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" },
    { id: "apple", label: "Apple", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { id: "android", label: "Android", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" }
]

export default function LogoTab() {
    const { state, update } = useQR()
    const inputRef = useRef(null)
    const [removeBg, setRemoveBg] = useState(false)
    const [logoBg, setLogoBg] = useState(false)

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (ev) => {
            const img = new Image()
            img.onload = () => {
                if (img.width > 1024 || img.height > 1024) {
                    alert("Only designated pixels (max 1024x1024) are allowed.")
                    return
                }
                update({ logo: ev.target.result })
            }
            img.src = ev.target.result
        }
        reader.readAsDataURL(file)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Upload Area */}
            <div>
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleUpload}
                    style={{ display: "none" }}
                />
                <button
                    onClick={() => inputRef.current?.click()}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#f8fafc",
                        border: "2px dashed #cbd5e1",
                        borderRadius: "8px",
                        color: "#475569",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer"
                    }}
                >
                    + Upload Image
                </button>
                <p style={{ fontSize: "11px", color: "#64748b", marginTop: "8px", textAlign: "center" }}>
                    Only designated pixels (max 1024x1024) are allowed.
                </p>
            </div>

            {/* Logo Presets Grid exactly like reference */}
            <div>
                <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                    Select Logo
                </h4>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "8px"
                }}>
                    <button
                        onClick={() => update({ logo: null })}
                        style={{
                            aspectRatio: "1/1",
                            border: !state.logo ? "2px solid #2563eb" : "1px solid #e2e8f0",
                            background: "#fff",
                            borderRadius: "8px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px"
                        }}
                        title="No Logo"
                    >
                        🚫
                    </button>
                    {LOGO_PRESETS.map(preset => (
                        <button
                            key={preset.id}
                            onClick={() => update({ logo: preset.icon })}
                            style={{
                                aspectRatio: "1/1",
                                border: state.logo === preset.icon ? "2px solid #2563eb" : "1px solid #e2e8f0",
                                background: "#fff",
                                borderRadius: "8px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "8px"
                            }}
                            title={preset.label}
                        >
                            <img src={preset.icon} alt={preset.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Customization Options */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Toggles */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <label style={{ fontSize: "13px", fontWeight: 500, color: "#334155", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={removeBg} onChange={(e) => setRemoveBg(e.target.checked)} style={{ cursor: "pointer" }} />
                        Remove background behind logo
                    </label>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <label style={{ fontSize: "13px", fontWeight: 500, color: "#334155", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={logoBg} onChange={(e) => setLogoBg(e.target.checked)} style={{ cursor: "pointer" }} />
                        Use logo as background
                    </label>
                </div>

                {/* Logo Size */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#475569" }}>Logo Size</label>
                        <span style={{ fontSize: "12px", color: "#64748b", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                            {state.logoSize}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="40"
                        value={state.logoSize}
                        onChange={(e) => update({ logoSize: Number(e.target.value) })}
                    />
                </div>
            </div>
        </div>
    )
}
