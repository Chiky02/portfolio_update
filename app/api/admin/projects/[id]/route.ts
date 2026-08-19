import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorized } from "@/lib/auth";
import { serializeTags } from "@/lib/tags";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Context) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const { id } = await params;
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    tags?: string;
    isFeatured?: boolean;
    isVisible?: boolean;
    sortOrder?: number;
  } = {};

  if (body.title !== undefined) data.title = String(body.title).trim();
  if (body.description !== undefined) data.description = String(body.description).trim();
  if (body.image !== undefined) data.image = String(body.image).trim();
  if (body.url !== undefined) data.url = String(body.url).trim();
  if (body.tags !== undefined) data.tags = serializeTags(body.tags);
  if (body.isFeatured !== undefined) data.isFeatured = Boolean(body.isFeatured);
  if (body.isVisible !== undefined) data.isVisible = Boolean(body.isVisible);
  if (body.sortOrder !== undefined) data.sortOrder = Number(body.sortOrder);

  const project = await prisma.project.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const { id } = await params;
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }

  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
  return NextResponse.json({ ok: true });
}
