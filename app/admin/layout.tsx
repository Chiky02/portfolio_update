"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  async function logout() {
    setMenuOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className={`admin-shell${menuOpen ? " menu-open" : ""}`}>
      <header className="admin-topbar">
        <Link href="/admin" className="admin-brand">
          <img src="/img/logo.png" alt="Chiky02" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="admin-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <button
        type="button"
        className="admin-overlay"
        aria-label="Cerrar menú"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand admin-brand-sidebar">
          <img src="/img/logo.png" alt="Chiky02" />
        </Link>
        <nav className="admin-nav" id="admin-nav">
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
