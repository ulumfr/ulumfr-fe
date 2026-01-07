# Ulumfr - Portfolio Dashboard

Modern portfolio management dashboard built with Next.js 16, React 19, and TailwindCSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: TailwindCSS
- **State Management**: Zustand + React Query
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios

## Features

- 🔐 **Authentication** - JWT-based auth with access/refresh tokens
- 📊 **Dashboard** - Admin panel for managing portfolio content
- 💼 **Projects** - CRUD operations with categories & tags
- 🎓 **Education** - Academic history management
- 💻 **Careers** - Work experience tracking
- 📄 **Resumes** - PDF upload with active resume toggle
- 📬 **Contacts** - Contact form submissions viewer
- 🏷️ **Tags** - Devicon integration for tech tags (200+)
- 🌙 **Dark Mode** - System-aware theme switching

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see ulumfr-be)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/ulumfr-fe.git
cd ulumfr-fe

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create `.env` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Project Structure

```
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard pages
│   ├── (public)/        # Public landing page
│   └── not-found.tsx    # Custom 404 page
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── careers/         # Career management
│   ├── educations/      # Education management
│   ├── projects/        # Project management
│   ├── tags/            # Tag management
│   └── ...
├── hooks/               # Custom React hooks
├── services/            # API service functions
├── store/               # Zustand stores
├── types/               # TypeScript types
└── lib/                 # Utility functions
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## API Integration

This frontend connects to the Ulumfr Backend API. See [ulumfr-be](https://github.com/yourusername/ulumfr-be) for backend setup.

### API Endpoints Used

- `/v1/auth/*` - Authentication
- `/v1/admin/projects` - Project management
- `/v1/admin/careers` - Career management
- `/v1/admin/educations` - Education management
- `/v1/admin/categories` - Category management
- `/v1/admin/tags` - Tag management
- `/v1/admin/resumes` - Resume management
- `/v1/admin/contacts` - Contact management
