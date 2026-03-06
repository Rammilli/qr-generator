import { useState } from "react";

const TEMPLATE_CARDS = [
  {
    id: "instagram",
    name: "Instagram Gradient",
    category: "Social",
    design: { 
      fgColor: "#833AB4", bgColor: "#ffffff", pattern: "dots", frame: "rounded", 
      frameLabel: "Follow Us", frameLabelColor: "#833AB4", gradient: true, gradientColor: "#F77737" 
    },
    renderVisual: () => (
      <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-2 flex items-center justify-center relative overflow-hidden group">
        <div className="bg-white rounded p-1 w-3/4 aspect-square flex items-center justify-center relative z-10 shadow-lg">
          <img alt="QR Code" className="w-full h-full opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd_ufHHkFOqexMCEIf782SP5y9Kkbv9IccpYzOuyO6UnczMSfcZJiN3A5CzBZZVi42XUO2LqHmzHa-BhQNQW3j_Dwlq_Z7j9rX3YTlM-Whr1PE7ju7dadsn1rMPN71Gwa73JWJw5xTZsrGVeNqpXrhhhamwcpzd8xki5l4HMOGvbK4cGTo0cWYnzTw8mkb-4WJ9gE2VGglTXyKWFoxxGxOu8wGAqcjKZWHaB0gSwhiZY-Q1CbjGT9Qzb172wRWJTpGdA3vQOooZIo"/>
          <div className="absolute inset-0 border-4 border-white rounded-lg pointer-events-none"></div>
          <div className="absolute bottom-1 bg-white text-[8px] font-bold px-1 rounded shadow text-pink-500 uppercase">Follow Us</div>
        </div>
      </div>
    )
  },
  {
    id: "minimal_dark",
    name: "Minimal Dark",
    category: "Minimal",
    design: { fgColor: "#ffffff", bgColor: "#0f172a", pattern: "squares", frame: null, gradient: false },
    renderVisual: () => (
      <div className="w-full aspect-square rounded-lg bg-slate-900 p-2 flex items-center justify-center relative overflow-hidden group">
        <div className="bg-transparent border border-slate-700 rounded p-1 w-3/4 aspect-square flex items-center justify-center relative z-10">
          <img alt="QR Code" className="w-full h-full invert brightness-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj9fB33xdInVIbX-EXVMozvH9iNrKDukUrPMegECh72DpbkXB4-jn10lJe91_6yTEzSVU_BuPv3-KDswFig_d00-yUIKqea4n4AI02mWDqxrgrgWH_p47IFT0Eph1OIidhbEOadGxDUHFoP4cKMGcqFVzDAjGEVjSe2TfLRbgj5TemIVfxL7NOw9_4Py0KROfITyGWUhrdPvjL0WShvn78j7m50_cY4t5RkvC7RHRK-bs5gaTFdERE5zguO2KWnmSmhPIych3_Tf4"/>
        </div>
      </div>
    )
  },
  {
    id: "business_scan",
    name: "Business Scan Me",
    category: "Business",
    design: { fgColor: "#1e293b", bgColor: "#ffffff", pattern: "diamond", frame: "scan", frameLabel: "SCAN ME", frameLabelColor: "#1e293b", gradient: false, frameColor: "#cbd5e1" },
    renderVisual: () => (
      <div className="w-full aspect-square rounded-lg bg-slate-100 dark:bg-slate-700 p-2 flex items-center justify-center relative overflow-hidden group">
        <div className="bg-white rounded-xl p-2 w-4/5 aspect-square flex flex-col items-center justify-center relative z-10 shadow-md border-2 border-slate-200 dark:border-slate-600">
          <img alt="QR Code" className="w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfvdvL89fD7X5Kltj23-C_-AlfUcz7MmNvGJTljrU38CLHzJBz5NlKmxfsVdogMxpLd3fI2DYzQDfS7iAyYg2_Ts67ngaOoHDVNpoCi8izurTOS8UHfS5EqFMvBM-Lh-RBQ27RSla1p03bz20GsqfGKMSAAn2CHU_lnvvBVHDz-zzkHmorJRCWP2n_ZG4-UqJX6gZlUQOR2H0uZMvvj08PmzEaKWtVLR9b3Ob7V5TS5YwKu_tajKPssUHd1dwjbVkpnFg1jIIvqOs"/>
          <div className="absolute -bottom-3 bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">SCAN ME</div>
        </div>
      </div>
    )
  },
  {
    id: "whatsapp",
    name: "WhatsApp Chat",
    category: "Social",
    design: { fgColor: "#22c55e", bgColor: "#ffffff", pattern: "dots", frame: "circle_label", frameLabel: "WHATSAPP", frameLabelColor: "#22c55e", gradient: false, frameColor: "#22c55e" },
    renderVisual: () => (
      <div className="w-full aspect-square rounded-lg bg-green-500 p-2 flex items-center justify-center relative overflow-hidden group">
        <div className="bg-white rounded-full p-3 w-4/5 aspect-square flex items-center justify-center relative z-10 shadow-lg">
          <img alt="QR Code" className="w-full h-full opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0AticEFMNXYMrNn3Tbt2j2AM_k7wLLVD_21znpJ1fUdOKXfEZiyXmgeM9duEbMvE-Lf1MRShWA1nfjvZVf1kmIW2d-yCPP10W29LB7Sk_Uh4huHz3v3iX3aG2h_6uA6ccJw42jW6n_Czg2stdwKF6Dtmz6f70s40s-TNTl5VsVDfa3AZMPiOicgUvbXo4jz_0WpuSK7Ko1x-afNLm2rpazm2mp5TcbKGOzl4elvYNc6wWSgQaWr3gHU432iW4-2Y4YjElWP01ZxA"/>
          <div className="absolute inset-0 border-4 border-dashed border-green-200 rounded-full pointer-events-none opacity-50 m-1"></div>
        </div>
      </div>
    )
  },
  {
    id: "wifi",
    name: "WiFi Connect",
    category: "Utility",
    design: { fgColor: "#0ea5e9", bgColor: "#ffffff", pattern: "dots", frame: null, gradient: true, gradientColor: "#3b82f6" },
    renderVisual: () => (
      <div className="w-full aspect-square rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 p-2 flex items-center justify-center relative overflow-hidden group">
        <div className="bg-white/90 backdrop-blur rounded p-2 w-3/4 aspect-square flex flex-col items-center justify-center relative z-10 shadow border border-white/50">
          <span className="material-symbols-outlined absolute top-1 right-1 text-slate-400 text-[10px]">wifi</span>
          <img alt="QR Code" className="w-full h-full mt-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzjoD6PchG45CJfR_H_flC8liBH0rhBqf6JvupHi6WiWO7xEbidiRi1jMz_RxicA6SQS-iACcj5ZHra5oyZfNCywo6KR0dSoTrdhR7COhvh-31wCmSn7gCu62yYRRSeOPiT869d2SNP3jfj6XvhdNpljv-qr0cApFtz61p2l4vxZRIi9JfvGmK2VByTPVJrr2mVxpRDfq0gZULh-P-N0YgRVHQ8lgcVLHZ10ncaZAyiZFVawoyG5ry6JxH28PoDNB8hiyvWyd9dps"/>
        </div>
      </div>
    )
  },
  {
    id: "tech_frame",
    name: "Tech Frame",
    category: "Creative",
    design: { fgColor: "#137fec", bgColor: "#ffffff", pattern: "squares", frame: "border", frameColor: "#137fec", gradient: false },
    renderVisual: () => (
      <div className="w-full aspect-square rounded-lg bg-slate-200 dark:bg-slate-900 p-2 flex items-center justify-center relative overflow-hidden group">
        <div className="bg-transparent rounded-lg p-1 w-full h-full flex items-center justify-center relative z-10 border-2 border-slate-300 dark:border-slate-700">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#137fec] rounded-tl"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#137fec] rounded-tr"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#137fec] rounded-bl"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#137fec] rounded-br"></div>
          <img alt="QR Code" className="w-4/5 h-4/5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlUvw-CaM6bxU2jCI6MtmejOGSySrTjURcNec_M3hBkK2RsdcK7rCixm-Ll8NU44_dkw8knH9tvydRRRdBllunwqeXryzY0KMQIqVgFG8Dipbv0gPt4Y9GC_SI96ROdZOkwjzZDUOWVQRB7S-p0lTPRPXjyjD6BlvcvYl40kFf1-MTRXcvulb-yFwEELA4EvvMO5cVAPE1sVL5G8ippi6O9xnl_ikvdOoI3uh0-lXm1TVuIMQgy_nroRLOoPc_wbsZ579FGGkgV5w"/>
        </div>
      </div>
    )
  }
];

const CATEGORIES = ["All", "Social", "Business", "Payment", "Minimal", "Utility", "Creative"];

export default function Templates({ design, patchDesign }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filtered = TEMPLATE_CARDS.filter(t => {
    if (activeTab !== "All" && t.category !== activeTab) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full -mx-2 px-2">
      {/* Search */}
      <div className="mb-4">
        <div className="flex w-full items-center rounded-xl bg-slate-100 dark:bg-slate-800/50 px-4 py-2.5 border border-slate-200">
          <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 border-none focus:ring-0 p-0 text-sm outline-none" 
            placeholder="Search templates..." 
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar scroll-smooth snap-x">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`flex h-8 shrink-0 items-center justify-center rounded-full px-4 text-xs font-medium snap-start transition-colors
              ${activeTab === cat 
                ? 'bg-[#137fec] text-white' 
                : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        {filtered.map(t => (
          <div key={t.id} className="flex flex-col gap-2 rounded-xl bg-white dark:bg-slate-800/40 p-3 shadow-sm border border-slate-200 dark:border-slate-800">
            {t.renderVisual()}
            <div className="flex flex-col mt-1">
              <p className="font-medium text-sm truncate text-slate-800">{t.name}</p>
              <p className="text-slate-500 text-xs truncate">{t.category}</p>
            </div>
            <button 
              onClick={() => patchDesign(t.design)}
              className="mt-1 w-full rounded-lg bg-[#137fec]/10 hover:bg-[#137fec]/20 text-[#137fec] py-1.5 text-xs font-semibold transition-colors"
            >
              Select
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-6 text-slate-500 text-sm">
            No templates found.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button type="button" className="text-xs text-slate-400 hover:text-slate-600 underline"
          onClick={() => patchDesign({ fgColor: "#000000", bgColor: "#ffffff", pattern: "squares", frame: null, frameLabel: "SCAN ME", frameLabelColor: "#000000", gradient: false, frameColor: null })}>
          Reset to Default
        </button>
      </div>
    </div>
  )
}