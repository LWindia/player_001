import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  colorType: "white" | "red" | "green";
}

export function ParticleBackground({ color = "255, 255, 255", density = 1.0 }: { color?: string, density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let resizeTimeoutId: number;

    const initParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      
      const particleCount = Math.floor((window.innerWidth * window.innerHeight / 10000) * density);
      
      for (let i = 0; i < particleCount; i++) {
        const rand = Math.random();
        let colorType: "white" | "red" | "green" = "white";
        if (rand < 0.1) colorType = "red";
        else if (rand < 0.2) colorType = "green";

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5 - 0.1, // Slight upward drift
          opacity: Math.random() * 0.5 + 0.1,
          colorType
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        let particleColor = `rgba(${color}, ${p.opacity})`;
        if (p.colorType === "red") particleColor = `rgba(255, 46, 46, ${p.opacity + 0.3})`;
        else if (p.colorType === "green") particleColor = `rgba(0, 255, 136, ${p.opacity + 0.3})`;

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineOpacity = (1 - dist / 120) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    initParticles();
    drawParticles();

    const handleResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = window.setTimeout(initParticles, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeoutId);
    };
  }, [color, density]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
