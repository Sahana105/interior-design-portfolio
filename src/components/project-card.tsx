import Image from "next/image";

export type PortfolioCardData = {
  slug: string;
  name: string;
  label: string;
  meta: string;
  count: string;
  coverImage: string;
  coverAlt: string;
  href: string;
};

export function ProjectCard({ project, index }: { project: PortfolioCardData; index: number }) {
  return (
    <a aria-label={`View: ${project.name}`} className={`card c${index + 1}`} href={project.href}>
      <div className="cimg">
        <Image
          alt={project.coverAlt}
          className="project-image"
          fill
          loading="lazy"
          sizes="(max-width: 699px) calc(100vw - 36px), (max-width: 1099px) 45vw, 30vw"
          src={project.coverImage}
        />
      </div>
      <div className="cmeta">
        <span className="n">{project.label}</span>
        <h3>{project.name}</h3>
        <span className="t">{project.meta}</span>
      </div>
      <div className="cgo">
        <span>{project.count}</span>
        <span>View project <b aria-hidden="true">→</b></span>
      </div>
    </a>
  );
}
