import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, LockKeyhole, Mail, UserRound, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
import { Logo } from "../components/PublicLayout";
import { useAuth } from "../context/AuthContext";

function Shell({children,title,sub,compact=false}){
  const { user } = useAuth();
  const nav = useNavigate();
  return (
    <div className={`auth-page ${compact ? "auth-signup-page" : ""} min-h-screen bg-executive-950 px-4 py-6 text-white sm:px-6 sm:py-10`}>
      <div className="mx-auto w-full max-w-lg">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-2">
            {user && (
              <button type="button" onClick={() => nav(user.role === "admin" ? "/admin" : "/dashboard")} className="auth-back-link">
                <LayoutDashboard size={15}/> Dashboard
              </button>
            )}
            <ThemeToggle compact />
          </div>
        </div>

        <motion.div
          initial={{opacity:0,y:15}}
          animate={{opacity:1,y:0}}
          transition={{duration:.35}}
          className="auth-card glass mt-8 rounded-3xl p-6 sm:mt-12 sm:p-9"
        >
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold-400">
            DriveWise Account
          </p>
          <h1 className="mt-3 font-jakarta text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-400">
            {sub}
          </p>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function SignupPage(){
  const {register,loading}=useAuth();
  const nav=useNavigate();
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [error,setError]=useState("");

  const submit=async e=>{
    e.preventDefault();
    setError("");
    if(!form.name.trim()){
      setError("Please enter your full name.");
      return;
    }
    if(form.password.length<6||form.password!==form.confirm){
      setError("Passwords must match and contain at least 6 characters.");
      return;
    }
    try{
      await register(form);
      nav("/dashboard");
    }catch(err){
      setError(err.message);
    }
  };

  const fields=[
    ["name","Full name","Your full name","text","name"],
    ["email","Email address","you@example.com","email","email"],
    ["password","Password","Minimum 6 characters","password","new-password"],
    ["confirm","Confirm password","Repeat your password","password","new-password"]
  ];

  return (
    <Shell
      compact
      title="Create your account."
      sub="Join DriveWise and manage lessons, bookings, payments and progress."
    >
      <form onSubmit={submit} className="mt-8 space-y-5">
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-300">
            {error}
          </div>
        )}

        {fields.map(([key,label,placeholder,type,auto])=>(
          <label key={key} className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-300">
              {label}
            </span>
            <input
              required
              type={type}
              autoComplete={auto}
              value={form[key]}
              onChange={e=>setForm({...form,[key]:e.target.value})}
              placeholder={placeholder}
              className="auth-input executive-input w-full"
            />
          </label>
        ))}

        <button
          disabled={loading}
          type="submit"
          className="btn-gold mt-2 w-full justify-center py-3.5 text-base"
        >
          {loading ? "Creating account..." : "Create account"}
          <ArrowRight size={17}/>
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link to="/login" className="font-bold text-gold-400 hover:text-gold-300">
          Sign in
        </Link>
      </p>
    </Shell>
  );
}

export function ForgotPasswordPage(){const [sent,setSent]=useState(false);const [email,setEmail]=useState("");return <Shell title="Reset your password." sub="Enter your account email and we'll prepare a password reset request.">{sent?<div className="mt-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center"><CheckCircle2 className="mx-auto text-emerald-400"/><p className="mt-4 font-bold">Reset request received</p><p className="mt-2 text-xs leading-5 text-slate-500">If an account exists for {email}, reset instructions will be sent.</p><Link to="/login" className="btn-secondary mt-6 text-xs">Back to sign in</Link></div>:<form onSubmit={e=>{e.preventDefault();setSent(true)}} className="mt-7"><label><span className="mb-2 block text-xs font-semibold text-slate-400">Email address</span><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={17}/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="executive-input pl-11" placeholder="you@example.com"/></div></label><button className="btn-gold mt-5 w-full">Send reset instructions <ArrowRight size={15}/></button><Link to="/login" className="mt-5 block text-center text-xs text-slate-500">Return to login</Link></form>}</Shell>}
