import { useQR, QR_TYPES, DESIGN_TABS } from "../../QRContext"
import { useState } from "react"
import Templates from "./tabs/Templates"
import LogoTab from "./tabs/LogoTab"
import ColorsTab from "./tabs/ColorsTab"
import FramesTab from "./tabs/FramesTab"
import PatternsTab from "./tabs/PatternsTab"
import BackgroundTab from "./tabs/BackgroundTab"
import OptionsTab from "./tabs/OptionsTab"

function VCardForm() {
    const { state, update } = useQR()
    return (
        <div className="grid grid-cols-2 gap-3 mt-3">
            {[
                { key: "vcardName", label: "Full Name", placeholder: "John Doe" },
                { key: "vcardOrg", label: "Organization", placeholder: "Acme Corp" },
                { key: "vcardEmail", label: "Email", placeholder: "john@example.com" },
                { key: "vcardPhone", label: "Phone", placeholder: "+1 234 567 8900" },
            ].map(({ key, label, placeholder }) => (
                <div key={key}>
                    <label className="block text-[11px] text-white/40 mb-1 uppercase tracking-wider">{label}</label>
                    <input
                        type="text"
                        value={state[key]}
                        onChange={e => update({ [key]: e.target.value })}
                        placeholder={placeholder}
                        className="input-dark w-full rounded-lg px-3 py-2 text-sm"
                    />
                </div>
            ))}
        </div>
    )
}

function WiFiForm() {
    const { state, update } = useQR()
    return (
        <div className="space-y-3 mt-3">
            <div>
                <label className="block text-[11px] text-white/40 mb-1 uppercase tracking-wider">Network Name (SSID)</label>
                <input
                    type="text"
                    value={state.wifiSSID}
                    onChange={e => update({ wifiSSID: e.target.value })}
                    placeholder="MyHomeWifi"
                    className="input-dark w-full rounded-lg px-3 py-2 text-sm"
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-[11px] text-white/40 mb-1 uppercase tracking-wider">Password</label>
                    <input
                        type="password"
                        value={state.wifiPassword}
                        onChange={e => update({ wifiPassword: e.target.value })}
                        placeholder="••••••••"
                        className="input-dark w-full rounded-lg px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-[11px] text-white/40 mb-1 uppercase tracking-wider">Security</label>
                    <select
                        value={state.wifiEncryption}
                        onChange={e => update({ wifiEncryption: e.target.value })}
                        className="input-dark w-full rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="">Open</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

const TAB_COMPONENTS = {
    templates: Templates,
    logo: LogoTab,
    colors: ColorsTab,
    frames: FramesTab,
    patterns: PatternsTab,
    background: BackgroundTab,
    options: OptionsTab,
}

export default function QREditor() {
    const { state, update, generateQR } = useQR()
    const [designTab, setDesignTab] = useState("templates")

    const ActiveTabComponent = TAB_COMPONENTS[designTab]
    const activeType = QR_TYPES.find(t => t.id === state.qrType)

    const showSimpleInput = !["vcard", "wifi"].includes(state.qrType)

    return (
        <div className="flex flex-col gap-5">
            {/* QR Type Selector */}
            <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {QR_TYPES.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => update({ qrType: t.id })}
                            className={`tab-pill ${state.qrType === t.id ? "active" : ""}`}
                        >
                            <span className="mr-1">{t.icon}</span>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Content Input */}
                {showSimpleInput ? (
                    <div>
                        <label className="block text-[11px] text-white/40 mb-1.5 uppercase tracking-wider font-semibold">
                            {activeType?.label} {state.qrType === "link" ? "URL" : "Content"}
                        </label>
                        <input
                            type={state.qrType === "email" ? "email" : state.qrType === "phone" || state.qrType === "sms" || state.qrType === "whatsapp" ? "tel" : "text"}
                            value={state.content}
                            onChange={e => update({ content: e.target.value })}
                            placeholder={activeType?.placeholder}
                            className="input-dark w-full rounded-xl px-4 py-3 text-sm"
                        />
                    </div>
                ) : state.qrType === "vcard" ? (
                    <VCardForm />
                ) : (
                    <WiFiForm />
                )}
            </div>

            {/* Design Tabs Row */}
            <div>
                <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thumb-primary">
                    {DESIGN_TABS.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setDesignTab(t.id)}
                            className={`tab-pill flex-shrink-0 ${designTab === t.id ? "active" : ""}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-3 glass rounded-xl p-4 min-h-[140px]">
                    <ActiveTabComponent />
                </div>
            </div>

            {/* Generate Button */}
            <button
                type="button"
                onClick={() => generateQR()}
                disabled={state.loading}
                className="btn-primary w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {state.loading ? (
                    <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Generating...
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Generate QR Code
                    </>
                )}
            </button>

            {state.error && (
                <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {state.error}
                </div>
            )}
        </div>
    )
}
