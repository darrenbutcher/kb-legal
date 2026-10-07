import type { CSSProperties } from "react";

const lead = "We do one thing, and we do it well –".split(" ");
const emphasis = ["corporate", "law."];

// Each word rises out of its own clipping mask, one after another, like type
// being set; the emphasised phrase lands last and is underlined in sage.
// The full sentence stays in the DOM as plain text for readers and crawlers.
export function HeroHeading({ className = "" }: { className?: string }) {
  return (
    <h1 className={`hero-heading ${className}`}>
      {lead.map((word, i) => (
        <Word key={i} index={i}>
          {word}
        </Word>
      ))}{" "}
      <em className="hero-emphasis font-normal italic">
        {emphasis.map((word, i) => (
          <Word key={i} index={lead.length + i} last={i === emphasis.length - 1}>
            {word}
          </Word>
        ))}
      </em>
    </h1>
  );
}

function Word({
  children,
  index,
  last = false,
}: {
  children: string;
  index: number;
  last?: boolean;
}) {
  return (
    <>
      <span className="hero-word">
        <span
          className="hero-word-inner"
          style={{ "--i": index } as CSSProperties}
        >
          {children}
        </span>
      </span>
      {last ? null : " "}
    </>
  );
}
