import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Linkedin, Mail, Phone, MapPin, Building2, Target, Award, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ----------
// Co‑Founder Profile Data (edit as needed)
// ----------
const profile = {
  name: "Kari Rama Krishna",
  title: "Co‑Founder & COO",
  company: "Post My Property",
  location: "Hyderabad, India",
  summary:
    "Driving operational excellence at Post My Property — aligning product, growth, and customer success to ship value faster and scale reliably.",
  avatar:
    "https://images.unsplash.com/photo-1603415526960-f7e0328d13a2?q=80&w=800&auto=format&fit=crop", // replace with real headshot
  contacts: {
    email: "coo@postmyproperty.com",
    phone: "+91 90000 00000",
    linkedin: "https://www.linkedin.com/in/your-handle/",
  },
  highlights: [
    {
      label: "Experience",
      value: "1.8+ years in Electronics; transitioned to ops leadership",
      icon: Award,
    },
    { label: "Expertise", value: "Business management, process design, GTM ops", icon: Target },
    { label: "Focus", value: "Lean ops, data-driven decisioning, eNPS-first culture", icon: Rocket },
  ],
  narrative:
    "At Post My Property, I translate strategy into execution — from sprint cadence and lifecycle governance to vendor SLAs and CSAT. I build cross‑functional rhythm (product × sales × support) so we learn faster than we ship, and ship faster than the market expects.",
  metrics: [
    { kpi: "Listing Activation Time", value: "↓ 38%", note: "from signup to first live post" },
    { kpi: "Support CSAT", value: "↑ 12pts", note: "quarter over quarter" },
    { kpi: "Ops Cost / Listing", value: "↓ 24%", note: "through automation & SOPs" },
    { kpi: "On‑time Releases", value: "96%", note: "last 2 quarters" },
  ],
  timeline: [
    {
      period: "2025 — Present",
      role: "Co‑Founder & COO",
      org: "Post My Property",
      bullets: [
        "Established OKR cadence; aligned product and growth around North‑Star metrics (activation, retention, NPS)",
        "Deployed SOPs across onboarding, KYC, and listing QA; improved time‑to‑value and reduced rework",
        "Built incident response and release hygiene; moved to 2‑week release trains with change approval boards",
      ],
    },
    {
      period: "2023 — 2025",
      role: "Operations & Business Management",
      org: "Electronics domain",
      bullets: [
        "Scaled vendor relations and procurement with data‑backed forecasting",
        "Introduced quality gates and root cause analysis (5‑Why, Fishbone)",
      ],
    },
  ],
  values: [
    "Customer‑first clarity",
    "Psychological safety",
    "Lean experimentation",
    "Measure what matters",
  ],
};

// ----------
// Utility Components
// ----------
const FadeIn: React.FC<React.PropsWithChildren<{ delay?: number }>> = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

// ----------
// Page Component
// ----------
export default function CoFounderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <Head>
        <title>{`${profile.name} — ${profile.title} | ${profile.company}`}</title>
        <meta name="description" content={`${profile.name}, ${profile.title} at ${profile.company}. ${profile.summary}`} />
        <meta property="og:title" content={`${profile.name} — ${profile.title}`} />
        <meta property="og:description" content={profile.summary} />
        <meta property="og:type" content="profile" />
      </Head>

      {/* Header */}
      <header className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-20 w-20 rounded-2xl object-cover shadow"
            />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
              <p className="mt-1 text-sm text-slate-600">
                {profile.title} · {profile.company}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" /> {profile.location}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild className="rounded-2xl">
              <a href={`mailto:${profile.contacts.email}`}><Mail className="mr-2 h-4 w-4" /> Email</a>
            </Button>
            <Button asChild variant="secondary" className="rounded-2xl">
              <a href={`tel:${profile.contacts.phone}`}><Phone className="mr-2 h-4 w-4" /> Call</a>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <a href={profile.contacts.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Summary */}
      <main className="mx-auto max-w-6xl px-4 pb-20">
        <FadeIn>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <p className="text-lg leading-relaxed text-slate-700 md:max-w-3xl">{profile.summary}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:w-[40%]">
                  {profile.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-3">
                      <h.icon className="mt-0.5 h-5 w-5" />
                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-500">{h.label}</div>
                        <div className="text-sm font-medium">{h.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Strategic Narrative */}
        <FadeIn delay={0.1}>
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-semibold">How I Operate</h2>
            <p className="max-w-3xl text-slate-700">
              {profile.narrative}
            </p>
          </section>
        </FadeIn>

        {/* Metrics */}
        <FadeIn delay={0.15}>
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">Impact Metrics</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {profile.metrics.map((m, i) => (
                <Card key={i} className="rounded-2xl border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <div className="text-sm text-slate-500">{m.kpi}</div>
                    <div className="mt-1 text-2xl font-semibold">{m.value}</div>
                    <div className="mt-1 text-xs text-slate-500">{m.note}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Experience Timeline */}
        <FadeIn delay={0.2}>
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">Experience</h2>
            <div className="space-y-4">
              {profile.timeline.map((t, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Building2 className="h-4 w-4" />
                      <span className="font-medium">{t.org}</span>
                      <span>•</span>
                      <span>{t.role}</span>
                    </div>
                    <div className="text-xs text-slate-500">{t.period}</div>
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {t.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Values */}
        <FadeIn delay={0.25}>
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">Operating Principles</h2>
            <div className="flex flex-wrap gap-2">
              {profile.values.map((v, i) => (
                <span key={i} className="rounded-full border border-slate-200 px-3 py-1 text-sm">
                  {v}
                </span>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <section className="mt-14 flex flex-col items-center rounded-3xl border border-slate-200 p-8 text-center">
            <h3 className="text-lg font-semibold">Let’s build the smartest real‑estate platform together</h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Whether you’re a founder, partner, or candidate who cares about speed, quality, and customers —
              reach out. I’m always open to conversations that move the mission forward.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button asChild className="rounded-2xl">
                <a href={`mailto:${profile.contacts.email}`}><Mail className="mr-2 h-4 w-4" /> Contact</a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl">
                <a href={profile.contacts.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> Connect
                </a>
              </Button>
            </div>
          </section>
        </FadeIn>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {profile.company}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
