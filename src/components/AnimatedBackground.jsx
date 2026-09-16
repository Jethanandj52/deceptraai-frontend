export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Blue Glow */}
      <div className="absolute w-[450px] h-[450px] bg-blue-600/20 rounded-full blur-[120px] -top-32 -left-32 animate-pulse" />

      {/* Purple Glow */}
      <div
        className="absolute w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] -bottom-32 -right-20 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Floating Blue Particle */}
      <div className="absolute top-[15%] left-[12%] w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-50" />

      {/* Floating Purple Particle */}
      <div
        className="absolute top-[25%] right-[15%] w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-40"
        style={{ animationDelay: "1s" }}
      />

      {/* Floating Cyan Particle */}
      <div
        className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-40"
        style={{ animationDelay: "2s" }}
      />

    </div>
  );
}