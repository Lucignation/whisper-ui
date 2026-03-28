import { Link } from "react-router-dom";
import {
  IoFlashOutline,
  IoCheckmarkCircle,
  IoArrowForward,
  IoShieldCheckmarkOutline,
  IoPeopleOutline,
  IoRocketOutline,
  IoGlobeOutline,
  IoAnalyticsOutline,
} from "react-icons/io5";
import { BsChatSquareTextFill } from "react-icons/bs";

// ─── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: BsChatSquareTextFill,
    title: "Real-time Messaging",
    desc: "Send messages, files, and reactions instantly. Channels keep team conversations organised and searchable.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Enterprise Security",
    desc: "End-to-end encryption, SSO, audit logs, and data-residency options keep your conversations private.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: IoPeopleOutline,
    title: "Team Collaboration",
    desc: "Create channels for projects, topics, or teams. Invite guests, set permissions, and work together.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: IoRocketOutline,
    title: "Workflow Automation",
    desc: "Connect your tools and automate repetitive tasks with no-code workflow builder and 2,000+ integrations.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: IoAnalyticsOutline,
    title: "Insights & Analytics",
    desc: "Understand how your team communicates. Usage reports, engagement metrics, and custom dashboards.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: IoGlobeOutline,
    title: "Works Everywhere",
    desc: "Desktop, browser, iOS, and Android. Whisper keeps your team in sync whether in the office or remote.",
    color: "from-indigo-500 to-blue-600",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "₦0",
    period: "forever",
    desc: "Perfect for small teams getting started.",
    features: [
      "Up to 10 members",
      "90-day message history",
      "10 integrations",
      "1:1 video calls",
    ],
    cta: "Get started",
    ctaTo: "/auth/get-started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₦11,600",
    period: "per person / month",
    desc: "For growing teams that need more power.",
    features: [
      "Unlimited members",
      "Unlimited message history",
      "Unlimited integrations",
      "Group video & audio",
      "Custom workflows",
      "Priority support",
    ],
    cta: "Start free trial",
    ctaTo: "/auth/get-started",
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    desc: "Built for security-first organisations at scale.",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Data residency",
      "Advanced audit logs",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    ctaTo: "/auth/get-started",
    highlighted: false,
  },
];

const testimonials = [
  {
    quote:
      "Whisper replaced five different tools for us. Our team ships twice as fast because everything lives in one place.",
    name: "Amara Osei",
    role: "CTO, Kiosk Labs",
    initials: "AO",
  },
  {
    quote:
      "The search is lightning fast and the threads keep our channels clean. It's genuinely the best tool we use daily.",
    name: "James Calloway",
    role: "Head of Engineering, Finlink",
    initials: "JC",
  },
  {
    quote:
      "Onboarding new hires used to take days. With Whisper channels and docs pinned, they're productive in hours.",
    name: "Priya Nair",
    role: "VP People, Axiom Health",
    initials: "PN",
  },
];

const stats = [
  { value: "50K+", label: "Teams worldwide" },
  { value: "2M+", label: "Messages per day" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "4.9★", label: "Average rating" },
];

// ─── Section: Hero ─────────────────────────────────────────────────────────────

const Hero = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-32 pb-20 overflow-hidden">
    {/* Background glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#4F46E5]/8 rounded-full blur-[100px]" />
    </div>

    {/* Badge */}
    <div className="relative mb-6 flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-full px-4 py-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
      <span className="text-[13px] text-[#9B98B0]">
        Now with AI-powered search and summaries
      </span>
      <span className="text-[#7C3AED] text-[13px] font-medium flex items-center gap-1">
        Learn more <IoArrowForward size={12} />
      </span>
    </div>

    {/* Headline */}
    <h1 className="relative text-center text-[48px] md:text-[72px] font-bold leading-[1.08] tracking-tight max-w-4xl">
      <span className="text-[#E8E6F2]">Where your team</span>
      <br />
      <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#4F46E5] bg-clip-text text-transparent">
        does its best work
      </span>
    </h1>

    <p className="relative mt-6 text-center text-[18px] text-[#9B98B0] max-w-xl leading-relaxed">
      Whisper brings your team's conversations, files, and tools into one place
      — so nothing gets lost and everyone stays in sync.
    </p>

    {/* CTAs */}
    <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
      <Link
        to="/auth/get-started"
        className="flex items-center gap-2 px-7 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-2xl transition-all duration-200 shadow-xl shadow-purple-900/40 text-[15px]"
      >
        Get started free <IoArrowForward size={16} />
      </Link>
      <Link
        to="/auth/login"
        className="flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] text-[#E8E6F2] font-semibold rounded-2xl transition-all duration-200 border border-white/10 text-[15px]"
      >
        Sign in
      </Link>
    </div>

    <p className="relative mt-4 text-[13px] text-[#635E7A]">
      Free forever · No credit card required
    </p>

    {/* Mock Product UI */}
    <div className="relative mt-16 w-full max-w-5xl mx-auto">
      <div className="rounded-2xl bg-[#1C1E27] border border-white/[0.07] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#16181F]">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]/70" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]/70" />
          <span className="w-3 h-3 rounded-full bg-[#22C55E]/70" />
          <span className="ml-4 text-[12px] text-[#635E7A] flex items-center gap-1.5">
            <IoFlashOutline size={12} className="text-[#7C3AED]" />
            Whisper — Acme Inc.
          </span>
        </div>
        {/* Mock chat UI preview */}
        <div className="flex h-[340px] md:h-[420px]">
          {/* Sidebar */}
          <div className="hidden md:flex w-[220px] flex-col bg-[#191B25] border-r border-white/[0.05] p-3 gap-1">
            {["# general", "# product", "# design", "# engineering"].map(
              (ch, i) => (
                <div
                  key={ch}
                  className={`px-3 py-2 rounded-lg text-[13px] ${
                    i === 0
                      ? "bg-[#2D2157] text-[#C084FC] font-medium"
                      : "text-[#635E7A]"
                  }`}
                >
                  {ch}
                </div>
              )
            )}
            <div className="mt-3 px-3 py-1 text-[11px] text-[#4A4760] uppercase tracking-widest font-semibold">
              Direct Messages
            </div>
            {["James M", "Sophia H", "Peter F"].map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-[#635E7A]"
              >
                <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                {name}
              </div>
            ))}
          </div>
          {/* Chat area */}
          <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
            <div className="text-[#635E7A] text-[12px] text-center">Today</div>
            {[
              { name: "James", msg: "Morning! Ready for the stand-up?", self: false },
              { name: "You", msg: "Yeah! Just reviewing the API changes first.", self: true },
              { name: "James", msg: "Great. Let's sync in 5 minutes. 🚀", self: false },
              { name: "You", msg: "Perfect, I'll be there.", self: true },
            ].map(({ name, msg, self }, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${self ? "flex-row-reverse" : ""}`}
              >
                {!self && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                    {name.charAt(0)}
                  </div>
                )}
                <div
                  className={`px-3 py-2 rounded-xl text-[13px] max-w-[60%] ${
                    self
                      ? "bg-gradient-to-br from-[#4B1D96] to-[#3B1F6B] text-white"
                      : "bg-[#2A2D3E] text-[#D8D5E8]"
                  }`}
                >
                  {msg}
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            <div className="flex items-center gap-2 mt-auto">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-[9px] text-white font-bold">
                J
              </div>
              <div className="bg-[#2A2D3E] px-3 py-2 rounded-xl flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow below screenshot */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  </section>
);

// ─── Section: Stats ────────────────────────────────────────────────────────────

const Stats = () => (
  <section className="py-16 border-y border-white/[0.05]">
    <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map(({ value, label }) => (
        <div key={label} className="text-center">
          <p className="text-[36px] md:text-[42px] font-bold text-[#E8E6F2] leading-none">
            {value}
          </p>
          <p className="text-[14px] text-[#635E7A] mt-1">{label}</p>
        </div>
      ))}
    </div>
  </section>
);

// ─── Section: Features ─────────────────────────────────────────────────────────

const Features = () => (
  <section id="features" className="py-24 px-5">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block text-[13px] font-semibold text-[#7C3AED] bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-full px-4 py-1.5 mb-4 uppercase tracking-wider">
          Features
        </span>
        <h2 className="text-[36px] md:text-[48px] font-bold text-[#E8E6F2] leading-tight tracking-tight">
          Everything your team needs
        </h2>
        <p className="text-[17px] text-[#9B98B0] mt-4 max-w-2xl mx-auto leading-relaxed">
          Whisper combines messaging, file sharing, calls, and integrations into
          one elegant workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc, color }) => (
          <div
            key={title}
            className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200"
          >
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}
            >
              <Icon size={20} className="text-white" />
            </div>
            <h3 className="text-[17px] font-semibold text-[#E8E6F2] mb-2">
              {title}
            </h3>
            <p className="text-[14px] text-[#635E7A] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section: Testimonials ─────────────────────────────────────────────────────

const Testimonials = () => (
  <section className="py-24 px-5 border-y border-white/[0.05]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-[36px] md:text-[44px] font-bold text-[#E8E6F2] tracking-tight">
          Loved by teams everywhere
        </h2>
        <p className="text-[17px] text-[#9B98B0] mt-3">
          Join thousands of teams who use Whisper every day.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(({ quote, name, role, initials }) => (
          <div
            key={name}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex flex-col"
          >
            <p className="text-[15px] text-[#C4C2D4] leading-relaxed flex-1 italic">
              "{quote}"
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{initials}</span>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#E8E6F2]">{name}</p>
                <p className="text-[12px] text-[#635E7A]">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section: Pricing ──────────────────────────────────────────────────────────

const Pricing = () => (
  <section id="pricing" className="py-24 px-5">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block text-[13px] font-semibold text-[#7C3AED] bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-full px-4 py-1.5 mb-4 uppercase tracking-wider">
          Pricing
        </span>
        <h2 className="text-[36px] md:text-[48px] font-bold text-[#E8E6F2] tracking-tight">
          Simple, transparent pricing
        </h2>
        <p className="text-[17px] text-[#9B98B0] mt-4">
          Start free. Upgrade when you need more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {pricingPlans.map(
          ({ name, price, period, desc, features, cta, ctaTo, highlighted, badge }) => (
            <div
              key={name}
              className={`rounded-2xl p-6 flex flex-col relative ${
                highlighted
                  ? "bg-[#2D1F52] border-2 border-[#7C3AED] shadow-xl shadow-purple-900/30"
                  : "bg-white/[0.03] border border-white/[0.07]"
              }`}
            >
              {badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
                  {badge}
                </span>
              )}
              <p
                className={`text-[15px] font-semibold mb-1 ${
                  highlighted ? "text-[#C084FC]" : "text-[#9B98B0]"
                }`}
              >
                {name}
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[40px] font-bold text-[#E8E6F2]">
                  {price}
                </span>
                {price !== "Custom" && (
                  <span className="text-[13px] text-[#635E7A]">{period}</span>
                )}
              </div>
              <p className="text-[14px] text-[#635E7A] mb-6">{desc}</p>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-[#C4C2D4]">
                    <IoCheckmarkCircle
                      size={16}
                      className={highlighted ? "text-[#A78BFA]" : "text-[#635E7A]"}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={ctaTo}
                className={`text-center py-3 rounded-xl font-semibold text-[14px] transition-all duration-200 ${
                  highlighted
                    ? "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg shadow-purple-900/30"
                    : "bg-white/[0.06] hover:bg-white/[0.1] text-[#E8E6F2] border border-white/[0.1]"
                }`}
              >
                {cta}
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  </section>
);

// ─── Section: CTA ──────────────────────────────────────────────────────────────

const CTA = () => (
  <section className="py-24 px-5">
    <div className="max-w-3xl mx-auto text-center relative">
      {/* Glow */}
      <div className="absolute inset-0 bg-[#7C3AED]/10 rounded-3xl blur-3xl pointer-events-none" />

      <div className="relative bg-gradient-to-b from-[#1C1E27] to-[#1A1421] border border-white/[0.08] rounded-3xl p-12">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-900/40">
          <IoFlashOutline size={24} className="text-white" />
        </div>
        <h2 className="text-[36px] md:text-[44px] font-bold text-[#E8E6F2] tracking-tight mb-4">
          Ready to transform how your team works?
        </h2>
        <p className="text-[17px] text-[#9B98B0] mb-8 leading-relaxed">
          Join 50,000+ teams already using Whisper. Set up your workspace in
          under 2 minutes — no credit card needed.
        </p>
        <Link
          to="/auth/get-started"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-2xl transition-all duration-200 shadow-xl shadow-purple-900/40 text-[16px]"
        >
          Start for free <IoArrowForward size={18} />
        </Link>
        <p className="mt-4 text-[13px] text-[#635E7A]">
          Free plan · No credit card · Up and running in minutes
        </p>
      </div>
    </div>
  </section>
);

// ─── Footer ────────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="border-t border-white/[0.05] py-12 px-5">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
        {/* Brand */}
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center">
              <IoFlashOutline size={14} className="text-white" />
            </div>
            <span className="text-[#E8E6F2] font-bold">Whisper</span>
          </div>
          <p className="text-[13px] text-[#635E7A] leading-relaxed">
            The modern collaboration platform for high-performing teams.
          </p>
        </div>

        {/* Links */}
        {[
          {
            heading: "Product",
            links: ["Features", "Pricing", "Changelog", "Roadmap"],
          },
          {
            heading: "Company",
            links: ["About", "Blog", "Careers", "Press"],
          },
          {
            heading: "Legal",
            links: ["Privacy", "Terms", "Security", "Cookies"],
          },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <p className="text-[12px] font-semibold text-[#635E7A] uppercase tracking-wider mb-3">
              {heading}
            </p>
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[14px] text-[#9B98B0] hover:text-[#E8E6F2] transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-[#635E7A]">
          © 2025 Whisper Technologies, Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {["Twitter", "GitHub", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-[13px] text-[#635E7A] hover:text-[#9B98B0] transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0D0E14] text-[#E8E6F2]">
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
