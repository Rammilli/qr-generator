import QREditor from "../editor/QREditor"
import QRPreview from "../editor/QRPreview"

export default function Hero() {
    return (
        <section id="hero" className="gradient-hero min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[85vh]">

                    {/* Left: Copy */}
                    <div className="animate-fade-in-up pt-4">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-primary/20 mb-6">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-xs font-medium text-white/70">Free forever · No registration needed</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight text-white mb-5">
                            Create <span className="gradient-text">Beautiful</span>
                            <br />QR Codes in
                            <br /><span className="gradient-text-warm">Seconds</span>
                        </h1>

                        <p className="text-lg text-white/50 mb-8 max-w-md leading-relaxed">
                            Design stunning, scannable QR codes with your logo, custom colors &amp; frames.
                            Professional quality for print &amp; digital. Download instantly.
                        </p>

                        {/* Single CTA */}
                        <a
                            href="#hero-editor"
                            className="btn-primary px-7 py-3.5 rounded-xl font-semibold text-base inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Free QR Code
                        </a>
                    </div>

                    {/* Right: QR Editor Panel */}
                    <div id="hero-editor" className="animate-fade-in delay-200">
                        <div className="glass-light rounded-2xl p-1.5 shadow-glow-lg">
                            <div className="glass rounded-xl p-4 sm:p-5">
                                {/* Panel Header */}
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <h2 className="font-display font-bold text-white text-base">QR Code Generator</h2>
                                        <p className="text-xs text-white/40 mt-0.5">Customize and download your QR code</p>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                    </div>
                                </div>

                                {/* Editor + Preview side by side */}
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                                    <div className="md:col-span-3">
                                        <QREditor />
                                    </div>
                                    <div className="md:col-span-2 flex justify-center">
                                        <QRPreview />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
