import Link from "next/link";
import { Contours, Guilloche } from "@/components/texture";
import { Reveal, WipeLines } from "@/components/reveal";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-28">
      <Contours origin={{ x: 68, y: 44 }} rings={30} />
      <Guilloche className="pointer-events-none absolute -right-40 top-1/4 h-[32rem] w-[32rem] opacity-25" />

      <Reveal className="measure relative" immediate>
        <div className="eyebrow" style={{ "--i": 0 } as React.CSSProperties}>
          Error 404
        </div>
        <h1 className="mt-7 text-display-l">
          <WipeLines lines={["Nothing metered", "at this address."]} />
        </h1>
        <p
          className="mt-8 max-w-lg text-body-l text-fg-ink-muted"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          The page you asked for does not exist. If you followed a link from
          somewhere on this site, tell us and we will fix it.
        </p>
        <div
          className="mt-10 flex flex-wrap gap-3"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <Link href="/" className="btn btn-voltage">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Report a broken link
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
