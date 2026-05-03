#!/bin/bash

echo "╔════════════════════════════════════════════════════╗"
echo "║     ANANSE HERITAGE TOURS - QUICK START SCRIPT    ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Check if server dependencies are installed
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server
    npm install
    cd ..
    echo "✅ Server dependencies installed!"
    echo ""
fi

# Start the server in the background
echo "🚀 Starting backend server..."
cd server
npm start &
SERVER_PID=$!
cd ..

# Wait for server to start
echo "⏳ Waiting for server to initialize..."
sleep 3

# Check if server is running
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Server is running!"
else
    echo "❌ Server failed to start. Please check server/server.js"
    kill $SERVER_PID
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║              SYSTEM IS READY!                      ║"
echo "╠════════════════════════════════════════════════════╣"
echo "║  Frontend:  http://localhost:5173                 ║"
echo "║  Backend:   http://localhost:3001                 ║"
echo "╠════════════════════════════════════════════════════╣"
echo "║  Next Steps:                                       ║"
echo "║  1. Visit http://localhost:5173                   ║"
echo "║  2. Click 'Sign Up' to create an account          ║"
echo "║  3. Login and access your dashboard               ║"
echo "║  4. Read SETUP_GUIDE.md for more details          ║"
echo "╠════════════════════════════════════════════════════╣"
echo "║  To stop the server: Press Ctrl+C                 ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Start the frontend
echo "🚀 Starting frontend..."
npm run dev &
FRONTEND_PID=$!

# Keep script running and forward signals to server
trap "echo Shutting down...; kill $SERVER_PID $FRONTEND_PID; exit" INT TERM

# Wait for server process
wait $SERVER_PID
