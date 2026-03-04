import Panel from "./Panel"

export default function Colors() {
  return (
    <Panel>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Foreground
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              defaultValue="#0f172a"
              className="h-9 w-9 rounded border border-slate-200"
            />
            <input
              type="text"
              defaultValue="#0f172a"
              className="flex-1 border border-slate-200 rounded px-2 py-1 text-xs"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Accent
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              defaultValue="#3b82f6"
              className="h-9 w-9 rounded border border-slate-200"
            />
            <input
              type="text"
              defaultValue="#3b82f6"
              className="flex-1 border border-slate-200 rounded px-2 py-1 text-xs"
            />
          </div>
        </div>
      </div>
    </Panel>
  )
}

