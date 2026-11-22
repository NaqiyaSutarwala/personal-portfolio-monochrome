import { PERSONAL_INFO } from "@/constants/portfolio";

export function Footer() {
  return (
    <footer className="footer" data-tone="ink">
      <p>
        © {new Date().getFullYear()} {PERSONAL_INFO.name}
      </p>
      <a href="#home">Back to the top</a>
    </footer>
  );
}
