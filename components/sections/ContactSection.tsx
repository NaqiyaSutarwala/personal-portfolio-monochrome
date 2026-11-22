import { CopyButton } from "@/components/ui/CopyButton";
import { SOCIAL_LINKS } from "@/constants/portfolio";

export function ContactSection() {
  const email = SOCIAL_LINKS.find((link) => link.id === "email");
  const others = SOCIAL_LINKS.filter((link) => link.id !== "email");

  return (
    <section id="contact" className="contact" data-tone="ink" data-scene data-shape="text:hello">
      <div className="contact-stage" data-stage aria-hidden="true" />
      <div className="contact-copy">
        <h2 className="heading">Let’s make something</h2>
        <div>
          {email && (
            <a className="contact-email" href={email.href}>
              {email.label}
            </a>
          )}
          <div className="actions">
            {email && <CopyButton value={email.label} />}
            {others.map((link) => (
              <a
                className="button"
                key={link.id}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
