import SettingsForm from "@/components/admin/SettingsForm";
import { prisma } from "@/lib/prisma";
import { getSettingsMap } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [settings, total, featured, visible] = await Promise.all([
    getSettingsMap(),
    prisma.project.count(),
    prisma.project.count({ where: { isFeatured: true, isVisible: true } }),
    prisma.project.count({ where: { isVisible: true } }),
  ]);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="section-kicker">Administración</p>
          <h1>Panel</h1>
          <p>Cambia el teléfono y controla qué proyectos se muestran.</p>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <strong>{total}</strong>
          <span>Proyectos totales</span>
        </div>
        <div className="admin-stat">
          <strong>{featured}</strong>
          <span>Destacados visibles</span>
        </div>
        <div className="admin-stat">
          <strong>{visible}</strong>
          <span>Visibles</span>
        </div>
      </div>

      <section className="admin-card">
        <h2>Contacto y teléfono</h2>
        <SettingsForm settings={settings} />
      </section>
    </div>
  );
}
