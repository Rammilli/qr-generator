import { useState } from "react"
import { useQR } from "../../../QRContext"

const TEMPLATE_CARDS = [
  {
    id: "instagram",
    name: "Instagram Gradient",
    category: "Social",
    design: {
      fgColor: "#833AB4", bgColor: "#ffffff", pattern: "dots", frame: "rounded",
      frameLabel: "Follow Us", frameLabelColor: "#833AB4", gradient: true, gradientColor: "#F77737"
    },
    visual: (
      <div className="w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center p-2"
        style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #F77737)" }}>
        <div className="bg-white rounded p-1 w-3/4 aspect-square flex items-center justify-center relative shadow-lg">
          <img alt="QR" className="w-full h-full opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd_ufHHkFOqexMCEIf782SP5y9Kkbv9IccpYzOuyO6UnczMSfcZJiN3A5CzBZZVi42XUO2LqHmzHa-BhQNQW3j_Dwlq_Z7j9rX3YTlM-Whr1PE7ju7dadsn1rMPN71Gwa73JWJw5xTZsrGVeNqpXrhhhamwcpzd8xki5l4HMOGvbK4cGTo0cWYnzTw8mkb-4WJ9gE2VGglTXyKWFoxxGxOu8wGAqcjKZWHaB0gSwhiZY-Q1CbjGT9Qzb172wRWJTpGdA3vQOooZIo" />
          <div className="absolute bottom-1 bg-white text-[7px] font-bold px-1 rounded shadow text-pink-500 uppercase">Follow Us</div>
        </div>
      </div>
    )
  },
  {
    id: "minimal_dark",
    name: "Minimal Dark",
    category: "Minimal",
    design: { fgColor: "#ffffff", bgColor: "#0f172a", pattern: "squares", frame: null, gradient: false, frameColor: null },
    visual: (
      <div className="w-full aspect-square rounded-lg bg-slate-900 p-2 flex items-center justify-center">
        <div className="border border-slate-700 rounded p-1 w-3/4 aspect-square flex items-center justify-center">
          <img alt="QR" className="w-full h-full invert brightness-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj9fB33xdInVIbX-EXVMozvH9iNrKDukUrPMegECh72DpbkXB4-jn10lJe91_6yTEzSVU_BuPv3-KDswFig_d00-yUIKqea4n4AI02mWDqxrgrgWH_p47IFT0Eph1OIidhbEOadGxDUHFoP4cKMGcqFVzDAjGEVjSe2TfLRbgj5TemIVfxL7NOw9_4Py0KROfITyGWUhrdPvjL0WShvn78j7m50_cY4t5RkvC7RHRK-bs5gaTFdERE5zguO2KWnmSmhPIych3_Tf4" />
        </div>
      </div>
    )
  },
  {
    id: "business_scan",
    name: "Business Scan Me",
    category: "Business",
    design: { fgColor: "#1e293b", bgColor: "#ffffff", pattern: "diamond", frame: "scan", frameLabel: "SCAN ME", frameLabelColor: "#1e293b", gradient: false, frameColor: "#cbd5e1" },
    visual: (
      <div className="w-full aspect-square rounded-lg bg-slate-100 p-2 flex items-center justify-center">
        <div className="bg-white rounded-xl p-2 w-4/5 aspect-square flex flex-col items-center justify-center relative shadow-md border-2 border-slate-200">
          <img alt="QR" className="w-full h-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfvdvL89fD7X5Kltj23-C_-AlfUcz7MmNvGJTljrU38CLHzJBz5NlKmxfsVdogMxpLd3fI2DYzQDfS7iAyYg2_Ts67ngaOoHDVNpoCi8izurTOS8UHfS5EqFMvBM-Lh-RBQ27RSla1p03bz20GsqfGKMSAAn2CHU_lnvvBVHDz-zzkHmorJRCWP2n_ZG4-UqJX6gZlUQOR2H0uZMvvj08PmzEaKWtVLR9b3Ob7V5TS5YwKu_tajKPssUHd1dwjbVkpnFg1jIIvqOs" />
          <div className="absolute -bottom-3 bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg border-2 border-white">SCAN ME</div>
        </div>
      </div>
    )
  },
  {
    id: "whatsapp",
    name: "WhatsApp Chat",
    category: "Social",
    design: { fgColor: "#128C7E", bgColor: "#ffffff", pattern: "dots", frame: "badge", frameLabel: "WhatsApp", frameLabelColor: "#128C7E", gradient: false, frameColor: "#128C7E" },
    visual: (
      <div className="w-full aspect-square rounded-lg bg-green-500 p-2 flex items-center justify-center">
        <div className="bg-white rounded-full p-2 w-4/5 aspect-square flex items-center justify-center relative shadow-lg">
          <img alt="QR" className="w-full h-full opacity-90"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0AticEFMNXYMrNn3Tbt2j2AM_k7wLLVD_21znpJ1fUdOKXfEZiyXmgeM9duEbMvE-Lf1MRShWA1nfjvZVf1kmIW2d-yCPP10W29LB7Sk_Uh4huHz3v3iX3aG2h_6uA6ccJw42jW6n_Czg2stdwKF6Dtmz6f70s40s-TNTl5VsVDfa3AZMPiOicgUvbXo4jz_0WpuSK7Ko1x-afNLm2rpazm2mp5TcbKGOzl4elvYNc6wWSgQaWr3gHU432iW4-2Y4YjElWP01ZxA" />
          <div className="absolute inset-0 border-4 border-dashed border-green-200 rounded-full pointer-events-none opacity-50 m-1"></div>
        </div>
      </div>
    )
  },
  {
    id: "wifi",
    name: "WiFi Connect",
    category: "Utility",
    design: { fgColor: "#0ea5e9", bgColor: "#f0f9ff", pattern: "dots", frame: "scan", frameLabel: "Connect", frameLabelColor: "#0ea5e9", gradient: true, gradientColor: "#3b82f6" },
    visual: (
      <div className="w-full aspect-square rounded-lg p-2 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #22d3ee, #3b82f6)" }}>
        <div className="bg-white/90 rounded p-1 w-3/4 aspect-square flex flex-col items-center justify-center relative shadow border border-white/50">
          <img alt="QR" className="w-full h-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzjoD6PchG45CJfR_H_flC8liBH0rhBqf6JvupHi6WiWO7xEbidiRi1jMz_RxicA6SQS-iACcj5ZHra5oyZfNCywo6KR0dSoTrdhR7COhvh-31wCmSn7gCu62yYRRSeOPiT869d2SNP3jfj6XvhdNpljv-qr0cApFtz61p2l4vxZRIi9JfvGmK2VByTPVJrr2mVxpRDfq0gZULh-P-N0YgRVHQ8lgcVLHZ10ncaZAyiZFVawoyG5ry6JxH28PoDNB8hiyvWyd9dps" />
        </div>
      </div>
    )
  },
  {
    id: "tech_frame",
    name: "Tech Frame",
    category: "Creative",
    design: { fgColor: "#137fec", bgColor: "#ffffff", pattern: "squares", frame: "border", frameColor: "#137fec", gradient: false },
    visual: (
      <div className="w-full aspect-square rounded-lg bg-slate-200 p-2 flex items-center justify-center">
        <div className="rounded-lg p-1 w-full h-full flex items-center justify-center relative border-2 border-slate-300">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#137fec] rounded-tl"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#137fec] rounded-tr"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#137fec] rounded-bl"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#137fec] rounded-br"></div>
          <img alt="QR" className="w-4/5 h-4/5"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlUvw-CaM6bxU2jCI6MtmejOGSySrTjURcNec_M3hBkK2RsdcK7rCixm-Ll8NU44_dkw8knH9tvydRRRdBllunwqeXryzY0KMQIqVgFG8Dipbv0gPt4Y9GC_SI96ROdZOkwjzZDUOWVQRB7S-p0lTPRPXjyjD6BlvcvYl40kFf1-MTRXcvulb-yFwEELA4EvvMO5cVAPE1sVL5G8ippi6O9xnl_ikvdOoI3uh0-lXm1TVuIMQgy_nroRLOoPc_wbsZ579FGGkgV5w" />
        </div>
      </div>
    )
  }
]

const CATEGORIES = ["All", "Social", "Business", "Minimal", "Utility", "Creative"]

export default function TemplatesTab() {
  const { update } = useQR()
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("All")

  const filtered = TEMPLATE_CARDS.filter(t => {
    if (activeTab !== "All" && t.category !== activeTab) return false
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const applyDesign = (d) => {
    update({
      fgColor: d.fgColor ?? "#000000",
      bgColor: d.bgColor ?? "#ffffff",
      pattern: d.pattern ?? "squares",
      frame: d.frame ?? null,
      frameLabel: d.frameLabel ?? "SCAN ME",
      frameLabelColor: d.frameLabelColor ?? "#000000",
      frameColor: d.frameColor ?? null,
      gradient: d.gradient ?? false,
      gradientColor: d.gradientColor ?? "#6366f1",
    })
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", background: "#f1f5f9", borderRadius: "10px", padding: "8px 12px", gap: "8px" }}>
        <svg width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search templates..."
          style={{ background: "transparent", border: "none", outline: "none", fontSize: "13px", color: "#334155", width: "100%" }}
        />
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            style={{
              flexShrink: 0,
              height: "30px",
              borderRadius: "9999px",
              padding: "0 14px",
              fontSize: "12px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: activeTab === cat ? "#137fec" : "#f1f5f9",
              color: activeTab === cat ? "#fff" : "#64748b",
              transition: "all 0.15s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {filtered.map(t => (
          <div
            key={t.id}
            onClick={() => applyDesign(t.design)}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = "#93c5fd";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
            style={{
              display: "flex", flexDirection: "column", gap: "8px",
              border: "1px solid #e2e8f0", borderRadius: "12px",
              background: "#fff", padding: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              cursor: "pointer", transition: "all 0.2s ease"
            }}
          >
            {t.visual}
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#1e293b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</p>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{t.category}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "24px", color: "#94a3b8", fontSize: "13px" }}>
            No templates found.
          </div>
        )}
      </div>

      {/* Reset */}
      <div style={{ textAlign: "center", paddingTop: "8px" }}>
        <button type="button"
          onClick={() => update({ fgColor: "#000000", bgColor: "#ffffff", pattern: "squares", frame: null, frameLabel: "SCAN ME", frameLabelColor: "#000000", gradient: false, frameColor: null })}
          style={{ fontSize: "11px", color: "#94a3b8", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
          Reset to Default
        </button>
      </div>
    </div>
  )
}
