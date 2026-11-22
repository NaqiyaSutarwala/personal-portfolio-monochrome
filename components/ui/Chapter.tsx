import type { ReactNode } from "react";

interface ChapterProps {
  id: string;
  tone: "ink" | "paper";
  flip?: boolean;
  children: ReactNode;
}

export function Chapter({ id, tone, flip = false, children }: ChapterProps) {
  return (
    <section id={id} className={flip ? "chapter chapter-flip" : "chapter"} data-tone={tone} data-scene>
      <div className="chapter-visual" aria-hidden="true">
        <div className="chapter-stage" data-stage />
      </div>
      <div className="chapter-copy">{children}</div>
    </section>
  );
}
