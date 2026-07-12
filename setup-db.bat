@echo off
echo ============================================
echo  EcoSphere — Database Schema Push
echo ============================================
echo.

set DATABASE_URL=postgresql://postgres:admin@localhost:5432/ecosphere

echo Pushing Drizzle schema to ecosphere database...
pnpm --filter @workspace/db run push
echo.
echo Done! Database tables are ready.
echo.
echo Now run start-dev.bat to launch the servers.
