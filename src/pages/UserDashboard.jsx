import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays, CheckCircle2, Clock3, CreditCard, Gauge, LogOut,
  Menu, Pencil, ShieldCheck, Target, UserRound, X, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
import DirectionToggle from "../components/DirectionToggle";
import { Logo } from "../components/PublicLayout";
import { useAuth } from "../context/AuthContext";

const bookings = [
  { course: "Performance Driving", instructor: "Marcus Bennett", date: "Sep 04, 2026", time: "09:30 AM", status: "Confirmed", payment: "Paid" },
  { course: "Executive Automatic", instructor: "Sofia Laurent", date: "Sep 10, 2026", time: "11:00 AM", status: "Pending", payment: "Pending" },
  { course: "Defensive Driving", instructor: "Daniel Carter", date: "Aug 21, 2026", time: "02:00 PM", status: "Completed", payment: "Paid" }
];

const navItems = [
  ["Overview", Gauge],
  ["My Bookings", CalendarDays],
  ["Course Progress", Target],
  ["Payments", CreditCard],
  ["Profile", UserRound]
];

export default function UserDashboard() {
  const { user, logout, updateUser } = useAuth();
  const [tab, setTab] = useState("Overview");
  const [mobile, setMobile] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || "Olivia Bennett",
    phone: "+1 555 013 8822",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80"
  });


  return (
    <div className="student-dashboard min-h-screen bg-executive-950 text-white">
      {mobile && (
        <div
          onClick={() => setMobile(false)}
          className="fixed inset-0 z-[60] bg-black/70 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[70] flex w-[260px] flex-col border-r border-white/[0.06] bg-slate-950/95 transition-transform md:translate-x-0 ${
          mobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <Logo />
          <button onClick={() => setMobile(false)} className="md:hidden">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-6">
          <p className="px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600">
            Student Portal
          </p>

          <nav className="mt-4 space-y-1">
            {navItems.map(([name, Icon]) => (
              <button
                key={name}
                onClick={() => {
                  setTab(name);
                  setMobile(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold ${
                  tab === name
                    ? "border border-gold-500/15 bg-gold-500/[0.07] text-gold-400"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-5">
          <Link to="/book" className="btn-gold w-full text-xs">
            Book a class <ArrowRight size={14} />
          </Link>

          <button
            type="button"
            onClick={() => { setTab("Profile"); setMobile(false); }}
            className="student-sidebar-profile mt-4 flex w-full items-center gap-3 rounded-xl border border-white/5 p-3 text-left"
            title="Open student profile"
          >
            <img
              src={profile.avatar || user?.avatar}
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-gold-500/25"
              alt={user?.name || "Student"}
            />
            <div className="min-w-0 flex-1">
              <p className="student-profile-name font-bold">{user?.name || "Olivia Bennett"}</p>
              <p className="student-profile-role uppercase text-gold-400">Student</p>
            </div>
            <UserRound size={16} className="shrink-0 text-slate-500" />
          </button>
        </div>
      </aside>

      <div className="md:pl-[260px]">
        <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-2xl">
          <div className="flex h-20 items-center justify-between gap-4 px-5 sm:px-8">
            <div className="flex min-w-0 items-center gap-2">
              <button
                onClick={() => setMobile(true)}
                className="rounded-lg border border-white/10 p-2 md:hidden"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-400">
                  Student Portal
                </p>
                <h1 className="mt-1 text-lg font-extrabold">{tab}</h1>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTab("Profile")}
              className="student-header-profile absolute left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-gold-500/15 bg-white/[0.025] px-2 py-1.5 sm:px-3 sm:py-2"
              title="Open student profile"
            >
              <img src={profile.avatar || user?.avatar} alt={profile.name} className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover ring-1 ring-gold-500/25" />
              <span className="hidden min-w-0 text-left sm:block">
                <span className="block max-w-[115px] truncate text-[10px] font-extrabold text-white">{profile.name}</span>
                <span className="block text-[8px] font-bold uppercase tracking-wider text-gold-400">Student</span>
              </span>
              <UserRound size={14} className="text-slate-500" />
            </button>
            <div className="student-header-actions">
              <DirectionToggle />
              <ThemeToggle compact />
              <button onClick={logout} aria-label="Log out" title={`Log out ${user?.name || "Student"}`} className="header-action-button">
                <LogOut size={17}/>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8">
          {tab === "Overview" && <Overview user={user} />}
          {tab === "My Bookings" && <Bookings />}
          {tab === "Course Progress" && <Progress />}
          {tab === "Payments" && <Payments />}
          {tab === "Profile" && (
            <Profile profile={profile} setProfile={setProfile} />
          )}
        </main>
      </div>
    </div>
  );
}

function Hero({ children, sub }) {
  return (
    <section className="ambient-gold mb-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-r from-slate-900 to-slate-950 p-7">
      <p className="relative text-sm leading-7 text-slate-400">{sub}</p>
      <div className="relative mt-2 font-jakarta text-3xl font-extrabold">
        {children}
      </div>
    </section>
  );
}

function Overview({ user }) {
  const metrics = [
    [CalendarDays, "Upcoming Classes", "2"],
    [CheckCircle2, "Completed Sessions", "14"],
    [Target, "Course Progress", "78%"],
    [CreditCard, "Outstanding", "$179"]
  ];

  return (
    <>
      <Hero sub="Welcome back. Your upcoming lessons, progress and payments are all in one place.">
        Good evening,{" "}
        <span className="text-gold-gradient">
          {user?.name?.split(" ")[0] || "Driver"}.
        </span>
      </Hero>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([Icon, label, value]) => (
          <div className="glass rounded-2xl p-5" key={label}>
            <Icon className="text-gold-400" />
            <p className="mt-5 text-xs text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-extrabold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-2xl p-6">
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold">Next session</h2>
              <p className="mt-1 text-xs text-slate-600">Performance Driving</p>
            </div>
            <span className="student-confirmed-badge">Confirmed</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["Date", "Sep 04, 2026"],
              ["Time", "09:30 AM"],
              ["Instructor", "Marcus Bennett"]
            ].map(([label, value]) => (
              <div className="rounded-xl border border-white/5 p-4" key={label}>
                <p className="text-[9px] uppercase text-slate-600">{label}</p>
                <p className="mt-2 text-sm font-bold">{value}</p>
              </div>
            ))}
          </div>

          <Link to="/book" className="btn-secondary mt-5 text-xs">
            Manage booking
          </Link>
        </div>

        <div className="glass glass-gold rounded-2xl p-6">
          <ShieldCheck className="text-gold-400" />
          <h2 className="mt-5 font-bold">Progress milestone</h2>
          <p className="mt-2 text-sm text-slate-500">
            You are 78% through your current training plan.
          </p>
          <div className="mt-6 h-2 rounded-full bg-white/5">
            <div className="h-full w-[78%] rounded-full bg-gold-500" />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Next milestone: highway confidence assessment
          </p>
        </div>
      </div>
    </>
  );
}

function Bookings() {
  return (
    <>
      <Hero sub="Review upcoming and completed driving classes.">
        My driving bookings
      </Hero>

      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <motion.div
            key={`${booking.date}-${booking.time}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-2xl p-5 sm:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                  {booking.status}
                </p>
                <h2 className="mt-2 font-bold">{booking.course}</h2>
                <p className="mt-1 text-xs text-slate-500">
                  with {booking.instructor}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  ["Date", booking.date],
                  ["Time", booking.time],
                  ["Payment", booking.payment]
                ].map(([label, value]) => (
                  <span
                    className="rounded-xl border border-white/5 p-3 text-xs"
                    key={label}
                  >
                    <b className="block text-[9px] text-slate-600">{label}</b>
                    <span className="mt-1 block">{value}</span>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {booking.payment === "Pending" && (
                  <Link
                    to={`/payment?booking=DW-${10490 + index}&course=${encodeURIComponent(booking.course)}&instructor=${encodeURIComponent(booking.instructor)}&date=${encodeURIComponent(booking.date)}&time=${encodeURIComponent(booking.time)}&amount=${booking.course === "Performance Driving" ? 249 : booking.course === "Defensive Driving" ? 199 : 179}`}
                    className="btn-gold text-xs"
                  >
                    Pay now <ArrowRight size={14} />
                  </Link>
                )}
                <button className="btn-secondary text-xs">Reschedule</button>
                <button className="btn-secondary text-xs">Cancel</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Progress() {
  const courses = [
    {
      name: "Performance Driving",
      progress: 78,
      milestones: [
        "Vehicle control",
        "Cornering technique",
        "Emergency braking",
        "Road assessment"
      ]
    },
    {
      name: "Defensive Driving",
      progress: 54,
      milestones: [
        "Hazard awareness",
        "Observation",
        "Safe following distance",
        "Night driving"
      ]
    }
  ];

  return (
    <>
      <Hero sub="Track milestones across your selected training plan.">
        Course progress
      </Hero>

      <div className="grid gap-6 lg:grid-cols-2">
        {courses.map((course) => (
          <div className="glass rounded-2xl p-7" key={course.name}>
            <div className="flex justify-between">
              <h2 className="font-bold">{course.name}</h2>
              <span className="font-bold text-gold-400">
                {course.progress}%
              </span>
            </div>

            <div className="mt-5 h-2 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gold-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <div className="mt-7 grid gap-3">
              {course.milestones.map((milestone, index) => {
                const completed = index < course.milestones.length - 1;
                return (
                  <div
                    className="flex items-center gap-3 text-xs"
                    key={milestone}
                  >
                    {completed ? (
                      <CheckCircle2 size={15} className="text-gold-400" />
                    ) : (
                      <Clock3 size={15} className="text-slate-600" />
                    )}
                    {milestone}
                    <span className="ml-auto text-[9px] text-slate-600">
                      {completed ? "Completed" : "Upcoming"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Payments() {
  const payments = [
    ["DW-PAY-9821", "Performance Driving", "$249", "Paid", "Sep 01, 2026"],
    ["DW-PAY-9820", "Executive Automatic", "$179", "Pending", "Aug 30, 2026"],
    ["DW-PAY-9714", "Defensive Driving", "$199", "Paid", "Aug 18, 2026"]
  ];

  return (
    <>
      <Hero sub="Track paid, pending and completed transactions associated with your academy bookings.">
        Payment history
      </Hero>

      <div className="glass overflow-hidden rounded-2xl">
        <div className="divide-y divide-white/5">
          {payments.map(([id, course, amount, status, date]) => (
            <div
              className="student-payment-row grid gap-4 p-5 sm:grid-cols-[1.15fr_2fr_.75fr_1fr_auto] sm:items-center"
              key={id}
            >
              <span className="text-sm font-bold text-gold-400">{id}</span>
              <span className="text-sm font-semibold">{course}</span>
              <span className="text-base font-extrabold">{amount}</span>
              <span className={`payment-status-badge ${status === "Paid" ? "payment-paid" : "payment-pending"}`}>
                {status}
              </span>
              <div className="flex items-center justify-start sm:justify-end">
                {status === "Pending" ? (
                  <Link
                    to={`/payment?booking=${id}&course=${encodeURIComponent(course)}&amount=${amount.replace("$","")}&date=${encodeURIComponent(date)}`}
                    className="student-pay-now-btn"
                  >
                    Pay now <ArrowRight size={15} />
                  </Link>
                ) : (
                  <span className="payment-complete-label">
                    <CheckCircle2 size={15} /> Paid
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Profile({ profile, setProfile }) {
  const { updateUser } = useAuth();
  const [saved, setSaved] = useState(false);
  const photoInputRef = useRef(null);

  const saveProfile = () => {
    updateUser({ name: profile.name, avatar: profile.avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const changePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const avatar = String(reader.result);
      setProfile({ ...profile, avatar });
      updateUser({ avatar });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Hero sub="Keep your contact information, profile photo and learning preferences current.">
        My profile
      </Hero>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="glass glass-gold rounded-2xl p-7">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-28 w-28 rounded-2xl object-cover ring-2 ring-gold-500/30"
              />
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 grid h-10 w-10 place-items-center rounded-xl border border-gold-400/30 bg-gold-500 text-executive-950 shadow-lg"
                title="Change profile photo"
                aria-label="Change profile photo"
              >
                <Pencil size={16} />
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={changePhoto}
                className="hidden"
              />
            </div>
            <div className="sm:ml-5 sm:pt-2">
              <h2 className="mt-5 text-xl font-bold sm:mt-0">{profile.name}</h2>
              <p className="mt-1 text-sm text-slate-500">Student · DriveWise Academy</p>
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="mt-4 text-sm font-semibold text-gold-400 hover:text-gold-300"
              >
                Change profile picture
              </button>
            </div>
          </div>
          <div className="mt-7 space-y-3 text-sm text-slate-500">
            <p>14 completed sessions</p>
            <p>Current track: Performance Driving</p>
            <p>Member since 2026</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-7">
          <h2 className="text-lg font-bold">Personal details</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-400">Full name</span>
              <input className="executive-input" value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
            </label>
            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-400">Phone</span>
              <input className="executive-input" value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-400">Email</span>
              <input disabled className="executive-input opacity-70" value="student@drivewise.com" readOnly />
            </label>
          </div>
          <button onClick={saveProfile} className="btn-gold mt-7">
            {saved ? "Profile saved" : "Save profile"} <Pencil size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
