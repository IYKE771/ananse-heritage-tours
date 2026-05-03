@echo off
echo ╔════════════════════════════════════════════════════╗
echo ║     ANANSE HERITAGE TOURS - QUICK START SCRIPT    ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Check if server dependencies are installed
if not exist "server\node_modules" (
    echo 📦 Installing server dependencies...
    cd server
    call npm install
    cd ..
    echo ✅ Server dependencies installed!
    echo.
)

echo 🚀 Starting backend server...
cd server
start "Ananse Server" cmd /k npm start
cd ..

echo ⏳ Waiting for server to initialize...
timeout /t 5 /nobreak > nul

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║              SYSTEM IS READY!                      ║
echo ╠════════════════════════════════════════════════════╣
echo ║  Frontend:  http://localhost:5173                 ║
echo ║  Backend:   http://localhost:3001                 ║
echo ╠════════════════════════════════════════════════════╣
echo ║  Next Steps:                                       ║
echo ║  1. Visit http://localhost:5173                   ║
echo ║  2. Click 'Sign Up' to create an account          ║
echo ║  3. Login and access your dashboard               ║
echo ║  4. Read SETUP_GUIDE.md for more details          ║
echo ╠════════════════════════════════════════════════════╣
echo ║  Server is running in a separate window           ║
echo ║  Close that window to stop the server             ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Press any key to exit this window...
pause > nul
