import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, UserCircle2 } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

const links = [
  ["/","Home"],["/about","About"],["/courses","Courses"],["/instructors","Instructors"],["/pricing","Pricing"],["/contact","Contact"]
];

export function Logo() {
  return <Link to="/" className="flex items-center gap-3">
    <div className="grid h-10 w-10 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-xs font-black text-gold-400">DW</div>
    <div><p className="font-jakarta text-xs font-extrabold tracking-[0.2em]">DRIVEWISE</p><p className="text-[9px] uppercase tracking-[0.2em] text-gold-400">Executive Academy</p></div>
  </Link>;
}

export default function PublicLayout({ children }) {
  const [open,setOpen]=useState(false);
  const {user,logout}=useAuth();
  const location=useLocation(), navigate=useNavigate();
  const goDashboard=()=>navigate(user?.role==="admin"?"/admin":"/dashboard");
  return <div className="public-site min-h-screen bg-executive-950 text-white">
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-slate-950/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo/>
        <nav className="hidden items-center gap-7 lg:flex">{links.map(([to,label])=><Link key={to} to={to} className={`text-sm transition ${location.pathname===to?"font-bold text-gold-400":"text-slate-400 hover:text-white"}`}>{label}</Link>)}</nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle compact/>
          {user ? <><button onClick={goDashboard} className="btn-secondary"><UserCircle2 size={15}/>{user.role==="admin"?"Admin":"Dashboard"}</button><button onClick={logout} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-slate-400 hover:text-white"><LogOut size={15}/> Logout</button></>
          : <><Link to="/login" className="text-xs font-semibold text-slate-400 hover:text-white">Sign in</Link><Link to="/signup" className="btn-gold text-xs">Get Started</Link></>}
        </div>
        <button onClick={()=>setOpen(true)} className="rounded-xl border border-white/10 p-2 md:hidden"><Menu size={19}/></button>
      </div>
    </header>
    {open&&<div className="fixed inset-0 z-[80] bg-slate-950 p-6 md:hidden"><div className="flex justify-between"><Logo/><button onClick={()=>setOpen(false)}><X/></button></div><nav className="mt-16 space-y-6">{links.map(([to,label])=><Link onClick={()=>setOpen(false)} key={to} to={to} className="block text-2xl font-bold">{label}</Link>)}<div className="flex gap-3 pt-4"><ThemeToggle/><Link onClick={()=>setOpen(false)} to={user?(user.role==="admin"?"/admin":"/dashboard"):"/login"} className="btn-gold">{user?(user.role==="admin"?"Admin Dashboard":"Student Dashboard"):"Sign in"}</Link></div></nav></div>}
    {children}
    <footer className="border-t border-white/5">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-2"><Logo/><p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">Premium driver education combining precision coaching, modern safety methodology and executive-level service.</p></div>
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Academy</p><div className="mt-4 space-y-3 text-sm text-slate-500">{links.slice(1,4).map(([to,l])=><Link className="block hover:text-white" key={to} to={to}>{l}</Link>)}</div></div>
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Contact</p><p className="mt-4 text-sm text-slate-500">Concierge: +1 555 018 2026</p><p className="mt-2 text-sm text-slate-500">concierge@drivewise.example</p><p className="mt-2 text-sm text-slate-500">Executive Center, Downtown</p></div>
      </div>
      <div className="border-t border-white/5 px-5 py-5 text-center text-[10px] uppercase tracking-[0.18em] text-slate-600">© 2026 DriveWise Executive Academy · Safety first, excellence always.</div>
    </footer>
  </div>;
}
