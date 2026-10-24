@echo off
cd /d "%~dp0"

REM Ensure dependencies are installed
call npm install

REM Open browser automatically
start "" http://localhost:5173

REM Start the Vite dev server
call npm run dev -- --host 0.0.0.0
