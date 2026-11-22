import { Chapter } from "@/components/ui/Chapter";
import { PROJECTS } from "@/constants/portfolio";

export function ProjectsSection() {
  return (
    <Chapter id="projects" tone="paper" flip>
      <h2 className="heading">Things I’ve helped build</h2>
      {PROJECTS.map((project) => (
        <article className="entry project" data-shape={project.id} key={project.id}>
          <h3>{project.name}</h3>
          <p className="entry-detail">
            {[project.domain, project.isConfidential && "confidential project"].filter(Boolean).join(", ")}
          </p>
          <p className="entry-description">{project.description}</p>
          <ul className="word-list project-tech" aria-label="Technologies">
            {project.tech.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="project-foot">
            {project.link && (
              <a className="button" href={project.link} target="_blank" rel="noopener noreferrer">
                <span>Visit {project.name}</span>
              </a>
            )}
            {project.type && <span>{project.type}</span>}
          </div>
        </article>
      ))}
    </Chapter>
  );
}
