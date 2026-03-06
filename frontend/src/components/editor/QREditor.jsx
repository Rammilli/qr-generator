import { useState } from "react"
import { useQR, QR_TYPES } from "../../QRContext"
import TemplatesTab from "./tabs/TemplatesTab"
import LogoTab from "./tabs/LogoTab"
import ColorsTab from "./tabs/ColorsTab"
import FramesTab from "./tabs/FramesTab"
import PatternsTab from "./tabs/PatternsTab"
import BackgroundTab from "./tabs/BackgroundTab"
import OptionsTab from "./tabs/OptionsTab"
import PlatformSelector from "../PlatformSelector"
import PhoneInput from "../inputs/PhoneInput"
import EmailInput from "../inputs/EmailInput"
import SmsInput from "../inputs/SmsInput"
import WhatsAppInput from "../inputs/WhatsAppInput"
import WiFiInput from "../inputs/WiFiInput"
import LocationInput from "../inputs/LocationInput"
import EventInput from "../inputs/EventInput"
import AppDownloadInput from "../inputs/AppDownloadInput"

const SECTIONS = [
    {
        id: "templates", label: "Design Templates", Panel: TemplatesTab,
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

// ── VCard form ───────────────────────────────────────────────────────────────
function VCardForm() {
    const { state, update } = useQR()
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
                { key: "vcardName", label: "Full Name", type: "text" },
                { key: "vcardOrg", label: "Organization", type: "text" },
                { key: "vcardPhone", label: "Phone Number", type: "tel" },
                { key: "vcardEmail", label: "Email Address", type: "email" },
            ].map(({ key, label, type }) => (
                <div key={key}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>{label}</label>
                    <input
                        type={type}
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

// ── Content input panel switcher ─────────────────────────────────────────────
function ContentPanel({ type }) {
    const { state, update } = useQR()
    switch (type) {
        case "vcard":    return <VCardForm />
        case "phone":    return <PhoneInput />
        case "email":    return <EmailInput />
        case "sms":      return <SmsInput />
        case "whatsapp": return <WhatsAppInput />
        case "wifi":     return <WiFiInput />
        case "location": return <LocationInput />
        case "event":    return <EventInput />
        case "app":      return <AppDownloadInput />
        case "social":   return null
        default:
            return (
                <input
                    type="text"
                    value={state.content}
                    onChange={e => update({ content: e.target.value })}
                    placeholder={QR_TYPES.find(t => t.id === type)?.placeholder || "https://example.com"}
                    className="input-light"
                />
            )
    }
}

const TYPE_HELP = {
    link:     "Encode any URL or website link",
    text:     "Plain text — message, note, or data",
    vcard:    "Contact card saved on phone automatically",
    pdf:      "Direct link to a hosted PDF file",
    phone:    "Tapping opens the dialer with this number",
    email:    "Opens email compose with pre-filled fields",
    sms:      "Opens SMS app with number & message",
    whatsapp: "Opens WhatsApp chat with pre-filled message",
    wifi:     "Automatically connects to the WiFi network",
    location: "Opens Google Maps at the coordinates",
    event:    "Adds a calendar event when scanned",
    app:      "Links to iOS & Android app stores",
    social:   "Select a platform to generate a profile QR",
}

// ── Main QREditor ────────────────────────────────────────────────────────────
export default function QREditor() {
    const { state, update, generateQR } = useQR()
    const [openSection, setOpenSection] = useState("templates")

    const showPlatformSelector = state.qrType === "social" || state.qrType === "link"
    const platformSelected = state.platform && showPlatformSelector

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "24px"
            }}>

                {/* ── Step 1: Select content type ── */}
                <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
                        1. Select QR Code Type
                    </label>
                    <div style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        position: "relative"
                    }}>
                        {QR_TYPES.map(t => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => update({ qrType: t.id, content: "", platform: null })}
                                className={`tab-pill ${state.qrType === t.id ? "active" : ""}`}
                            >
                                <span style={{ fontSize: "14px" }}>{t.icon}</span>
                                {t.label}
                            </button>
                        ))}
                    </div>
                    {TYPE_HELP[state.qrType] && (
                        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>
                            {TYPE_HELP[state.qrType]}
                        </p>
                    )}
                </div>

                {/* ── Step 2: Platform Selector (for social / link types) ── */}
                {showPlatformSelector && (
                    <div>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
                            {state.qrType === "social" ? "2. Select Platform" : "2. Social Platform (optional)"}
                        </label>
                        <PlatformSelector />
                    </div>
                )}

                {/* ── Step 3 (or 2 if no platform selector): Enter Content ── */}
                {!(platformSelected && state.qrType === "social") && (
                    <div>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
                            {showPlatformSelector
                                ? (platformSelected ? "" : `${state.qrType === "social" ? "2" : "3"}. Or Enter URL Directly`)
                                : "2. Enter Content"
                            }
                        </label>
                        {!platformSelected && <ContentPanel type={state.qrType} />}

                        {/* Empty state for social with no platform */}
                        {state.qrType === "social" && !state.platform && (
                            <div style={{
                                padding: "24px",
                                textAlign: "center",
                                border: "2px dashed #e2e8f0",
                                borderRadius: "12px",
                                color: "#94a3b8",
                                fontSize: "13px"
                            }}>
                                ↑ Select a platform above to get started
                            </div>
                        )}
                    </div>
                )}

                {/* Multi-field types that aren't 'social': always show their panel */}
                {["email", "sms", "whatsapp", "wifi", "location", "event", "app", "vcard", "phone"].includes(state.qrType) && (
                    <div style={{ marginTop: "-16px" }}>
                        <ContentPanel type={state.qrType} />
                    </div>
                )}

                {/* ── Design / Customize ── */}
                <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
                        {showPlatformSelector ? "3. Customize Design" : (["email","sms","whatsapp","wifi","location","event","app","vcard","phone"].includes(state.qrType) ? "3. Customize Design" : "3. Customize Design")}
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

            {/* ── Sticky Generate Button ── */}
            <div style={{ paddingTop: "24px", marginTop: "12px", borderTop: "1px solid #e2e8f0" }}>
                <button
                    type="button"
                    onClick={generateQR}
                    disabled={state.loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "14px",
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
                    {state.loading ? "Generating…" : "↺ Regenerate QR"}
                </button>
            </div>
        </div>
    )
}
