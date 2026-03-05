import { useState } from "react"
import { useQR, QR_TYPES } from "../../QRContext"
import Templates from "./tabs/TemplatesTab"
import LogoTab from "./tabs/LogoTab"
import ColorsTab from "./tabs/ColorsTab"
import FramesTab from "./tabs/FramesTab"
import PatternsTab from "./tabs/PatternsTab"
import BackgroundTab from "./tabs/BackgroundTab"
import OptionsTab from "./tabs/OptionsTab"

const SECTIONS = [
    {
        id: "templates", label: "Design Templates", Panel: Templates,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
    },
    {
        id: "logo", label: "Your Logo", Panel: LogoTab,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><rect x="4" y="16" width="16" height="5" rx="2" /></svg>
    },
    {
        id: "colors", label: "Your Colors", Panel: ColorsTab,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>
    },
    {
        id: "frames", label: "Custom Frames", Panel: FramesTab,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><rect x="7" y="7" width="10" height="10" rx="1" /></svg>
    },
    {
        id: "patterns", label: "Patterns", Panel: PatternsTab,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="2" /><circle cx="12" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="18" cy="12" r="2" /></svg>
    },
    {
        id: "background", label: "Background", Panel: BackgroundTab,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 16l5-5 4 4 3-3 5 5" /><circle cx="8" cy="8" r="1.5" /></svg>
    },
    {
        id: "options", label: "Options", Panel: OptionsTab,
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>
    },
]

function AccordionItem({ section, isOpen, onToggle }) {
    const { Panel, icon, label } = section

    return (
        <div style={{
            border: isOpen ? "1px solid #bfdbfe" : "1px solid #e2e8f0",
            borderRadius: "12px",
            marginBottom: "12px",
            background: "#ffffff",
            overflow: "hidden",
            boxShadow: isOpen ? "0 4px 12px rgba(37, 99, 235, 0.05)" : "0 1px 3px rgba(0,0,0,0.02)",
            transition: "all 0.2s"
        }}>
            <button
                type="button"
                onClick={onToggle}
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    cursor: "pointer",
                    border: "none",
                    background: isOpen ? "#ebf5ff" : "#ffffff",
                    color: isOpen ? "#1e3a8a" : "#334155",
                    borderBottom: isOpen ? "1px solid #dbeafe" : "none"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: isOpen ? "#2563eb" : "#64748b" }}>{icon}</span>
                    <span style={{ fontSize: "15px", fontWeight: 600 }}>{label}</span>
                </div>
                <span style={{ color: isOpen ? "#2563eb" : "#94a3b8", fontSize: "12px" }}>
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {isOpen && (
                <div style={{ padding: "20px", background: "#ffffff" }}>
                    <Panel />
                </div>
            )}
        </div>
    )
}

function VCardForm() {
    const { state, update } = useQR()

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
                { key: "vcardName", label: "Full Name" },
                { key: "vcardOrg", label: "Organization/Company" },
                { key: "vcardPhone", label: "Phone Number" },
                { key: "vcardEmail", label: "Email Address" }
            ].map(({ key, label }) => (
                <div key={key}>
                    <input
                        type="text"
                        value={state[key]}
                        onChange={e => update({ [key]: e.target.value })}
                        placeholder={label}
                        className="input-light"
                    />
                </div>
            ))}
        </div>
    )
}

export default function QREditor() {
    const { state, update, generateQR } = useQR()
    const [openSection, setOpenSection] = useState("templates")

    const activeType = QR_TYPES.find(t => t.id === state.qrType) || QR_TYPES[0]

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
        }}>
            <div style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "24px"
            }}>
                {/* Submit Target Type selection exact visual match */}
                <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
                        1. Select QR Code Target
                    </label>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {QR_TYPES.map(t => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => update({ qrType: t.id })}
                                className={`tab-pill ${state.qrType === t.id ? "active" : ""}`}
                            >
                                <span style={{ fontSize: "16px" }}>{t.icon}</span>
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Input exact visual match */}
                <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
                        2. Enter Content
                    </label>
                    {state.qrType === "vcard" ? (
                        <VCardForm />
                    ) : (
                        <input
                            type="text"
                            value={state.content}
                            onChange={e => update({ content: e.target.value })}
                            placeholder={activeType.placeholder}
                            className="input-light"
                        />
                    )}
                </div>

                {/* Accordions Container */}
                <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
                        3. Customize Design
                    </label>
                    {SECTIONS.map(s => (
                        <AccordionItem
                            key={s.id}
                            section={s}
                            isOpen={openSection === s.id}
                            onToggle={() => setOpenSection(openSection === s.id ? null : s.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Sticky Generate Button for Mobile / Fallback */}
            <div style={{
                paddingTop: "24px",
                marginTop: "12px",
                borderTop: "1px solid #e2e8f0"
            }}>
                <button
                    type="button"
                    onClick={generateQR}
                    disabled={state.loading}
                    style={{
                        width: "100%",
                        padding: "16px",
                        fontSize: "15px",
                        fontWeight: 700,
                        background: state.loading ? "#94a3b8" : "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: state.loading ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                    }}
                >
                    {state.loading ? "Generating..." : "Force Auto Gen"}
                </button>
            </div>
        </div>
    )
}
