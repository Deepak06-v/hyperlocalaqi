#!/usr/bin/env pwsh
<#
.SYNOPSIS
HyperLocal AQI Dashboard - Local Development Startup Script
.DESCRIPTION
Sets up and starts the development environment with Python backend and React frontend
#>

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "HyperLocal AQI Dashboard - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
$pythonTest = & { python --version 2>&1 }
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.11+ from https://www.python.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[OK] Python found: $pythonTest" -ForegroundColor Green

# Check if virtual environment exists
$venvPath = ".\venv"
if (-not (Test-Path $venvPath)) {
    Write-Host ""
    Write-Host "[*] Creating Python virtual environment..." -ForegroundColor Yellow
    & python -m venv venv
    Write-Host "[OK] Virtual environment created" -ForegroundColor Green
} else {
    Write-Host "[OK] Virtual environment already exists" -ForegroundColor Green
}

# Activate virtual environment
Write-Host ""
Write-Host "[*] Activating virtual environment..." -ForegroundColor Yellow
& "$venvPath\Scripts\Activate.ps1"
Write-Host "[OK] Virtual environment activated" -ForegroundColor Green

# Install/upgrade dependencies
Write-Host ""
Write-Host "[*] Installing Python dependencies..." -ForegroundColor Yellow
& python -m pip install --upgrade pip setuptools wheel 2>&1 | Out-Null
& python -m pip install -r backend\requirements.txt 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Python dependencies installed" -ForegroundColor Green
} else {
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ready to start development servers!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "To start the backend server, run:" -ForegroundColor Cyan
Write-Host "  uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000" -ForegroundColor White
Write-Host ""
Write-Host "To start the frontend server (in another terminal), run:" -ForegroundColor Cyan
Write-Host "  cd frontend && npm install && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then visit:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor Magenta
Write-Host "  Backend API: http://localhost:8000" -ForegroundColor Magenta
Write-Host "  API Docs: http://localhost:8000/docs" -ForegroundColor Magenta
Write-Host ""
Read-Host "Press Enter to exit"
