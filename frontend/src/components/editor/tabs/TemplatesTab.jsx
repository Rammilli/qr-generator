import { useState } from "react"
import { useQR } from "../../../QRContext"

const TEMPLATE_CARDS = [
  {
    id: "instagram",
    name: "Instagram",
    category: "Social",
    design: {
      fgColor: "#833AB4",
      bgColor: "#ffffff",
      pattern: "rounded",
      frame: "rounded",
      frameLabel: "Follow",
      frameLabelColor: "#833AB4"
    }
  },
  {
    id: "business",
    name: "Business",
    category: "Business",
    design: {
      fgColor: "#1e293b",
      bgColor: "#ffffff",
      pattern: "diamond",
      frame: "scan",
      frameLabel: "SCAN ME",
      frameLabelColor: "#1e293b"
    }
  },
  {
    id: "wifi",
    name: "WiFi",
    category: "Utility",
    design: {
      fgColor: "#0ea5e9",
      bgColor: "#f0f9ff",
      pattern: "dots",
      frame: "scan",
      frameLabel: "Connect",
      frameLabelColor: "#0ea5e9"
    }
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "Social",
    design: {
      fgColor: "#22c55e",
      bgColor: "#ffffff",
      pattern: "rounded",
      frame: "badge",
      frameLabel: "Chat",
      frameLabelColor: "#22c55e"
    }
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "Social",
    design: {
      fgColor: "#000000",
      bgColor: "#ffffff",
      pattern: "rounded",
      frame: "badge",
      frameLabel: "TikTok",
      frameLabelColor: "#000000"
    }
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "Business",
    design: {
      fgColor: "#0A66C2",
      bgColor: "#ffffff",
      pattern: "rounded",
      frame: "border",
      frameLabel: "Connect",
      frameLabelColor: "#0A66C2"
    }
  }
]

const CATEGORIES = ["All", "Social", "Business", "Utility"]

function MiniPreview({ d }) {
  // Use a solid color or gradient background if available
  const hasGradient = Boolean(d.gradientColor)
  const bgStyle = hasGradient
    ? { backgroundImage: `linear-gradient(to bottom right, ${d.fgColor}, ${d.gradientColor})` }
    : { backgroundColor: d.fgColor || "#000" }

  return (
    <div
      className="w-full h-20 rounded-lg flex items-center justify-center p-1.5 relative overflow-hidden group shadow-sm"
      style={bgStyle}
    >
      <div className="bg-white rounded-md p-1 w-14 h-14 flex flex-col items-center justify-center relative z-10 shadow-sm border border-white/50">
        <div className="flex w-full aspect-square items-center justify-center p-1 mb-2">
          <div className="grid grid-cols-5 gap-[1px] w-full h-full">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: (i % 3 === 0 || i % 7 === 0 || i === 0 || i === 4 || i === 20 || i === 24) ? (d.fgColor || "#000") : "transparent",
                  borderRadius: d.pattern === "dots" ? "50%" : d.pattern === "rounded" ? "20%" : "0px",
                }}
              />
            ))}
          </div>
        </div>
        {d.frame && d.frameLabel && (
          <div
            className="absolute -bottom-1.5 px-2 py-[2px] rounded-full text-[7px] font-bold tracking-wider shadow border border-white"
            style={{
              backgroundColor: d.frameLabelColor || d.fgColor,
              color: "#fff",
              textTransform: "uppercase"
            }}
          >
            {d.frameLabel}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TemplatesTab() {
  const { applyTemplate } = useQR()

  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("All")

  const filtered = TEMPLATE_CARDS.filter(t => {
    if (activeTab !== "All" && t.category !== activeTab) return false
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex flex-col gap-3">

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search templates..."
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />

      <div className="flex gap-2 overflow-x-auto">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1 rounded-full text-xs ${activeTab === cat ? "bg-blue-500 text-white" : "bg-slate-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {filtered.map(t => (
          <button
            key={t.id}
            onClick={() => applyTemplate(t.design)}
            className="flex flex-col gap-1 rounded-xl bg-white p-2 shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-md transition text-left cursor-pointer"
          >
            <MiniPreview d={t.design} />
            <div className="mt-1">
              <p className="text-[11px] font-bold text-slate-800 truncate">{t.name}</p>
              <p className="text-[9px] text-slate-500 truncate">{t.category}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}