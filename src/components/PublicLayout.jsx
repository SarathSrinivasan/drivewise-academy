import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, UserCircle2, ChevronDown, LayoutDashboard, UserPlus, LogIn, Home, BriefcaseBusiness, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import DirectionToggle from "./DirectionToggle";
import { useAuth } from "../context/AuthContext";

const links = [
  ["/", "Home"], ["/home2", "Home 2"], ["/about", "About"], ["/courses", "Courses"],
  ["/services", "Services"], ["/instructors", "Instructors"], ["/pricing", "Pricing"], ["/blog", "Blog"], ["/contact", "Contact"]
];

export function Logo() {
  return <Link to="/" className="flex items-center gap-3" aria-label="DriveWise Academy Home">
    <div className="grid h-10 w-10 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-xs font-black text-gold-400">DW</div>
    <div><p className="font-jakarta text-xs font-extrabold tracking-[0.2em]">DRIVEWISE</p><p className="text-[9px] uppercase tracking-[0.2em] text-gold-400">Executive Academy</p></div>
  </Link>;
}

function ProfileMenu({ user, logout, goDashboard }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return <div className="relative" ref={ref}>
    <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Open account menu" title="Account menu" className="profile-menu-trigger">
      <UserCircle2 size={20}/><ChevronDown size={13} className={open ? "rotate-180 transition" : "transition"}/>
    </button>
    {open && <div className="profile-dropdown">
      <div className="profile-dropdown-head"><UserCircle2 size={19}/><div><p className="text-sm font-bold">{user?.name || "DriveWise Account"}</p><p className="text-[10px] uppercase tracking-wider text-gold-400">{user ? user.role : "Guest"}</p></div></div>
      <div className="my-2 border-t border-white/10"/>
      <button onClick={() => { goDashboard("admin"); setOpen(false); }} className="profile-dropdown-item"><LayoutDashboard size={16}/> Admin Dashboard</button>
      <button onClick={() => { goDashboard("user"); setOpen(false); }} className="profile-dropdown-item"><UserCircle2 size={16}/> Student Dashboard</button>
      <Link to="/signup" onClick={() => setOpen(false)} className="profile-dropdown-item"><UserPlus size={16}/> Sign Up</Link>
      <Link to="/login" onClick={() => setOpen(false)} className="profile-dropdown-item"><LogIn size={16}/> Sign In</Link>
      {user && <><div className="my-2 border-t border-white/10"/><button onClick={() => { logout(); setOpen(false); }} className="profile-dropdown-item text-rose-400"><LogOut size={16}/> Logout</button></>}
    </div>}
  </div>;
}

export default function PublicLayout({ children }) {
  const [open,setOpen]=useState(false);
  const {user,logout}=useAuth();
  const location=useLocation(), navigate=useNavigate();
  const goDashboard=(role)=>navigate(role==="admin"?"/admin":"/dashboard");
  return <div className="public-site min-h-screen bg-executive-950 text-white">
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-slate-950/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo/>
        <nav className="hidden items-center gap-6 xl:flex">{links.map(([to,label])=><Link key={to} to={to} className={`text-sm transition ${location.pathname===to?"font-bold text-gold-400":"text-slate-400 hover:text-white"}`}>{label}</Link>)}</nav>
        <div className="hidden items-center gap-3 md:flex">
          <DirectionToggle />
          <ThemeToggle compact />
          <ProfileMenu user={user} logout={logout} goDashboard={goDashboard}/>
        </div>
        <button onClick={()=>setOpen(true)} aria-label="Open navigation" className="rounded-xl border border-white/10 p-2 md:hidden"><Menu size={19}/></button>
      </div>
    </header>
    {open&&<div className="fixed inset-0 z-[80] bg-slate-950 p-6 md:hidden"><div className="flex justify-between"><Logo/><button onClick={()=>setOpen(false)} aria-label="Close navigation"><X/></button></div><nav className="mt-12 grid gap-5">{links.map(([to,label])=><Link onClick={()=>setOpen(false)} key={to} to={to} className="flex items-center gap-3 text-xl font-bold"><Home size={17} className="text-gold-400"/>{label}</Link>)}<div className="flex flex-wrap gap-3 pt-4"><DirectionToggle/><ThemeToggle/><button onClick={()=>{setOpen(false);goDashboard("admin")}} className="btn-secondary"><LayoutDashboard size={15}/> Admin</button><button onClick={()=>{setOpen(false);goDashboard("user")}} className="btn-gold"><UserCircle2 size={15}/> Student</button><Link onClick={()=>setOpen(false)} to="/signup" className="btn-secondary"><UserPlus size={15}/> Sign Up</Link></div>{user&&<button onClick={()=>{logout();setOpen(false)}} className="flex items-center gap-2 text-sm text-rose-400"><LogOut size={16}/> Logout</button>}</nav></div>}
    {children}
    <footer className="border-t border-white/5">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-2"><Logo/><p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">Premium driver education combining precision coaching, modern safety methodology and executive-level service.</p></div>
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Explore</p><div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-500">{links.slice(1,8).map(([to,l])=><Link className="hover:text-white" key={to} to={to}>{l}</Link>)}</div></div>
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Contact</p><p className="mt-4 text-sm text-slate-500">Concierge: +1 555 018 2026</p><p className="mt-2 text-sm text-slate-500">hello@drivewiseacademy.com</p><p className="mt-2 text-sm text-slate-500">Executive Center, Downtown</p></div>
      </div>
      <div className="border-t border-white/5 px-5 py-5 text-center text-[10px] uppercase tracking-[0.18em] text-slate-600">© 2026 DriveWise Executive Academy · Safety first, excellence always.</div>
    </footer>
  </div>;
}
