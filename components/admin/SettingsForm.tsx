"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  settings: Record<string, string>;
};

export default function SettingsForm({ settings }: Props) {
  const router = useRouter();
  const [phone, setPhone] = useState(settings.phone ?? "");
  const [phoneDisplay, setPhoneDisplay] = useState(settings.phoneDisplay ?? "");
  const [email, setEmail] = useState(settings.email ?? "");
  const [linkedin, setLinkedin] = useState(settings.linkedin ?? "");
  const [github, setGithub] = useState(settings.github ?? "");
  const [instagram, setInstagram] = useState(settings.instagram ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, phoneDisplay, email, linkedin, github, instagram }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "No se pudo guardar");
      }
      setMessage("Datos de contacto actualizados.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div className="admin-field">
        <label htmlFor="phone">Teléfono WhatsApp (solo dígitos, con país)</label>
        <input
          id="phone"
          className="admin-input"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
        <small>Ejemplo: 573195012814. Se usa en wa.me y en el botón flotante.</small>
      </div>
      <div className="admin-field">
        <label htmlFor="phoneDisplay">Teléfono visible</label>
        <input
          id="phoneDisplay"
          className="admin-input"
          value={phoneDisplay}
          onChange={(event) => setPhoneDisplay(event.target.value)}
          required
        />
      </div>
      <div className="admin-field">
        <label htmlFor="email">Correo</label>
        <input
          id="email"
          className="admin-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="admin-field">
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          id="linkedin"
          className="admin-input"
          value={linkedin}
          onChange={(event) => setLinkedin(event.target.value)}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="github">GitHub</label>
        <input
          id="github"
          className="admin-input"
          value={github}
          onChange={(event) => setGithub(event.target.value)}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="instagram">Instagram</label>
        <input
          id="instagram"
          className="admin-input"
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
        />
      </div>
      {message ? <p className="admin-message ok">{message}</p> : null}
      {error ? <p className="admin-message error">{error}</p> : null}
      <div className="admin-actions">
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
