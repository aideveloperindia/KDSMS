# Karimnagar Dairy Sales Management System (KDSMS)

A comprehensive web-based application for managing daily milk sales, tracking inventory, and analyzing sales data for Karimnagar Dairy's distribution network.

## Features

- Phone number-based authentication with OTP
- Role-based access control (Agent, Executive, Zonal Manager, AGM, Management)
- Daily sales entry with automatic calculations
- Sales history with filtering and export options
- Performance analytics and reporting
- Real-time data validation
- Responsive design for all devices

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- MongoDB
- JWT Authentication
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
   JWT_SECRET=your-secret-key-here-minimum-32-characters
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
├── lib/                 # Utility functions and database connection
├── models/             # MongoDB models
└── middleware.ts       # Authentication middleware
```

## User Roles and Permissions

1. **Agent**
   - Record daily sales
   - View personal sales history
   - Track performance metrics

2. **Executive**
   - View team performance
   - Generate basic reports
   - Manage agents

3. **Zonal Manager**
   - Analyze zone performance
   - Handle agent assignments
   - Territory management

4. **AGM (Assistant General Manager)**
   - Multi-zone oversight
   - Comprehensive analytics
   - Performance review

5. **Management**
   - Complete system access
   - Strategic analytics
   - System administration

## API Routes

### Authentication
- `POST /api/auth/send-otp`: Send OTP to phone number
- `POST /api/auth/verify-otp`: Verify OTP and generate session

### Sales
- `POST /api/sales`: Create new sales entry
- `GET /api/sales`: Get sales history with filters

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 