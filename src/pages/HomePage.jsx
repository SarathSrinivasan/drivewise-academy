import { Link } from "react-router-dom";
import { ArrowRight, Award, CarFront, CheckCircle2, Clock3, ShieldCheck, Star, Target, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import PublicLayout from "../components/PublicLayout";

const courses = [
  ["Performance Driving", "Advanced vehicle control, precision cornering, braking technique and confident road positioning.", "$249", "6 hours", "https://images.pexels.com/photos/6509106/pexels-photo-6509106.jpeg?auto=compress&cs=tinysrgb&w=1800"],
  ["Executive Automatic", "Smooth, composed automatic driving for city commutes, highways and executive schedules.", "$179", "5 hours", "https://images.pexels.com/photos/4692095/pexels-photo-4692095.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["Defensive Driving", "Hazard awareness, anticipation, safe following distances and better decisions in changing traffic.", "$199", "5 hours", "https://images.pexels.com/photos/30184197/pexels-photo-30184197.jpeg?auto=compress&cs=tinysrgb&w=1400"]
];

const stats = [["12+", "Years of experience"], ["24", "Certified instructors"], ["98.7%", "Reported pass rate"], ["4.9/5", "Student satisfaction"]];

export default function HomePage() {
  return <PublicLayout>
    {/* 1. Hero */}
    <section className="public-image-hero relative min-h-[720px] overflow-hidden">
      <img src="https://images.pexels.com/photos/6729273/pexels-photo-6729273.jpeg?auto=compress&cs=tinysrgb&w=1400" className="absolute inset-0 h-full w-full object-cover opacity-40" alt="Luxury driving road" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
      <div className="relative mx-auto flex min-h-[720px] max-w-[1500px] items-center px-5 py-24 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-gold-400">Elite Driver Education · Since 2012</p>
          <h1 className="font-jakarta text-5xl font-extrabold leading-[1.05] sm:text-7xl">Drive with <span className="text-gold-gradient">confidence.</span><br />Arrive with control.</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300">DriveWise Academy delivers premium, structured driver training for beginners, experienced motorists and executive clients who expect more from every mile.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link to="/book" className="btn-gold">Book a session <ArrowRight size={17} /></Link><Link to="/courses" className="btn-secondary">Explore courses</Link></div>
          <div className="mt-12 flex flex-wrap gap-8 text-xs text-slate-400"><span><b className="text-white">12+</b> years experience</span><span><b className="text-white">98.7%</b> pass rate</span><span><b className="text-white">24</b> certified instructors</span></div>
        </div>
      </div>
    </section>

    {/* 2. Trust metrics */}
    <section className="border-b border-white/5">
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-px overflow-hidden rounded-b-3xl bg-white/5 md:grid-cols-4">
        {stats.map(([value, label]) => <div key={label} className="bg-slate-950/80 px-5 py-8 text-center sm:px-8"><p className="font-jakarta text-3xl font-extrabold text-gold-400">{value}</p><p className="mt-2 text-xs uppercase tracking-wider text-slate-500">{label}</p></div>)}
      </div>
    </section>

    {/* 3. Signature programs */}
    <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Signature Programs</p><h2 className="mt-3 font-jakarta text-3xl font-extrabold sm:text-4xl">Training built around your goals.</h2><p className="mt-4 text-sm leading-7 text-slate-500">Choose a focused pathway, then refine your skills with an instructor matched to your experience, vehicle preference and schedule.</p></div><Link to="/courses" className="text-sm font-bold text-gold-400">View all courses <ArrowRight className="ml-1 inline" size={15} /></Link></div>
      <div className="grid gap-5 lg:grid-cols-3">{courses.map((c) => <motion.article whileHover={{ y: -5 }} key={c[0]} className="glass overflow-hidden rounded-2xl"><img src={c[4]} alt={c[0]} className="h-56 w-full object-cover" /><div className="p-6"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">{c[3]} · from {c[2]}</p><h3 className="mt-2 text-xl font-bold">{c[0]}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{c[1]}</p><Link to="/book" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-gold-400">Reserve this course <ArrowRight size={14} /></Link></div></motion.article>)}</div>
    </section>

    {/* 4. Fleet in Motion — automatic right-to-left showcase */}
    <section className="overflow-hidden border-y border-white/5 bg-slate-950/70 py-16">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">DriveWise Fleet</p>
        <h2 className="mt-3 font-jakarta text-3xl font-extrabold sm:text-4xl">Cars in motion. Skills in focus.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">A continuous showcase of premium vehicles and road scenes that reflect the confidence, control and variety built into DriveWise training.</p>
        <div className="relative mt-9 overflow-hidden">
          <div className="drivewise-marquee flex w-max gap-5" aria-label="DriveWise vehicle showcase">
            {[...Array(2)].flatMap((_, copy) => [
              "https://images.pexels.com/photos/6509106/pexels-photo-6509106.jpeg?auto=compress&cs=tinysrgb&w=1800",
              "https://images.pexels.com/photos/4692095/pexels-photo-4692095.jpeg?auto=compress&cs=tinysrgb&w=1400",
              "https://images.pexels.com/photos/30184197/pexels-photo-30184197.jpeg?auto=compress&cs=tinysrgb&w=1400",
              "https://images.pexels.com/photos/6729273/pexels-photo-6729273.jpeg?auto=compress&cs=tinysrgb&w=1400",
              "https://images.pexels.com/photos/18948395/pexels-photo-18948395.jpeg?auto=compress&cs=tinysrgb&w=1400",
              "https://images.pexels.com/photos/6704269/pexels-photo-6704269.jpeg?auto=compress&cs=tinysrgb&w=1400",
              "https://images.pexels.com/photos/36080268/pexels-photo-36080268.jpeg?auto=compress&cs=tinysrgb&w=1400",
              "https://images.unsplash.com/photo-1737641633900-a4b0d4d37ba1?auto=format&fit=crop&w=1600&q=85"
            ].map((src, i) => (
              <div key={`${copy}-${i}`} className="w-[78vw] shrink-0 overflow-hidden rounded-2xl sm:w-80">
                <img src={src} alt={`DriveWise vehicle ${i + 1}`} className="h-52 w-full object-cover sm:h-56" loading={copy ? "lazy" : "eager"} />
              </div>
            )))}
          </div>
        </div>
      </div>
    </section>

    {/* 4. Why us */}
    <section className="border-y border-white/5 bg-white/[0.015]"><div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-10"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">The DriveWise Difference</p><h2 className="mt-3 font-jakarta text-3xl font-extrabold sm:text-4xl">A modern standard for driver development.</h2><p className="mt-5 text-sm leading-7 text-slate-500">We combine practical road time with clear coaching, measurable milestones and premium service so students know what they are learning, why it matters and what to improve next.</p><Link to="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-gold-400">Discover our approach <ArrowRight size={15} /></Link></div><div className="grid gap-4 sm:grid-cols-2">{[[ShieldCheck,"Safety-first methodology","Defensive habits, hazard scanning and responsible road decisions."],[Award,"Certified coaches","Experienced instructors selected for expertise, patience and communication."],[Zap,"Flexible scheduling","Choose instructor, date and time around your personal schedule."],[Target,"Measurable progress","Session notes and milestones keep every lesson focused." ]].map(([I,t,d])=><div key={t} className="glass rounded-2xl p-6"><I className="text-gold-400" size={22} /><h3 className="mt-5 font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{d}</p></div>)}</div></div></div></section>

    {/* 5. Learning journey */}
    <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-10"><div className="grid gap-8 lg:grid-cols-2"><div className="glass overflow-hidden rounded-3xl"><img src="https://images.pexels.com/photos/18948395/pexels-photo-18948395.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Driver training session" className="h-full min-h-[360px] w-full object-cover" /></div><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Your Learning Journey</p><h2 className="mt-3 font-jakarta text-3xl font-extrabold">Every session has a clear purpose.</h2><div className="mt-8 space-y-6">{[["01","Assess","We identify your current skill level, goals and areas that need attention."],["02","Coach","Your instructor explains the technique, demonstrates it and gives practical feedback."],["03","Practice","You repeat the skill in realistic traffic situations with guidance when needed."],["04","Progress","Each lesson closes with a review and a clear recommendation for your next step."]].map(([n,t,d])=><div key={n} className="flex gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-xs font-bold text-gold-400">{n}</div><div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{d}</p></div></div>)}</div></div></div></section>

    {/* 6. Testimonials + CTA */}
    <section className="relative overflow-hidden border-t border-white/5"><div className="absolute inset-0 bg-gold-500/[0.03]" /><div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-10"><div className="grid gap-6 lg:grid-cols-3"><div className="glass rounded-2xl p-7"><Star className="text-gold-400" fill="currentColor" /><p className="mt-5 text-base font-semibold leading-7">“The coaching felt personal, structured and genuinely premium. I left every session knowing exactly what to improve next.”</p><p className="mt-5 text-xs text-slate-500">— Daniel, Executive Automatic graduate</p></div><div className="glass rounded-2xl p-7"><Star className="text-gold-400" fill="currentColor" /><p className="mt-5 text-base font-semibold leading-7">“I was nervous about driving again. The instructor built my confidence without rushing me and made every lesson practical.”</p><p className="mt-5 text-xs text-slate-500">— Priya, Refresher student</p></div><div className="glass rounded-2xl p-7"><CarFront className="text-gold-400" /><p className="mt-5 text-base font-semibold leading-7">Ready to build better habits?</p><p className="mt-2 text-sm leading-6 text-slate-500">Choose a course, select a preferred instructor and reserve your first session online.</p><Link to="/book" className="btn-gold mt-6">Book your first session <ArrowRight size={17} /></Link></div></div></div></section>
  </PublicLayout>;
}
