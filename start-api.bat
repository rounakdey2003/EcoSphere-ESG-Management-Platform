@echo off
echo ============================================
echo  EcoSphere — API Server (port 5000)
echo ============================================
echo.

set DATABASE_URL=postgresql://postgres:admin@localhost:5432/ecosphere
set PORT=5000

echo Starting API server...
pnpm --filter @workspace/api-server run dev
