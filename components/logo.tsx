import Image from "next/image";
import Link from "next/link";
import logoOnInk from "@/public/logo-dark.png";
import logoOnBone from "@/public/logo.png";

/**
 * The real SuezElectric lockup. Two variants of the same artwork: the wordmark's
 * "Electric" is black in the supplied file, so the ink variant carries a bone
 * "Electric" instead. The bulb's bolt is a genuine knockout in the original, so it
 * takes on whatever sits behind it — which is why both variants are transparent PNGs
 * rather than one file with a baked background.
 */
export function Logo({
  tone = "ink",
  className = "h-7 w-auto",
  priority = false,
}: {
  tone?: "ink" | "bone";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "ink" ? logoOnInk : logoOnBone}
      alt="SuezElectric"
      className={className}
      priority={priority}
      sizes="(max-width: 640px) 160px, 320px"
    />
  );
}

/** Header lockup: the logo plus the registration number as a mono tick. */
export function Wordmark({
  tone = "ink",
  priority = false,
}: {
  tone?: "ink" | "bone";
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="SuezElectric — home"
      className="group flex items-center gap-3"
    >
      <Logo tone={tone} className="h-6 w-auto sm:h-8" priority={priority} />
      <span
        className={`hidden font-label text-[0.5625rem] uppercase tracking-[0.09em] opacity-55 transition-opacity duration-300 group-hover:opacity-100 lg:block ${
          tone === "ink" ? "text-fg-ink-muted" : "text-fg-bone-muted"
        }`}
      >
        RC 1638998
      </span>
    </Link>
  );
}
