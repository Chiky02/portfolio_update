import { prisma } from "@/lib/prisma";

export type SettingsMap = Record<string, string>;

export async function getSettingsMap(): Promise<SettingsMap> {
  const rows = await prisma.setting.findMany();
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}

export function whatsappUrl(phone?: string) {
  const digits = (phone ?? "573195012814").replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}
