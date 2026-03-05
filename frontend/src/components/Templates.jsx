// 5×5 deterministic mini-QR cell matrix
const C1 = [1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1]
const C2 = [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1]

function MiniQR({ fg, bg, pat }) {
  const S = 48, cs = S / 5
  const cells = (pat === "rounded" || pat === "diamond") ? C2 : C1
  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="block rounded">
      <rect width={S} height={S} fill={bg} />
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

const TEMPLATES = [
  // Social
  { id: "whatsapp", name: "WhatsApp", grp: "Social", fg: "#128C7E", bg: "#fff", pat: "dots", frame: "badge", label: "WhatsApp", lc: "#128C7E", gc: null },
  { id: "instagram", name: "Instagram", grp: "Social", fg: "#833AB4", bg: "#fff", pat: "rounded", frame: "rounded", label: "Follow Us", lc: "#833AB4", gc: "#F77737" },
  { id: "tiktok", name: "TikTok", grp: "Social", fg: "#010101", bg: "#fff", pat: "dots", frame: "badge", label: "Follow Me", lc: "#010101", gc: null },
  { id: "youtube", name: "YouTube", grp: "Social", fg: "#FF0000", bg: "#fff", pat: "squares", frame: "badge", label: "Subscribe", lc: "#FF0000", gc: null },
  { id: "linkedin", name: "LinkedIn", grp: "Social", fg: "#0A66C2", bg: "#e8f1fb", pat: "rounded", frame: "border", label: "Connect", lc: "#0A66C2", gc: null },
  { id: "snapchat", name: "Snapchat", grp: "Social", fg: "#010101", bg: "#FFFC00", pat: "dots", frame: "badge", label: "Add Me", lc: "#010101", gc: null },
  { id: "spotify", name: "Spotify", grp: "Social", fg: "#1DB954", bg: "#191414", pat: "dots", frame: "rounded", label: "Listen Now", lc: "#1DB954", gc: null },
  { id: "facebook", name: "Facebook", grp: "Social", fg: "#1877F2", bg: "#fff", pat: "dots", frame: "scan", label: "Like Us", lc: "#1877F2", gc: null },
  // Business
  { id: "wifi", name: "WiFi", grp: "Business", fg: "#0ea5e9", bg: "#f0f9ff", pat: "dots", frame: "scan", label: "Connect", lc: "#0ea5e9", gc: null },
  { id: "menu", name: "Menu", grp: "Business", fg: "#b45309", bg: "#fffbeb", pat: "dots", frame: "scan", label: "View Menu", lc: "#b45309", gc: null },
  { id: "payment", name: "Pay", grp: "Business", fg: "#059669", bg: "#ecfdf5", pat: "squares", frame: "badge", label: "Pay Now", lc: "#059669", gc: null },
  { id: "paypal", name: "PayPal", grp: "Business", fg: "#003087", bg: "#fff", pat: "rounded", frame: "border", label: "Pay Now", lc: "#003087", gc: "#009CDE" },
  { id: "download", name: "Download", grp: "Business", fg: "#7c3aed", bg: "#faf5ff", pat: "rounded", frame: "badge", label: "Download", lc: "#7c3aed", gc: "#6366f1" },
  { id: "review", name: "Review", grp: "Business", fg: "#d97706", bg: "#fffbeb", pat: "dots", frame: "badge", label: "Rate Us", lc: "#d97706", gc: null },
  // Themes
  { id: "classic", name: "Classic", grp: "Theme", fg: "#000000", bg: "#ffffff", pat: "squares", frame: null, label: "SCAN ME", lc: "#000000", gc: null },
  { id: "ocean", name: "Ocean", grp: "Theme", fg: "#0369a1", bg: "#f0f9ff", pat: "dots", frame: "rounded", label: "SCAN ME", lc: "#0369a1", gc: "#06b6d4" },
  { id: "midnight", name: "Midnight", grp: "Theme", fg: "#818cf8", bg: "#1e1b4b", pat: "dots", frame: null, label: "SCAN ME", lc: "#818cf8", gc: "#06b6d4" },
  { id: "neon", name: "Neon", grp: "Theme", fg: "#00ff88", bg: "#0a0a1a", pat: "dots", frame: null, label: "SCAN ME", lc: "#00ff88", gc: "#00ccff" },
  { id: "sunset", name: "Sunset", grp: "Theme", fg: "#ea580c", bg: "#fff7ed", pat: "dots", frame: "scan", label: "SCAN ME", lc: "#ea580c", gc: "#f59e0b" },
  { id: "rose", name: "Rose", grp: "Theme", fg: "#e11d48", bg: "#fff1f2", pat: "rounded", frame: "rounded", label: "SCAN ME", lc: "#e11d48", gc: null },
]

const GROUPS = ["Social", "Business", "Theme"]

export default function Templates({ design, patchDesign }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button type="button" className="text-xs text-slate-400 underline"
          onClick={() => patchDesign({ fgColor: "#000000", bgColor: "#ffffff", pattern: "squares", frame: null, frameLabel: "SCAN ME", frameLabelColor: "#000000", gradient: false })}>
          Reset
        </button>
      </div>
      {GROUPS.map(grp => (
        <div key={grp}>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{grp}</p>
          <div className="grid grid-cols-4 gap-2">
            {TEMPLATES.filter(t => t.grp === grp).map(t => {
              const active = design.fgColor === t.fg && design.bgColor === t.bg && design.pattern === t.pat
              return (
                <button
                  key={t.id}
                  type="button"
                  title={t.name}
                  onClick={() => patchDesign({
                    fgColor: t.fg, bgColor: t.bg, pattern: t.pat,
                    frame: t.frame ?? null,
                    frameLabel: t.label || "SCAN ME",
                    frameLabelColor: t.lc || "#000000",
                    gradient: Boolean(t.gc),
                    gradientColor: t.gc || "#6366f1",
                  })}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition cursor-pointer
                    ${active ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300 bg-white"}`}
                >
                  <div className="relative">
                    <MiniQR fg={t.fg} bg={t.bg} pat={t.pat} />
                    {active && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className={`text-[9px] font-semibold leading-none text-center ${active ? "text-blue-600" : "text-slate-500"}`}>
                    {t.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}