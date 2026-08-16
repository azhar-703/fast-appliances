import washerAssembled from "@/assets/washer-assembled.svg";
import washerExploded from "@/assets/washer-exploded.svg";
import fridgeAssembled from "@/assets/fridge-assembled.svg";
import fridgeExploded from "@/assets/fridge-exploded.svg";
import ovenAssembled from "@/assets/oven-assembled.svg";
import ovenExploded from "@/assets/oven-exploded.svg";
const APPLIANCES = [
  { name: "Washing Machine", assembled: washerAssembled, exploded: washerExploded },
  { name: "Fridge & Freezer", assembled: fridgeAssembled, exploded: fridgeExploded },
  { name: "Oven", assembled: ovenAssembled, exploded: ovenExploded },
];
// Per-appliance window length (seconds). Smoother + a bit longer so the
// disassemble / reassemble has time to breathe.
const PER_APPLIANCE = 10;
const CYCLE_SECONDS = APPLIANCES.length * PER_APPLIANCE;
// Cubic-bezier easings tuned for mechanical motion (gentle in, settled out).
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
export function ApplianceLoop() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-muted/40 via-background to-muted/20">
      <style>{`
        @keyframes appl-show {
          0%, 4%    { opacity: 0; transform: scale(0.97); }
          10%, 30%  { opacity: 1; transform: scale(1); }
          33%, 100% { opacity: 0; transform: scale(1.02); }
        }
        /* Assembled view: visible at the ends, fades out cleanly while exploded view grows. */
        @keyframes assembled-fade {
          0%, 18%   { opacity: 1; transform: scale(1); }
          30%, 70%  { opacity: 0; transform: scale(0.94); }
          82%, 100% { opacity: 1; transform: scale(1); }
        }
        /* Exploded view: parts drift apart, hold, then settle back. */
        @keyframes exploded-fade {
          0%, 18%   { opacity: 0; transform: scale(1.06) rotate(-0.4deg); }
          32%, 68%  { opacity: 1; transform: scale(1) rotate(0deg); }
          82%, 100% { opacity: 0; transform: scale(1.06) rotate(0.4deg); }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes label-pulse {
          0%, 20%   { opacity: 0; transform: translate(-50%, 4px); }
          34%, 66%  { opacity: 1; transform: translate(-50%, 0); }
          80%, 100% { opacity: 0; transform: translate(-50%, 4px); }
        }
      `}</style>
      {APPLIANCES.map((a, i) => (
        <div
          key={a.name}
          className="absolute inset-0"
          style={{
            animation: `appl-show ${CYCLE_SECONDS}s ${EASE_IN_OUT} ${PER_APPLIANCE * i}s infinite`,
            opacity: 0,
          }}
        >
          <div
            className="absolute inset-0"
            style={{ animation: `float-y 5s ${EASE_IN_OUT} infinite` }}
          >
            {/* Assembled view */}
            <img
              src={a.assembled}
              alt={`${a.name} assembled`}
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-contain p-6"
              style={{
                animation: `assembled-fade ${PER_APPLIANCE}s ${EASE_IN_OUT} infinite`,
                filter: "drop-shadow(0 20px 30px rgb(0 0 0 / 0.15))",
              }}
            />
            {/* Exploded view — slight delay creates a stagger so parts appear to lift out
                after the body fades, then settle back before the body returns. */}
            <img
              src={a.exploded}
              alt={`${a.name} exploded parts diagram`}
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-contain p-2"
              style={{
                animation: `exploded-fade ${PER_APPLIANCE}s ${EASE_OUT} 0.25s infinite`,
                filter: "drop-shadow(0 20px 30px rgb(0 0 0 / 0.15))",
              }}
            />
          </div>
          {/* Label — staggered slightly after the exploded view so it reads as a caption. */}
          <div
            className="absolute bottom-4 left-1/2 rounded-full bg-background/85 px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground shadow-sm backdrop-blur"
            style={{
              animation: `label-pulse ${PER_APPLIANCE}s ${EASE_IN_OUT} 0.5s infinite`,
              transform: "translateX(-50%)",
            }}
          >
            {a.name} · real internal components
          </div>
        </div>
      ))}
    </div>
  );
}
