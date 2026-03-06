import { useQR } from "../../QRContext"

export default function EmailInput() {
  const { state, update } = useQR()
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="email@example.com"
          value={state.content}
          onChange={e => update({ content: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Subject <span className="text-gray-300 font-normal normal-case">(optional)</span>
        </label>
        <input
          type="text"
          placeholder="Hello!"
          value={state.emailSubject}
          onChange={e => update({ emailSubject: e.target.value })}
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
          value={state.emailBody}
          onChange={e => update({ emailBody: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition resize-none"
        />
      </div>
    </div>
  )
}
