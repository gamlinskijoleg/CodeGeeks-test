# CodeGeeks test assignment
Full-stack event management application with a NestJS API and a Next.js web client. It supports creating, viewing, updating, and deleting events with optional map coordinates.

## Features
- REST API for event CRUD operations
- PostgreSQL persistence through Prisma ORM
- Form validation for event input on backend and frontend
- Event listing, detail, create, and edit pages in the web client
- Interactive map support for event coordinates

## Tech Stack
- TypeScript
- Node.js
- NestJS (backend)
- Prisma ORM
- PostgreSQL
- Next.js + React (frontend)
- Material UI and React Hook Form

## Getting Started:
### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL 16+ (or Docker, if you want to run PostgreSQL in a container)

### Installation
```bash
git clone https://github.com/gamlinskijoleg/CodeGeeks-test.git
cd CodeGeeks-test

# Optional: start PostgreSQL in Docker (skip if you already have local PostgreSQL)
docker run --name codegeeks-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=codegeeks -p 5432:5432 -d postgres:16

cd backend
npm install
copy .env.example .env

# Set backend environment values in backend/.env if needed

# Apply existing migrations and generate PrismaORM client
npx prisma migrate deploy
npx prisma generate
cd ..

cd frontend
npm install

# Create frontend environment file
cp .env.example .env.local
cd ..
```

### Creating sample data
```bash
cd backend
npm run db:seed
```

### Running the App
```bash
# Terminal 1
cd backend
npm run start:dev

# Terminal 2
cd frontend
npm run dev

# Production builds
cd backend
npm run build

cd ../frontend
npm run build
```

## License
MIT
