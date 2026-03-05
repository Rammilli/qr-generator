import { useRef } from "react"

const BRANDS = [
  { id: "none", color: "#6b7280", icon: null, name: "None" },
  { id: "whatsapp", color: "#25D366", icon: "💬", name: "WhatsApp" },
  { id: "instagram", color: "#E4405F", icon: "📸", name: "Instagram" },
  { id: "facebook", color: "#1877F2", icon: "👍", name: "Facebook" },
  { id: "tiktok", color: "#010101", icon: "🎵", name: "TikTok" },
  { id: "youtube", color: "#FF0000", icon: "▶", name: "YouTube" },
  { id: "spotify", color: "#1DB954", icon: "🎧", name: "Spotify" },
  { id: "linkedin", color: "#0A66C2", icon: "💼", name: "LinkedIn" },
  { id: "paypal", color: "#003087", icon: "💳", name: "PayPal" },
  { id: "wifi", color: "#0ea5e9", icon: "📶", name: "WiFi" },
  { id: "mail", color: "#ef4444", icon: "✉", name: "Email" },
  { id: "phone", color: "#16a34a", icon: "📞", name: "Phone" },
  { id: "location", color: "#ea580c", icon: "📍", name: "Location" },
  { id: "pdf", color: "#dc2626", icon: "📄", name: "PDF" },
]

const EMOJI_TO_URL = (emoji, color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><rect width="64" height="64" rx="12" fill="${color}" opacity="0.12"/><text x="50%" y="50%" dy=".35em" text-anchor="middle" font-size="34">${emoji}</text></svg>`
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export default function Logo({ design, patchDesign }) {
  const fileRef = useRef()

  const handleFile = (e) => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = ev => patchDesign({ logo: ev.target.result })
    r.readAsDataURL(f)
  }

  return (
    <div className="space-y-4">
      {/* Upload row */}
      <div className="flex gap-3">
        <button type="button" onClick={() => fileRef.current?.click()}
          className="flex-1 h-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer flex flex-col items-center justify-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <span className="text-[11px] font-semibold text-slate-400">Upload logo</span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

        <div className="w-16 h-16 flex-shrink-0 border-2 border-slate-200 rounded-xl bg-white flex items-center justify-center relative overflow-hidden">
          {design.logo ? (
            <>
              <img src={design.logo} alt="Logo" className="max-w-12 max-h-12 object-contain" />
              <button type="button" onClick={() => patchDesign({ logo: null })}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </>
          ) : (
            <span className="text-[10px] text-slate-300 text-center leading-snug">No<br />logo</span>
          )}
        </div>
      </div>

      {/* Logo size */}
      {design.logo && (
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logo Size</label>
            <span className="text-[11px] text-slate-500">{design.logoSize}%</span>
          </div>
          <input type="range" min="10" max="40" value={design.logoSize}
            onChange={e => patchDesign({ logoSize: Number(e.target.value) })} />
        </div>
      )}

      {/* Toggles */}
      <div className="space-y-2">
        {[
          ["removeLogoBg", "Remove background behind logo"],
          ["logoAsBackground", "Use logo as background"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={design[key] || false}
              onChange={e => patchDesign({ [key]: e.target.checked })}
              className="w-4 h-4 accent-blue-600 rounded" />
            <span className="text-xs text-slate-600">{label}</span>
          </label>
        ))}
      </div>

      {/* Brand presets */}
      <div>
        <hr className="border-slate-100 mb-3" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Brand Presets</p>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map(b => (
            <button key={b.id} type="button" title={b.name}
              onClick={() => {
                if (b.id === "none") { patchDesign({ logo: null }); return }
                patchDesign({ logo: EMOJI_TO_URL(b.icon, b.color) })
              }}
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition text-lg
                ${!design.logo && b.id === "none" ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300 bg-white"}`}
              style={b.id !== "none" ? { background: `${b.color}18` } : {}}>
              {b.id === "none" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : b.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}