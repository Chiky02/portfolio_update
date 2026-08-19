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

En Project Settings → Environment Variables (Production y Preview) define al menos:

- `DATABASE_URL` — URL pooled de Neon (`…-pooler…`, `sslmode=require&pgbouncer=true`)
- `DIRECT_URL` — URL directa de Neon (sin `-pooler`)
- `JWT_SECRET`

Luego vuelve a desplegar. El build corre `prisma generate` y `prisma migrate deploy`.
