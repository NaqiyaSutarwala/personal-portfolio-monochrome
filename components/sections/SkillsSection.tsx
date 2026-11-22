import { Chapter } from "@/components/ui/Chapter";
import { SKILLS } from "@/constants/portfolio";

export function SkillsSection() {
  return (
    <Chapter id="skills" tone="ink">
      <h2 className="heading">What I work with</h2>
      {SKILLS.map((skill) => (
        <article className="entry skill" data-shape={skill.id} key={skill.id}>
          <h3>{skill.category}</h3>
          <ul className="word-list">
            {skill.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </Chapter>
  );
}
