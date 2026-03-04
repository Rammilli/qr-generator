import { useRef } from "react"
import { createRoot } from "react-dom/client"
import { flushSync } from "react-dom"
import { useQR } from "../../../QRContext"
import { RiUploadCloudLine, RiDeleteBin6Line, RiCloseLine } from "react-icons/ri"
import {
    SiWhatsapp, SiInstagram, SiFacebook, SiBluesky, SiMastodon,
    SiOpenai, SiTiktok, SiGooglemaps, SiPinterest, SiSnapchat, SiGoogle, SiTwitch,
    SiTumblr, SiYelp, SiReddit, SiSlack, SiYoutube, SiVimeo,
    SiMessenger, SiWechat, SiTelegram, SiZoom, SiGoogleplay, SiApple,
    SiAndroid, SiShopify, SiSpotify, SiGithub, SiX, SiDiscord, SiFlickr,
    SiLine, SiVk, SiThreads,
} from "react-icons/si"

// Brand icon presets — same structure as the reference image
const BRANDS = [
    { id: "whatsapp", Icon: SiWhatsapp, color: "#25D366", name: "WhatsApp" },
    { id: "instagram", Icon: SiInstagram, color: "#E4405F", name: "Instagram" },
    { id: "facebook", Icon: SiFacebook, color: "#1877F2", name: "Facebook" },
    { id: "messenger", Icon: SiMessenger, color: "#0084FF", name: "Messenger" },
    { id: "bluesky", Icon: SiBluesky, color: "#0085FF", name: "Bluesky" },
    { id: "threads", Icon: SiThreads, color: "#000000", name: "Threads" },
    { id: "x", Icon: SiX, color: "#000000", name: "X / Twitter" },
    { id: "mastodon", Icon: SiMastodon, color: "#6364FF", name: "Mastodon" },
    { id: "discord", Icon: SiDiscord, color: "#5865F2", name: "Discord" },
    { id: "openai", Icon: SiOpenai, color: "#000000", name: "ChatGPT" },
    { id: "tiktok", Icon: SiTiktok, color: "#000000", name: "TikTok" },
    { id: "youtube", Icon: SiYoutube, color: "#FF0000", name: "YouTube" },
    { id: "twitch", Icon: SiTwitch, color: "#9146FF", name: "Twitch" },
    { id: "spotify", Icon: SiSpotify, color: "#1DB954", name: "Spotify" },
    { id: "googlemaps", Icon: SiGooglemaps, color: "#4285F4", name: "Google Maps" },
    { id: "google", Icon: SiGoogle, color: "#4285F4", name: "Google" },
    { id: "googleplay", Icon: SiGoogleplay, color: "#01875F", name: "Google Play" },
    { id: "pinterest", Icon: SiPinterest, color: "#BD081C", name: "Pinterest" },
    { id: "snapchat", Icon: SiSnapchat, color: "#FFFC00", name: "Snapchat" },
    { id: "reddit", Icon: SiReddit, color: "#FF4500", name: "Reddit" },
    { id: "slack", Icon: SiSlack, color: "#4A154B", name: "Slack" },
    { id: "telegram", Icon: SiTelegram, color: "#26A5E4", name: "Telegram" },
    { id: "wechat", Icon: SiWechat, color: "#07C160", name: "WeChat" },
    { id: "line", Icon: SiLine, color: "#00C300", name: "LINE" },
    { id: "vk", Icon: SiVk, color: "#0077FF", name: "VK" },
    { id: "zoom", Icon: SiZoom, color: "#2D8CFF", name: "Zoom" },
    { id: "github", Icon: SiGithub, color: "#181717", name: "GitHub" },
    { id: "shopify", Icon: SiShopify, color: "#96BF48", name: "Shopify" },
    { id: "apple", Icon: SiApple, color: "#000000", name: "Apple" },
    { id: "android", Icon: SiAndroid, color: "#3DDC84", name: "Android" },
    { id: "flickr", Icon: SiFlickr, color: "#FF0084", name: "Flickr" },
    { id: "tumblr", Icon: SiTumblr, color: "#35465C", name: "Tumblr" },
    { id: "yelp", Icon: SiYelp, color: "#D32323", name: "Yelp" },
    { id: "vimeo", Icon: SiVimeo, color: "#1AB7EA", name: "Vimeo" },
]

/** Convert a react-icons component to a base64 SVG data URL */
function iconToDataUrl(IconComp, color) {
    const div = document.createElement("div")
    div.style.position = "absolute"
    div.style.left = "-9999px"
    document.body.appendChild(div)

    const root = createRoot(div)

    flushSync(() => {
        root.render(<IconComp size={128} color={color} />)
    })

    const svgEl = div.querySelector("svg")
    let dataUrl = null

    if (svgEl) {
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        svgEl.setAttribute("width", "128")
        svgEl.setAttribute("height", "128")
        const svgStr = svgEl.outerHTML
        dataUrl = `data:image/svg+xml;base64,${btoa(svgStr)}`
    }

    root.unmount()
    document.body.removeChild(div)
    return dataUrl
}

export default function LogoTab() {
    const { state, update } = useQR()
    const inputRef = useRef()

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => update({ logo: ev.target.result })
        reader.readAsDataURL(file)
    }

    const handleBrandSelect = (brand) => {
        const url = iconToDataUrl(brand.Icon, brand.color)
        if (url) update({ logo: url })
    }

    return (
        <div className="space-y-4">
            {/* Upload + preview row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Upload area */}
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="h-20 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                >
                    <RiUploadCloudLine className="text-xl text-white/30" />
                    <span className="text-[11px] text-white/35">Upload your own logo</span>
                    <span className="text-[10px] text-white/20">JPG, PNG or SVG</span>
                </button>

                {/* Current logo preview */}
                {state.logo ? (
                    <div className="h-20 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 px-3">
                        <img
                            src={state.logo}
                            alt="Logo"
                            className="w-12 h-12 object-contain rounded-lg"
                            style={{ borderRadius: `${state.logoBorderRadius}px` }}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-white/50 truncate">Logo set</p>
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="text-[11px] text-primary hover:underline"
                            >
                                Change
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => update({ logo: null })}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex-shrink-0"
                        >
                            <RiDeleteBin6Line size={14} />
                        </button>
                    </div>
                ) : (
                    <div className="h-20 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center">
                        <span className="text-[11px] text-white/20">No logo selected</span>
                    </div>
                )}
            </div>

            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

            {/* Logo size & radius sliders */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="flex justify-between mb-1.5">
                        <label className="text-[11px] text-white/40 uppercase tracking-wider">Size</label>
                        <span className="text-[11px] text-white/50 font-mono">{state.logoSize}%</span>
                    </div>
                    <input type="range" min="10" max="40" value={state.logoSize} onChange={e => update({ logoSize: Number(e.target.value) })} />
                </div>
                <div>
                    <div className="flex justify-between mb-1.5">
                        <label className="text-[11px] text-white/40 uppercase tracking-wider">Radius</label>
                        <span className="text-[11px] text-white/50 font-mono">{state.logoBorderRadius}px</span>
                    </div>
                    <input type="range" min="0" max="50" value={state.logoBorderRadius} onChange={e => update({ logoBorderRadius: Number(e.target.value) })} />
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[11px] text-white/25 uppercase tracking-widest">or choose a brand</span>
                <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Brand icons grid */}
            <div className="flex flex-wrap gap-2">
                {/* No logo option */}
                <button
                    type="button"
                    title="No logo"
                    onClick={() => update({ logo: null })}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${!state.logo
                        ? "border-primary bg-primary/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                        }`}
                >
                    <RiCloseLine className={`text-base ${!state.logo ? "text-primary" : "text-white/30"}`} />
                </button>

                {BRANDS.map((brand) => {
                    const isActive = state.logo && state.logo.includes(btoa(brand.id).slice(0, 4))
                    return (
                        <button
                            key={brand.id}
                            type="button"
                            title={brand.name}
                            onClick={() => handleBrandSelect(brand)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/8 transition-all hover:scale-110"
                            style={{ backgroundColor: `${brand.color}18` }}
                        >
                            <brand.Icon size={20} color={brand.color} />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
