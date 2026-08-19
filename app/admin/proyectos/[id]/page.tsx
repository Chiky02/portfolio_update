import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="section-kicker">Proyectos</p>
          <h1>Editar proyecto</h1>
          <p>{project.title}</p>
        </div>
      </div>
      <section className="admin-card">
        <ProjectForm project={project} />
      </section>
    </div>
  );
}
