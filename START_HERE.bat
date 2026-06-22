@echo off
title Expo Start Menu
color 0A

:menu
cls
echo ========================================
echo    EXPO DEVELOPMENT SERVER START
echo ========================================
echo.
echo Your Computer IP: 192.168.1.11
echo.
echo Choose how to start:
echo.
echo 1. TUNNEL MODE (Recommended - Works anywhere)
echo    - Use when on different WiFi
echo    - Most reliable option
echo    - Takes 1-2 minutes to start
echo.
echo 2. LAN MODE (Faster but requires same WiFi)
echo    - Phone and PC must be on same WiFi
echo    - Requires firewall configuration
echo    - Faster reload times
echo.
echo 3. FIX FIREWALL (Run this once before using LAN)
echo    - Adds Windows Firewall rules
echo    - Requires Administrator
echo.
echo 4. EXIT
echo.
echo ========================================
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto tunnel
if "%choice%"=="2" goto lan
if "%choice%"=="3" goto firewall
if "%choice%"=="4" goto end
goto menu

:tunnel
cls
echo ========================================
echo  Starting TUNNEL MODE...
echo ========================================
echo.
echo This may take 1-2 minutes...
echo Scan the QR code when it appears.
echo.
call npx expo start --tunnel
goto menu

:lan
cls
echo ========================================
echo  Starting LAN MODE...
echo ========================================
echo.
echo Make sure:
echo - Phone and PC on SAME WiFi
echo - Firewall configured (Option 3)
echo.
call npx expo start --lan
goto menu

:firewall
cls
echo ========================================
echo  FIREWALL FIX
echo ========================================
echo.
echo This will open the firewall fix script.
echo Right-click it and select "Run as Administrator"
echo.
pause
start fix-firewall.bat
goto menu

:end
exit
