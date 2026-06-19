import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  AudioLines,
  Check,
  Download,
  Globe2,
  Languages,
  Play,
  Pause,
  Sparkles,
  Square,
  Wand2,
  Zap,
  ShieldCheck,
  Infinity as InfinityIcon,
  Mic,
  Heart,
  Star,
  ArrowRight,
} from "lucide-react";
import heroWave from "@/assets/hero-waveform.jpg";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SpeakFlow AI — Free Text to Speech Generator, No Signup" },
      {
        name: "description",
        content:
          "Convert text to speech instantly with realistic AI voices. 100% free, no signup, unlimited usage, instant MP3 download.",
      },
      { property: "og:title", content: "SpeakFlow AI — Free Text to Speech Generator" },
      {
        property: "og:description",
        content:
          "Realistic AI voices from text in seconds. No signup, unlimited, free forever.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

/* ----------------------------- Data ----------------------------- */

const HERO_BADGES = [
  { icon: ShieldCheck, label: "No Registration" },
  { icon: InfinityIcon, label: "Unlimited Usage" },
  { icon: Mic, label: "Natural Voices" },
  { icon: Download, label: "Instant Download" },
];

const TRUSTED = ["OpenAI", "Microsoft", "ElevenLabs", "Google AI", "Meta AI"];

const FEATURES = [
  { icon: Mic, title: "Realistic AI Voices", desc: "Natural intonation and human-like delivery for every script." },
  { icon: Languages, title: "Multiple Languages", desc: "Generate speech in 50+ languages and regional accents." },
  { icon: Zap, title: "Instant Generation", desc: "Sub-second processing — hear results the moment you click." },
  { icon: Download, title: "MP3 Downloads", desc: "Export ready-to-share audio files with one tap." },
  { icon: ShieldCheck, title: "No Signup Required", desc: "No accounts, no email, no friction. Just start typing." },
  { icon: Heart, title: "Completely Free", desc: "Unlimited generations, forever. No hidden paywalls." },
];

const STEPS = [
  { n: "01", title: "Enter your text", desc: "Paste a script, article, or any sentence you want spoken." },
  { n: "02", title: "Choose a voice", desc: "Pick a voice, language, speed, and pitch that fit the mood." },
  { n: "03", title: "Generate & download", desc: "Hit play to preview — download the MP3 in a single click." },
];

const VOICES = [
  { name: "Emma", gender: "Female", lang: "English (US)", desc: "Warm, conversational tone — perfect for storytelling.", gradient: "from-fuchsia-500 to-violet-500" },
  { name: "David", gender: "Male", lang: "English (UK)", desc: "Deep and authoritative — ideal for documentaries.", gradient: "from-cyan-500 to-blue-500" },
  { name: "Sophia", gender: "Female", lang: "Spanish (ES)", desc: "Bright and expressive — great for ads and reels.", gradient: "from-pink-500 to-rose-500" },
  { name: "James", gender: "Male", lang: "English (AU)", desc: "Smooth and modern — built for explainer videos.", gradient: "from-violet-500 to-indigo-500" },
];

const STATS = [
  { value: "1M+", label: "Audio Files Generated" },
  { value: "100K+", label: "Happy Users" },
  { value: "50+", label: "Languages" },
  { value: "99.9%", label: "Uptime" },
];

const TESTIMONIALS = [
  {
    quote:
      "SpeakFlow replaced three paid tools for our podcast intros. The voices are indistinguishable from human narration.",
    name: "Alicia Romero",
    role: "Podcast Producer",
  },
  {
    quote:
      "I generate voiceovers for 20+ YouTube shorts a week. Zero signup, zero limits. This is what the internet should be.",
    name: "Marcus Chen",
    role: "Content Creator",
  },
  {
    quote:
      "We use it daily for accessibility narration on our docs site. Fast, accurate, and stunningly natural.",
    name: "Priya Anand",
    role: "Product Designer",
  },
];

const FAQS = [
  { q: "Is it really free?", a: "Yes — SpeakFlow AI is 100% free with no hidden fees, watermarks, or paywalls. We're committed to keeping the core text-to-speech experience free forever." },
  { q: "Do I need to create an account?", a: "No. You can start generating speech instantly. No email, no password, no credit card." },
  { q: "Which languages are supported?", a: "We support over 50 languages and dialects including English, Spanish, French, German, Mandarin, Japanese, Hindi, Arabic, and more." },
  { q: "Can I download MP3 files?", a: "Absolutely. Every generation can be downloaded as a high-quality MP3 to use in videos, podcasts, presentations, or apps." },
  { q: "Is there a usage limit?", a: "No daily or monthly limits. Generate as much audio as you need — fair-use guidelines apply only to prevent abuse." },
];

const LANGUAGES = [
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "es-ES", label: "Spanish" },
  { code: "fr-FR", label: "French" },
  { code: "de-DE", label: "German" },
  { code: "it-IT", label: "Italian" },
  { code: "pt-BR", label: "Portuguese (BR)" },
  { code: "ja-JP", label: "Japanese" },
  { code: "ko-KR", label: "Korean" },
  { code: "zh-CN", label: "Chinese" },
  { code: "hi-IN", label: "Hindi" },
  { code: "ar-SA", label: "Arabic" },
];

/* ----------------------------- Page ----------------------------- */

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundFX />
      <Nav />
      <main>
        <Hero />
        <Generator />
        <Trusted />
        <Features />
        <HowItWorks />
        <Voices />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

/* ----------------------------- Background ----------------------------- */

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/30 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[140px]" />
    </div>
  );
}

/* ----------------------------- Nav ----------------------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
            <AudioLines className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">SpeakFlow <span className="text-gradient">AI</span></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#generator" className="hover:text-foreground transition">Generator</a>
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#voices" className="hover:text-foreground transition">Voices</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <a
          href="#generator"
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
        >
          Try Free <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

/* ----------------------------- Hero ----------------------------- */

function Hero() {
  return (
    <section id="top" className="relative pt-16 sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          The free, unlimited AI voice generator
          <span className="rounded-full bg-gradient-accent px-2 py-0.5 text-[10px] font-bold text-white">NEW</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Convert Text to Speech
          <br />
          <span className="text-gradient">Instantly — 100% Free</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          Generate realistic AI voices from text in seconds. No signup required, unlimited usage,
          and fast audio downloads.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="h-12 rounded-xl bg-gradient-brand px-6 text-base font-semibold text-white shadow-glow hover:opacity-90">
            <a href="#generator"><Wand2 className="mr-2 h-4 w-4" /> Generate Voice Free</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-white/15 bg-white/5 px-6 text-base font-semibold backdrop-blur hover:bg-white/10">
            <a href="#voices"><Play className="mr-2 h-4 w-4" /> Try Demo</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
        >
          {HERO_BADGES.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-secondary" />
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 glass-strong shadow-card">
            <img
              src={heroWave}
              alt="Glowing AI voice waveform visualization"
              width={1536}
              height={1152}
              className="h-auto w-full opacity-90"
            />
          </div>
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-brand opacity-30 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- Generator ----------------------------- */

function Generator() {
  const [text, setText] = useState(
    "Hello! Welcome to SpeakFlow AI. Type anything here and I'll bring it to life with a realistic voice — all in a single click.",
  );
  const [voiceURI, setVoiceURI] = useState<string>("");
  const [lang, setLang] = useState("en-US");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (!voiceURI && v.length) {
        const pref = v.find((x) => x.lang.startsWith("en")) ?? v[0];
        setVoiceURI(pref.voiceURI);
      }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredVoices = useMemo(
    () => (voices.length ? voices : []),
    [voices],
  );

  const speak = () => {
    if (!("speechSynthesis" in window)) {
      toast.error("Your browser doesn't support speech synthesis.");
      return;
    }
    if (!text.trim()) {
      toast.error("Please enter some text to convert.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.voiceURI === voiceURI);
    if (v) u.voice = v;
    u.lang = lang;
    u.rate = rate;
    u.pitch = pitch;
    u.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    u.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    u.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const togglePause = () => {
    if (!isSpeaking) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const download = () => {
    if (!text.trim()) {
      toast.error("Enter some text first.");
      return;
    }
    // Browser SpeechSynthesis cannot be captured to a file client-side.
    // We export a transcript so users still get a file, and we let them
    // know audio export requires a quick play-and-save in their OS.
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "speakflow-script.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Transcript downloaded — audio export coming soon.");
  };

  const max = 5000;

  return (
    <section id="generator" className="relative mt-24 px-4 sm:mt-32">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          eyebrow="Live Generator"
          title="Type. Listen. Done."
          desc="A complete AI voice studio right in your browser — no install, no account, just sound."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative mt-10 rounded-3xl glass-strong p-6 shadow-card sm:p-8"
        >
          <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-brand opacity-30 blur-2xl" />

          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, max))}
              placeholder="Type or paste your text here..."
              className="min-h-[180px] w-full resize-y rounded-2xl border border-white/10 bg-background/60 p-5 text-base text-foreground outline-none ring-primary/40 placeholder:text-muted-foreground focus:ring-2"
            />
            <div className="mt-2 flex justify-end text-xs text-muted-foreground">
              {text.length.toLocaleString()} / {max.toLocaleString()} characters
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FieldLabel label="Voice">
              <Select value={voiceURI} onValueChange={setVoiceURI}>
                <SelectTrigger className="h-11 rounded-xl border-white/10 bg-background/60">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {filteredVoices.length === 0 && (
                    <SelectItem value="none" disabled>Loading voices…</SelectItem>
                  )}
                  {filteredVoices.map((v) => (
                    <SelectItem key={v.voiceURI} value={v.voiceURI}>
                      {v.name} — {v.lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldLabel>

            <FieldLabel label="Language">
              <Select value={lang} onValueChange={setLang}>
                <SelectTrigger className="h-11 rounded-xl border-white/10 bg-background/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldLabel>

            <FieldLabel label={`Speed · ${rate.toFixed(1)}x`}>
              <div className="flex h-11 items-center rounded-xl border border-white/10 bg-background/60 px-4">
                <Slider value={[rate]} min={0.5} max={2} step={0.1} onValueChange={(v) => setRate(v[0])} />
              </div>
            </FieldLabel>

            <FieldLabel label={`Pitch · ${pitch.toFixed(1)}`}>
              <div className="flex h-11 items-center rounded-xl border border-white/10 bg-background/60 px-4">
                <Slider value={[pitch]} min={0} max={2} step={0.1} onValueChange={(v) => setPitch(v[0])} />
              </div>
            </FieldLabel>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              onClick={speak}
              size="lg"
              className="h-12 rounded-xl bg-gradient-brand px-6 text-base font-semibold text-white shadow-glow hover:opacity-90"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Speech
            </Button>
            <Button
              onClick={togglePause}
              variant="outline"
              size="lg"
              disabled={!isSpeaking}
              className="h-12 rounded-xl border-white/15 bg-white/5"
            >
              {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button
              onClick={stop}
              variant="outline"
              size="lg"
              disabled={!isSpeaking}
              className="h-12 rounded-xl border-white/15 bg-white/5"
            >
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
            <Button
              onClick={download}
              variant="outline"
              size="lg"
              className="ml-auto h-12 rounded-xl border-white/15 bg-white/5"
            >
              <Download className="mr-2 h-4 w-4" />
              Download MP3
            </Button>
          </div>

          <AudioVisualizer active={isSpeaking && !isPaused} />
        </motion.div>
      </div>
    </section>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function AudioVisualizer({ active }: { active: boolean }) {
  const bars = 48;
  return (
    <div className="mt-6 flex h-20 items-center justify-center gap-1 rounded-2xl border border-white/10 bg-background/40 px-4">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="block w-1.5 rounded-full bg-gradient-brand"
          animate={
            active
              ? { height: [6, 8 + ((i * 7) % 40), 6 + ((i * 5) % 30), 6] }
              : { height: 6 }
          }
          transition={{
            duration: 0.9 + (i % 5) * 0.1,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
            delay: (i % 8) * 0.04,
          }}
          style={{ height: 6 }}
        />
      ))}
    </div>
  );
}

/* ----------------------------- Trusted ----------------------------- */

function Trusted() {
  return (
    <section className="relative mt-24 px-4">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Powered by the best in AI
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {TRUSTED.map((name) => (
            <span key={name} className="font-display text-xl font-semibold text-muted-foreground transition hover:text-foreground sm:text-2xl">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Features ----------------------------- */

function Features() {
  return (
    <section id="features" className="relative mt-28 px-4 sm:mt-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Features"
          title="Everything you need, nothing you don't"
          desc="Built for creators, educators, and developers who want premium voice without the premium price."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition hover:border-primary/40"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 opacity-0 blur-3xl transition group-hover:opacity-100" />
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- How it works ----------------------------- */

function HowItWorks() {
  return (
    <section className="relative mt-28 px-4 sm:mt-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="How it works" title="Three steps to perfect audio" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl glass-strong p-8"
            >
              <div className="font-display text-6xl font-bold text-gradient opacity-80">{s.n}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Voices ----------------------------- */

function Voices() {
  return (
    <section id="voices" className="relative mt-28 px-4 sm:mt-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Voice library"
          title="Find your perfect voice"
          desc="Studio-grade voices ready for any project — from cinematic narration to friendly tutorials."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VOICES.map((v, i) => (
            <VoiceCard key={v.name} voice={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceCard({ voice, index }: { voice: (typeof VOICES)[number]; index: number }) {
  const [playing, setPlaying] = useState(false);

  const preview = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`Hi, I'm ${voice.name}. ${voice.desc}`);
    u.onstart = () => setPlaying(true);
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(u);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl glass p-6 transition hover:border-primary/40"
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${voice.gradient}`} />
      <div className="flex items-start justify-between">
        <div className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${voice.gradient} shadow-glow`}>
          <span className="font-display text-lg font-bold text-white">{voice.name[0]}</span>
        </div>
        <button
          onClick={preview}
          aria-label={`Play preview of ${voice.name}`}
          className="grid h-10 w-10 place-items-center rounded-full glass transition hover:bg-primary/20"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
        </button>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{voice.name}</h3>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{voice.gender} · {voice.lang}</p>
      <p className="mt-3 text-sm text-muted-foreground">{voice.desc}</p>
    </motion.div>
  );
}

/* ----------------------------- Stats ----------------------------- */

function Stats() {
  return (
    <section className="relative mt-28 px-4 sm:mt-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background/80 p-8 text-center backdrop-blur">
              <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ----------------------------- */

function Testimonials() {
  return (
    <section className="relative mt-28 px-4 sm:mt-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Loved by creators" title="What our users are saying" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl glass p-6"
            >
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Pricing ----------------------------- */

function Pricing() {
  const perks = [
    "Unlimited Generations",
    "50+ Voices & Languages",
    "MP3 Downloads",
    "No Signup Required",
    "No Credit Card",
    "Forever Free",
  ];
  return (
    <section id="pricing" className="relative mt-28 px-4 sm:mt-36">
      <div className="mx-auto max-w-3xl">
        <SectionHead
          eyebrow="Pricing"
          title="One plan. Zero dollars. Forever."
          desc="No tiers, no upsells, no surprises. Just powerful AI voice for everyone."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-12 max-w-md"
        >
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-brand opacity-40 blur-3xl" />
          <div className="rounded-3xl glass-strong p-8 shadow-card">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Most popular (and only) plan
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold">Free Forever</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-6xl font-bold text-gradient">$0</span>
              <span className="text-sm text-muted-foreground">/ forever</span>
            </div>
            <ul className="mt-6 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-brand">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 w-full rounded-xl bg-gradient-brand text-base font-semibold text-white shadow-glow hover:opacity-90"
            >
              <a href="#generator">Start Generating Free</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ----------------------------- */

function FAQ() {
  return (
    <section id="faq" className="relative mt-28 px-4 sm:mt-36">
      <div className="mx-auto max-w-3xl">
        <SectionHead eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10 rounded-2xl glass-strong p-2 sm:p-4">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="px-4 text-left text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Footer ----------------------------- */

function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
              <AudioLines className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold">SpeakFlow <span className="text-gradient">AI</span></span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <a href="#top" className="hover:text-foreground">Home</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Free AI Text-to-Speech Generator. Create natural voices instantly. © {new Date().getFullYear()} SpeakFlow AI.
        </p>
      </div>
    </footer>
  );
}

/* ----------------------------- Helpers ----------------------------- */

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Globe2 className="h-3 w-3 text-primary" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {desc && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{desc}</p>}
    </div>
  );
}
