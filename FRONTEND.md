# Frontend App

## Τεχνολογίες

Next.js 14 με TypeScript, Tailwind CSS, React Hook Form, Zod validation.
Default logins (Auto-seeded):
- Admin: `admin` / `ProdTrack2025`
- Operator: `operator` / `Operator2025`
- Worker: `worker` / `Worker2025`
## Δομή

### App Router (`/app`)

- `/(roles)` - layout για authenticated users
- `@admin`, `@operator`, `@worker` - parallel routes ανά role
- `/login` - public login page

### Components

- `/common` - shared components (forms, tables, pages)
- `/ui` - base UI components (buttons, inputs)
- `/form` - form controls με validation
- `/table` - data tables με pagination, search
- `/navigation` - header, menus

### State & Data

- Server actions για API calls (`/lib/actions`)
- Zod schemas για validation (`/lib/schema`)  
- TypeScript types (`/lib/types`)
- Constants για routes, endpoints (`/lib/constants`)

### Styling

Tailwind με custom CSS variables στο `globals.css`. Primary color: `#3b82f6` (blue).

### Authentication

Middleware ελέγχει JWT token και redirects. User data στα cookies. Role-based navigation.

### Pages

Κάθε role έχει δικό του layout:
- Worker: add/edit entries, profile
- Operator: entries + product codes + basic info
- Admin: όλα + users + machines

### API Integration

- Fetcher utility για HTTP requests
- Error handling με toast notifications
- Image uploads για machines

### PWA

Manifest.json για mobile app experience. Service worker για offline support.

Χρησιμοποιεί React Select, Moment.js, Lucide icons.