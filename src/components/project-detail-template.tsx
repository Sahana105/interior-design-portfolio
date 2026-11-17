import Image from "next/image";
import type { PortfolioProject } from "@/content/projects";

export function ProjectDetailTemplate({
  project,
  index,
  nextProject,
}: {
  project: PortfolioProject;
  index: number;
  nextProject: PortfolioProject;
}) {
  const [type, spaceCount, location] = project.descriptor.split(" · ");

  return (
    <article aria-label={project.name} className="detail" id={`p-${project.slug}`}>
      <div className="wrap">
        <a className="back" href="#projects"><b aria-hidden="true">←</b>All projects</a>
        <div className="dhead">
          <div className="eyebrow">Project {String(index + 1).padStart(2, "0")}</div>
          <h1>{project.name}</h1>
          <div className="dmeta"><span>{type}</span><span>{spaceCount}</span><span>{location}</span></div>
          <div aria-label={`${project.name} spaces`} className="chips" role="navigation">
            {project.rooms.map((room) => <button data-scroll={room.id} key={room.id} type="button">{room.name}</button>)}
          </div>
        </div>
        {project.rooms.map((room, roomIndex) => (
          <section aria-labelledby={`${room.id}-title`} className="room" id={room.id} key={room.id}>
            <div className="rh"><span>{String(roomIndex + 1).padStart(2, "0")}</span><h3 id={`${room.id}-title`}>{room.name}</h3></div>
            <div className={`grid g${Math.min(room.images.length, 4)}${roomIndex % 2 ? " alt" : ""}`}>
              {room.images.map((image) => (
                <figure className={`f${room.layout.includes("d") ? " d" : ""}${room.layout.includes("p") ? " p" : ""}`} key={image.src}>
                  <button aria-label={`View ${image.alt}`} className="im" data-lightbox-height={image.height} data-lightbox-src={image.src} data-lightbox-width={image.width} type="button">
                    <Image alt={image.alt} fill loading="lazy" sizes="(max-width: 759px) 100vw, 75vw" src={image.src} />
                  </button>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
      <a className="nextp wrap" href={`#p-${nextProject.slug}`}>
        <small>Next project</small><span>{nextProject.name} →</span>
      </a>
    </article>
  );
}
