import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { createBooking, getBookedSlots } from "@/lib/api/checkout.functions";
import {
  Phone,
  Wrench,
  ShieldCheck,
  Clock,
  Star,
  WashingMachine,
  Refrigerator,
  Microwave,
  ChefHat,
  ArrowRight,
  CheckCircle2,
  Snowflake,
  ChevronLeft,
  Award,
  MapPin,
  Users,
  PoundSterling,
  Sparkles,
  MessageSquare,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { ApplianceLoop } from "@/components/ApplianceLoop";
import { CoverageChecker } from "@/components/CoverageChecker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const PHONE_DISPLAY = "07827 045534";
const PHONE_TEL = "tel:+447827045534";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Appliance Repair — Same-Day 4.7★ Local Engineers" },
      {
        name: "description",
        content:
          "Same-day & next-day appliance repair by trusted local engineers. Washing machines, fridges, ovens, dishwashers andmore. 4.7★ across 224 reviews.",
      },
      { property: "og:title", content: "Appliance Repair — Same-Day 4.7★ Local Engineers" },
      {
        property: "og:description",
        content:
          "Same-day & next-day appliance repair by trusted local engineers. 4.7★ across 224 reviews. Book today.",
      },
    ],
  }),
  component: Index,
});
type InstallOption = "Freestanding" | "Integrated" | "American style";
type Service = {
  icon: typeof WashingMachine;
  title: string;
  desc: string;
  installOptions: InstallOption[];
  pricing: Partial<Record<InstallOption, number>>;
};
const services: Service[] = [
  {
    icon: WashingMachine,
    title: "Washing Machines",
    desc: "Drum, motor, pump and electronic faults — repaired on-site.",
    installOptions: ["Freestanding", "Integrated"],
    pricing: { Freestanding: 75, Integrated: 90 },
  },
  {
    icon: Refrigerator,
    title: "Fridges & Freezers",
    desc: "Cooling, compressor, thermostat and seal repairs.",
    installOptions: ["Freestanding", "Integrated", "American style"],
    pricing: { Freestanding: 75, Integrated: 90, "American style": 110 },
  },
  {
    icon: ChefHat,
    title: "Ovens",
    desc: "Heating element, thermostat, fan and door seal repairs.",
    installOptions: ["Freestanding", "Integrated"],
    pricing: { Freestanding: 75, Integrated: 90 },
  },
  {
    icon: Snowflake,
    title: "Dryers & Dishwashers",
    desc: "Drainage, heating and sensor diagnostics.",
    installOptions: ["Freestanding", "Integrated"],
    pricing: { Freestanding: 75, Integrated: 90 },
  },
  {
    icon: Microwave,
    title: "Microwaves",
    desc: "Magnetron, door switch and turntable repairs.",
    installOptions: ["Freestanding", "Integrated"],
    pricing: { Freestanding: 75, Integrated: 90 },
  },
];
const steps = [
  { n: "01", title: "Call or book online", desc: "Tell us the appliance and the symptom in under a minute." },
  { n: "02", title: "Same-day or next-day visit", desc: "Engineer arrives in a clear time window. Same-day slots close at 6pm." },
  { n: "03", title: "Fix on the spot", desc: "Most jobs completed in a single visit with a 90-day warranty." },
];
const reviews = [
  {
    name: "Ryan Tiller",
    text: "Washing machine broke down mid-cycle. They scheduled a same-day visit. The technician was polite, knowledgeable and well-prepared with parts.",
    tag: "Washing machine",
  },
  {
    name: "Chrissie T.",
    text: "Reasonable pricing, clear quote upfront, and an engineer who knew his way around an oven.",
    tag: "Oven",
  },
  {
    name: "Marcus L.",
    text: "Fridge stopped cooling on a Friday evening. They came out Saturday morning, diagnosed the compressor issue and had it running again by noon.",
    tag: "Fridge",
  },
  {
    name: "Priya K.",
    text: "Had two appliances that needed attention — a dryer and a dishwasher. One visit, both sorted, and the warranty gives real peace of mind.",
    tag: "Dryer & Dishwasher",
  },
];
function Index() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Wrench className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Fast Appliances Repair</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#reviews" className="transition-colors hover:text-foreground">Reviews</a>
            <a href="#why-us" className="transition-colors hover:text-foreground">Why us</a>
            <a href="#coverage" className="transition-colors hover:text-foreground">Coverage</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
        </div>
      </header>
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-24 lg:pb-32">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Same-day before 6pm · next-day available
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Broken appliance? <span className="italic text-muted-foreground">Fixed today or tomorrow.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Trusted local engineers for washing machines, fridges and ovens.
              Transparent pricing and a 90-day repair warranty.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                See services <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="font-semibold">4.7</span>
                <span className="text-muted-foreground">· 224 Google reviews</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4" /> 90-day warranty
              </div>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute-inset-4 rounded-[2rem] opacity-30 blur-3xl"
              style={{ background: "var(--gradient-warm)" }}
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[var(--shadow-elegant)]">
            <div className="aspect-[4/5] w-full">
              <ApplianceLoop />
            </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-border bg-background/95 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Avg. response</p>
                    <p className="text-xs text-muted-foreground">Under 3 hours</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">90 days</p>
                  <p className="text-xs text-muted-foreground">Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Services</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Every appliance, one team.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Tap any service to see typical pricing and book a visit.
              We diagnose, source parts and repair — often in a single visit.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => setActiveService(service)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 text-left transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-elegant)] focus:outline-none  focus:ring-2 focus:ring-accent"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-accent">
                    View pricing & book <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section id="how" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Process</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Three steps to a working appliance.
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-8">
                <span className="text-xs font-medium tracking-widest text-muted-foreground">{s.n}</span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "4.7★", v: "Google rating" },
            { k: "224+", v: "Verified reviews" },
            { k: "<3h", v: "Average response" },
            { k: "90 days", v: "Repair warranty" },
          ].map((s) => (
            <div key={s.v}>
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl">{s.k}</p>
              <p className="mt-2 text-sm text-primary-foreground/70">{s.v}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="reviews" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Reviews</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                What customers say.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.7 from 224 Google reviews</span>
            </div>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <figure
                key={r.name}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground/90">
                  "{r.text}"
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-sm font-semibold">{r.name}</span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                    {r.tag}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section id="why-us" className="border-y border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Why us</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Why customers choose Fast Appliances Repair.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Local engineers, honest pricing and repairs that last — that's why 224+ customers rate us 4.7★.
            </p>
          </div>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "Same-day before 6pm",
                desc: "Call or book before 6pm and we'll aim to be with you the same day. Next-day slots are always available.",
              },
              {
                icon: PoundSterling,
                title: "Fixed repair price",
                desc: "£75 for freestanding appliances, £90 for integrated, and £110 for American-style fridge freezers. No hidden charges.",
              },
              {
                icon: MapPin,
                title: "Truly local engineers",
                desc: "Your engineer is based nearby, not in a distant call centre. We know the area and the brands local homes use.",
              },
              {
                icon: ShieldCheck,
                title: "90-day warranty",
                desc: "Every repair is covered for 90 days on parts and labour. If the same fault returns, we put it right.",
              },
              {
                icon: Sparkles,
                title: "Genuine parts",
                desc: "We fit manufacturer-approved parts where possible, so your appliance performs like it should and lastslonger.",
              },
              {
                icon: Award,
                title: "4.7★ rated service",
                desc: "224+ verified Google reviews and counting. Customers mention our speed, honesty and tidy workmanship most often.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-elegant)]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CoverageChecker />
      <section id="contact" className="px-6 pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground sm:p-16">
          <div
            aria-hidden
            className="absolute-right-24-top-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-warm)" }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Get it fixed today.
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/75">
                Call now for a same-day visit. We'll quote upfront, fix in one trip
                where possible, and back the work for 90 days.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="font-semibold">{PHONE_DISPLAY}</span>
                </div>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  <Phone className="h-4 w-4" /> Call now
                </a>
                <CopyPhoneButton />
                <a
                  href="https://wa.me/447827045534"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href="sms:+447827045534"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  <MessageSquare className="h-4 w-4" /> Text us
                </a>
                <a
                  href="mailto:fastappliancesrepair4u@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  <Mail className="h-4 w-4" /> fastappliancesrepair4u@gmail.com
                </a>
              </div>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                "Transparent quote before any work",
                "Most jobs completed in a single visit",
                "Genuine parts with 90-day warranty",
                "Qualified, insured engineers",
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                  <span className="text-primary-foreground/90">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Fast Appliances Repair. All rights reserved.</p>
          <p>Same-day local appliance repair · 4.7★ on Google</p>
        </div>
      </footer>
      <BookingDialog
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </div>
  );
}
const TIME_SLOTS = Array.from({ length: 8 }, (_, i) => {
  const hour = 8 + i * 2;
  const label =
    hour === 12 ? "12:00 pm" : hour < 12 ? `${hour}:00 am` : `${hour - 12}:00 pm`;
  return { value: `${hour}:00`, label };
});
type BookingData = {
  manufacturer: string;
  installType: InstallOption | "";
  postcode: string;
  name: string;
  phone: string;
  email: string;
  day: "today" | "tomorrow" | "";
  time: string;
};
const EMPTY: BookingData = {
  manufacturer: "",
  installType: "",
  postcode: "",
  name: "",
  phone: "",
  email: "",
  day: "",
  time: "",
};
function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function BookingDialog({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(EMPTY);
  const [done, setDone] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const now = new Date();
  const todayStr = toYMD(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = toYMD(tomorrow);
  const sameDayCutoff = now.getHours() >= 18; // same-day disabled after 6pm
  const currentHour = now.getHours();
  const selectedDate =
    data.day === "today" ? todayStr : data.day === "tomorrow" ? tomorrowStr : "";
  useEffect(() => {
    if (!selectedDate) return;
    let cancelled = false;
    setLoadingSlots(true);
    getBookedSlots({ data: { date: selectedDate } })
      .then((res) => {
        if (cancelled) return;
        setBookedTimes(res?.times ?? []);
        setLoadingSlots(false);
      })
      .catch(() => {
        if (cancelled) return;
        setBookedTimes([]);
        setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedDate]);
  const reset = () => {
    setStep(0);
    setData(EMPTY);
    setDone(false);
    setError(null);
    setBookedTimes([]);
  };
  const close = () => {
    onClose();
    setTimeout(reset, 200);
  };
  const update = <K extends keyof BookingData>(k: K, v: BookingData[K]) =>
    setData((d) => ({ ...d, [k]: v, ...(k === "day" ? { time: "" } : {}) }));
  const canNext =
    (step === 1 && data.manufacturer.trim() && data.installType) ||
    (step === 2 && /^[A-Z0-9 ]{5,8}$/i.test(data.postcode.trim())) ||
    (step === 3 &&
      data.name.trim() &&
      /^[0-9+\s()-]{7,}$/.test(data.phone.trim()) &&
      /^\S+@\S+\.\S+$/.test(data.email.trim())) ||
    (step === 4 && data.day && data.time);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canNext || !service || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await createBooking({
        data: {
          serviceTitle: service.title,
          manufacturer: data.manufacturer.trim(),
          installType: data.installType as InstallOption,
          postcode: data.postcode.trim().toUpperCase(),
          customerName: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          bookingDate: selectedDate,
          bookingTime: `${data.time}:00`,
        },
      });
      if (result.error === "slot_taken") {
        setSubmitting(false);
        setError(
          "Sorry — that slot was just booked by someone else. Please pick another time.",
        );
        const refreshed = await getBookedSlots({ data: { date: selectedDate } });
        setBookedTimes(refreshed?.times ?? []);
        update("time", "");
        return;
      }
      if (!result.ok) {
        setSubmitting(false);
        setError("Couldn't save the booking. Please try again or call us.");
        return;
      }
      setSubmitting(false);
      setDone(true);
    } catch {
      setSubmitting(false);
      setError(
        "Couldn't save the booking. Please try again or call us to book by phone.",
      );
    }
  };
  return (
    <Dialog
      open={!!service}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {service && !done && step === 0 && (
          <DetailsView service={service} onBook={() => setStep(1)} />
        )}
        {service && !done && step > 0 && (
          <>
            <DialogHeader>
              <div className="mb-3 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <service.icon className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-xl tracking-tight">
                    Book {service.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs">
                    Step {step} of 4
                  </DialogDescription>
                </div>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      n <= step ? "bg-accent" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </DialogHeader>
            <form onSubmit={submit} className="mt-4 space-y-4">
              {step === 1 && (
                <div className="space-y-4">
                  <Field label="Manufacturer">
                    <input
                      autoFocus
                      type="text"
                      placeholder="e.g. Bosch, Samsung, LG"
                      value={data.manufacturer}
                      onChange={(e) => update("manufacturer", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Installation type">
                    <div className={`grid gap-2 ${service.installOptions.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                      {service.installOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("installType", opt)}
                          className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                            data.installType === opt
                              ? "border-accent bg-accent/10 text-foreground"
                              : "border-border bg-card text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          <span className="block">{opt}</span>
                          <span className="mt-1 block text-xs font-semibold text-accent">
                            £{service.pricing[opt]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              )}
              {step === 2 && (
                <Field label="Full postcode">
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. SW1A 1AA"
                    value={data.postcode}
                    onChange={(e) =>
                      update("postcode", e.target.value.toUpperCase())
                    }
                    className={inputCls}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    We use this to assign your nearest engineer.
                  </p>
                </Field>
              )}
              {step === 3 && (
                <div className="space-y-3">
                  <Field label="Full name">
                    <input
                      autoFocus
                      type="text"
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone number">
                    <input
                      type="tel"
                      placeholder="07…"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email address">
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <Field label="Visit day">
                    <div className="grid grid-cols-2 gap-2">
                      {([
                        { key: "today", label: "Today", disabled: sameDayCutoff },
                        { key: "tomorrow", label: "Tomorrow", disabled: false },
                      ] as const).map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          disabled={opt.disabled}
                          onClick={() => update("day", opt.key)}
                          className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                            data.day === opt.key
                              ? "border-accent bg-accent/10 text-foreground"
                              : "border-border bg-card text-muted-foreground hover:bg-muted"
                          } disabled:cursor-not-allowed disabled:opacity-40`}
                        >
                          {opt.label}
                          {opt.disabled && (
                            <span className="ml-1 text-[10px]">(after 6pm)</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </Field>
                  {data.day && (
                    <Field label="Preferred time (8am – 10pm)">
                      {loadingSlots ? (
                        <p className="text-xs text-muted-foreground">
                          Checking availability…
                        </p>
                      ) : (
                        <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto pr-1">
                          {TIME_SLOTS.map((slot) => {
                            const hour = parseInt(slot.value.split(":")[0], 10);
                            const isPast =
                              data.day === "today" && hour <= currentHour;
                            const isBooked = bookedTimes.includes(slot.value);
                            const disabled = isPast || isBooked;
                            return (
                              <button
                                key={slot.value}
                                type="button"
                                disabled={disabled}
                                onClick={() => update("time", slot.value)}
                                className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                                  data.time === slot.value
                                    ? "border-accent bg-accent/10 text-foreground"
                                    : "border-border bg-card text-muted-foreground hover:bg-muted"
                                } disabled:cursor-not-allowed disabled:line-through disabled:opacity-40`}
                                title={
                                  isBooked
                                    ? "Already booked"
                                    : isPast
                                      ? "Time has passed"
                                      : ""
                                }
                              >
                                {slot.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        Greyed-out slots are already booked or no longer available.
                      </p>
                    </Field>
                  )}
                  {data.installType && (
                    <div className="rounded-xl border border-border bg-muted/40 p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Callout fee (paid to engineer)
                      </p>
                      <p className="mt-1 flex items-baseline gap-2">
                        <span className="text-3xl font-semibold tracking-tight">
                          £{service.pricing[data.installType as InstallOption]}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Cash or card accepted on the day
                        </span>
                      </p>
                    </div>
                  )}
                  {error && (
                    <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                      {error}
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between gap-2 pt-2">
                {step >= 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <span />
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => setStep((s) => s + 1)}
                    className="inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canNext || submitting}
                    className="inline-flex items-center gap-1 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40  disabled:hover:scale-100"
                  >
                    {submitting ? "Booking…" : "Confirm booking"}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
        {service && done && (
          <div className="py-4 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <DialogTitle className="mt-5 text-2xl tracking-tight">
              Booking confirmed
            </DialogTitle>
            <DialogDescription className="mt-2">
              We've received your booking request for {data.phone}. An engineer will
              arrive around{" "}
              {TIME_SLOTS.find((s) => s.value === data.time)?.label}.
            </DialogDescription>
            <button
              onClick={close}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
const inputCls =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
function DetailsView({ service, onBook }: { service: Service; onBook: () => void }) {
  const Icon = service.icon;
  return (
    <div className="py-2">
      <DialogHeader>
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Icon className="h-8 w-8" />
          </div>
          <div className="text-left">
            <DialogTitle className="text-3xl font-semibold tracking-tight">
              {service.title}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm">
              {service.desc}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <div className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Repair pricing
        </p>
        <div className={`mt-4 grid gap-3 ${service.installOptions.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {service.installOptions.map((opt) => (
            <div
              key={opt}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-sm font-medium text-muted-foreground">{opt}</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight">
                £{service.pricing[opt]}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Diagnosis + labour
              </p>
            </div>
          ))}
        </div>
        <ul className="mt-6 space-y-2 text-sm">
          {[
            "No hidden charges",
            "Parts not included",
            "90-day repair warranty",
            "Same-day before 6pm · next-day available",
          ].map((p) => (
            <li key={p} className="flex items-start gap-2 text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <a
          href={PHONE_TEL}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
        >
          <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
        </a>
        <button
          type="button"
          onClick={onBook}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          Book this repair <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875  1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719  2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-11.429A9.935 9.935 0 0 0 12 2C6.477 2 2  6.477 2 12c0 1.89.525 3.66 1.44 5.168L2 22l5.05-1.372A9.934 9.934 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2.953 12  2.953z" />
    </svg>
  );
}
function CopyPhoneButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const text = PHONE_DISPLAY;
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      success = false;
    }
    if (!success) {
      // Fallback for older browsers or non-secure contexts
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        success = document.execCommand("copy");
      } catch {
        success = false;
      }
      document.body.removeChild(textarea);
    }
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
      aria-label={copied ? "Phone number copied" : "Copy phone number"}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" /> Copy number
        </>
      )}
    </button>
  );
}
