import { useState, type FormEvent } from "react";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";
// Stanwell, Staines-upon-Thames (approx)
const CENTER = { lat: 51.4569, lng: -0.4675 };
const RADIUS_MILES = 40;
// Haversine distance in miles
function distanceMiles(lat: number, lng: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat - CENTER.lat);
  const dLng = toRad(lng - CENTER.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(CENTER.lat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
type Result =
  | { kind: "ok"; postcode: string; distance: number; eligible: boolean }
  | { kind: "error"; message: string };
// Rough bounding box for 40 miles around Stanwell → OSM embed bbox
// 1 deg lat ≈ 69mi, 1 deg lng ≈ 43mi at 51.5°N
const dLat = RADIUS_MILES / 69;
const dLng = RADIUS_MILES / 43;
const bbox = [
  CENTER.lng - dLng,
  CENTER.lat - dLat,
  CENTER.lng + dLng,
  CENTER.lat + dLat,
].join(",");
const OSM_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${CENTER.lat},${CENTER.lng}
  `;
export function CoverageChecker() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = postcode.trim().toUpperCase();
    if (!clean) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`,
      );
      if (!res.ok) {
        setResult({ kind: "error", message: "Postcode not found. Please check and try again." });
        return;
      }
      const json = (await res.json()) as {
        result: { latitude: number; longitude: number; postcode: string };
      };
      const d = distanceMiles(json.result.latitude, json.result.longitude);
      setResult({
        kind: "ok",
        postcode: json.result.postcode,
        distance: d,
        eligible: d <= RADIUS_MILES,
      });
    } catch {
      setResult({ kind: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }
  return (
    <section id="coverage" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Coverage area
          </div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Are we in your area?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We cover a <strong>40-mile radius</strong> around Stanwell, Staines-upon-Thames.
            Pop in your postcode to check.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
            <iframe
              title="Coverage area map"
              src={OSM_SRC}
              className="h-[420px] w-full"
              loading="lazy"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-64 w-64 rounded-full border-2 border-accent/70 bg-accent/10 sm:h-80 sm:w-80" />
            </div>
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs text-muted-foreground shadow">
              Approx. 40-mile radius from Stanwell
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-3xl border border-border bg-card p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="postcode" className="text-sm font-medium">
                Enter your postcode
              </label>
              <div className="flex gap-2">
                <input
                  id="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g. TW19 7AA"
                  maxLength={10}
                  className="flex-1 rounded-full border border-input bg-background px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
                </button>
              </div>
            </form>
            {result && result.kind === "error" && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
                <XCircle className="mt-0.5 h-5 w-5 text-destructive" />
                <p>{result.message}</p>
              </div>
            )}
            {result && result.kind === "ok" && result.eligible && (
              <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 text-accent" />
                  <div>
                    <p className="font-semibold">You're in our coverage area</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.postcode} is approximately{" "}
                      <strong>{result.distance.toFixed(1)} miles</strong> from Stanwell. Book
                      a repair below.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {result && result.kind === "ok" && !result.eligible && (
              <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-6 w-6 text-destructive" />
                  <div>
                    <p className="font-semibold">Just outside our area</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.postcode} is about{" "}
                      <strong>{result.distance.toFixed(1)} miles</strong> from Stanwell —
                      beyond our 40-mile service radius. Give us a call, we may still be
                      able to help.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <p className="mt-6 text-xs text-muted-foreground">
              Powered by postcodes.io · Distances are straight-line approximations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
