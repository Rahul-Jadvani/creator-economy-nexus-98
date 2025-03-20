
# VYB-R8R: Web3 Social Platform

VYB-R8R is a full-stack web3 social platform that allows users to connect, share content, and engage with creators through various features including social posts, creator tokens, ticketing, staking, and more.

## Features

- Web3 Wallet Integration
- Social Feed with Posts and Comments
- Creator Tokens
- NFT Showcase
- Event Tickets
- Token Staking
- Raffles and Giveaways
- Interest-based Content
- Token-gated Exclusive Content

## Tech Stack

- **Frontend**:
  - React (Vite)
  - TypeScript
  - Tailwind CSS
  - TanStack Query (React Query)
  - Zustand for State Management
  - Rainbow Kit for Wallet Connection
  - ShadCN UI Components

- **Backend**:
  - Node.js
  - Express
  - Prisma ORM
  - JSON Web Tokens (JWT)
  - TypeScript

- **Database**:
  - PostgreSQL (Neon)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL database (or Neon account)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vyb-r8r.git
   cd vyb-r8r
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd src/backend
   npm install
   ```

4. Set up the database:
   ```bash
   # From the backend directory
   npx prisma migrate dev
   npx prisma generate
   ```

5. Seed the database with sample data:
   ```bash
   npm run seed
   ```

### Running the Application

1. Start the backend server:
   ```bash
   # From the backend directory
   npm run dev
   ```

2. In a new terminal, start the frontend:
   ```bash
   # From the project root
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Backend Deployment

The backend can be deployed to various platforms:

1. **Heroku**:
   ```bash
   # From the backend directory
   heroku create
   git subtree push --prefix src/backend heroku main
   ```

2. **Railway**:
   - Connect your GitHub repository to Railway
   - Set the root directory to `src/backend`
   - Add environment variables

3. **Digital Ocean App Platform**:
   - Create a new app from your GitHub repository
   - Set the root directory to `src/backend`
   - Configure environment variables

### Frontend Deployment

The frontend can be deployed to:

1. **Vercel**:
   ```bash
   npm run build
   vercel deploy --prod
   ```

2. **Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

## Environment Variables

### Backend (.env)

```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env)

```
VITE_API_URL=https://your-backend-url.com/api
```

## License

[MIT](LICENSE)
