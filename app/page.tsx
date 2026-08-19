import Navbar from "@/components/Navbar";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { prisma } from "@/lib/prisma";
import { getSettingsMap, whatsappUrl } from "@/lib/settings";
import { parseTags } from "@/lib/tags";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, projects] = await Promise.all([
    getSettingsMap(),
    prisma.project.findMany({
      where: { isVisible: true, isFeatured: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  const name = settings.name || "Juan Ballen";
  const role = settings.role || "Ingeniero de Sistemas";
  const email = settings.email || "juanballen.02@gmail.com";
  const phoneDisplay = settings.phoneDisplay || "+57 319 501 2814";
  const linkedin = settings.linkedin || "https://linkedin.com/in/juan-alberto-ballen-rojas-46817322b/";
  const github = settings.github || "https://github.com/Chiky02";
  const instagram = settings.instagram || "https://instagram.com/jualbaro02";
  const wa = whatsappUrl(settings.phone);

  return (
    <>
      <Navbar />
      <main>
        <section id="home" className="home-section">
          <p className="hero-kicker">Portafolio · Chiky02</p>
          <h1>{name}</h1>
          <p className="hero-role">{role}</p>
          <p className="hero-lead">
            Desarrollo web, datos y experiencias interactivas. Soluciones con propósito e impacto real.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn">
              Ver proyectos
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contacto
            </a>
          </div>

          <div className="profile">
            <div className="icon-orbit">
              <a href="#projects" className="icon1" title="Proyectos">
                <img src="/img/developer.png" alt="Proyectos" />
              </a>
              <a href={github} className="icon2" target="_blank" rel="noopener noreferrer" title="GitHub">
                <GithubIcon />
                <span className="sr-only">GitHub</span>
              </a>
              <a href={wa} className="icon3" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <img src="/img/phone.png" alt="WhatsApp" />
              </a>
              <a href={linkedin} className="icon4" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <img src="/img/folder.png" alt="LinkedIn" />
              </a>
            </div>
            <div className="photo">
              <img src="/img/juan.jpeg" alt={`Foto de ${name}`} className="profile-img" />
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <p className="section-kicker">Conóceme</p>
            <h2 className="section-title">Sobre mí</h2>
            <div className="about-layout">
              <div className="about-copy">
                <p>
                  Hola, soy <strong>{name}</strong>. Ingeniero de Sistemas apasionado por la tecnología y por
                  construir soluciones que sirvan de verdad, no solo que “funcionen”.
                </p>
                <p>
                  Trabajo desde la lógica del servidor hasta la interfaz, con un enfoque en seguridad, datos y una
                  experiencia de usuario clara.
                </p>
                <ul className="about-points">
                  <li>
                    <strong>Analítico y constante:</strong> no me quedo en que algo corre; quiero entender por qué.
                  </li>
                  <li>
                    <strong>Autodidacta:</strong> salgo de la zona de confort para aprender tecnologías nuevas.
                  </li>
                  <li>
                    <strong>Enfoque en UX:</strong> cuido el recorrido completo, de la base de datos a la pantalla.
                  </li>
                </ul>
              </div>
              <div className="about-skills">
                <article className="skill-block">
                  <h3>Desarrollo web</h3>
                  <p>HTML, CSS y JavaScript, potenciado con Laravel.</p>
                </article>
                <article className="skill-block">
                  <h3>Datos</h3>
                  <p>Modelos relacionales, CRUDs, funciones y triggers en SQL.</p>
                </article>
                <article className="skill-block">
                  <h3>Seguridad y lógica</h3>
                  <p>Seguridad de la información y procesos internos más claros.</p>
                </article>
                <article className="skill-block">
                  <h3>Creatividad</h3>
                  <p>Videojuegos y realidad aumentada como campo de exploración.</p>
                </article>
                <ul className="skill-chips">
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                  <li>Laravel</li>
                  <li>SQL</li>
                  <li>WordPress</li>
                  <li>WebAR</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="container">
            <p className="section-kicker">Trabajo reciente</p>
            <h2 className="section-title">Proyectos</h2>
            <p className="section-lead">Una muestra de producto, web y experiencias interactivas.</p>

            {projects.length === 0 ? (
              <p className="empty-note">Pronto verás aquí proyectos destacados.</p>
            ) : (
              <div className="projects-grid">
                {projects.map((project) => (
                  <article className="project-card" key={project.id}>
                    <img src={project.image} alt={`Captura de ${project.title}`} />
                    <div className="project-body">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <ul className="skill-chips">
                        {parseTags(project.tags).map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                    <a className="btn" href={project.url} target="_blank" rel="noopener noreferrer">
                      Ver proyecto
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container">
            <p className="section-kicker">Hablemos</p>
            <h2 className="section-title">Contacto</h2>
            <div className="contact-layout">
              <div className="contact-copy">
                <p>¿Quieres saber más o hablar de un proyecto? Escríbeme por la vía que te quede más fácil.</p>
                <ul className="contact-list">
                  <li>
                    <a href={`mailto:${email}`}>
                      <img src="/img/gmail.png" alt="" />
                      {email}
                    </a>
                  </li>
                  <li>
                    <a href={wa} target="_blank" rel="noopener noreferrer">
                      <img src="/img/whatsapp.png" alt="" />
                      {phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                      <LinkedinIcon />
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href={github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon />
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                      <img src="/img/instagram.png" alt="" />
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
              <figure className="contact-card">
                <img src="/img/tarjeta.jpeg" alt={`Tarjeta de presentación de ${name}`} />
              </figure>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 {name} · Todos los derechos reservados</p>
      </footer>

      <a href={wa} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Escribir por WhatsApp">
        <img src="/img/whatsapp.png" alt="" />
      </a>
    </>
  );
}
