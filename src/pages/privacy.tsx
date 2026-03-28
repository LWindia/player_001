import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto prose prose-invert prose-p:text-muted-foreground prose-headings:font-display prose-headings:uppercase">
        <h1>Privacy Policy</h1>
        <p>Your privacy in the real world is respected. Your actions in the arena are public.</p>
        
        <h2>Information We Collect</h2>
        <p>When you activate your Player Identity, we collect basic demographic information: Name, Age, City, Contact Details, and Educational/Professional background. This is used strictly for verification and cohort balancing.</p>
        
        <h2>Arena Data</h2>
        <p>Once you enter the arena, your decisions, strategies, and communications within the platform are recorded. This data is used to generate your rank, determine outcomes, and may be broadcast to the viewing audience as part of the reality game format.</p>
        
        <h2>Data Security</h2>
        <p>We employ industry-standard security measures to protect your personal information from unauthorized access. Your real-world identity is shielded behind your Player Number in public broadcasts unless you reach the final elite stages where disclosure is a condition of participation.</p>
      </div>
      <Footer />
    </div>
  );
}
