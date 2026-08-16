# Fast Appliances Repair — Hostinger deployment package

This project is a Hostinger-ready version of the Fast Appliances Repair source supplied in the PDF. The original source is a React/TanStack Start application with Supabase-backed bookings. The supplied PDF contains 24 custom source files but explicitly excludes node_modules, shadcn/ui and generated files, so this package adds the missing project configuration, a small local Dialog component, Supabase database types, and replacement SVG appliance artwork so the project is self-contained.

## What this package contains

- React + TanStack Start frontend
- TanStack Router file-based routing
- Tailwind CSS v4
- Supabase server-side booking storage
- Four-step booking form
- Real-time booked-slot checking through the server function
- UK postcode coverage checker using postcodes.io
- OpenStreetMap embedded coverage map
- Phone, SMS, WhatsApp and email contact buttons
- Replacement SVG appliance illustrations (the PDF referenced PNG assets but did not include those image files)
- Supabase migrations for the `bookings` table

## Important: Hostinger plan

Use Hostinger's Node.js Web App hosting. Business and Cloud hosting plans support Node.js Web Apps. Upload this project as a ZIP through the Node.js Web App deployment flow.

## 1. Create/configure Supabase

1. Create/open your Supabase project.
2. Open SQL Editor.
3. Run the three SQL migration files in `supabase/migrations/` in filename order.
4. From Project Settings -> API, copy:
   - Project URL
   - Publishable/anon key
   - Service role key

Never put the service role key in a `VITE_` variable. It must remain server-only.

## 2. Environment variables

Create `.env` from `.env.example` and fill in all five values. On Hostinger, add the same values in the Node.js application's Environment Variables section instead of uploading a real `.env` file.

Required:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## 3. Hostinger build settings

Recommended:

- Framework: React / Vite / TanStack Start if detected
- Node.js: 22.x or another supported current Node version
- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm run start`

The production server output is generated in `.output/`.

## 4. Upload

Upload the ZIP containing this project's root files. Do not upload `node_modules`; Hostinger installs dependencies during deployment.

## 5. Before going live

Check:

- The homepage loads.
- The coverage checker resolves a UK postcode.
- A service opens its pricing modal.
- A booking can be submitted.
- The booking appears in Supabase.
- A second user cannot book the same date/time slot.
- Phone, WhatsApp, SMS and email buttons contain the intended business contact details.

## Source-derived business details

The supplied source contains the business name Fast Appliances Repair, phone number 07827 045534, email fastappliancesrepair4u@gmail.com, a 40-mile coverage radius around Stanwell/Staines-upon-Thames, service prices of £75/£90/£110 depending on installation type, and a 90-day repair warranty. Review and replace any claims, contact details or customer testimonials before publishing if they are not genuine/current.
