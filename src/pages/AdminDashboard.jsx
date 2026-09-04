import { useMemo, useRef, useState } from "react";
import {
  Activity, ArrowUpRight, BarChart3, Bell, CalendarDays, CheckCircle2,
  ChevronDown, CircleDollarSign, Download, FileText, Gauge, LayoutDashboard,
  LogOut, Menu, MoreHorizontal, RefreshCw, Search, Settings, ShieldCheck,
  Truck, Users, X, UserRound, Clock3, Wrench, TrendingUp, WalletCards,
  ClipboardCheck, CarFront, Plus, Pencil, Trash2, Save, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import DirectionToggle from "../components/DirectionToggle";

const bookings = [
  { id:"DW-10492", student:"Olivia Bennett", course:"Performance Driving", time:"Today · 09:30 AM", instructor:"Marcus Bennett", img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80", status:"Confirmed", amount:249 },
  { id:"DW-10491", student:"James Anderson", course:"Executive Automatic", time:"Today · 11:00 AM", instructor:"Sofia Laurent", img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80", status:"Pending", amount:179 },
  { id:"DW-10490", student:"Noah Williams", course:"Defensive Driving", time:"Today · 12:30 PM", instructor:"Daniel Carter", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", status:"Completed", amount:199 },
  { id:"DW-10489", student:"Emma Collins", course:"Performance Driving", time:"Today · 02:00 PM", instructor:"Marcus Bennett", img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80", status:"Confirmed", amount:249 },
  { id:"DW-10488", student:"William Carter", course:"Executive Automatic", time:"Tomorrow · 09:00 AM", instructor:"Sofia Laurent", img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80", status:"Pending", amount:179 },
  { id:"DW-10487", student:"Ava Morgan", course:"Defensive Driving", time:"Tomorrow · 11:30 AM", instructor:"Daniel Carter", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", status:"Confirmed", amount:199 }
];

const instructors = [
  {name:"Marcus Bennett", role:"Master Driving Coach", exp:"14 years", rating:"4.98", sessions:284, status:"Available", specialty:"Performance"},
  {name:"Sofia Laurent", role:"Senior Driving Coach", exp:"11 years", rating:"4.96", sessions:219, status:"On Session", specialty:"Executive"},
  {name:"Daniel Carter", role:"Safety & Performance Coach", exp:"9 years", rating:"4.94", sessions:176, status:"Available", specialty:"Defensive"},
  {name:"Elena Rossi", role:"Advanced Road Coach", exp:"8 years", rating:"4.92", sessions:154, status:"Available", specialty:"Highway"},
  {name:"James Walker", role:"Fleet Training Coach", exp:"12 years", rating:"4.91", sessions:201, status:"On Leave", specialty:"Fleet"}
];

const fleet = [
  {id:"DW-01", model:"BMW 3 Series", type:"Performance", transmission:"Automatic", mileage:"18,420 km", status:"Ready", service:"42 days"},
  {id:"DW-04", model:"Mercedes C-Class", type:"Executive", transmission:"Automatic", mileage:"21,190 km", status:"Ready", service:"31 days"},
  {id:"DW-07", model:"Audi A4", type:"Defensive", transmission:"Manual", mileage:"27,850 km", status:"Service", service:"Due today"},
  {id:"DW-12", model:"BMW 5 Series", type:"Executive", transmission:"Automatic", mileage:"14,640 km", status:"Ready", service:"68 days"},
  {id:"DW-16", model:"Toyota Camry", type:"Defensive", transmission:"Automatic", mileage:"31,220 km", status:"Ready", service:"24 days"},
  {id:"DW-21", model:"Mercedes E-Class", type:"Executive", transmission:"Automatic", mileage:"12,880 km", status:"Inspection", service:"5 days"}
];

const nav = [
  ["Overview", LayoutDashboard],
  ["Students", Users],
  ["Bookings", CalendarDays],
  ["Instructors", UserRound],
  ["Courses", ClipboardCheck],
  ["Payments", WalletCards],
  ["Schedules", Clock3],
  ["Fleet Status", Truck],
  ["Enquiries", FileText],
  ["Analytics", BarChart3],
  ["Profile", UserRound],
  ["Settings", Settings]
];

const statusClass = {
  Confirmed:"status-confirmed",
  Pending:"status-pending",
  Completed:"status-completed",
  Ready:"status-confirmed",
  Service:"status-pending",
  Inspection:"status-completed",
  Available:"status-confirmed",
  "On Session":"status-pending",
  "On Leave":"status-completed"
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [active, setActive] = useState("Overview");
  const [rows, setRows] = useState(bookings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [mobile, setMobile] = useState(false);
  const [notice, setNotice] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "Alexander Morgan",
    email: user?.email || "admin@drivewise.com",
    phone: "+1 555 019 4412",
    role: "Administrator",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=80"
  });

  const filtered = useMemo(() =>
    rows.filter(r =>
      `${r.student} ${r.course} ${r.id} ${r.instructor}`.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || r.status === filter)
    ), [rows, search, filter]);

  const doRefresh = async () => {
    setRefresh(true);
    await new Promise(r => setTimeout(r, 650));
    setRefresh(false);
  };

  const exportCsv = () => {
    const csv = [["Booking ID","Student","Course","Scheduled Time","Instructor","Status","Amount"],
      ...filtered.map(r=>[r.id,r.student,r.course,r.time,r.instructor,r.status,r.amount])]
      .map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    a.download="drivewise-bookings.csv";
    a.click();
  };

  const selectNav = (label) => {
    setActive(label);
    setMobile(false);
    setNotice(false);
  };

  return (
    <div className="admin-dashboard min-h-screen bg-executive-950 text-white">
      {mobile && <div onClick={()=>setMobile(false)} className="fixed inset-0 z-[60] bg-black/70 lg:hidden"/>}

      <aside className={`fixed bottom-0 left-0 top-0 z-[70] flex w-[270px] flex-col border-r border-white/[0.06] bg-slate-950/95 transition-transform lg:translate-x-0 ${mobile?"translate-x-0":"-translate-x-full"}`}>
        <div className="flex h-20 items-center px-6">
          <Logo/>
          <button onClick={()=>setMobile(false)} className="ml-auto lg:hidden"><X size={18}/></button>
        </div>

        <div className="px-5 py-6">
          <p className="px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600">Academy Management</p>
          <nav className="mt-4 space-y-1">
            {nav.map(([label, Icon])=>(
              <button key={label} onClick={()=>selectNav(label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold transition ${active===label?"border border-gold-500/15 bg-gold-500/[0.07] text-gold-400":"text-slate-500 hover:bg-white/[0.025] hover:text-white"}`}>
                <Icon size={17}/>{label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-5">
          <div className="admin-account-card rounded-2xl border border-gold-500/15 bg-white/[0.025] p-4">
            <div className="flex items-center gap-3">
              <img src={user?.avatar} alt={user?.name || "Administrator"} className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-gold-500/20"/>
              <div className="min-w-0 flex-1">
                <p className="admin-profile-name font-bold">{user?.name || "Alexander Morgan"}</p>
                <p className="admin-profile-role uppercase text-gold-400">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-2xl">
          <div className="relative flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-4">
              <button onClick={()=>setMobile(true)} className="rounded-lg border border-white/10 p-2 lg:hidden"><Menu size={18}/></button>
              <div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-400">Operations Center</p><h1 className="mt-1 font-jakarta text-lg font-extrabold">{active}</h1></div>
            </div>

            <button
              type="button"
              onClick={()=>selectNav("Profile")}
              className="admin-header-profile absolute left-1/2 flex -translate-x-1/2 items-center gap-2 sm:gap-3 rounded-full border border-gold-500/15 bg-white/[0.025] px-3 py-2 text-left transition hover:border-gold-500/30 hover:bg-gold-500/[0.06] md:flex"
              title="Open administrator profile"
            >
              <img src={profile.avatar} alt={profile.name} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover ring-1 ring-gold-500/25" />
              <span className="min-w-0 max-w-[105px] sm:max-w-[150px] pr-1 sm:pr-2">
                <span className="block truncate text-[10px] sm:text-xs font-extrabold text-white">{profile.name}</span>
                <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-gold-400">Administrator</span>
              </span>
              <UserRound size={15} className="shrink-0 text-slate-500" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <DirectionToggle />
              <ThemeToggle/>
              <span className="hidden rounded-full border border-emerald-500/10 bg-emerald-500/[0.04] px-3 py-2 text-[10px] font-bold uppercase text-emerald-400 sm:block">● Live</span>
              <button onClick={logout} aria-label="Log out" title={`Log out ${user?.name || "Administrator"}`} className="header-action-button">
                <LogOut size={17}/>
              </button>
              <button onClick={()=>setNotice(v=>!v)} aria-label="Notifications" className="relative rounded-xl border border-white/10 p-2.5"><Bell size={17}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold-400"/></button>
            </div>
          </div>
        </header>

        {notice && (
          <div className="absolute right-5 top-24 z-50 w-80 rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-luxury">
            <p className="text-sm font-bold">Notifications</p>
            {["New booking requires approval","Fleet vehicle DW-07 completed service","Instructor certification expires soon"].map(x=>
              <div key={x} className="mt-2 rounded-xl border border-white/5 p-3 text-xs text-slate-400">{x}</div>
            )}
          </div>
        )}

        <main className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
          {active === "Overview" && <Overview rows={rows} filtered={filtered} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} setRows={setRows} doRefresh={doRefresh} refresh={refresh} exportCsv={exportCsv}/>}
          {active === "Students" && <StudentsPage/>}
          {active === "Bookings" && <BookingsPage rows={rows} filtered={filtered} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} setRows={setRows} doRefresh={doRefresh} refresh={refresh} exportCsv={exportCsv}/>}
          {active === "Instructors" && <InstructorsPage/>}
          {active === "Courses" && <CoursesAdminPage/>}
          {active === "Payments" && <PaymentsAdminPage/>}
          {active === "Schedules" && <SchedulesPage/>}
          {active === "Fleet Status" && <FleetPage/>}
          {active === "Enquiries" && <EnquiriesPage/>}
          {active === "Analytics" && <AnalyticsPage/>}
          {active === "Profile" && <AdminProfile profile={profile} setProfile={setProfile}/>}
          {active === "Settings" && <SettingsPage/>}
        </main>
      </div>
    </div>
  );
}

function PageHero({eyebrow,title,description}) {
  return <section className="admin-hero ambient-gold relative mb-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-r from-slate-900 to-slate-950 p-6 sm:p-8">
    <div className="relative z-10 max-w-4xl">
      <div className="flex items-center gap-2 text-gold-400"><Activity size={15}/><span className="text-[10px] font-bold uppercase tracking-[0.25em]">{eyebrow}</span></div>
      <h2 className="mt-3 font-jakarta text-2xl font-extrabold sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  </section>;
}

function KpiGrid() {
  const data = [
    [CircleDollarSign,"Total Revenue","$284,920","14%","+14% this week"],
    [CalendarDays,"Total Bookings","1,284","9%","+9% this week"],
    [Truck,"Active Fleet Vehicles","28 / 32","4%","+4 vehicles"],
    [Gauge,"Pass Rate Ratio","98.7%","2.8%","+2.8%"]
  ];
  return <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{data.map(([Icon,t,v,tr,tx],i)=>
    <motion.div key={t} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*.05}} className="glass rounded-2xl p-5">
      <div className="flex justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/15 bg-gold-500/[0.07] text-gold-400"><Icon size={18}/></div>
      <span className="flex items-center gap-1 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-2 py-1 text-[10px] font-bold text-emerald-400"><ArrowUpRight size={12}/>{tr}</span></div>
      <p className="mt-5 text-xs text-slate-500">{t}</p><p className="mt-1 font-jakarta text-2xl font-extrabold">{v}</p><p className="mt-2 text-[10px] text-slate-600">{tx} · vs previous period</p>
    </motion.div>)}</section>;
}

function Overview({rows,filtered,search,setSearch,filter,setFilter,setRows,doRefresh,refresh,exportCsv}) {
  return <>
    <PageHero eyebrow="Academy Performance" title={<>Operations are running at <span className="text-gold-gradient">peak performance.</span></>} description="Your executive command center for bookings, instructors, fleet availability and academy revenue."/>
    <KpiGrid/>
    <BookingTable title="Live Bookings" rows={rows} filtered={filtered} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} setRows={setRows} doRefresh={doRefresh} refresh={refresh} exportCsv={exportCsv}/>
    <section className="mt-8 grid gap-5 lg:grid-cols-3">
      <MiniCard Icon={Truck} title="Fleet" value="87%" text="28 of 32 vehicles active"/>
      <MiniCard Icon={Users} title="Instructors" value="75%" text="18 instructors available"/>
      <MiniCard Icon={CheckCircle2} title="Compliance" value="100%" text="All certifications current"/>
    </section>
  </>;
}

function BookingsPage({rows,filtered,search,setSearch,filter,setFilter,setRows,doRefresh,refresh,exportCsv}) {
  return <>
    <PageHero eyebrow="Reservation Management" title="Bookings & reservations" description="Search, review and update every academy reservation from one dedicated workspace."/>
    <KpiGrid/>
    <BookingTable title="All Reservations" rows={rows} filtered={filtered} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} setRows={setRows} doRefresh={doRefresh} refresh={refresh} exportCsv={exportCsv}/>
  </>;
}

function BookingTable({title,rows,filtered,search,setSearch,filter,setFilter,setRows,doRefresh,refresh,exportCsv}) {
  return <section className="mt-8 glass overflow-hidden rounded-2xl">
    <div className="border-b border-white/5 p-5 sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div><div className="flex items-center gap-2"><FileText size={17} className="text-gold-400"/><h2 className="text-sm font-bold">{title}</h2></div><p className="mt-2 text-xs text-slate-600">Reservation activity and operational status.</p></div>
        <div className="booking-toolbar xl:w-[820px]">
          <div className="relative min-w-0"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search bookings..." className="executive-input h-12 w-full pl-10"/></div>
          <div className="relative min-w-0"><select value={filter} onChange={e=>setFilter(e.target.value)} className="executive-input h-12 w-full appearance-none pr-10"><option>All</option><option>Confirmed</option><option>Pending</option><option>Completed</option></select><ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"/></div>
          <button onClick={doRefresh} className="btn-secondary h-12 w-full"><RefreshCw size={15} className={refresh?"animate-spin":""}/>Refresh</button>
          <button onClick={exportCsv} className="btn-gold h-12 w-full"><Download size={15}/><span>Export CSV</span></button>
        </div>
      </div>
    </div>
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[900px]"><thead><tr className="border-b border-white/5 text-left">{["Student","Course","Schedule","Instructor","Status","Action"].map(x=><th key={x} className="px-6 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">{x}</th>)}</tr></thead>
      <tbody>{filtered.map(r=><tr key={r.id} className="border-b border-white/[0.035] hover:bg-white/[0.02]">
        <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/10 text-[10px] font-bold text-gold-400">{r.student.split(" ").map(x=>x[0]).join("")}</div><div><p className="text-xs font-bold">{r.student}</p><p className="text-[9px] text-slate-600">{r.id}</p></div></div></td>
        <td className="px-6 py-4"><p className="text-xs font-semibold">{r.course}</p><p className="text-[9px] text-slate-600">${r.amount} session</p></td>
        <td className="px-6 py-4 text-xs text-slate-400">{r.time}</td>
        <td className="px-6 py-4"><div className="flex items-center gap-2"><img src={r.img} alt="" className="h-8 w-8 rounded-full object-cover"/><span className="text-xs font-semibold">{r.instructor}</span></div></td>
        <td className="px-6 py-4"><select value={r.status} onChange={e=>setRows(a=>a.map(x=>x.id===r.id?{...x,status:e.target.value}:x))} className={`rounded-full border bg-transparent px-3 py-1.5 text-[10px] font-bold uppercase outline-none ${statusClass[r.status]}`}><option className="bg-slate-900">Confirmed</option><option className="bg-slate-900">Pending</option><option className="bg-slate-900">Completed</option></select></td>
        <td className="px-6 py-4 text-right"><button className="rounded-lg border border-white/10 p-2 text-slate-600"><MoreHorizontal size={16}/></button></td>
      </tr>)}</tbody></table>
    </div>
    <div className="divide-y divide-white/5 md:hidden">{filtered.map(r=><div key={r.id} className="p-5"><div className="flex justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 text-[10px] font-bold text-gold-400">{r.student.split(" ").map(x=>x[0]).join("")}</div><div><p className="text-xs font-bold">{r.student}</p><p className="text-[9px] text-slate-600">{r.id}</p></div></div><span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${statusClass[r.status]}`}>{r.status}</span></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div className="rounded-xl border border-white/5 p-3"><p className="text-[9px] text-slate-600">Course</p><p className="mt-1 font-semibold">{r.course}</p></div><div className="rounded-xl border border-white/5 p-3"><p className="text-[9px] text-slate-600">Schedule</p><p className="mt-1 font-semibold">{r.time}</p></div></div></div>)}</div>
    <div className="border-t border-white/5 px-5 py-4 text-[10px] text-slate-600">Showing <span className="font-bold text-slate-400">{filtered.length}</span> of {rows.length} bookings</div>
  </section>;
}


function StudentsPage() {
  const [students, setStudents] = useState([
    {id:"ST-1001",name:"Olivia Bennett",email:"olivia@example.com",course:"Performance Driving",progress:"78%",status:"Active"},
    {id:"ST-1002",name:"James Anderson",email:"james@example.com",course:"Executive Automatic",progress:"64%",status:"Active"},
    {id:"ST-1003",name:"Emma Collins",email:"emma@example.com",course:"Defensive Driving",progress:"100%",status:"Completed"},
    {id:"ST-1004",name:"Noah Williams",email:"noah@example.com",course:"Advanced Driving",progress:"42%",status:"Active"},
    {id:"ST-1005",name:"Ava Morgan",email:"ava@example.com",course:"Refresher",progress:"25%",status:"Pending"}
  ]);
  const [query,setQuery]=useState("");
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({id:"",name:"",email:"",course:"Beginner Driving",progress:"0%",status:"Active"});
  const filtered=students.filter(x=>`${x.id} ${x.name} ${x.email} ${x.course}`.toLowerCase().includes(query.toLowerCase()));
  const reset=()=>setForm({id:"",name:"",email:"",course:"Beginner Driving",progress:"0%",status:"Active"});
  const save=()=>{
    if(!form.name.trim()||!form.email.trim()) return;
    if(modal?.mode==="edit") setStudents(v=>v.map(x=>x.id===modal.student.id?{...form}:x));
    else setStudents(v=>[{...form,id:form.id.trim()||`ST-${1006+v.length}`},...v]);
    reset();setModal(null);
  };
  return <>
    <PageHero eyebrow="Student Management" title="Student profiles & progress" description="Add, edit, review and manage learner profiles, course progress, contact details and account status."/>
    <div className="grid gap-4 sm:grid-cols-3"><Metric Icon={Users} label="Total Students" value={String(students.length).padStart(2,"0")}/><Metric Icon={Activity} label="Active Learners" value={String(students.filter(x=>x.status==="Active").length).padStart(2,"0")}/><Metric Icon={CheckCircle2} label="Completed" value={String(students.filter(x=>x.status==="Completed").length).padStart(2,"0")}/></div>
    <section className="mt-8 glass overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-4 border-b border-white/5 p-6 xl:flex-row xl:items-center xl:justify-between">
        <div><h2 className="font-bold">Student directory</h2><p className="mt-1 text-sm text-slate-500">Create and manage student accounts and training progress.</p></div>
        <div className="grid w-full gap-3 sm:grid-cols-[minmax(220px,1fr)_auto] xl:w-auto">
          <div className="relative min-w-0"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/><input className="executive-input h-12 w-full pl-10" placeholder="Search students..." value={query} onChange={e=>setQuery(e.target.value)}/></div>
          <button onClick={()=>{reset();setModal({mode:"add"});}} className="btn-gold h-12 whitespace-nowrap text-sm"><Plus size={15}/>Add student</button>
        </div>
      </div>
      <div className="overflow-x-auto"><table className="w-full min-w-[980px]"><thead><tr className="border-b border-white/5 text-left">{["Student","Contact","Course","Progress","Status","Actions"].map(x=><th className="px-6 py-4 text-[10px] uppercase tracking-[0.18em] text-slate-500" key={x}>{x}</th>)}</tr></thead>
      <tbody>{filtered.map(x=><tr className="border-b border-white/[0.035] hover:bg-white/[0.02]" key={x.id}><td className="px-6 py-4"><p className="text-sm font-bold">{x.name}</p><p className="text-[10px] text-slate-500">{x.id}</p></td><td className="px-6 py-4 text-sm text-slate-400">{x.email}</td><td className="px-6 py-4 text-sm">{x.course}</td><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="h-2 w-24 rounded-full bg-white/5"><div className="h-full rounded-full bg-gold-500" style={{width:x.progress}}/></div><span className="text-xs">{x.progress}</span></div></td><td className="px-6 py-4"><span className={`${x.status==="Pending"?"status-pending":x.status==="Completed"?"status-completed":"status-confirmed"} rounded-full border px-3 py-1 text-[10px] font-bold uppercase`}>{x.status}</span></td><td className="px-6 py-4"><div className="flex gap-2"><button onClick={()=>{setForm({...x});setModal({mode:"edit",student:x});}} className="btn-secondary py-2 text-xs"><Pencil size={13}/>Edit</button><button onClick={()=>setStudents(v=>v.filter(s=>s.id!==x.id))} className="rounded-xl border border-red-500/15 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"><Trash2 size={13}/></button></div></td></tr>)}</tbody></table></div>
      <div className="border-t border-white/5 px-6 py-4 text-xs text-slate-500">Showing <b className="text-slate-300">{filtered.length}</b> students</div>
    </section>
    {modal&&<Modal title={modal.mode==="edit"?"Edit student":"Add student"} onClose={()=>setModal(null)}><div className="grid gap-4 sm:grid-cols-2"><Field label="Student ID" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} placeholder="ST-1006"/><Field label="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Student name"/><Field label="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="student@example.com"/><Field label="Course" value={form.course} onChange={e=>setForm({...form,course:e.target.value})}/><Field label="Progress" value={form.progress} onChange={e=>setForm({...form,progress:e.target.value})}/><Field label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}/></div><button onClick={save} className="btn-gold mt-6"><Save size={15}/>{modal.mode==="edit"?"Save changes":"Add student"}</button></Modal>}
  </>;
}

function CoursesAdminPage() {
  const [courses,setCourses]=useState([
    {id:"C-01",name:"Beginner Driving Course",price:"$159",duration:"4 hours",active:"124 active"},
    {id:"C-02",name:"Advanced Driving Course",price:"$299",duration:"8 hours",active:"82 active"},
    {id:"C-03",name:"Refresher Course",price:"$129",duration:"2 hours",active:"67 active"},
    {id:"C-04",name:"Automatic Training",price:"$179",duration:"5 hours",active:"201 active"},
    {id:"C-05",name:"Manual Training",price:"$189",duration:"5 hours",active:"94 active"}
  ]);
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({name:"",price:"",duration:"",active:"0 active"});
  const reset=()=>setForm({name:"",price:"",duration:"",active:"0 active"});
  const save=()=>{if(!form.name.trim()||!form.price.trim()||!form.duration.trim())return;if(modal.mode==="edit")setCourses(v=>v.map(c=>c.id===modal.course.id?{...c,...form}:c));else setCourses(v=>[...v,{...form,id:`C-${String(v.length+1).padStart(2,"0")}`}]);reset();setModal(null);};
  return <>
    <PageHero eyebrow="Course Management" title="Courses, pricing & duration" description="Maintain the academy catalogue, lesson durations, pricing and enrollment demand."/>
    <div className="mb-6 flex justify-end"><button onClick={()=>{reset();setModal({mode:"add"});}} className="btn-gold text-sm"><Plus size={15}/>Add course</button></div>
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{courses.map(x=><article className="glass rounded-2xl p-6" key={x.id}><div className="flex justify-between"><ClipboardCheck className="text-gold-400"/><span className="text-xs text-emerald-400">{x.active}</span></div><h2 className="mt-5 text-lg font-bold">{x.name}</h2><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/5 p-3"><p className="text-[10px] text-slate-500">Price</p><p className="mt-1 text-lg font-bold">{x.price}</p></div><div className="rounded-xl border border-white/5 p-3"><p className="text-[10px] text-slate-500">Duration</p><p className="mt-1 text-sm font-bold">{x.duration}</p></div></div><button onClick={()=>{setForm({...x});setModal({mode:"edit",course:x});}} className="btn-secondary mt-5 w-full text-sm"><Pencil size={14}/>Edit course</button></article>)}</section>
    {modal&&<Modal title={modal.mode==="edit"?"Edit course":"Add course"} onClose={()=>setModal(null)}><div className="grid gap-4 sm:grid-cols-2"><Field label="Course name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Course name"/><Field label="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="$199"/><Field label="Duration" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})} placeholder="6 hours"/><Field label="Active enrollments" value={form.active} onChange={e=>setForm({...form,active:e.target.value})}/></div><button onClick={save} className="btn-gold mt-6"><Save size={15}/>Save course</button></Modal>}
  </>;
}

function PaymentsAdminPage() {
  const data=[["PAY-9821","Olivia Bennett","Performance Driving","$249","Paid"],["PAY-9820","James Anderson","Executive Automatic","$179","Pending"],["PAY-9819","Emma Collins","Defensive Driving","$199","Completed"],["PAY-9818","Noah Williams","Advanced Driving","$299","Paid"],["PAY-9817","Ava Morgan","Refresher","$129","Pending"]];
  return <>
    <PageHero eyebrow="Finance Operations" title="Payments & revenue" description="Track paid, pending and completed transactions and keep outstanding balances visible."/>
    <section className="grid gap-4 sm:grid-cols-3"><Metric Icon={WalletCards} label="Collected This Month" value="$84,920"/><Metric Icon={Clock3} label="Pending Payments" value="$8,740"/><Metric Icon={TrendingUp} label="Completion Rate" value="94.2%"/></section>
    <section className="mt-8 glass overflow-hidden rounded-2xl"><div className="overflow-x-auto"><table className="w-full min-w-[800px]"><thead><tr className="border-b border-white/5 text-left">{["Payment","Student","Course","Amount","Status"].map(x=><th className="px-6 py-4 text-[9px] uppercase tracking-[0.18em] text-slate-600" key={x}>{x}</th>)}</tr></thead><tbody>{data.map(x=><tr className="border-b border-white/[0.035]" key={x[0]}><td className="px-6 py-4 text-xs font-bold text-gold-400">{x[0]}</td><td className="px-6 py-4 text-xs">{x[1]}</td><td className="px-6 py-4 text-xs text-slate-400">{x[2]}</td><td className="px-6 py-4 text-xs font-bold">{x[3]}</td><td className="px-6 py-4"><span className={`${x[4]==="Pending"?"status-pending":"status-confirmed"} rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase`}>{x[4]}</span></td></tr>)}</tbody></table></div></section>
  </>;
}

function SchedulesPage() {
  const [slots,setSlots]=useState([
    ["SCH-01","Today","09:30 AM","Performance Driving","Marcus Bennett","DW-01","Booked"],
    ["SCH-02","Today","11:00 AM","Executive Automatic","Sofia Laurent","DW-04","Booked"],
    ["SCH-03","Today","12:30 PM","Defensive Driving","Daniel Carter","DW-07","Available"],
    ["SCH-04","Today","02:00 PM","Performance Driving","Marcus Bennett","DW-01","Booked"],
    ["SCH-05","Tomorrow","09:00 AM","Executive Automatic","Sofia Laurent","DW-04","Available"],
    ["SCH-06","Tomorrow","11:30 AM","Defensive Driving","Daniel Carter","DW-07","Available"]
  ]);
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({day:"Today",time:"03:30 PM",course:"Performance Driving",instructor:"Marcus Bennett",vehicle:"DW-01"});
  const addSlot=()=>{setSlots(v=>[...v,[`SCH-${String(v.length+1).padStart(2,"0")}`,form.day,form.time,form.course,form.instructor,form.vehicle,"Available"]]);setModal(null);};
  const manage=(slot)=>setModal({type:"manage",slot});
  return <>
    <PageHero eyebrow="Schedule Management" title="Classes & time slots" description="Create, review and allocate driving sessions across instructors, vehicles and available time slots."/>
    <section className="glass overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-4 border-b border-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="font-bold">Daily schedule</h2><p className="mt-1 text-xs text-slate-600">Instructor, vehicle and class allocation.</p></div>
        <button onClick={()=>setModal({type:"add"})} className="btn-gold w-full text-xs sm:w-auto"><Plus size={15}/>Add time slot</button>
      </div>
      <div className="divide-y divide-white/5">
        {slots.map(x=><div className="grid gap-3 p-5 md:grid-cols-[95px_105px_1fr_1.1fr_95px_105px] md:items-center" key={x[0]}>
          <span className="text-xs font-bold">{x[1]}</span><span className="text-xs font-bold text-gold-400">{x[2]}</span><span className="text-xs font-semibold">{x[3]}</span><span className="text-xs text-slate-400">{x[4]} · {x[5]}</span><span className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${x[6]==="Booked"?"status-completed":"status-confirmed"}`}>{x[6]}</span><button onClick={()=>manage(x)} className="btn-secondary py-2 text-xs"><Pencil size={13}/>Manage</button>
        </div>)}
      </div>
    </section>
    {modal?.type==="add" && <Modal title="Add time slot" onClose={()=>setModal(null)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Day" value={form.day} onChange={e=>setForm({...form,day:e.target.value})}/><Field label="Time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/>
        <Field label="Course" value={form.course} onChange={e=>setForm({...form,course:e.target.value})}/><Field label="Instructor" value={form.instructor} onChange={e=>setForm({...form,instructor:e.target.value})}/><Field label="Vehicle" value={form.vehicle} onChange={e=>setForm({...form,vehicle:e.target.value})}/>
      </div><button onClick={addSlot} className="btn-gold mt-6"><Save size={15}/>Create slot</button>
    </Modal>}
    {modal?.type==="manage" && <Modal title="Manage schedule" onClose={()=>setModal(null)}><div className="rounded-xl border border-white/5 p-5"><p className="text-sm font-bold">{modal.slot[3]}</p><p className="mt-2 text-xs text-slate-500">{modal.slot[1]} · {modal.slot[2]} · {modal.slot[4]} · {modal.slot[5]}</p></div><div className="mt-5 flex flex-wrap gap-3"><button className="btn-gold" onClick={()=>{setSlots(v=>v.map(s=>s[0]===modal.slot[0]?[...s.slice(0,6),s[6]==="Booked"?"Available":"Booked"]:s));setModal(null)}}>Toggle availability</button><button className="btn-secondary" onClick={()=>{setSlots(v=>v.filter(s=>s[0]!==modal.slot[0]));setModal(null)}}><Trash2 size={14}/>Delete slot</button></div></Modal>}
  </>;
}

function EnquiriesPage() {
  const [data,setData]=useState([
    ["ENQ-501","Priya Sharma","Interested in beginner course","Today","New","+1 555 010 1001","priya@example.com"],
    ["ENQ-500","Michael Reed","Callback for automatic lessons","Today","In Progress","+1 555 010 1002","michael@example.com"],
    ["ENQ-499","Sophia Lee","Corporate driver training","Yesterday","Resolved","+1 555 010 1003","sophia@example.com"],
    ["ENQ-498","David King","Pricing and packages","Yesterday","New","+1 555 010 1004","david@example.com"]
  ]);
  const [selected,setSelected]=useState(null);
  const open=(item)=>setSelected(item);
  const resolve=()=>{setData(v=>v.map(x=>x[0]===selected[0]?[...x.slice(0,4),"Resolved",x[5],x[6]]:x));setSelected(null);};
  return <>
    <PageHero eyebrow="Concierge Desk" title="Customer enquiries" description="Review incoming questions, callback requests and follow-up status from prospective students."/>
    <section className="glass overflow-hidden rounded-2xl">
      <div className="border-b border-white/5 p-6"><h2 className="font-bold">Enquiry inbox</h2><p className="mt-1 text-xs text-slate-600">Open an enquiry to review contact details and follow-up actions.</p></div>
      <div className="divide-y divide-white/5">{data.map(x=><div className="grid gap-4 p-5 lg:grid-cols-[100px_160px_1fr_90px_120px_90px] lg:items-center" key={x[0]}><span className="text-xs font-bold text-gold-400">{x[0]}</span><span className="text-xs font-bold">{x[1]}</span><span className="text-xs text-slate-500">{x[2]}</span><span className="text-xs text-slate-500">{x[3]}</span><span className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${x[4]==="Resolved"?"status-confirmed":"status-pending"}`}>{x[4]}</span><button onClick={()=>open(x)} className="btn-secondary py-2 text-xs"><ExternalLink size={13}/>Open</button></div>)}</div>
    </section>
    {selected && <Modal title={`Enquiry ${selected[0]}`} onClose={()=>setSelected(null)}><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-white/5 p-4"><p className="text-[10px] text-slate-500">Customer</p><p className="mt-1 font-bold">{selected[1]}</p></div><div className="rounded-xl border border-white/5 p-4"><p className="text-[10px] text-slate-500">Date</p><p className="mt-1 font-bold">{selected[3]}</p></div><div className="rounded-xl border border-white/5 p-4"><p className="text-[10px] text-slate-500">Phone</p><p className="mt-1 font-bold">{selected[5]}</p></div><div className="rounded-xl border border-white/5 p-4"><p className="text-[10px] text-slate-500">Email</p><p className="mt-1 font-bold">{selected[6]}</p></div></div><div className="mt-4 rounded-xl border border-gold-500/15 bg-gold-500/5 p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-gold-400">Message</p><p className="mt-2 text-sm leading-6">{selected[2]}</p></div><div className="mt-6 flex flex-wrap gap-3"><a href={`mailto:${selected[6]}`} className="btn-secondary">Email customer</a><a href={`tel:${selected[5]}`} className="btn-secondary">Call customer</a>{selected[4]!=="Resolved"&&<button onClick={resolve} className="btn-gold"><CheckCircle2 size={14}/>Mark resolved</button>}</div></Modal>}
  </>;
}

function InstructorsPage() {
  const [items,setItems]=useState(instructors);
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({name:"",role:"Driving Coach",exp:"5 years",rating:"4.90",sessions:0,status:"Available",specialty:"Defensive"});
  const reset=()=>setForm({name:"",role:"Driving Coach",exp:"5 years",rating:"4.90",sessions:0,status:"Available",specialty:"Defensive"});
  const save=()=>{if(!form.name.trim())return;if(modal.mode==="edit")setItems(v=>v.map(x=>x.name===modal.item.name?{...form}:x));else setItems(v=>[...v,{...form,sessions:Number(form.sessions)||0}]);reset();setModal(null);};
  return <>
    <PageHero eyebrow="People Operations" title="Instructor management" description="Add, edit and remove instructors while monitoring availability, specialties and session capacity."/>
    <div className="mb-6 flex justify-end"><button onClick={()=>{reset();setModal({mode:"add"});}} className="btn-gold text-sm"><Plus size={15}/>Add instructor</button></div>
    <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">{items.map((x,i)=><motion.article key={x.name} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*.04}} className="glass rounded-2xl p-6"><div className="flex items-start justify-between"><div className="flex items-center gap-4"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-500/10 text-sm font-black text-gold-400">{x.name.split(" ").map(v=>v[0]).join("")}</div><div><h3 className="text-base font-bold">{x.name}</h3><p className="mt-1 text-sm text-slate-500">{x.role}</p></div></div><span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${statusClass[x.status]||"status-confirmed"}`}>{x.status}</span></div><div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/5 pt-5"><div><p className="text-[10px] text-slate-500">Experience</p><p className="mt-1 text-sm font-bold">{x.exp}</p></div><div><p className="text-[10px] text-slate-500">Rating</p><p className="mt-1 text-sm font-bold text-gold-400">★ {x.rating}</p></div><div><p className="text-[10px] text-slate-500">Sessions</p><p className="mt-1 text-sm font-bold">{x.sessions}</p></div></div><div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-3"><span className="text-[10px] text-slate-500">Specialty</span><span className="ml-2 text-sm font-bold text-gold-400">{x.specialty}</span></div><div className="mt-5 flex gap-2"><button onClick={()=>{setForm({...x});setModal({mode:"edit",item:x});}} className="btn-secondary flex-1 text-sm"><Pencil size={13}/>Edit</button><button onClick={()=>setItems(v=>v.filter(y=>y.name!==x.name))} className="rounded-xl border border-red-500/15 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10"><Trash2 size={14}/>Delete</button></div></motion.article>)}</section>
    {modal&&<Modal title={modal.mode==="edit"?"Edit instructor":"Add instructor"} onClose={()=>setModal(null)}><div className="grid gap-4 sm:grid-cols-2"><Field label="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Instructor name"/><Field label="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/><Field label="Experience" value={form.exp} onChange={e=>setForm({...form,exp:e.target.value})}/><Field label="Rating" value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})}/><Field label="Sessions" value={form.sessions} onChange={e=>setForm({...form,sessions:e.target.value})}/><Field label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}/><Field label="Specialty" value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})}/></div><button onClick={save} className="btn-gold mt-6"><Save size={15}/>Save instructor</button></Modal>}
  </>;
}

function FleetPage() {
  const [vehicles,setVehicles]=useState(fleet);
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({id:"",model:"",type:"Executive",transmission:"Automatic",mileage:"0 km",status:"Ready",service:"30 days"});
  const add=()=>{if(!form.id||!form.model)return;setVehicles(v=>[...v,form]);setForm({id:"",model:"",type:"Executive",transmission:"Automatic",mileage:"0 km",status:"Ready",service:"30 days"});setModal(false);};
  return <>
    <PageHero eyebrow="Fleet Operations" title="Fleet status & readiness" description="Track every academy vehicle, its operational state, transmission and upcoming service schedule."/>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric Icon={CarFront} label="Total Fleet" value={String(vehicles.length).padStart(2,"0")}/><Metric Icon={CheckCircle2} label="Ready" value={String(vehicles.filter(v=>v.status==="Ready").length).padStart(2,"0")}/><Metric Icon={Wrench} label="Service / Inspection" value={String(vehicles.filter(v=>v.status!=="Ready").length).padStart(2,"0")}/><Metric Icon={Gauge} label="Utilization" value="82%"/></section>
    <section className="mt-8 glass overflow-hidden rounded-2xl"><div className="flex flex-col gap-4 border-b border-white/5 p-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold">Vehicle readiness</h2><p className="mt-1 text-xs text-slate-600">Current fleet allocation and maintenance schedule.</p></div><button onClick={()=>setModal(true)} className="btn-gold text-xs"><Plus size={15}/>Add vehicle</button></div>
      <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[900px]"><thead><tr className="border-b border-white/5 text-left">{["Vehicle","Model","Type","Transmission","Mileage","Status","Next Service","Action"].map(x=><th key={x} className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{x}</th>)}</tr></thead><tbody>{vehicles.map(v=><tr key={v.id} className="border-b border-white/[0.035]"><td className="px-6 py-4 text-xs font-bold text-gold-400">{v.id}</td><td className="px-6 py-4 text-xs font-semibold">{v.model}</td><td className="px-6 py-4 text-xs text-slate-500">{v.type}</td><td className="px-6 py-4 text-xs text-slate-500">{v.transmission}</td><td className="px-6 py-4 text-xs text-slate-500">{v.mileage}</td><td className="px-6 py-4"><span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${statusClass[v.status]||"status-confirmed"}`}>{v.status}</span></td><td className="px-6 py-4 text-xs text-slate-500">{v.service}</td><td className="px-6 py-4"><button onClick={()=>setVehicles(a=>a.filter(x=>x.id!==v.id))} className="rounded-lg border border-white/10 p-2 text-slate-500 hover:text-red-400"><Trash2 size={14}/></button></td></tr>)}</tbody></table></div>
      <div className="divide-y divide-white/5 md:hidden">{vehicles.map(v=><div key={v.id} className="p-5"><div className="flex justify-between"><div><p className="text-xs font-bold text-gold-400">{v.id}</p><p className="mt-1 font-bold">{v.model}</p></div><span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${statusClass[v.status]||"status-confirmed"}`}>{v.status}</span></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div className="rounded-xl border border-white/5 p-3"><p className="text-[10px] text-slate-500">Type</p><p className="mt-1">{v.type}</p></div><div className="rounded-xl border border-white/5 p-3"><p className="text-[10px] text-slate-500">Service</p><p className="mt-1">{v.service}</p></div></div><button onClick={()=>setVehicles(a=>a.filter(x=>x.id!==v.id))} className="btn-secondary mt-4 text-xs"><Trash2 size={13}/>Remove vehicle</button></div>)}</div>
    </section>
    {modal&&<Modal title="Add academy vehicle" onClose={()=>setModal(false)}><div className="grid gap-4 sm:grid-cols-2"><Field label="Vehicle ID" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} placeholder="DW-24"/><Field label="Model" value={form.model} onChange={e=>setForm({...form,model:e.target.value})} placeholder="BMW 3 Series"/><Field label="Type" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}/><Field label="Transmission" value={form.transmission} onChange={e=>setForm({...form,transmission:e.target.value})}/><Field label="Mileage" value={form.mileage} onChange={e=>setForm({...form,mileage:e.target.value})}/><Field label="Next service" value={form.service} onChange={e=>setForm({...form,service:e.target.value})}/></div><button onClick={add} className="btn-gold mt-6"><Save size={15}/>Add vehicle</button></Modal>}
  </>;
}

function AdminProfile({ profile, setProfile }) {
  const { updateUser } = useAuth();
  const [saved, setSaved] = useState(false);
  const photoInputRef = useRef(null);

  const saveProfile = () => {
    updateUser({ name: profile.name, email: profile.email, avatar: profile.avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  const changePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const avatar = String(reader.result);
      setProfile((current) => ({ ...current, avatar }));
      updateUser({ avatar });
    };
    reader.readAsDataURL(file);
  };

  return <>
    <PageHero
      eyebrow="Administrator Account"
      title={<>Manage your <span className="text-gold-gradient">profile.</span></>}
      description="Update administrator contact details, profile photo and account information from one secure workspace."
    />

    <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
      <section className="glass glass-gold rounded-2xl p-7 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-32 w-32 rounded-2xl object-cover ring-2 ring-gold-500/30"
            />
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 grid h-10 w-10 place-items-center rounded-xl border border-gold-400/30 bg-gold-500 text-executive-950 shadow-lg"
              title="Change profile photo"
              aria-label="Change profile photo"
            >
              <Pencil size={16}/>
            </button>
            <input ref={photoInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={changePhoto} className="hidden" />
          </div>
          <h2 className="mt-6 text-xl font-extrabold">{profile.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{profile.role} · DriveWise Academy</p>
          <button type="button" onClick={() => photoInputRef.current?.click()} className="mt-5 text-sm font-semibold text-gold-400 hover:text-gold-300">
            Change profile picture
          </button>
        </div>

        <div className="mt-8 space-y-3">
          {[[ShieldCheck,"Account status","Active"],[UserRound,"Access level","Full administrator access"],[Activity,"Workspace","Operations Center"]].map(([Icon,label,value]) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <Icon size={17} className="text-gold-400"/>
              <div><p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">{label}</p><p className="mt-1 text-xs font-semibold">{value}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div><h2 className="text-lg font-extrabold">Profile information</h2><p className="mt-1 text-xs text-slate-500">Keep your administrator details current.</p></div>
          {saved && <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400"><CheckCircle2 size={15}/>Saved</span>}
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Full name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}/>
          <Field label="Email address" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })}/>
          <Field label="Phone number" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })}/>
          <Field label="Role" value={profile.role}/>
        </div>
        <div className="mt-7 rounded-xl border border-gold-500/10 bg-gold-500/[0.035] p-5">
          <div className="flex items-start gap-3"><ShieldCheck size={18} className="mt-0.5 text-gold-400"/><div><p className="text-sm font-bold">Administrator security</p><p className="mt-1 text-xs leading-5 text-slate-500">Your administrator permissions remain protected. Profile changes update the current session immediately.</p></div></div>
        </div>
        <button type="button" onClick={saveProfile} className="btn-gold mt-8">{saved ? "Profile saved" : "Save profile"} <Save size={15}/></button>
      </section>
    </div>
  </>;
}

function AnalyticsPage() {
  const months = [["Jan",62],["Feb",71],["Mar",68],["Apr",79],["May",74],["Jun",88],["Jul",82],["Aug",94]];
  return <>
    <PageHero eyebrow="Business Intelligence" title="Academy analytics" description="Review revenue, booking volume, pass-rate performance and course demand across the academy."/>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric Icon={TrendingUp} label="Revenue Growth" value="+14.8%"/>
      <Metric Icon={CalendarDays} label="Booking Growth" value="+9.2%"/>
      <Metric Icon={Gauge} label="Pass Rate" value="98.7%"/>
      <Metric Icon={WalletCards} label="Avg. Session" value="$221"/>
    </section>
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between"><div><h2 className="font-bold">Revenue performance</h2><p className="mt-1 text-xs text-slate-600">Monthly index · current year</p></div><span className="rounded-full border border-gold-500/20 bg-gold-500/5 px-3 py-1.5 text-[10px] font-bold text-gold-400">+14.8%</span></div>
        <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">{months.map(([m,v])=><div key={m} className="flex h-full flex-1 flex-col items-center justify-end gap-3"><div className="relative w-full rounded-t-xl bg-gold-500/20" style={{height:`${v}%`}}><div className="absolute inset-x-0 bottom-0 rounded-t-xl bg-gold-500/70" style={{height:`${Math.max(25,v-30)}%`}}/></div><span className="text-[9px] text-slate-600">{m}</span></div>)}</div>
      </div>
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h2 className="font-bold">Course demand</h2><p className="mt-1 text-xs text-slate-600">Share of completed sessions</p>
        {[["Performance Driving","42%"],["Executive Automatic","35%"],["Defensive Driving","23%"]].map(([x,v])=><div key={x} className="mt-6"><div className="flex justify-between text-xs"><span>{x}</span><span className="font-bold text-gold-400">{v}</span></div><div className="mt-2 h-2 rounded-full bg-white/5"><div className="h-full rounded-full bg-gold-500" style={{width:v}}/></div></div>)}
      </div>
    </section>
  </>;
}

function SettingsPage() {
  const [saved,setSaved] = useState(false);
  const [email,setEmail] = useState(true);
  const [alerts,setAlerts] = useState(true);
  const [auto,setAuto] = useState(false);
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),1800); };
  return <>
    <PageHero eyebrow="System Configuration" title="Academy settings" description="Configure operational preferences, notifications, security controls and booking policies."/>
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="glass rounded-2xl p-6 sm:p-8">
        <h2 className="font-bold">General preferences</h2><p className="mt-1 text-xs text-slate-600">Control how the academy workspace behaves.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Academy Name" value="DriveWise Executive Academy"/>
          <Field label="Support Email" value="concierge@drivewise.example"/>
          <Field label="Default Session Duration" value="60 minutes"/>
          <Field label="Currency" value="USD"/>
        </div>
        <div className="mt-8 border-t border-white/5 pt-7">
          <h3 className="text-sm font-bold">Notifications</h3>
          <SettingToggle label="Booking confirmation emails" description="Send an email when a reservation is confirmed." checked={email} setChecked={setEmail}/>
          <SettingToggle label="Operational alerts" description="Notify administrators about fleet and instructor issues." checked={alerts} setChecked={setAlerts}/>
          <SettingToggle label="Automatic booking approval" description="Approve eligible reservations without manual review." checked={auto} setChecked={setAuto}/>
        </div>
        <button onClick={save} className="btn-gold mt-8">{saved ? <><CheckCircle2 size={15}/>Saved</> : "Save Changes"}</button>
      </section>
      <section className="space-y-6">
        <div className="glass rounded-2xl p-6"><div className="flex items-center gap-3"><ShieldCheck className="text-gold-400"/><div><h2 className="font-bold">Security</h2><p className="text-xs text-slate-600">Administrator access controls</p></div></div><div className="mt-6 space-y-3">{["Two-factor authentication","Session timeout · 30 minutes","Login activity monitoring"].map(x=><div key={x} className="flex items-center justify-between rounded-xl border border-white/5 p-4"><span className="text-xs">{x}</span><span className="text-[9px] font-bold uppercase text-emerald-400">Enabled</span></div>)}</div></div>
        <div className="glass rounded-2xl p-6"><div className="flex items-center gap-3"><ClipboardCheck className="text-gold-400"/><div><h2 className="font-bold">Booking policy</h2><p className="text-xs text-slate-600">Current academy rules</p></div></div><ul className="mt-5 space-y-3 text-xs text-slate-500"><li>• Minimum notice: 4 hours</li><li>• Cancellation window: 24 hours</li><li>• Maximum active bookings: 3 per student</li></ul></div>
      </section>
    </div>
  </>;
}

function Metric({Icon,label,value}) {
  return <div className="glass rounded-2xl p-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/15 bg-gold-500/[0.07] text-gold-400"><Icon size={18}/></div><p className="mt-5 text-xs text-slate-500">{label}</p><p className="mt-1 font-jakarta text-2xl font-extrabold">{value}</p></div>;
}
function MiniCard({Icon,title,value,text}) {
  return <div className="glass rounded-2xl p-6"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">{title}</p><p className="mt-2 text-3xl font-extrabold">{value}</p></div><Icon size={22} className="text-gold-400"/></div><div className="mt-4 h-2 rounded-full bg-white/5"><div className="h-full rounded-full bg-gold-500" style={{width:value}}/></div><p className="mt-3 text-[10px] text-slate-600">{text}</p></div>;
}
function Modal({title,onClose,children}) {
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div className="glass w-full max-w-2xl rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4"><h2 className="text-lg font-extrabold">{title}</h2><button onClick={onClose} className="rounded-lg border border-white/10 p-2"><X size={16}/></button></div>
      <div className="mt-6">{children}</div>
    </div>
  </div>;
}

function Field({label,value,onChange,placeholder}) {
  const props = onChange ? { value, onChange } : { defaultValue: value };
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-500">{label}</span><input className="executive-input" {...props} placeholder={placeholder}/></label>;
}
function SettingToggle({label,description,checked,setChecked}) {
  return <div className="flex items-center justify-between gap-5 border-b border-white/5 py-5 last:border-0"><div><p className="text-xs font-bold">{label}</p><p className="mt-1 text-[10px] leading-5 text-slate-600">{description}</p></div><button type="button" onClick={()=>setChecked(!checked)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked?"bg-gold-500":"bg-slate-700"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${checked?"left-6":"left-1"}`}/></button></div>;
}
function Logo() {
  return <Link to="/" aria-label="DriveWise home" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-xs font-black text-gold-400">DW</div><div><p className="font-jakarta text-xs font-extrabold tracking-[0.2em]">DRIVEWISE</p><p className="text-[9px] uppercase tracking-[0.2em] text-gold-400">Executive Academy</p></div></Link>;
}
