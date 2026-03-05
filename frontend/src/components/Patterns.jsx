const PATTERNS = [
  {
    id: "squares", label: "Square", preview: (fg) => (
      <svg width="36" height="36" viewBox="0 0 36 36">
        {[...Array(9)].map((_, i) => { const x = (i % 3) * 12 + 2, y = Math.floor(i / 3) * 12 + 2; return <rect key={i} x={x} y={y} width="9" height="9" fill={fg} rx="0" /> })}
      </svg>
    )
  },
  {
    id: "dots", label: "Dots", preview: (fg) => (
      <svg width="36" height="36" viewBox="0 0 36 36">
        {[...Array(9)].map((_, i) => { const cx = (i % 3) * 12 + 6, cy = Math.floor(i / 3) * 12 + 6; return <circle key={i} cx={cx} cy={cy} r="4.5" fill={fg} /> })}
      </svg>
    )
  },
  {
    id: "rounded", label: "Rounded", preview: (fg) => (
      <svg width="36" height="36" viewBox="0 0 36 36">
        {[...Array(9)].map((_, i) => { const x = (i % 3) * 12 + 2, y = Math.floor(i / 3) * 12 + 2; return <rect key={i} x={x} y={y} width="9" height="9" fill={fg} rx="3" /> })}
      </svg>
    )
  },
  {
    id: "diamond", label: "Diamond", preview: (fg) => (
      <svg width="36" height="36" viewBox="0 0 36 36">
        {[...Array(9)].map((_, i) => { const cx = (i % 3) * 12 + 6, cy = Math.floor(i / 3) * 12 + 6; return <rect key={i} x={cx - 5} y={cy - 5} width="9" height="9" fill={fg} rx="0" transform={`rotate(45 ${cx} ${cy})`} /> })}
      </svg>
    )
  },
]

export default function Patterns({ design, patchDesign }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Module Style</p>
      <div className="grid grid-cols-4 gap-2">
        {PATTERNS.map(p => {
          const active = design.pattern === p.id
          return (
            <button key={p.id} type="button" onClick={() => patchDesign({ pattern: p.id })}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition cursor-pointer
                ${active ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300 bg-white"}`}>
              <div className={active ? "text-blue-600" : "text-slate-600"}>
                {p.preview(active ? "#2563eb" : "#374151")}
              </div>
              <span className={`text-[9px] font-bold ${active ? "text-blue-600" : "text-slate-500"}`}>{p.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}