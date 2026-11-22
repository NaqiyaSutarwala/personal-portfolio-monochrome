import { PERSONAL_INFO } from "@/constants/portfolio";

export function HeroSection() {
  return (
    <section id="home" className="hero" data-tone="paper" data-scene data-shape={`text:${PERSONAL_INFO.firstName}`}>
      <h1 className="hero-title">
        <span className="hero-first" data-stage>
          <span>{PERSONAL_INFO.firstName}</span>
        </span>{" "}
        <span className="hero-last">{PERSONAL_INFO.lastName}</span>
      </h1>
      <div className="hero-foot">
        <p>
          {PERSONAL_INFO.role} in {PERSONAL_INFO.location}.
          <br />
          Open to opportunities.
        </p>
        <div className="actions">
          <a className="button" href="#projects">
            <span>See my projects</span>
          </a>
          <a className="button" href="#contact">
            <span>Get in touch</span>
          </a>
        </div>
      </div>
    </section>
  );
}
