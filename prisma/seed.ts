import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const settings = [
  { key: "name", value: "Juan Ballen" },
  { key: "role", value: "Ingeniero de Sistemas" },
  { key: "email", value: "juanballen.02@gmail.com" },
  { key: "phone", value: "573195012814" },
  { key: "phoneDisplay", value: "+57 319 501 2814" },
  { key: "linkedin", value: "https://linkedin.com/in/juan-alberto-ballen-rojas-46817322b/" },
  { key: "github", value: "https://github.com/Chiky02" },
  { key: "instagram", value: "https://instagram.com/jualbaro02" },
];

const projects = [
  {
    title: "Videojuego Komagic",
    description:
      "Videojuego para enseñar historia de Colombia, con mecánicas propias e implementación de animaciones.",
    image: "/img/project1.png",
    url: "https://drive.google.com/file/d/1Tt1oFk6A3C6sKp10XbMedaq59XGuAuWA/view?usp=sharing",
    tags: JSON.stringify(["Game design", "Animación", "Educación"]),
    isFeatured: true,
    isVisible: true,
    sortOrder: 1,
  },
  {
    title: "Página web Entrana",
    description:
      "Diseño e implementación del sitio con WordPress, orientado a presencia digital clara y profesional.",
    image: "/img/entrana.png",
    url: "https://entrana.tech/",
    tags: JSON.stringify(["WordPress", "Diseño web"]),
    isFeatured: true,
    isVisible: true,
    sortOrder: 2,
  },
  {
    title: "Ancestros BarberShop",
    description: "Sitio para agendar cortes: flujo de reserva pensado para el cliente y el negocio.",
    image: "/img/barbershop.png",
    url: "https://ancestrosbarber2-7lzhyc.flutterflow.app/",
    tags: JSON.stringify(["FlutterFlow", "Agendamiento"]),
    isFeatured: true,
    isVisible: true,
    sortOrder: 3,
  },
  {
    title: "Realidad aumentada",
    description: "Visualización de modelos 3D en AR a través de marcadores, desde el navegador.",
    image: "/img/betaAr.jpeg",
    url: "https://chiky02.github.io/NewArBeta/",
    tags: JSON.stringify(["WebAR", "3D", "Marcadores"]),
    isFeatured: true,
    isVisible: true,
    sortOrder: 4,
  },
];

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "juanballen.02@gmail.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "BallenAdmin2026!";
  const passwordHash = await hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { password: passwordHash },
    create: { email, password: passwordHash },
  });

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  const existingProjects = await prisma.project.count();
  if (existingProjects === 0) {
    await prisma.project.createMany({ data: projects });
  }

  console.log(`Usuario admin: ${email}`);
  console.log("Ajustes y proyectos semilla listos.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
