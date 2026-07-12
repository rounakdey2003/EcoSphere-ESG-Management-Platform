@echo off
echo ============================================
echo  EcoSphere — Frontend (port 5173)
echo ============================================
echo.
echo Make sure the API server is running first!
echo (Run start-api.bat in another window)
echo.

pnpm --filter @workspace/ecosphere run dev
