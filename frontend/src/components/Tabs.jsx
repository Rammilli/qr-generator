import {
  Link, FileText, User, File, Phone, Mail,
  MessageSquare, MessageCircle, Wifi, MapPin,
  Calendar, Smartphone, Share2
} from "lucide-react"

const ICON_MAP = {
  Link, FileText, User, File, Phone, Mail,
  MessageSquare, MessageCircle, Wifi, MapPin,
  Calendar, Smartphone, Share2
}

const TABS = [
  { id: "link",      label: "Link",      icon: "Link" },
  { id: "text",      label: "Text",      icon: "FileText" },
  { id: "vcard",     label: "vCard",     icon: "User" },
  { id: "pdf",       label: "PDF",       icon: "File" },
  { id: "phone",     label: "Phone",     icon: "Phone" },
  { id: "email",     label: "Email",     icon: "Mail" },
  { id: "sms",       label: "SMS",       icon: "MessageSquare" },
  { id: "whatsapp",  label: "WhatsApp",  icon: "MessageCircle" },
  { id: "wifi",      label: "WiFi",      icon: "Wifi" },
  { id: "location",  label: "Location",  icon: "MapPin" },
  { id: "event",     label: "Event",     icon: "Calendar" },
  { id: "app",       label: "App",       icon: "Smartphone" },
  { id: "social",    label: "Social",    icon: "Share2" },
]

export default function Tabs({ setType, active }) {
  return (
    <div className="relative">
      <div
        className="flex gap-1.5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {TABS.map((tab) => {
          const Icon = ICON_MAP[tab.icon]
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setType(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0
                ${isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          )
        })}
      </div>
      {/* Fade hint for scroll */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}