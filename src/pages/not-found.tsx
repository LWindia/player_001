import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center border border-white/10 p-12 rounded-xl bg-card">
        <AlertCircle className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
        <h1 className="text-4xl font-display font-bold mb-4 uppercase tracking-widest text-white">404 - Void</h1>
        <p className="text-muted-foreground mb-8">This sector of the arena does not exist.</p>
        <Link 
          href="/" 
          className="inline-block border border-primary text-primary px-8 py-3 font-display font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all neon-box-red"
        >
          Return to Base
        </Link>
      </div>
    </div>
  );
}
