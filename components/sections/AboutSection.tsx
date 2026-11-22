import { Chapter } from "@/components/ui/Chapter";
import { PERSONAL_INFO, STATS } from "@/constants/portfolio";

export function AboutSection() {
  return (
    <Chapter id="about" tone="ink">
      <div className="about" data-shape="sphere">
        <h2 className="visually-hidden">About</h2>
        <p className="statement" data-read>
          {PERSONAL_INFO.bio.split(" ").map((word, index) => (
            <span key={index} data-word>
              {word}{" "}
            </span>
          ))}
        </p>
        <dl className="facts">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                {stat.number}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Chapter>
  );
}
