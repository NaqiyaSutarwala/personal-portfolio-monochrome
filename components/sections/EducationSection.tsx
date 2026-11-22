import { Chapter } from "@/components/ui/Chapter";
import { EDUCATION } from "@/constants/portfolio";

export function EducationSection() {
  return (
    <Chapter id="education" tone="paper" flip>
      {EDUCATION.map((course) => (
        <article key={course.id}>
          <h2 className="heading course-title">{course.degree}</h2>
          <p className="entry-detail">
            {course.institution}, {course.year}
          </p>
          {course.achievements?.map((achievement, index) => (
            <p className="entry achievement" data-shape={`medals:${index + 1}`} key={achievement}>
              {achievement}
            </p>
          ))}
        </article>
      ))}
    </Chapter>
  );
}
