"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="navbar">
      <a href="#home" className="logo">
        <img src="/img/logo.png" alt="Chiky02" className="logo-img" />
      </a>
      <nav className={`nav-links${open ? " active" : ""}`} id="nav-links">
        <a href="#home" className={active === "home" ? "active" : ""} onClick={closeMenu}>
          Inicio
        </a>
        <a href="#about" className={active === "about" ? "active" : ""} onClick={closeMenu}>
          Sobre mí
        </a>
        <a href="#projects" className={active === "projects" ? "active" : ""} onClick={closeMenu}>
          Proyectos
        </a>
        <a href="#contact" className={active === "contact" ? "active" : ""} onClick={closeMenu}>
          Contacto
        </a>
      </nav>
      <button
        className="menu-toggle"
        id="menu-toggle"
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((value) => !value)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
