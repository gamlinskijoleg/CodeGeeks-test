import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

const seedEvents = [
  {
    title: 'TypeScript Deep Dive',
    description:
      'Hands-on workshop covering advanced types, generics, and strict mode patterns. Bring your laptop and a small project to refactor.',
    date: daysFromNow(7, 18, 0),
    location: 'IT Cluster, Lviv',
    latitude: 49.8397,
    longitude: 24.0297,
    category: 'Workshop',
  },
  {
    title: 'NestJS Breakfast Meetup',
    description:
      'Morning talks on NestJS modules, guards, and Prisma integration. Coffee and pastries included.',
    date: daysFromNow(14, 9, 30),
    location: 'Lviv Coffee Mining Manufacture',
    latitude: 49.842,
    longitude: 24.031,
    category: 'Meetup',
  },
  {
    title: 'CodeGeeks Hack Night',
    description:
      'Open-format evening for side projects, pair programming, and code reviews. All skill levels welcome.',
    date: daysFromNow(3, 19, 0),
    location: 'Promprylad.Renovation, Lviv',
    latitude: 49.8089,
    longitude: 24.0152,
    category: 'Hack Night',
  },
  {
    title: 'React & Next.js Lab',
    description:
      'Build a small events dashboard with App Router, server actions, and MUI. We provide starter repo links at the door.',
    date: daysFromNow(21, 17, 0),
    location: 'Startup Depot, Lviv',
    latitude: 49.8356,
    longitude: 24.0261,
    category: 'Workshop',
  },
  {
    title: 'Ukraine Dev Conference 2026',
    description:
      'Two-day conference with tracks on backend, frontend, DevOps, and product. Early-bird tickets available on the website.',
    date: daysFromNow(45, 10, 0),
    location: 'Lviv Arena',
    latitude: 49.7745,
    longitude: 24.0189,
    category: 'Conference',
  },
  {
    title: 'Open Source Contribution Day',
    description:
      'Guided session on finding good first issues, writing PR descriptions, and working with maintainers.',
    date: daysFromNow(28, 11, 0),
    location: 'Lviv City Library, Tech Hall',
    latitude: 49.8419,
    longitude: 24.0315,
    category: 'Workshop',
  },
  {
    title: 'AI Tools for Developers',
    description:
      'Panel and demos on coding assistants, local LLMs, and responsible use in team workflows.',
    date: daysFromNow(10, 18, 30),
    location: 'Online (Zoom link sent after RSVP)',
    latitude: null,
    longitude: null,
    category: 'Meetup',
  },
  {
    title: 'Junior Dev Networking',
    description:
      'Speed networking for students and career switchers. Mentors from local product companies will join.',
    date: daysFromNow(18, 17, 30),
    location: 'Kooperativ, Lviv',
    latitude: 49.8442,
    longitude: 24.0278,
    category: 'Networking',
  },
  {
    title: 'Spring Hackathon 2026',
    description:
      '48-hour team hackathon. Themes announced at kickoff. Prizes for best MVP, best design, and best use of APIs.',
    date: daysFromNow(60, 9, 0),
    location: 'Lviv Polytechnic, Building 12',
    latitude: 49.8352,
    longitude: 24.0145,
    category: 'Hackathon',
  },
  {
    title: 'PostgreSQL Performance Clinic',
    description:
      'Learn indexing strategies, EXPLAIN plans, and connection pooling with Prisma and raw SQL examples.',
    date: daysFromNow(35, 16, 0),
    location: 'SoftServe Campus, Lviv',
    latitude: 49.8267,
    longitude: 24.0034,
    category: 'Workshop',
  },
  {
    title: 'GraphQL vs REST Roundtable',
    description:
      'Informal debate and case studies from teams that migrated between API styles. Audience Q&A at the end.',
    date: daysFromNow(5, 19, 30),
    location: 'Dzyga Art Center, Lviv',
    latitude: 49.8413,
    longitude: 24.0321,
    category: 'Meetup',
  },
  {
    title: 'Mobile Dev Fireside Chat',
    description:
      'React Native and Flutter developers share lessons from shipping cross-platform apps in 2025–2026.',
    date: daysFromNow(52, 18, 0),
    location: 'Urban Space 500, Lviv',
    latitude: 49.8381,
    longitude: 24.0242,
    category: 'Meetup',
  },
  {
    title: 'Docker & Kubernetes 101',
    description:
      'From Dockerfile to a minimal k8s deployment. We walk through local setup with kind and common pitfalls for small teams.',
    date: daysFromNow(12, 16, 0),
    location: 'ELEKS Training Center, Lviv',
    latitude: 49.8324,
    longitude: 24.0198,
    category: 'Workshop',
  },
  {
    title: 'Women in Tech Breakfast',
    description:
      'Community breakfast with lightning talks on career growth, salary negotiation, and building support networks in tech.',
    date: daysFromNow(8, 8, 30),
    location: 'Café 1, Lviv',
    latitude: 49.8408,
    longitude: 24.0289,
    category: 'Networking',
  },
  {
    title: 'Rust for Backend Engineers',
    description:
      'Intro to ownership, error handling, and when Rust makes sense next to your existing Node or Go services.',
    date: daysFromNow(25, 18, 0),
    location: 'Online (Discord stage)',
    latitude: null,
    longitude: null,
    category: 'Workshop',
  },
  {
    title: 'Product Design for Developers',
    description:
      'Short crash course on user flows, wireframes, and handing off designs without losing intent in implementation.',
    date: daysFromNow(16, 17, 0),
    location: 'Bandershtat, Lviv',
    latitude: 49.8431,
    longitude: 24.0342,
    category: 'Workshop',
  },
  {
    title: 'Kyiv JS Community Meetup',
    description:
      'Monthly JavaScript meetup: talks on performance, bundlers, and testing. Pizza sponsored by local partners.',
    date: daysFromNow(22, 19, 0),
    location: 'UNIT.City, Kyiv',
    latitude: 50.4113,
    longitude: 30.6319,
    category: 'Meetup',
  },
  {
    title: 'DevOps Days Ukraine',
    description:
      'Single-track conference on CI/CD, observability, and platform engineering. Recordings published within a week.',
    date: daysFromNow(70, 9, 0),
    location: 'Expo Center of Ukraine, Kyiv',
    latitude: 50.4384,
    longitude: 30.5273,
    category: 'Conference',
  },
  {
    title: 'CSS Architecture Clinic',
    description:
      'Compare CSS Modules, Tailwind, and MUI theming with live refactors on a sample component library.',
    date: daysFromNow(6, 17, 30),
    location: 'Futura Hub, Lviv',
    latitude: 49.8372,
    longitude: 24.0225,
    category: 'Workshop',
  },
  {
    title: 'Startup Pitch Night',
    description:
      'Five early-stage teams demo MVPs. Developers can join as co-founders or contractors—networking after pitches.',
    date: daysFromNow(32, 19, 0),
    location: 'iHUB, Lviv',
    latitude: 49.8365,
    longitude: 24.0287,
    category: 'Networking',
  },
  {
    title: 'Security Champions Workshop',
    description:
      'OWASP Top 10 walkthrough with hands-on fixes in a vulnerable demo API. Bring a security-minded teammate if you can.',
    date: daysFromNow(40, 14, 0),
    location: 'GlobalLogic Office, Lviv',
    latitude: 49.8291,
    longitude: 24.0112,
    category: 'Workshop',
  },
  {
    title: 'Game Jam Weekend',
    description:
      'Build a small browser or mobile game in 48 hours. Teams form on Friday; judging Sunday evening.',
    date: daysFromNow(55, 17, 0),
    location: 'Lviv National Art Gallery, Annex',
    latitude: 49.8427,
    longitude: 24.0264,
    category: 'Hackathon',
  },
  {
    title: 'Elixir & Phoenix Evening',
    description:
      'Live coding session building a real-time channel and comparing concurrency models with Node and Go.',
    date: daysFromNow(19, 18, 0),
    location: 'Secret Hall, Lviv',
    latitude: 49.8391,
    longitude: 24.0301,
    category: 'Meetup',
  },
  {
    title: 'Tech Leadership Roundtable',
    description:
      'Engineering managers and tech leads discuss hiring, 1:1s, and balancing delivery with tech debt. Chatham House rules.',
    date: daysFromNow(48, 18, 30),
    location: 'Mon Chef, Lviv',
    latitude: 49.8455,
    longitude: 24.0293,
    category: 'Networking',
  },
  {
    title: 'Odesa Python User Group',
    description:
      'Talks on data pipelines, FastAPI, and typing in large codebases. Beginners welcome for the intro session.',
    date: daysFromNow(26, 18, 0),
    location: 'Impact Hub Odesa',
    latitude: 46.4825,
    longitude: 30.7233,
    category: 'Meetup',
  },
  {
    title: 'Cloud Cost Optimization Lab',
    description:
      'Review real AWS and GCP bills, set budgets, and automate alerts. Sample Terraform snippets provided.',
    date: daysFromNow(38, 15, 0),
    location: 'Online (Google Meet)',
    latitude: null,
    longitude: null,
    category: 'Workshop',
  },
  {
    title: 'Midnight Deploy Club',
    description:
      'Humorous but practical session on safe releases, feature flags, and rollback drills. Memes encouraged.',
    date: daysFromNow(4, 20, 0),
    location: 'Promprylad.Renovation, Lviv',
    latitude: 49.8089,
    longitude: 24.0152,
    category: 'Hack Night',
  },
  {
    title: 'Accessibility Audit Day',
    description:
      'Pair up to run axe and manual screen-reader checks on open-source projects. Fix PRs merged same day when possible.',
    date: daysFromNow(30, 10, 0),
    location: 'Lviv City Library, Tech Hall',
    latitude: 49.8419,
    longitude: 24.0315,
    category: 'Workshop',
  },
  {
    title: 'Blockchain Builders Meetup',
    description:
      'Smart contracts, wallets, and UX for Web3 apps—separate tracks for curious beginners and active builders.',
    date: daysFromNow(42, 19, 0),
    location: 'Arena Lviv, Conference Room B',
    latitude: 49.7745,
    longitude: 24.0189,
    category: 'Meetup',
  },
  {
    title: 'Internship Fair 2026',
    description:
      'Meet recruiters and team leads from product companies. Bring CVs and GitHub links; mock interviews in the afternoon.',
    date: daysFromNow(65, 11, 0),
    location: 'Lviv Polytechnic, Main Building',
    latitude: 49.8352,
    longitude: 24.0145,
    category: 'Networking',
  },
  {
    title: 'E2E Testing with Playwright',
    description:
      'Write stable tests for a sample Next.js app: auth flows, visual regression, and CI integration with GitHub Actions.',
    date: daysFromNow(15, 16, 30),
    location: 'N-iX Office, Lviv',
    latitude: 49.8278,
    longitude: 24.0089,
    category: 'Workshop',
  },
  {
    title: 'Frontend Masters Weekend',
    description:
      'Two days of deep dives: state management, performance profiling, and design systems. Lunch included both days.',
    date: daysFromNow(75, 10, 0),
    location: 'IT Cluster, Lviv',
    latitude: 49.8397,
    longitude: 24.0297,
    category: 'Conference',
  },
  {
    title: 'IoT Hack Night',
    description:
      'Arduino, Raspberry Pi, and MQTT demos. Borrow kits on site or bring your own hardware project to show off.',
    date: daysFromNow(9, 19, 0),
    location: 'FabLab Lviv',
    latitude: 49.8338,
    longitude: 24.0176,
    category: 'Hack Night',
  },
  {
    title: 'Career Switchers AMA',
    description:
      'Ask-me-anything with developers who moved from teaching, finance, and design into software roles within two years.',
    date: daysFromNow(11, 17, 0),
    location: 'Online (Zoom link sent after RSVP)',
    latitude: null,
    longitude: null,
    category: 'Networking',
  },
  {
    title: 'Legacy Code Rescue Sprint',
    description:
      'One-day mob programming on a real open codebase: characterization tests, strangler fig, and incremental refactors.',
    date: daysFromNow(50, 9, 0),
    location: 'ELEKS Training Center, Lviv',
    latitude: 49.8324,
    longitude: 24.0198,
    category: 'Hackathon',
  },
];

function daysFromNow(days: number, hour: number, minute: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date;
}

async function main() {
  const deleted = await prisma.event.deleteMany();
  const created = await prisma.event.createMany({ data: seedEvents });

  console.log(`Removed ${deleted.count} existing event(s).`);
  console.log(`Seeded ${created.count} event(s).`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
