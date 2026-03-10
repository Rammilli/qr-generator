import { useRef } from "react"

const BRANDS = [
  { id: "none", color: "#6b7280", icon: null, name: "None" },
  { id: "whatsapp", color: "#25D366", icon: "💬", name: "WhatsApp" },
  { id: "instagram", color: "#E4405F", icon: "📸", name: "Instagram" },
  { id: "facebook", color: "#1877F2", icon: "👍", name: "Facebook" },
  { id: "linkedin", color: "#0A66C2", icon: "💼", name: "LinkedIn" },
  { id: "youtube", color: "#FF0000", icon: "▶", name: "YouTube" },
]

function svgToDataUrl(svg) {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
}

function makeBrandLogo(emoji, color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="34" fill="${color}" />
      <text x="50%" y="50%" text-anchor="middle" dy=".35em" font-size="28" fill="white">
        ${emoji}
      </text>
    </svg>
  `
  return svgToDataUrl(svg)
}

export default function Logo({ design, patchDesign }) {
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = ev => {
      patchDesign({
        logo: ev.target.result,
        logoSize: 18,
      })
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">

      {/* Upload */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex-1 h-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:border-blue-400 transition flex items-center justify-center"
        >
          <span className="text-sm text-slate-500 font-medium">
            Upload logo
          </span>
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />

        <div className="w-14 h-14 border rounded-xl bg-white flex items-center justify-center overflow-hidden">
          {design.logo ? (
            <img
              src={design.logo}
              alt="logo"
              className="max-w-8 max-h-8 object-contain"
            />
          ) : (
            <span className="text-xs text-slate-300">No logo</span>
          )}
        </div>
      </div>

      {/* Slider */}
      {design.logo && (
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Logo Size</span>
            <span>{design.logoSize}%</span>
          </div>

          <input
            type="range"
            min="12"
            max="22"
            value={design.logoSize}
            onChange={(e) =>
              patchDesign({
                logoSize: Number(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
      )}

      {/* Brand logos */}
      <div>
        <p className="text-xs font-medium mb-2 text-slate-500">
          Brand logos
        </p>

        <div className="grid grid-cols-5 gap-1.5">
          {BRANDS.map((b) => (  
            <button
              key={b.id}
              type="button"
              onClick={() => {
                if (b.id === "none") {
                  patchDesign({
                    logo: null,
                  })
                  return
                }

                patchDesign({
                  logo: makeBrandLogo(b.icon, b.color),
                  logoSize: 18,
                })
              }}
              className="w-7 h-7 rounded-md border flex items-center justify-center text-xs hover:border-blue-500 transition-colors"

              style={{
                background: b.id !== "none" ? `${b.color}15` : "#fff",
              }}
            >
              {b.id === "none" ? "✕" : b.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}