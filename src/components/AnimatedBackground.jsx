export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.035] opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Blue Glow */}
      <div
        className="
          absolute
          w-[280px] h-[280px]
          sm:w-[350px] sm:h-[350px]
          md:w-[450px] md:h-[450px]
          bg-blue-600/10 dark:bg-blue-600/20
          rounded-full
          blur-[90px] md:blur-[120px]
          -top-20 -left-20
          md:-top-32 md:-left-32
          animate-pulse
        "
      />

      {/* Purple Glow */}
      <div
        className="
          absolute
          w-[260px] h-[260px]
          sm:w-[320px] sm:h-[320px]
          md:w-[400px] md:h-[400px]
          bg-purple-600/10 dark:bg-purple-600/15
          rounded-full
          blur-[90px] md:blur-[120px]
          -bottom-20 -right-16
          md:-bottom-32 md:-right-20
          animate-pulse
        "
        style={{ animationDelay: "1.5s" }}
      />

      {/* Floating Blue Particle */}
      <div
        className="
          absolute
          top-[15%] left-[12%]
          w-1.5 h-1.5
          sm:w-2 sm:h-2
          bg-blue-400
          rounded-full
          animate-ping
          opacity-40 dark:opacity-50
        "
      />

      {/* Floating Purple Particle */}
      <div
        className="
          absolute
          top-[25%] right-[15%]
          w-1 h-1
          sm:w-1.5 sm:h-1.5
          bg-purple-400
          rounded-full
          animate-ping
          opacity-30 dark:opacity-40
        "
        style={{ animationDelay: "1s" }}
      />

      {/* Floating Cyan Particle */}
      <div
        className="
          absolute
          bottom-[20%] left-[20%]
          w-1 h-1
          sm:w-1.5 sm:h-1.5
          bg-cyan-400
          rounded-full
          animate-ping
          opacity-30 dark:opacity-40
        "
        style={{ animationDelay: "2s" }}
      />

    </div>
  );
}