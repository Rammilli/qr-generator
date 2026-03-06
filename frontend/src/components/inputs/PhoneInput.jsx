import { useQR } from "../../QRContext"

export default function PhoneInput() {
  const { state, update } = useQR()
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="+1 234 567 8900"
          value={state.content}
          onChange={e => update({ content: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
        <p className="text-xs text-gray-400 mt-1">Format: tel:+number</p>
      </div>
    </div>
  )
}
