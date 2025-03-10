import React, { useMemo, useState, useEffect } from "react";

const Decorations: React.FC = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient]);

  const stars = useMemo(() =>
    Array.from({ length: 50 }).map((_, i) => ({
      size: Math.random() * 3 + 1, // Kleinere sterren
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.6 + 0.4,
      animationDuration: `${Math.random() * 5 + 3}s`,
      animationDelay: `${Math.random() * 3}s`,
    })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Moon */}
      <div className="absolute top-10 right-10 md:top-20 md:right-20">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-accent opacity-90 animate-float-glow" />
      </div>

      {/* Stars with smooth movement */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full shadow-md animate-star-fade"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: isClient ? `calc(${star.top}% + ${(mouseY - window.innerHeight / 2) * 0.01}px)` : `${star.top}%`,
            left: isClient ? `calc(${star.left}% + ${(mouseX - window.innerWidth / 2) * 0.01}px)` : `${star.left}%`,
            opacity: star.opacity,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
            transition: "top 0.3s ease-out, left 0.3s ease-out", // Nog vloeiendere beweging
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 1))", // Betere gloed
          }}
        />
      ))}

      {/* Mosque silhouette */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="w-full h-32 md:h-48 opacity-40">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,300 L0,200 L50,200 L75,150 L100,200 L150,200 L175,100 L200,200 L250,200 L275,150 L300,200 L350,200 L400,200 L425,100 L450,200 L500,200 L525,50 L550,200 L600,200 L650,200 L675,150 L700,200 L750,200 L775,100 L800,200 L850,200 L875,150 L900,200 L950,200 L1000,200 L1000,300 Z"
              fill="var(--secondary)"
              className="transition-all duration-500 ease-in-out hover:fill-[#30b0b0]"
            />
          </svg>
        </div>
      </div>

      {/* Floating lanterns */}
      {[
        { top: "25%", left: "10px", delay: "0s", className: "animate-lantern-1" },
        { top: "33%", right: "10px", delay: "1s", className: "animate-lantern-2" },
        { bottom: "25%", left: "25%", delay: "2s", className: "animate-lantern-3" },
      ].map((lantern, i) => (
        <div
          key={i}
          className={`absolute w-8 h-12 bg-primary rounded-t-full opacity-70 ${lantern.className}`}
          style={{ animationDuration: "8s", animationDelay: lantern.delay, ...lantern }}
        />
      ))}
    </div>
  );
};

export default Decorations;
