import Panel from "./Panel"

export default function Options() {
  return (
    <Panel>
      <div className="space-y-3 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked />
          <span>High error correction (recommended)</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked />
          <span>Rounded corners</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <span>Add margin for printing</span>
        </label>
      </div>
    </Panel>
  )
}

