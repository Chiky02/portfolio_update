"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseTags } from "@/lib/tags";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string;
  isFeatured: boolean;
  isVisible: boolean;
  sortOrder: number;
};

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const router = useRouter();

  async function patch(id: string, data: Partial<Project>) {
    const response = await fetch(`/api/admin/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const body = await response.json();
      alert(body.error || "No se pudo actualizar");
      return;
    }
    router.refresh();
  }

  async function remove(id: string, title: string) {
    if (!confirm(`¿Quitar el proyecto "${title}" de forma permanente?`)) return;
    const response = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const body = await response.json();
      alert(body.error || "No se pudo eliminar");
      return;
    }
    router.refresh();
  }

  if (projects.length === 0) {
    return <p className="empty-note">Aún no hay proyectos. Añade el primero.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Proyecto</th>
            <th>Destacado</th>
            <th>Visible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td data-label="Imagen">
                <img src={project.image} alt="" className="admin-thumb" />
              </td>
              <td data-label="Proyecto">
                <strong>{project.title}</strong>
                <div>
                  <small>{parseTags(project.tags).join(" · ")}</small>
                </div>
              </td>
              <td data-label="Destacado">
                <span className={project.isFeatured ? "badge badge-on" : "badge badge-off"}>
                  {project.isFeatured ? "Sí" : "No"}
                </span>
              </td>
              <td data-label="Visible">
                <span className={project.isVisible ? "badge badge-on" : "badge badge-off"}>
                  {project.isVisible ? "Visible" : "Oculto"}
                </span>
              </td>
              <td data-label="Acciones">
                <div className="admin-row-actions">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => patch(project.id, { isFeatured: !project.isFeatured })}
                  >
                    {project.isFeatured ? "Quitar destacado" : "Destacar"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => patch(project.id, { isVisible: !project.isVisible })}
                  >
                    {project.isVisible ? "Ocultar" : "Mostrar"}
                  </button>
                  <Link className="btn btn-ghost" href={`/admin/proyectos/${project.id}`}>
                    Editar
                  </Link>
                  <button type="button" className="btn btn-danger" onClick={() => remove(project.id, project.title)}>
                    Quitar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
