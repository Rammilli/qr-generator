import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"
import { API_URL } from "./config"
import { getPlatform, platformLogoDataUri } from "./data/platforms"

const QRContext = createContext(null)

export const QR_TYPES = [
    { id: "link",     label: "Link",     icon: "🔗", placeholder: "https://example.com" },
    { id: "text",     label: "Text",     icon: "📝", placeholder: "Enter your text here" },
    { id: "vcard",    label: "vCard",    icon: "👤", placeholder: "Full Name" },
    { id: "pdf",      label: "PDF",      icon: "📄", placeholder: "https://example.com/file.pdf" },
    { id: "phone",    label: "Phone",    icon: "📞", placeholder: "+1 234 567 8900" },
    { id: "email",    label: "Email",    icon: "✉️",  placeholder: "email@example.com" },
    { id: "sms",      label: "SMS",      icon: "💬", placeholder: "+1 234 567 8900" },
    { id: "whatsapp", label: "WhatsApp", icon: "💚", placeholder: "+1 234 567 8900" },
    { id: "wifi",     label: "WiFi",     icon: "📶", placeholder: "Network name" },
    { id: "location", label: "Location", icon: "📍", placeholder: "40.7128" },
    { id: "event",    label: "Event",    icon: "📅", placeholder: "Event title" },
    { id: "app",      label: "App",      icon: "📱", placeholder: "App Store URL" },
    { id: "social",   label: "Social",   icon: "🌐", placeholder: "Select platform" },
]

const DEFAULT_STATE = {
    // content
    qrType: "link",
    content: "",
    platform: null,
    // vcard
    vcardName: "", vcardEmail: "", vcardPhone: "", vcardOrg: "",
    // email
    emailSubject: "", emailBody: "",
    // sms
    smsPhone: "", smsMessage: "",
    // whatsapp
    waPhone: "", waMessage: "",
    // wifi
    wifiSSID: "", wifiPassword: "", wifiEncryption: "WPA",
    // location
    lat: "", lng: "",
    // event
    eventTitle: "", eventLocation: "", eventDate: "", eventTime: "",
    // app
    iosLink: "", androidLink: "",
    // design
    fgColor: "#000000",
    bgColor: "#ffffff",
    gradient: false,
    gradientColor: "#6366f1",
    gradientDirection: "horizontal",
    pattern: "squares",
    logo: null,
    logoSize: 25,
    logoBorderRadius: 8,
    frame: null,
    frameLabel: "SCAN ME",
    frameLabelFont: "Arial",
    frameLabelSize: 100,
    frameLabelColor: "#000000",
    frameColor: null,
    bgImage: null,
    errorCorrection: "H",
    quietZone: 4,
    outputFormat: "PNG",
    qrSize: 300,
    // result
    qrSvg: "",
    loading: false,
    error: "",
}

export function QRProvider({ children }) {
    const [state, setState] = useState(DEFAULT_STATE)
    const stateRef = useRef(state)
    stateRef.current = state
    const debounceRef = useRef(null)

    const update = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }))
    }, [])

    // ── Build QR data string from current state ──────────────────────────────
    const buildData = (s) => {
        switch (s.qrType) {
            case "vcard":
                return `BEGIN:VCARD\nVERSION:3.0\nFN:${s.vcardName}\nEMAIL:${s.vcardEmail}\nTEL:${s.vcardPhone}\nORG:${s.vcardOrg}\nEND:VCARD`
            case "email": {
                const params = []
                if (s.emailSubject) params.push(`subject=${encodeURIComponent(s.emailSubject)}`)
                if (s.emailBody)    params.push(`body=${encodeURIComponent(s.emailBody)}`)
                return `mailto:${s.content}${params.length ? "?" + params.join("&") : ""}`
            }
            case "phone":
                return `tel:${s.content.replace(/\s/g, "")}`
            case "sms":
                return `SMSTO:${s.smsPhone.replace(/\s/g, "")}:${s.smsMessage}`
            case "whatsapp":
                return `https://wa.me/${s.waPhone.replace(/\D/g, "")}${s.waMessage ? `?text=${encodeURIComponent(s.waMessage)}` : ""}`
            case "wifi":
                return `WIFI:T:${s.wifiEncryption};S:${s.wifiSSID};P:${s.wifiPassword};;`
            case "location":
                return `https://maps.google.com/?q=${s.lat},${s.lng}`
            case "event": {
                const dtStart = s.eventDate && s.eventTime
                    ? s.eventDate.replace(/-/g, "") + "T" + s.eventTime.replace(/:/g, "") + "00"
                    : ""
                return [
                    "BEGIN:VEVENT",
                    `SUMMARY:${s.eventTitle}`,
                    `LOCATION:${s.eventLocation}`,
                    dtStart ? `DTSTART:${dtStart}` : "",
                    "END:VEVENT",
                ].filter(Boolean).join("\n")
            }
            case "app":
                // Encode both links; scanning device picks the right one via a landing page concept
                // For QR purposes we use a universal approach: link both in the QR data
                return s.iosLink || s.androidLink
                    ? `https://apps.apple.com | ${s.iosLink}\nhttps://play.google.com | ${s.androidLink}`
                    : s.content
            case "social":
                return s.content // pre-filled by platform selector
            default:
                return s.content.trim()
        }
    }

    const hasContent = (s) => {
        switch (s.qrType) {
            case "vcard":     return Boolean(s.vcardName.trim())
            case "sms":       return Boolean(s.smsPhone.trim())
            case "whatsapp":  return Boolean(s.waPhone.trim())
            case "wifi":      return Boolean(s.wifiSSID.trim())
            case "location":  return Boolean(s.lat.trim() && s.lng.trim())
            case "event":     return Boolean(s.eventTitle.trim())
            case "app":       return Boolean(s.iosLink.trim() || s.androidLink.trim())
            default:          return Boolean(s.content.trim())
        }
    }

    // ── Core generate ────────────────────────────────────────────────────────
    const generateQR = useCallback(async () => {
        const s = stateRef.current
        if (!hasContent(s)) return

        setState(prev => ({ ...prev, loading: true, error: "" }))

        try {
            const data = buildData(s)

            const payload = {
                data,
                type: s.qrType,
                fill_color: s.fgColor,
                back_color: s.bgColor,
                gradient_color: s.gradient ? s.gradientColor : null,
                gradient_direction: s.gradientDirection || "horizontal",
                logo: s.logo || null,
                logo_size: s.logoSize,
                frame: s.frame || null,
                frame_label: s.frameLabel || "SCAN ME",
                frame_label_font: s.frameLabelFont || "Arial",
                frame_label_color: s.frameLabelColor || "#000000",
                frame_color: s.frameColor || null,
                qr_size: s.qrSize,
                pattern: s.pattern || "squares",
                eye_frame: s.eyeFrame || "square",
                error_correction: s.errorCorrection || "H",
                quiet_zone: s.quietZone !== undefined ? s.quietZone : 4,
            }
            const res = await fetch(`${API_URL}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const msg = await res.text()
                throw new Error(msg || `Server error ${res.status}`)
            }

            const svg = await res.text()
            if (!svg || svg.length < 50) throw new Error("Empty or invalid SVG returned from backend")

            setState(prev => ({ ...prev, qrSvg: svg, loading: false, error: "" }))
        } catch (err) {
            setState(prev => ({ ...prev, error: err.message || "Network error", loading: false }))
        }
    }, []) // intentionally empty — reads from stateRef

    // ── Auto-regen on any state change ───────────────────────────────────────
    useEffect(() => {
        const s = stateRef.current
        if (!hasContent(s)) return

        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(generateQR, 450)

        return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    }, [
        state.content, state.qrType, state.platform,
        state.vcardName, state.vcardEmail, state.vcardPhone, state.vcardOrg,
        state.emailSubject, state.emailBody,
        state.smsPhone, state.smsMessage,
        state.waPhone, state.waMessage,
        state.wifiSSID, state.wifiPassword, state.wifiEncryption,
        state.lat, state.lng,
        state.eventTitle, state.eventLocation, state.eventDate, state.eventTime,
        state.iosLink, state.androidLink,
        state.fgColor, state.bgColor, state.gradient, state.gradientColor, state.gradientDirection,
        state.pattern, state.logo, state.logoSize,
        state.frame, state.frameLabel, state.frameLabelFont, state.frameLabelColor, state.frameColor,
        state.errorCorrection, state.quietZone, state.qrSize,
        generateQR
    ])

    // ── Apply a template preset ──────────────────────────────────────────────
    const applyTemplate = useCallback((tpl) => {
        update({
            fgColor: tpl.fgColor || "#000000",
            bgColor: tpl.bgColor || "#ffffff",
            pattern: tpl.pattern || "squares",
            frame: tpl.frame ?? null,
            frameLabel: tpl.label || tpl.frameLabel || "SCAN ME",
            frameLabelColor: tpl.frameLabelColor || "#000000",
            gradient: Boolean(tpl.gradientColor),
            gradientColor: tpl.gradientColor || "#6366f1",
            gradientDirection: tpl.gradientDirection || "horizontal",
            frameColor: tpl.frameColor || null,
        })
    }, [update])

    // ── Apply a social platform ──────────────────────────────────────────────
    const applyPlatform = useCallback((platformId) => {
        if (!platformId) {
            update({
                platform: null,
                logo: null,
                frameLabel: "SCAN ME",
                frameLabelColor: "#000000",
                fgColor: "#000000",
                bgColor: "#ffffff",
                gradient: false,
                gradientColor: "#6366f1",
                pattern: "squares",
                frame: null,
                frameColor: null,
                content: "",
            })
            return
        }
        const p = getPlatform(platformId)
        if (!p) return

        const logo = platformLogoDataUri(p)
        update({
            platform: platformId,
            logo,
            frameLabel: p.frameLabel,
            content: p.urlTemplate,
            ...p.templatePreset,
        })
    }, [update])

    // ── Download ─────────────────────────────────────────────────────────────
    const downloadQR = useCallback((format = "svg") => {
        const { qrSvg, qrSize } = stateRef.current
        if (!qrSvg) return

        if (format === "svg") {
            const blob = new Blob([qrSvg], { type: "image/svg+xml" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url; a.download = "qrcode.svg"; a.click()
            URL.revokeObjectURL(url)
        } else {
            const svgBlob = new Blob([qrSvg], { type: "image/svg+xml;charset=utf-8" })
            const url = URL.createObjectURL(svgBlob)
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement("canvas")
                canvas.width = qrSize + 60
                canvas.height = qrSize + 60
                canvas.getContext("2d").drawImage(img, 0, 0)
                URL.revokeObjectURL(url)
                const a = document.createElement("a")
                a.href = canvas.toDataURL("image/png")
                a.download = "qrcode.png"; a.click()
            }
            img.src = url
        }
    }, [])

    return (
        <QRContext.Provider value={{ state, update, generateQR, applyTemplate, applyPlatform, downloadQR }}>
            {children}
        </QRContext.Provider>
    )
}

export function useQR() {
    const ctx = useContext(QRContext)
    if (!ctx) throw new Error("useQR must be used within QRProvider")
    return ctx
}
