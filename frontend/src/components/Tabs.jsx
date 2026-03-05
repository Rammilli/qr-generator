import { Link, FileText, User, File } from "lucide-react"

export default function Tabs({ setType, active }) {

  const tabs = [
    { id: "link", label: "Link", icon: Link },
    { id: "text", label: "Text", icon: FileText },
    { id: "vcard", label: "VCard", icon: User },
    { id: "pdf", label: "PDF", icon: File }
  ]

  return (
    <div className="flex gap-3">

      {tabs.map((tab) => {

        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            onClick={() => setType(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
              ${active === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
              }`}
          >

            <Icon size={16}/>

            {tab.label}

          </button>
        )

      })}

    </div>
  )
}