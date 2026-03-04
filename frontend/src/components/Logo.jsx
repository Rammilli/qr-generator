import Panel from "./Panel"

export default function Logo() {
  return (
    <Panel>
      <div className="space-y-3">
        <p className="text-sm">
          Add your brand mark inside the QR code to make it instantly
          recognizable.
        </p>
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-[11px] text-slate-400">
            Upload
          </div>
          <div className="flex flex-col gap-1 text-xs text-slate-500">
            <span>PNG, JPG or SVG</span>
            <span>Recommended size: 500×500px</span>
          </div>
        </div>
      </div>
    </Panel>
  )
}

