import { useQR } from "../../../QRContext"

const PATTERNS = [
    { id: "squares", label: "Squares", preview: "▪▪▪\n▪▪▪\n▪▪▪" },
    { id: "dots", label: "Dots", preview: "•••\n•••\n•••" },
    { id: "rounded", label: "Rounded", preview: "▫▫▫\n▫▫▫\n▫▫▫" },
    { id: "diamond", label: "Diamond", preview: "◆◆◆\n◆◆◆\n◆◆◆" },
    { id: "star", label: "Star", preview: "✦✦✦\n✦✦✦\n✦✦✦" },
    { id: "fluid", label: "Fluid", preview: "〰〰\n〰〰\n〰〰" },
]

function PatternPreview({ pattern }) {
    const size = 40
    const modules = []
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const isOn = (row === 0 && col < 3) || (row === 4 && col > 1) || (row === 2 && col === 2) || Math.random() > 0.4
            if (isOn) {
                if (pattern === "dots") {
                    modules.push(<circle key={`${row}-${col}`} cx={col * 8 + 4} cy={row * 8 + 4} r="3.5" fill="currentColor" />)
                } else if (pattern === "rounded") {
                    modules.push(<rect key={`${row}-${col}`} x={col * 8} y={row * 8} width="7" height="7" rx="2" fill="currentColor" />)
                } else if (pattern === "diamond") {
                    const cx = col * 8 + 3.5, cy = row * 8 + 3.5
                    modules.push(<polygon key={`${row}-${col}`} points={`${cx},${cy - 3.5} ${cx + 3.5},${cy} ${cx},${cy + 3.5} ${cx - 3.5},${cy}`} fill="currentColor" />)
                } else {
                    modules.push(<rect key={`${row}-${col}`} x={col * 8} y={row * 8} width="7" height="7" fill="currentColor" />)
                }
            }
        }
    }
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" className="opacity-80">
            {modules}
        </svg>
    )
}

export default function PatternsTab() {
    const { state, update } = useQR()

    return (
        <div>
            <p className="text-[11px] text-white/40 mb-3 uppercase tracking-wider">Module Style</p>
            <div className="grid grid-cols-3 gap-2">
                {PATTERNS.map((p) => (
                    <button
                        key={p.id}
                        type="button"
                        onClick={() => update({ pattern: p.id })}
                        className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all ${state.pattern === p.id
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-white/10 text-white/40 hover:border-white/25 hover:bg-white/3"
                            }`}
                    >
                        <PatternPreview pattern={p.id} />
                        <span className="text-[10px] font-medium">{p.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
