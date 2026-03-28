import { useEffect, useRef, useState } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import Register from "@/pages/register";
import Arena from "@/pages/arena";
import Game from "@/pages/game";
import Journey from "@/pages/journey";
import Viewers from "@/pages/viewers";
import Application from "@/pages/application";
import Careers from "@/pages/careers";
import Sponsorship from "@/pages/sponsorship";
import ThankYou from "@/pages/thank-you";
import Invite from "@/pages/invite";
import Rewards from "@/pages/rewards";
import Opportunities from "@/pages/opportunities";
import Faq from "@/pages/faq";
import Legal from "@/pages/legal";
import Player from "@/pages/player";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Enquire from "@/pages/enquire";
import ThankYou2 from "@/pages/thank-you2";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();
const introVideoSrc = "https://res.cloudinary.com/dymamigxu/video/upload/v1773858778/1_ny22zc.mp4";
const INTRO_LAST_SEEN_KEY = "player001_intro_last_seen_at";
const INTRO_COOLDOWN_MS = 2 * 60 * 60 * 1000;

function shouldShowIntroNow() {
  if (typeof window === "undefined") return true;

  try {
    const raw = window.localStorage.getItem(INTRO_LAST_SEEN_KEY);
    if (!raw) return true;
    const lastSeenAt = Number(raw);
    if (!Number.isFinite(lastSeenAt)) return true;
    return Date.now() - lastSeenAt >= INTRO_COOLDOWN_MS;
  } catch {
    return true;
  }
}

function markIntroSeen() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(INTRO_LAST_SEEN_KEY, String(Date.now()));
  } catch {
    // Ignore storage failures and continue app flow.
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/arena" component={Arena} />
      <Route path="/game" component={Game} />
      <Route path="/journey" component={Journey} />
      <Route path="/viewers" component={Viewers} />
      <Route path="/application" component={Application} />
      <Route path="/careers" component={Careers} />
      <Route path="/sponsorship" component={Sponsorship} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/invite" component={Invite} />
      <Route path="/rewards" component={Rewards} />
      <Route path="/opportunities" component={Opportunities} />
      <Route path="/faq" component={Faq} />
      <Route path="/legal" component={Legal} />
      <Route path="/player" component={Player} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/enquire" component={Enquire} />
      <Route path="/thank-you2" component={ThankYou2} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AnimatedRoutes() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Router />
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => shouldShowIntroNow());
  const [introExiting, setIntroExiting] = useState(false);
  const [awaitingAudioStart, setAwaitingAudioStart] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const exitTimerRef = useRef<number | null>(null);

  const finishIntro = () => {
    if (!showIntro || introExiting) return;
    markIntroSeen();
    setIntroExiting(true);
    exitTimerRef.current = window.setTimeout(() => {
      setShowIntro(false);
      setIntroExiting(false);
      exitTimerRef.current = null;
    }, 650);
  };

  const playIntroWithAudio = async () => {
    const video = introVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    await video.play();
  };

  useEffect(() => {
    if (!showIntro) return;

    playIntroWithAudio()
      .catch(() => {
        // Some browsers block autoplay with sound until user interaction.
        setAwaitingAudioStart(true);
      });
  }, [showIntro]);

  const handleManualAudioStart = () => {
    playIntroWithAudio()
      .then(() => {
        setAwaitingAudioStart(false);
      })
      .catch(() => {
        finishIntro();
      });
  };

  useEffect(() => {
    return () => {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div
          className={`transition-opacity duration-700 ease-out ${showIntro ? "opacity-0" : "opacity-100"}`}
          style={{ pointerEvents: showIntro ? "none" : "auto" }}
        >
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AnimatedRoutes />
          </WouterRouter>
          <Toaster />
        </div>

        {showIntro ? (
          <div
            className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ease-out ${
              introExiting ? "opacity-0" : "opacity-100"
            }`}
            onPointerDown={awaitingAudioStart ? handleManualAudioStart : undefined}
            onKeyDown={awaitingAudioStart ? handleManualAudioStart : undefined}
            role={awaitingAudioStart ? "button" : undefined}
            tabIndex={awaitingAudioStart ? 0 : undefined}
          >
            <video
              ref={introVideoRef}
              src={introVideoSrc}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                introExiting ? "scale-[1.02]" : "scale-100"
              }`}
              playsInline
              preload="auto"
              onEnded={finishIntro}
              onError={finishIntro}
            />
            {awaitingAudioStart ? (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-sm border border-white/20 bg-black/60 text-white text-[12px] tracking-[0.16em] font-display uppercase">
                Tap to see World&apos;s Biggest Survival Reality Game
              </div>
            ) : null}
          </div>
        ) : null}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
