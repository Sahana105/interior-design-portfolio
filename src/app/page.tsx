import Image from "next/image";
import { ProjectCard, type PortfolioCardData } from "@/components/project-card";
import { ProjectDetailTemplate } from "@/components/project-detail-template";
import { PortfolioEnhancements } from "@/components/portfolio-enhancements";
import { SiteHeader } from "@/components/site-header";
import {
  areasOfExpertise,
  featuredProjects,
  nailSalonCover,
  nailSalonGallery,
  otherRenders,
  otherRendersCover,
  portrait,
  studioProfile,
} from "@/content/projects";

const portfolioCards: PortfolioCardData[] = [
  ...featuredProjects.map((project, index) => {
    const [meta, count] = project.descriptor.split(" · ");
    return {
      slug: project.slug,
      name: project.name,
      label: `Project ${index + 1}`,
      meta,
      count,
      coverImage: project.coverImage,
      coverAlt: project.coverAlt,
      href: `#p-${project.slug}`,
    };
  }),
  {
    slug: "other-renders",
    name: "Other Renders",
    label: "Other renders",
    meta: "Other works",
    count: "8 renders",
    coverImage: otherRendersCover.src,
    coverAlt: otherRendersCover.alt,
    href: "#other",
  },
  {
    slug: "nail-salon",
    name: "Nail Salon",
    label: "Nail salon",
    meta: "Other works",
    count: "12 sheets",
    coverImage: nailSalonCover.src,
    coverAlt: nailSalonCover.alt,
    href: "#other",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {featuredProjects.map((project, index) => (
          <ProjectDetailTemplate
            index={index}
            key={project.slug}
            nextProject={featuredProjects[(index + 1) % featuredProjects.length]}
            project={project}
          />
        ))}

        <div className="home" id="top">
          <section className="hero">
            <div className="wrap">
              <div>
                <div className="role">Residential Interior Designer · Bengaluru</div>
                <h1>Ambika<br /><em>G.</em></h1>
                <p className="lead">Homes shaped around the people who live in them — from the first brief to the final drawing.</p>
                <a className="btn" href="#projects">Explore Projects <b aria-hidden="true">→</b></a>
              </div>
            </div>
            <div className="wrap">
              <div aria-label="Portfolio overview" className="strip">
                <span>2 years of experience</span>
                <span>Bengaluru</span>
              </div>
            </div>
          </section>

          <section className="about" id="about">
            <div className="wrap">
              <figure className="rv ph">
                <Image alt={portrait.alt} height={portrait.height} priority sizes="(max-width: 899px) 80vw, 42vw" src={portrait.src} width={portrait.width} />
              </figure>
              <div className="rv">
                <div className="eyebrow">About</div>
                <h2>Designing <em>with</em> the client</h2>
                <p className="sum">{studioProfile.introduction}</p>
                <div className="big">2<small>Years of<br />experience</small></div>
                <div aria-label="Skills and software" className="tags">
                  {studioProfile.software.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
                <div className="facts">
                  <div><b>Based in </b>{studioProfile.location}</div>
                  <div><b>Focus </b>{studioProfile.focus}</div>
                </div>
              </div>
            </div>
          </section>

          <section id="projects">
            <div className="wrap">
              <div className="rv shead">
                <div><div className="eyebrow">Portfolio</div><h2>Projects</h2></div>
                <p>Room-by-room renders and working drawings from residential projects in Bengaluru.</p>
              </div>
              <div className="pgrid">
                {portfolioCards.map((project, index) => <ProjectCard index={index} key={project.slug} project={project} />)}
              </div>
              <div className="more"><a className="btn ghost" href="#other">Other works <b aria-hidden="true">↓</b></a></div>
            </div>
          </section>

          <section className="other" id="other">
            <div className="wrap">
              <div className="rv shead">
                <div><div className="eyebrow">Other Works</div><h2>Renders &amp; <em>a salon</em></h2></div>
                <p>Additional residential renders, and a nail salon project developed through plans, elevations and 3D views.</p>
              </div>
              <div className="sub"><span>i</span><h3>Other renders</h3></div>
              <div className="cols">
                {otherRenders.map((image) => (
                  <div className="rv" key={image.src}>
                    <figure className="f"><button aria-label={`View ${image.alt}`} className="im" data-lightbox-height={image.height} data-lightbox-src={image.src} data-lightbox-width={image.width} type="button"><Image alt={image.alt} fill loading="lazy" sizes="(max-width: 619px) 100vw, (max-width: 1099px) 45vw, 30vw" src={image.src} /></button></figure>
                  </div>
                ))}
              </div>
              <div className="sub"><span>ii</span><h3>Nail salon</h3></div>
              <div className="sheets">
                {nailSalonGallery.map((image) => (
                  <div className="rv" key={image.src}>
                    <figure className="f d"><button aria-label={`View ${image.alt}`} className="im" data-lightbox-height={image.height} data-lightbox-src={image.src} data-lightbox-width={image.width} type="button"><Image alt={image.alt} fill loading="lazy" sizes="(max-width: 600px) 100vw, (max-width: 999px) 45vw, 25vw" src={image.src} /></button><figcaption>{image.alt.replace("Nail salon — ", "")}</figcaption></figure>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="exp" id="experience">
            <div className="wrap">
              <div className="rv">
                <div className="eyebrow">Experience &amp; Skills</div>
                <h2>From brief to <em>site</em></h2>
                <div className="expertise-pills">
                  {areasOfExpertise.map((area, index) => (
                    <div className="pill" key={area.title}>
                      <i>{String(index + 1).padStart(2, "0")}</i><h3>{area.title}</h3><p>{area.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rv software-column">
                <h4>Software</h4>
                {studioProfile.software.map((tool, index) => <div className="tool" key={tool}>{tool}<span>{String(index + 1).padStart(2, "0")}</span></div>)}
                <div className="tool-rule" />
              </div>
            </div>
          </section>

          <section id="contact">
            <div className="wrap">
              <div className="rv">
                <div className="eyebrow">Contact</div>
                <h2 className="contact-title">Let’s talk <em>homes</em></h2>
                <div className="crow contact-links">
                  <div><small>Email</small><a href="mailto:ambikarg27@gmail.com">ambikarg27@gmail.com</a></div>
                  <div><small>Phone</small><a href="tel:7204091285">7204091285</a></div>
                  <div><small>Location</small><p>Bengaluru, India</p></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <PortfolioEnhancements />
      <footer><div className="wrap"><span>© 2026 Ambika G</span><span>Residential Interior Designer · Bengaluru</span><a href="#top">Back to top ↑</a></div></footer>
    </>
  );
}
