import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorized } from "@/lib/auth";
import { serializeTags } from "@/lib/tags";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const body = await req.json().catch(() => null);
  const title = String(body?.title ?? "").trim();
  const description = String(body?.description ?? "").trim();
  const image = String(body?.image ?? "").trim();
  const url = String(body?.url ?? "").trim();

  if (!title || !description || !image || !url) {
    return NextResponse.json({ error: "Título, descripción, imagen y enlace son obligatorios" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      title,
      description,
      image,
      url,
      tags: serializeTags(body?.tags ?? []),
      isFeatured: Boolean(body?.isFeatured ?? true),
      isVisible: Boolean(body?.isVisible ?? true),
      sortOrder: Number(body?.sortOrder ?? 0),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/proyectos");
  return NextResponse.json(project, { status: 201 });
}
