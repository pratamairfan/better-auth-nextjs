<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<h1 align="center">🔐 Better Auth Demo</h1>

<p align="center">
  <strong>Modern authentication demo built with Better Auth, Next.js 16, and Drizzle ORM</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-database">Database</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## ✨ Features

| Feature                   | Description                            |
| ------------------------- | -------------------------------------- |
| 🔑 **Email & Password**   | Secure credential-based authentication |
| 🌐 **Google OAuth**       | One-click sign in with Google          |
| 🍪 **Session Management** | Secure cookie-based sessions           |
| 🌓 **Dark/Light Mode**    | Theme switching with next-themes       |
| 📱 **Responsive Design**  | Mobile-first UI with Tailwind CSS      |
| 🗄️ **PostgreSQL**         | Powered by Neon serverless database    |

---

## 🛠 Tech Stack

### Core Framework

- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library
- **[TypeScript 5](https://typescriptlang.org)** - Type safety

### Authentication

- **[Better Auth](https://better-auth.com)** - Modern authentication library
- **Google OAuth** - Social login provider

### Database & ORM

- **[Drizzle ORM](https://orm.drizzle.team)** - TypeScript ORM
- **[Neon](https://neon.tech)** - Serverless PostgreSQL

### UI Components

- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS
- **[Radix UI](https://radix-ui.com)** - Headless UI primitives
- **[Lucide React](https://lucide.dev)** - Beautiful icons
- **[Sonner](https://sonner.emilkowal.ski)** - Toast notifications

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com)** - Form handling
- **[Zod](https://zod.dev)** - Schema validation

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm / npm / yarn
- PostgreSQL database (or [Neon](https://neon.tech) account)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-site-1

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Database Migration

```bash
# Generate migrations
npx drizzle-kit generate

# Push to database
npx drizzle-kit push

# Open Drizzle Studio (optional)
npx drizzle-kit studio
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
my-site-1/
├── app/                    # Next.js App Router
│   ├── (root)/            # Protected routes with sidebar
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── ...               # Custom components
├── db/                    # Database configuration
│   ├── drizzle.ts        # Drizzle client
│   └── schema.ts         # Database schema
├── lib/                   # Utility libraries
│   └── auth.ts           # Better Auth configuration
├── hooks/                 # Custom React hooks
├── migrations/            # Drizzle migrations
└── public/               # Static assets
```

---

## 🗄 Database

### Schema Overview

```mermaid
erDiagram
    USER ||--o{ SESSION : has
    USER ||--o{ ACCOUNT : has

    USER {
        text id PK
        text name
        text email UK
        boolean email_verified
        text image
        text phone
        timestamp created_at
        timestamp updated_at
    }

    SESSION {
        text id PK
        timestamp expires_at
        text token UK
        text ip_address
        text user_agent
        text user_id FK
    }

    ACCOUNT {
        text id PK
        text account_id
        text provider_id
        text user_id FK
        text access_token
        text refresh_token
    }

    VERIFICATION {
        text id PK
        text identifier
        text value
        timestamp expires_at
    }
```

---

## 📜 Available Scripts

| Command                    | Description              |
| -------------------------- | ------------------------ |
| `npm run dev`              | Start development server |
| `npm run build`            | Build for production     |
| `npm run start`            | Start production server  |
| `npm run lint`             | Run ESLint               |
| `npx drizzle-kit generate` | Generate migrations      |
| `npx drizzle-kit push`     | Push schema to database  |
| `npx drizzle-kit studio`   | Open Drizzle Studio      |

---

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/my-site-1)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy! 🚀

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
BETTER_AUTH_SECRET="your-production-secret"
BETTER_AUTH_URL="https://your-domain.com"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/primitives)

---

<p align="center">
  Made with ❤️ using <a href="https://nextjs.org">Next.js</a> and <a href="https://better-auth.com">Better Auth</a>
</p>
