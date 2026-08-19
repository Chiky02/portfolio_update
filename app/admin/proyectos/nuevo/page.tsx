import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="section-kicker">Proyectos</p>
          <h1>Añadir proyecto</h1>
          <p>Se mostrará en el portafolio si queda destacado y visible.</p>
        </div>
      </div>
      <section className="admin-card">
        <ProjectForm />
      </section>
    </div>
  );
}
