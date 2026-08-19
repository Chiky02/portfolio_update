"use client";

import { FormEvent, useState } from "react";
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

type Props = {
  project?: Project;
};

export default function ProjectForm({ project }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [url, setUrl] = useState(project?.url ?? "");
  const [image, setImage] = useState(project?.image ?? "");
  const [tags, setTags] = useState(project ? parseTags(project.tags).join(", ") : "");
  const [isFeatured, setIsFeatured] = useState(project?.isFeatured ?? true);
  const [isVisible, setIsVisible] = useState(project?.isVisible ?? true);
  const [sortOrder, setSortOrder] = useState(project?.sortOrder ?? 1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "No se pudo subir la imagen");
      }
      setImage(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir imagen");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      title,
      description,
      url,
      image,
      tags,
      isFeatured,
      isVisible,
      sortOrder: Number(sortOrder),
    };

    try {
      const endpoint = project ? `/api/admin/projects/${project.id}` : "/api/admin/projects";
      const response = await fetch(endpoint, {
        method: project ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "No se pudo guardar el proyecto");
      }
      router.push("/admin/proyectos");
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
        <label htmlFor="title">Título</label>
        <input
          id="title"
          className="admin-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="admin-field">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          className="admin-textarea"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>
      <div className="admin-field">
        <label htmlFor="url">Enlace del proyecto</label>
        <input
          id="url"
          className="admin-input"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
        />
      </div>
      <div className="admin-field">
        <label htmlFor="tags">Etiquetas (separadas por coma)</label>
        <input
          id="tags"
          className="admin-input"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="WordPress, Diseño web"
        />
      </div>
      <div className="admin-field">
        <label htmlFor="image">Imagen</label>
        <input
          id="image"
          className="admin-input"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="/img/proyecto.png"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void uploadFile(file);
          }}
        />
        <small>{uploading ? "Subiendo imagen..." : "Puedes pegar una ruta o subir un archivo."}</small>
        {image ? <img src={image} alt="" className="image-preview" /> : null}
      </div>
      <div className="admin-field">
        <label htmlFor="sortOrder">Orden</label>
        <input
          id="sortOrder"
          className="admin-input"
          type="number"
          min={0}
          value={sortOrder}
          onChange={(event) => setSortOrder(Number(event.target.value))}
        />
      </div>
      <label className="admin-check">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(event) => setIsFeatured(event.target.checked)}
        />
        Proyecto destacado (aparece en el portafolio)
      </label>
      <label className="admin-check">
        <input
          type="checkbox"
          checked={isVisible}
          onChange={(event) => setIsVisible(event.target.checked)}
        />
        Visible
      </label>
      {error ? <p className="admin-message error">{error}</p> : null}
      <div className="admin-actions">
        <button className="btn" type="submit" disabled={loading || uploading}>
          {loading ? "Guardando..." : project ? "Actualizar proyecto" : "Añadir proyecto"}
        </button>
        <button className="btn btn-ghost" type="button" onClick={() => router.push("/admin/proyectos")}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
