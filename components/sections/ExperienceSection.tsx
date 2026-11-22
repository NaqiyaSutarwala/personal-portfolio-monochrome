import { Chapter } from "@/components/ui/Chapter";
import { EXPERIENCES } from "@/constants/portfolio";
import { formatDateRange } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <Chapter id="experience" tone="ink">
      <h2 className="heading">Where I’ve worked</h2>
      {EXPERIENCES.map((job) => (
        <article className="entry job" data-shape={`text:${job.startDate.split(" ").at(-1)}`} key={job.id}>
          <h3>{job.company}</h3>
          <p className="entry-detail">
            {job.role}, {job.location}
          </p>
          <p>{formatDateRange(job.startDate, job.endDate, job.isCurrent)}</p>
          {job.highlights && (
            <ul className="highlights">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </Chapter>
  );
}
