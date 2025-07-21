export const DataStreams = () => {
  return (
    <>
      {/* Vertical Data Streams */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent animate-data-stream"
          style={{
            left: `${10 + i * 7}%`,
            height: '100vh',
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}

      {/* Horizontal Scan Lines */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-cyber-flow"
          style={{
            top: `${15 + i * 10}%`,
            width: '100vw',
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}

      {/* Particle Streams */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-secondary rounded-full animate-cyber-flow"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}

      {/* Corner Data Flows */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 128 128">
          <path
            d="M0 0 L128 0 L128 128"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4,4"
            className="animate-cyber-flow"
          />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 128 128">
          <path
            d="M128 0 L0 0 L0 128"
            stroke="hsl(var(--accent))"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4,4"
            className="animate-cyber-flow"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 128 128">
          <path
            d="M0 128 L0 0 L128 0"
            stroke="hsl(var(--secondary))"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4,4"
            className="animate-cyber-flow"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 128 128">
          <path
            d="M128 128 L128 0 L0 0"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4,4"
            className="animate-cyber-flow"
          />
        </svg>
      </div>
    </>
  );
};