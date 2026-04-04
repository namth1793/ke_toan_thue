@echo off
chcp 65001 >nul
echo ============================================
echo  Ke Toan Sao Viet - Khoi dong
echo ============================================
echo.
echo  Backend : http://localhost:5013
echo  Frontend: http://localhost:5174
echo.
echo  Nhan Ctrl+C de dung
echo ============================================

start "KeToan - Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 2 /nobreak >nul
start "KeToan - Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 /nobreak >nul
start http://localhost:5174
