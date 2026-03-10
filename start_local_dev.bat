@echo off
REM HyperLocal AQI Dashboard - Local Development Startup Script

echo.
echo ========================================
echo HyperLocal AQI Dashboard - Setup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.11+ from https://www.python.org/
    pause
    exit /b 1
)

echo [✓] Python found
python --version

REM Check if virtual environment exists
if not exist "venv" (
    echo.
    echo [*] Creating Python virtual environment...
    python -m venv venv
    echo [✓] Virtual environment created
) else (
    echo [✓] Virtual environment already exists
)

REM Activate virtual environment
echo.
echo [*] Activating virtual environment...
call venv\Scripts\activate.bat

REM Install/upgrade dependencies
echo.
echo [*] Installing Python dependencies...
pip install --upgrade pip setuptools wheel >nul 2>&1
pip install -r backend\requirements.txt >nul 2>&1
if %errorlevel% eq 0 (
    echo [✓] Python dependencies installed
) else (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ========================================
echo Ready to start development servers!
echo ========================================
echo.
echo To start the backend server, run:
echo   uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
echo.
echo To start the frontend server (in another terminal), run:
echo   cd frontend
echo   npm install
echo   npm run dev
echo.
echo Then visit:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo.
pause
