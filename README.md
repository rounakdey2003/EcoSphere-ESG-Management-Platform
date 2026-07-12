EcoSphere - ESG Management Platform
===================================

EcoSphere is a full-stack Environmental, Social and Governance (ESG) Management Platform that enables organizations to measure, manage and improve their ESG performance. It integrates carbon accounting, employee participation tracking, governance compliance, and gamification into a unified real-time dashboard.

Features
--------

Environmental Module:
- Configure Emission Factors
- Record Carbon Transactions
- Department-level carbon tracking
- Sustainability Goals tracker

Social Module:
- CSR Activity management
- Employee Participation approval workflow
- Gender diversity metrics
- Top participants leaderboard

Governance Module:
- ESG Policy management with employee acknowledgements
- Audit scheduling and tracking
- Compliance Issue reporting with owner assignment and due dates

Gamification Module:
- Sustainability Challenges
- XP and Points system
- Badge catalog with auto-award
- Reward catalog with employee redemption

Reports:
- Environmental, Social, and Governance Reports
- ESG Summary Report with department rankings
- CSV export and Print functionality

Settings:
- Department, Category, and Employee management
- Configurable ESG scoring weights

Prerequisites
-------------
- Node.js >= 20
- pnpm >= 9 (or npm to install pnpm via `npm install -g pnpm`)
- PostgreSQL >= 14 (local instance or cloud)

Local Setup Instructions
------------------------

1. Clone and Install
git clone https://github.com/YOUR_USERNAME/eco-sphere.git
cd eco-sphere
pnpm install

2. Configure Environment
Copy the example environment file:
cp .env.example .env

Edit .env and set your PostgreSQL connection string:
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecosphere
PORT=5000

3. Create the Database
Create the "ecosphere" database in PostgreSQL if it doesn't exist.

4. Push Database Schema
pnpm --filter @workspace/db run push
This creates all tables using Drizzle ORM.

5. Seed Dummy Data (Optional)
To populate the database with sample features and test data:
pnpm run seed

6. Run the Development Servers

Start the API Server (Terminal 1):
pnpm run dev:api

Start the Frontend (Terminal 2):
pnpm run dev:web

7. Open the App
Visit http://localhost:5173 in your browser.
The frontend proxies all API requests to http://localhost:5000 automatically.

Deployment to Vercel
--------------------
This project is configured to be deployed easily. 
Note: The root package.json explicitly defines packageManager as pnpm@9.x to ensure Vercel uses the correct package manager version via Corepack.

Business Rules
--------------
- ESG Score = weighted average of Environmental, Social, and Governance department scores.
- Evidence Required: When enabled, CSR participations cannot be approved without proof.
- Compliance Issues: Must have an assigned Owner and Due Date; overdue open issues are flagged in the dashboard.
