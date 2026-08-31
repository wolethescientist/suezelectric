import Image, { type StaticImageData } from "next/image";

/**
 * A photograph, brought into the palette.
 *
 * The site is otherwise entirely type, vector and texture, which reads as a design
 * system rather than a company. One or two real photographs — an agent at a kiosk,
 * a hand at a meter, a Suez truck on an Abuja street — do more for credibility than
 * any further polish. Stock imagery would undo that, so this takes your own.
 *
 * The `.plate` treatment in globals.css strips the image to luminance and runs it
 * through an ink-to-voltage ramp, so any JPEG dropped in belongs to the page
 * immediately rather than sitting on top of it as a foreign rectangle.
 *
 *   import kiosk from "@/public/photos/kiosk.jpg";
 *   <Plate src={kiosk} alt="An agent issuing a token at a kiosk in Wuse" caption="Wuse II, Abuja" />
 *
 * Give every photograph a real alt description — these are evidence, not decoration.
 */
export function Plate({
  src,
  alt,
  caption,
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  src: StaticImageData | string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={className}>
      <div className="plate relative aspect-[4/5] w-full rounded-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 border-t border-ink-line pt-3 font-label text-[0.6875rem] uppercase tracking-[0.09em] text-fg-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
