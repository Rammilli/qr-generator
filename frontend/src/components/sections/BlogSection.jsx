const POSTS = [
    {
        tag: "Guide",
        title: "How to Create a QR Code for Your Restaurant Menu",
        desc: "Step-by-step guide to creating contactless menus that update in real-time. Perfect for modern dining experiences.",
        readTime: "5 min read",
        date: "Mar 2, 2025",
        gradient: "from-orange-500/20 to-yellow-500/5",
        icon: "🍽️",
    },
    {
        tag: "Tutorial",
        title: "10 Creative Ways to Use QR Codes in Marketing",
        desc: "Go beyond basic links. Discover how brands are using customized QR codes to boost engagement and conversions.",
        readTime: "8 min read",
        date: "Feb 28, 2025",
        gradient: "from-blue-500/20 to-violet-500/5",
        icon: "📢",
    },
    {
        tag: "Tips",
        title: "The Ultimate Guide to QR Code Design",
        desc: "Learn how to create QR codes that are beautiful AND scannable. Color contrast, logo sizing, pattern tips and more.",
        readTime: "6 min read",
        date: "Feb 20, 2025",
        gradient: "from-pink-500/20 to-rose-500/5",
        icon: "🎨",
    },
]

export default function BlogSection() {
    return (
        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <div>
                        <div className="inline-block px-4 py-1.5 rounded-full glass-light border border-white/10 text-xs text-white/50 uppercase tracking-widest mb-3">
                            Blog & Guides
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white">
                            Learn & <span className="gradient-text">Get Inspired</span>
                        </h2>
                    </div>
                    <button type="button" className="btn-secondary px-5 py-2 rounded-lg text-sm font-medium flex-shrink-0">
                        View All Posts →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {POSTS.map((post) => (
                        <article
                            key={post.title}
                            className="card-lift glass rounded-2xl overflow-hidden border border-white/5 hover:border-primary/20 cursor-pointer group"
                        >
                            {/* Cover */}
                            <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                                <span className="text-5xl">{post.icon}</span>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary">
                                        {post.tag}
                                    </span>
                                    <span className="text-[11px] text-white/30">{post.date}</span>
                                </div>
                                <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-primary transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-white/40 text-xs leading-relaxed mb-4">{post.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] text-white/25">{post.readTime}</span>
                                    <span className="text-xs text-primary group-hover:underline">Read more →</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
