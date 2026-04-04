@echo off
chcp 65001 >nul
echo ============================================
echo  Ke Toan Sao Viet - Cai dat lan dau
echo ============================================

echo.
echo [1/2] Cai dat Backend dependencies...
cd /d "%~dp0backend"
call npm install
if errorlevel 1 (
    echo [LOI] Khong the cai dat backend. Kiem tra Node.js da duoc cai chua.
    pause
    exit /b 1
)

echo.
echo [2/2] Cai dat Frontend dependencies...
cd /d "%~dp0frontend"
call npm install
if errorlevel 1 (
    echo [LOI] Khong the cai dat frontend.
    pause
    exit /b 1
)

echo.
echo ============================================
echo  Cai dat hoan tat!
echo  Chay start.bat de khoi dong website.
echo ============================================
pause
