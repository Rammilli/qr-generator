import { useState } from "react"
import Tabs from "../Tabs"
import Accordion from "../Accordion"
import Preview from "./Preview"
import TemplatesTab from "./tabs/TemplatesTab"
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

function VCardInput() {
  const { state, update } = useQR()
  const fields = [
    { key: "vcardName", label: "Full Name", placeholder: "Jane Smith", type: "text" },
    { key: "vcardEmail", label: "Email", placeholder: "jane@example.com", type: "email" },
    { key: "vcardPhone", label: "Phone", placeholder: "+1 234 567 8900", type: "tel" },
    { key: "vcardOrg", label: "Organization", placeholder: "Acme Corp", type: "text" },
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

function ContentInput({ type }) {
  switch (type) {
    case "vcard": return <VCardInput />
    case "phone": return <PhoneInput />
    case "email": return <EmailInput />
    case "sms": return <SmsInput />
    case "whatsapp": return <WhatsAppInput />
    case "wifi": return <WiFiInput />
    case "location": return <LocationInput />
    case "event": return <EventInput />
    case "app": return <AppDownloadInput />
    case "social": return null
    case "text": return <SingleInput placeholder="Enter your text message…" />
    case "pdf": return <SingleInput placeholder="https://example.com/file.pdf" />
    default: return <SingleInput placeholder="https://example.com" />
  }
}

export default function Builder() {
  const { state, update } = useQR()
  const [open, setOpen] = useState("Design Templates")

  const design = state
  const patchDesign = update

  const sectionMap = {
    "Design Templates": <TemplatesTab />,
    "Your Logo": <Logo design={design} patchDesign={patchDesign} />,
    "Your Colors": <Colors design={design} patchDesign={patchDesign} />,
    "Custom Frames": <Frames design={design} patchDesign={patchDesign} />,
    "Patterns": <Patterns design={design} patchDesign={patchDesign} />,
    "Background": <Background design={design} patchDesign={patchDesign} />,
    "Options": <Options design={design} patchDesign={patchDesign} />,
  }

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 overflow-y-auto max-h-[88vh]">
        <Tabs setType={(t) => update({ qrType: t, content: "", platform: null })} active={state.qrType} />

        <div className="space-y-2 mt-4">
          {SECTIONS.map(s => (
            <Accordion
              key={s}
              title={s}
              isOpen={open === s}
              onToggle={() => setOpen(prev => prev === s ? null : s)}
            >
              {sectionMap[s]}
            </Accordion>
          ))}
        </div>
      </div>

      <Preview qr={state.qrSvg} loading={state.loading} error={state.error} design={design} />
    </div>
  )
}