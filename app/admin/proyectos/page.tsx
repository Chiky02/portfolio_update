import Link from "next/link";
import ProjectsTable from "@/components/admin/ProjectsTable";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="section-kicker">Portafolio</p>
          <h1>Proyectos</h1>
          <p>Añade, oculta, quita de destacados o elimina proyectos.</p>
        </div>
        <Link className="btn" href="/admin/proyectos/nuevo">
          Añadir proyecto
        </Link>
      </div>
      <section className="admin-card">
        <ProjectsTable projects={projects} />
      </section>
    </div>
  );
}
