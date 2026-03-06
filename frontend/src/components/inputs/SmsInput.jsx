import { useQR } from "../../QRContext"

export default function SmsInput() {
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
          value={state.smsPhone}
          onChange={e => update({ smsPhone: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Message <span className="text-gray-300 font-normal normal-case">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Your message here…"
          value={state.smsMessage}
          onChange={e => update({ smsMessage: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition resize-none"
        />
      </div>
      <p className="text-xs text-gray-400">Format: SMSTO:phone:message</p>
    </div>
  )
}
