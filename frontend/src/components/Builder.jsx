import { useState } from "react"
import Tabs from "..//Tabs"
import Accordion from "..//Accordion"
import Preview from "./Preview"
import Templates from "./Templates"
import Logo from "./Logo"
import Colors from "./Colors"
import Frames from "./Frames"
import Patterns from "./Patterns"
import Background from "./Background"
import Options from "./Options"
import PlatformSelector from "./PlatformSelector"
import PhoneInput from "./inputs/PhoneInput"
import EmailInput from "./inputs/EmailInput"
import SmsInput from "./inputs/SmsInput"
import WhatsAppInput from "./inputs/WhatsAppInput"
import WiFiInput from "./inputs/WiFiInput"
import LocationInput from "./inputs/LocationInput"
import EventInput from "./inputs/EventInput"
import AppDownloadInput from "./inputs/AppDownloadInput"
import { useQR } from "../QRContext"

const SECTIONS = [
  "Design Templates", "Your Logo", "Your Colors",
  "Custom Frames", "Patterns", "Background", "Options"
]

// ── VCard inline input ───────────────────────────────────────────────────────
function VCardInput() {
  const { state, update } = useQR()
  const fields = [
    { key: "vcardName",  label: "Full Name",    placeholder: "Jane Smith",       type: "text" },
    { key: "vcardEmail", label: "Email",         placeholder: "jane@example.com", type: "email" },
    { key: "vcardPhone", label: "Phone",         placeholder: "+1 234 567 8900",  type: "tel" },
    { key: "vcardOrg",   label: "Organization",  placeholder: "Acme Corp",        type: "text" },
  ]
  return (
    <div className="space-y-3">
      {fields.map(f => (
        <div key={f.key}>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{f.label}</label>
          <input
            type={f.type}
            placeholder={f.placeholder}
            value={state[f.key]}
            onChange={e => update({ [f.key]: e.target.value })}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
          />
        </div>
      ))}
    </div>
  )
}

// ── Single-line content input (link / text / pdf) ────────────────────────────
function SingleInput({ placeholder }) {
  const { state, update } = useQR()
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={state.content}
      onChange={e => update({ content: e.target.value })}
      className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
    />
  )
}

// ── Content panel switcher ───────────────────────────────────────────────────
function ContentInput({ type }) {
  switch (type) {
    case "vcard":    return <VCardInput />
    case "phone":    return <PhoneInput />
    case "email":    return <EmailInput />
    case "sms":      return <SmsInput />
    case "whatsapp": return <WhatsAppInput />
    case "wifi":     return <WiFiInput />
    case "location": return <LocationInput />
    case "event":    return <EventInput />
    case "app":      return <AppDownloadInput />
    case "social":   return null  // handled inside PlatformSelector
    case "text":     return <SingleInput placeholder="Enter your text message…" />
    case "pdf":      return <SingleInput placeholder="https://example.com/file.pdf" />
    default:         return <SingleInput placeholder="https://example.com" />
  }
}

const TYPE_HELP = {
  link:     "Encode any URL or website link",
  text:     "Plain text — any message, note, or data",
  vcard:    "Contact info saved to phone on scan",
  pdf:      "Link to a hosted PDF file",
  phone:    "Dialer opens with this number on scan",
  email:    "Opens email compose with pre-filled fields",
  sms:      "Opens SMS app with number and message",
  whatsapp: "Opens WhatsApp chat with pre-filled message",
  wifi:     "Device connects to WiFi automatically on scan",
  location: "Opens map at the specified coordinates",
  event:    "Adds calendar event on scan",
  app:      "Links to iOS & Android app stores",
  social:   "Select a social platform to generate a profile QR",
}

// ── Main Builder ─────────────────────────────────────────────────────────────
export default function Builder() {
  const { state, update } = useQR()
  const [open, setOpen] = useState("Design Templates")

  // Bridge QRContext state/update to the design/patchDesign props the existing
  // accordion children expect (keeps those components unchanged)
  const design = state
  const patchDesign = update

  const handleToggle = (section) => {
    setOpen(prev => prev === section ? null : section)
  }

  const sectionMap = {
    "Design Templates": <Templates design={design} patchDesign={patchDesign} />,
    "Your Logo":        <Logo design={design} patchDesign={patchDesign} />,
    "Your Colors":      <Colors design={design} patchDesign={patchDesign} />,
    "Custom Frames":    <Frames design={design} patchDesign={patchDesign} />,
    "Patterns":         <Patterns design={design} patchDesign={patchDesign} />,
    "Background":       <Background design={design} patchDesign={patchDesign} />,
    "Options":          <Options design={design} patchDesign={patchDesign} />,
  }

  const showPlatformSelector = state.qrType === "social" || state.qrType === "link"
  const platformSelected = showPlatformSelector && state.platform

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* ── LEFT: editor ──────────────────────────────────────── */}
      <div className="p-6 overflow-y-auto max-h-[88vh]">

        {/* Type tabs */}
        <Tabs
          setType={(t) => update({ qrType: t, content: "", platform: null })}
          active={state.qrType}
        />

        {/* Help hint */}
        <p className="text-xs text-gray-400 mt-2 mb-3">
          {TYPE_HELP[state.qrType] || "Enter content below"}
        </p>

        {/* Social platform selector (for 'social' and 'link' types) */}
        {showPlatformSelector && <PlatformSelector />}

        {/* Content input area */}
        {state.qrType !== "social" && !(platformSelected) && (
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              {showPlatformSelector ? "Or enter URL directly" : "Content"}
            </label>
            <ContentInput type={state.qrType} />
          </div>
        )}

        {/* Multi-field types always show even when platform selector is visible */}
        {!showPlatformSelector && state.qrType !== "vcard" && (
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Content
            </label>
            <ContentInput type={state.qrType} />
          </div>
        )}

        {/* vCard inputs */}
        {state.qrType === "vcard" && (
          <div className="mb-5">
            <ContentInput type="vcard" />
          </div>
        )}

        {/* Multi-field types (email, sms, whatsapp, wifi, location, event, app) */}
        {["email", "sms", "whatsapp", "wifi", "location", "event", "app"].includes(state.qrType) && (
          <div className="mb-5">
            <ContentInput type={state.qrType} />
          </div>
        )}

        {/* Empty state for social with no platform */}
        {state.qrType === "social" && !state.platform && (
          <div className="py-8 text-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl mb-5">
            ↑ Select a platform above to get started
          </div>
        )}

        <p className="text-xs text-gray-400 mb-5">
          QR updates automatically as you type
        </p>

        {/* Accordion sections */}
        <div className="space-y-2">
          {SECTIONS.map(s => (
            <Accordion
              key={s}
              title={s}
              isOpen={open === s}
              onToggle={() => handleToggle(s)}
            >
              {sectionMap[s]}
            </Accordion>
          ))}
        </div>
      </div>

      {/* ── RIGHT: preview ────────────────────────────────────── */}
      <Preview
        qr={state.qrSvg}
        loading={state.loading}
        error={state.error}
        design={design}
      />
    </div>
  )
}