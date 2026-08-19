import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorized } from "@/lib/auth";

const ALLOWED_KEYS = ["phone", "phoneDisplay", "email", "linkedin", "github", "instagram"] as const;

export async function GET() {
  const user = await getAuthUser();
  if (!user) return unauthorized();
  const rows = await prisma.setting.findMany();
  return NextResponse.json(Object.fromEntries(rows.map((row) => [row.key, row.value])));
}

export async function PUT(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const phone = String(body.phone ?? "").replace(/\D/g, "");
  if (phone.length < 10) {
    return NextResponse.json({ error: "El teléfono debe incluir código de país y número" }, { status: 400 });
  }

  const updates: { key: string; value: string }[] = ALLOWED_KEYS.map((key) => ({
    key,
    value: key === "phone" ? phone : String(body[key] ?? "").trim(),
  }));

  if (!updates.find((item) => item.key === "phoneDisplay")?.value) {
    return NextResponse.json({ error: "El teléfono visible es obligatorio" }, { status: 400 });
  }

  await Promise.all(
    updates.map((setting) =>
      prisma.setting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting,
      }),
    ),
  );

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
