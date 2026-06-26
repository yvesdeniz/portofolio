/**
 * Ambient backdrop. Three quiet layers, all fixed + non-interactive:
 *   1. a faint accent glow bleeding from the top (ties the accent into the air)
 *   2. a vignette that sinks the edges into the warm black
 *   3. fine film grain so the flat dark never looks like dead pixels
 * Intentionally restrained — the magnetic dock is where the boldness goes.
 */
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* accent glow from the top — follows --color-accent */}
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(60% 80% at 50% -10%, color-mix(in oklab, var(--color-accent) 14%, transparent), color-mix(in oklab, var(--color-accent) 4%, transparent) 40%, transparent 70%)",
        }}
      />
      {/* mid-page ambient blob — gives the frosted cards something to refract */}
      <div
        className="absolute left-1/2 top-[38%] h-[42vh] w-[80vw] max-w-3xl -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 72%)",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage: `url("${GRAIN}")`,
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}
