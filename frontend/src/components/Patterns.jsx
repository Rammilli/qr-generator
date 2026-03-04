import Panel from "./Panel"

export default function Patterns() {
  return (
    <Panel>
      <p className="mb-3 text-sm">
        Switch between different module shapes to match your visual style.
      </p>
      <div className="flex flex-wrap gap-2 text-xs">
        {["Squares", "Dots", "Rounded", "Pixels"].map((p) => (
          <button
            key={p}
            type="button"
            className="px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-primary hover:text-primary transition"
          >
            {p}
          </button>
        ))}
      </div>
    </Panel>
  )
}

