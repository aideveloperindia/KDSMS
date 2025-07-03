# Karimnagar Dairy Sales Management System (KDSMS)

A comprehensive web-based application for managing daily milk sales, tracking inventory, and analyzing sales data for Karimnagar Dairy's distribution network.

## Organizational Structure

1. **Management** (1 person)
   - Complete system access
   - User management
   - Password reset capability

2. **AGM** (1 person)
   - Access to all 6 zones
   - Monitor all zone managers
   - View company-wide sales data

3. **Zonal Managers** (6 persons, 1 per zone)
   - Each manages 4 areas (total 24 areas)
   - Monitor executives in their zone
   - View zone-wide sales data

4. **Executives** (24 persons, 4 per zone)
   - Each manages 20 agents (total 480 agents)
   - Can view their 20 agents' data
   - Can add visit remarks

5. **Agents** (480 persons, 20 per executive)
   - Can only enter sales data
   - Can add remarks to sales
   - View their own sales history

## Features

- Password-based authentication
- Role-based access control
- Daily sales entry with automatic calculations
- Sales history with filtering
- Visit remarks system
- Responsive design for all devices

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- MongoDB
- NextAuth.js
- React Hook Form
- Heroicons

## Prerequisites

- Node.js 18.17 or later
- MongoDB 4.4 or later
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/kdsms.git
   cd kdsms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/kdsms
   NEXTAUTH_SECRET=your-secret-key-here-minimum-32-characters
   NEXTAUTH_URL=http://localhost:3003
   NODE_ENV=development
   ```

4. Set up initial users:
   ```bash
   npm run setup
   ```
   This will create:
   - 1 Management user
   - 1 AGM
   - 6 Zonal Managers
   - 24 Executives
   - 480 Agents

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3003](http://localhost:3003) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── agents/         # Agent dashboard and features
│   ├── executives/     # Executive management
│   ├── zm/            # Zonal Manager features
│   ├── agm/           # AGM oversight
│   └── management/    # System administration
├── components/         # React components
├── lib/               # Utility functions and database
└── models/            # MongoDB models
```

## User Roles and Access Rights

1. **Agent**
   - Enter daily sales data
   - Add remarks to sales
   - View personal sales history

2. **Executive**
   - View 20 assigned agents' data
   - Add visit remarks
   - Monitor agent performance

3. **Zonal Manager**
   - Access to 4 areas (80 agents)
   - Monitor 4 executives
   - View zone-wide data

4. **AGM**
   - Access to all 6 zones
   - Monitor all zone managers
   - Company-wide view

5. **Management**
   - Complete system access
   - User management
   - Password reset capability

## API Routes

### Authentication
- `POST /api/auth/[...nextauth]`: NextAuth.js authentication
- `POST /api/auth/setup-users`: Create initial user hierarchy

### Sales
- `POST /api/sales`: Create new sales entry
- `GET /api/sales`: Get sales history with filters
- `POST /api/sales/remarks`: Add remarks to sales

## Default Credentials

After running the setup script, you can log in with these credentials:

1. Management:
   - Employee ID: MGMT001
   - Password: password123

2. AGM:
   - Employee ID: AGM001
   - Password: password123

3. Zonal Managers:
   - Employee ID: ZM001 to ZM006
   - Password: password123

4. Executives:
   - Employee ID: EXEC001 to EXEC024
   - Password: password123

5. Agents:
   - Employee ID: AGENT001 to AGENT480
   - Password: password123

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License. 