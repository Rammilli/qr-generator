import Panel from "./Panel"

export default function Background() {
  return (
    <Panel>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Background color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              defaultValue="#ffffff"
              className="h-9 w-9 rounded border border-slate-200"
            />
            <input
              type="text"
              defaultValue="#ffffff"
              className="flex-1 border border-slate-200 rounded px-2 py-1 text-xs"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Quiet zone
          </label>
          <input
            type="range"
            min="0"
            max="20"
            defaultValue="8"
            className="w-full"
          />
        </div>
      </div>
    </Panel>
  )
}

