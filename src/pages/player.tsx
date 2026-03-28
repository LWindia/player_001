import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Activity, Shield, Target, Trophy } from "lucide-react";

export default function Player() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <p className="text-secondary font-mono tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              STATUS: ACTIVE
            </p>
            <h1 className="text-6xl font-display font-black text-white neon-text-red">PLAYER #052831</h1>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground font-mono text-sm mb-1">CURRENT RANK</p>
            <p className="text-3xl font-display font-bold text-white">1,402 / 52,831</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Episodes Survived", val: "3", icon: Shield },
            { label: "Skills Earned", val: "12", icon: Target },
            { label: "Win Rate", val: "68%", icon: Activity },
            { label: "Prize Share", val: "₹4,500", icon: Trophy }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded relative overflow-hidden">
              <stat.icon className="absolute right-4 top-4 w-12 h-12 text-white/5" />
              <p className="text-xs text-muted-foreground font-mono mb-2 uppercase">{stat.label}</p>
              <p className="text-3xl font-display font-bold text-white">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Intel Feed */}
        <div className="bg-card border border-white/10 rounded-lg overflow-hidden">
          <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-display font-bold text-white tracking-widest uppercase">Action Log</h3>
          </div>
          <div className="p-0">
            {[
              { time: "2 hours ago", action: "Successfully negotiated resource allocation", ep: "EP_03" },
              { time: "1 day ago", action: "Received Strategy Toolkit upgrade", ep: "SYS" },
              { time: "3 days ago", action: "Survived Market Crash scenario", ep: "EP_02" },
            ].map((log, i) => (
              <div key={i} className="px-6 py-4 border-b border-white/5 last:border-0 flex gap-4 hover:bg-white/5 transition-colors">
                <span className="font-mono text-xs text-primary pt-1">{log.ep}</span>
                <div>
                  <p className="text-white text-sm md:text-base">{log.action}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
