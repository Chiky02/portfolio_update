# Portafolio Juan Ballen

Sitio público con el diseño original, panel admin con JWT y base de datos PostgreSQL (Neon + Prisma).

## Arranque

```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

- Portafolio: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Acceso admin

- Correo: `juanballen.02@gmail.com`
- Contraseña inicial: `BallenAdmin2026!`

Cámbiala en `.env` (`ADMIN_PASSWORD`) y vuelve a correr `npx prisma db seed` si quieres regenerar el hash.

## Qué se puede gestionar

- Teléfono (WhatsApp, contacto y botón flotante)
- Correo y redes
- Proyectos: añadir, destacar, ocultar o quitar

## Vercel

En Project Settings → Environment Variables (Production y Preview) pega las mismas claves de `.env`:

- `DATABASE_URL`
- `DIRECT_URL` (obligatoria para migraciones; si falta, el build usa `DATABASE_URL`)
- `JWT_SECRET`

Marca Production y Preview, guarda y vuelve a desplegar.
