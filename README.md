## Beacon of Hope

Beacon of Hope is an experimental map-based experience for anonymous messages of hope, gratitude, confession, prayer, and dreams—rooted in Bucas Grande, Socorro—and **built with love and alignment**.

Visitors can leave a “light” on the map: a short note anchored to a point on the island. Over time, the shoreline fills with tiny signals of care, resilience, and shared longing.

### What this project is

- **A digital shoreline of messages**: Each pin is a message left by someone passing through—a gratitude, a prayer, a hope, a dream.
- **Anonymous but intentional**: No accounts, profiles, or likes—just words placed with intention.
- **Rooted in place**: Designed specifically with Bucas Grande in mind, but open to anyone who wants to leave a light here.

### Tech stack

- **Framework**: Next.js App Router
- **UI**: React, Tailwind CSS, shadcn-inspired components
- **Map**: Leaflet / React Leaflet
- **Data**: PostgreSQL via Prisma + Neon

### Running locally

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment**

Create a `.env` file at the project root and set:

```bash
DATABASE_URL="your_postgres_connection_string"
```

3. **Run the dev server**

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Vision

This project is meant to feel gentle, spacious, and human. If it helps even one person feel a little less alone—or a little more aligned with what they truly care about—then it’s doing its job.
