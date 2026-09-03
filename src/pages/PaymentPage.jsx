import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft, CheckCircle2, CreditCard, LockKeyhole, ShieldCheck,
  Smartphone, Building2, WalletCards, ReceiptText, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
import DirectionToggle from "../components/DirectionToggle";
import { Logo } from "../components/PublicLayout";
import { useAuth } from "../context/AuthContext";

const PAYMENT_OPTIONS = [
  { id: "card", label: "Card", icon: CreditCard, help: "Visa, Mastercard, RuPay and Amex" },
  { id: "upi", label: "UPI", icon: Smartphone, help: "Google Pay, PhonePe, Paytm and more" },
  { id: "netbanking", label: "Net Banking", icon: Building2, help: "All major Indian banks" },
  { id: "wallet", label: "Wallet", icon: WalletCards, help: "Supported digital wallets" }
];

export default function PaymentPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const bookingId = params.get("booking") || "DW-10492";
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [form, setForm] = useState({
    cardName: user?.name || "Olivia Bennett",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upi: ""
  });

  const booking = useMemo(() => ({
    id: bookingId,
    course: params.get("course") || "Executive Automatic",
    instructor: params.get("instructor") || "Sofia Laurent",
    date: params.get("date") || "Sep 10, 2026",
    time: params.get("time") || "11:00 AM",
    amount: Number(params.get("amount") || 179)
  }), [bookingId, params]);

  const transactionId = useMemo(
    () => `DW-TXN-${Math.floor(100000 + Math.random() * 899999)}`,
    []
  );

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const pay = (event) => {
    event.preventDefault();
    setProcessing(true);

    // Demo checkout. Replace this function with the backend payment-gateway call later.
    setTimeout(() => {
      const payment = {
        transactionId,
        bookingId: booking.id,
        amount: booking.amount,
        status: "Paid",
        method,
        date: new Date().toISOString()
      };
      localStorage.setItem(`drivewise_payment_${booking.id}`, JSON.stringify(payment));
      localStorage.setItem("drivewise_last_payment", JSON.stringify(payment));
      setProcessing(false);
      setPaid(true);
    }, 900);
  };

  if (paid) {
    return (
      <div className="payment-page min-h-screen bg-executive-950 text-white">
        <header className="border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5 sm:px-8">
            <Link to="/dashboard" aria-label="Back to student dashboard"><Logo /></Link>
            <div className="flex items-center gap-2">
              <DirectionToggle />
              <ThemeToggle compact />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, scale: .97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass glass-gold rounded-3xl p-8 text-center sm:p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-500 text-executive-950 shadow-goldStrong"
            >
              <CheckCircle2 size={42} />
            </motion.div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
              Payment successful
            </p>
            <h1 className="mt-3 font-jakarta text-3xl font-extrabold sm:text-4xl">
              Your session is confirmed.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Your payment has been recorded and your DriveWise booking is now ready.
            </p>

            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-left">
              <div className="flex items-center gap-3">
                <ReceiptText className="text-gold-400" size={20} />
                <div>
                  <p className="text-xs text-slate-500">Transaction ID</p>
                  <p className="mt-1 font-bold">{transactionId}</p>
                </div>
                <p className="ml-auto text-xl font-extrabold">${booking.amount}</p>
              </div>
              <div className="mt-5 grid gap-4 border-t border-white/5 pt-5 sm:grid-cols-2">
                <div><p className="text-[10px] uppercase tracking-wider text-slate-600">Course</p><p className="mt-1 text-sm font-bold">{booking.course}</p></div>
                <div><p className="text-[10px] uppercase tracking-wider text-slate-600">Instructor</p><p className="mt-1 text-sm font-bold">{booking.instructor}</p></div>
                <div><p className="text-[10px] uppercase tracking-wider text-slate-600">Date</p><p className="mt-1 text-sm font-bold">{booking.date}</p></div>
                <div><p className="text-[10px] uppercase tracking-wider text-slate-600">Time</p><p className="mt-1 text-sm font-bold">{booking.time}</p></div>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/dashboard" className="btn-gold">
                Go to dashboard <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-secondary"
              >
                Print receipt
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="payment-page min-h-screen bg-executive-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-[1250px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/dashboard" className="shrink-0" aria-label="Back to student dashboard"><Logo /></Link>
          <div className="flex shrink-0 items-center gap-1.5">
            <DirectionToggle />
            <ThemeToggle compact />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1250px] px-5 py-8 sm:px-8 sm:py-12">
        <Link to="/dashboard" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-gold-400">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-400">DriveWise Secure Checkout</p>
          <h1 className="mt-2 font-jakarta text-3xl font-extrabold sm:text-4xl">Complete your payment</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            Secure your driving session now. This frontend checkout is ready to connect to your payment gateway.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={pay} className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <LockKeyhole size={20} className="text-gold-400" />
              <div>
                <h2 className="font-bold">Payment method</h2>
                <p className="mt-1 text-xs text-slate-500">Choose how you want to pay.</p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PAYMENT_OPTIONS.map(({ id, label, icon: Icon, help }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    method === id
                      ? "border-gold-500/50 bg-gold-500/10 text-gold-400"
                      : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20"
                  }`}
                >
                  <Icon size={19} />
                  <span className="mt-3 block text-sm font-bold">{label}</span>
                  <span className="mt-1 block text-[10px] leading-4 text-slate-500">{help}</span>
                </button>
              ))}
            </div>

            {method === "card" && (
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-400">Cardholder name</span>
                  <input required className="executive-input" value={form.cardName} onChange={(e) => update("cardName", e.target.value)} placeholder="Name on card" />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-400">Card number</span>
                  <input required inputMode="numeric" maxLength={19} className="executive-input" value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value.replace(/[^\d ]/g, ""))} placeholder="4242 4242 4242 4242" />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-semibold text-slate-400">Expiry</span>
                  <input required maxLength={5} className="executive-input" value={form.expiry} onChange={(e) => update("expiry", e.target.value)} placeholder="MM/YY" />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-semibold text-slate-400">CVV</span>
                  <input required inputMode="numeric" maxLength={4} className="executive-input" value={form.cvv} onChange={(e) => update("cvv", e.target.value.replace(/\D/g, ""))} placeholder="123" />
                </label>
              </div>
            )}

            {method === "upi" && (
              <div className="mt-7">
                <label>
                  <span className="mb-2 block text-sm font-semibold text-slate-400">UPI ID</span>
                  <input required className="executive-input" value={form.upi} onChange={(e) => update("upi", e.target.value)} placeholder="yourname@upi" />
                </label>
              </div>
            )}

            {(method === "netbanking" || method === "wallet") && (
              <div className="mt-7">
                <label>
                  <span className="mb-2 block text-sm font-semibold text-slate-400">
                    {method === "netbanking" ? "Select bank" : "Select wallet"}
                  </span>
                  <select required className="executive-input" defaultValue="">
                    <option value="" disabled>Choose an option</option>
                    {method === "netbanking" ? (
                      <>
                        <option>HDFC Bank</option><option>ICICI Bank</option><option>State Bank of India</option><option>Axis Bank</option>
                      </>
                    ) : (
                      <>
                        <option>Paytm Wallet</option><option>PhonePe Wallet</option><option>Amazon Pay</option>
                      </>
                    )}
                  </select>
                </label>
              </div>
            )}

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-gold-500/10 bg-gold-500/[0.04] p-4">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-gold-400" />
              <p className="text-xs leading-5 text-slate-400">
                Your payment details are handled securely. Do not enter real card credentials in this demo checkout.
              </p>
            </div>

            <button disabled={processing} className="btn-gold mt-7 w-full disabled:cursor-wait disabled:opacity-60">
              {processing ? "Processing payment..." : `Pay $${booking.amount}`}
              {!processing && <ArrowRight size={17} />}
            </button>
          </form>

          <aside className="glass glass-gold h-fit rounded-2xl p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-400">Booking summary</p>
            <h2 className="mt-4 text-xl font-extrabold">{booking.course}</h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4"><span className="text-slate-500">Booking ID</span><b>{booking.id}</b></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Instructor</span><b>{booking.instructor}</b></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Date</span><b>{booking.date}</b></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Time</span><b>{booking.time}</b></div>
            </div>
            <div className="my-6 h-px bg-white/10" />
            <div className="flex items-end justify-between">
              <div><p className="text-xs text-slate-500">Total due</p><p className="mt-1 text-3xl font-extrabold">${booking.amount}</p></div>
              <p className="text-xs font-bold text-gold-400">USD</p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={15} className="text-emerald-400" />
              Secure demo checkout
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
