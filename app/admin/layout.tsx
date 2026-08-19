"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <img src="/img/logo.png" alt="Chiky02" />
        </Link>
        <nav className="admin-nav">
          <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>
            Panel
          </Link>
          <Link
            href="/admin/proyectos"
            className={pathname.startsWith("/admin/proyectos") ? "active" : ""}
          >
            Proyectos
          </Link>
          <a href="/" target="_blank" rel="noopener noreferrer">
            Ver sitio
          </a>
        </nav>
        <button type="button" className="btn btn-ghost admin-logout" onClick={logout}>
          Cerrar sesión
        </button>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
