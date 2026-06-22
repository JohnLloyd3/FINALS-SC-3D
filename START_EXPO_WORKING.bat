@echo off
title Expo Server - Starting...
color 0A

echo ========================================
echo  Starting Expo Development Server
echo ========================================
echo.
echo Mode: LAN + Localhost (Universal)
echo.
echo This will work for:
echo - Physical device on same WiFi
echo - Android emulator
echo - iOS simulator
echo.
echo Your IP: 192.168.1.11
echo.
echo Starting server...
echo.

REM Set environment to non-interactive
set CI=1

REM Start Expo with both LAN and localhost
call npx expo start --lan

echo.
echo ========================================
echo Server stopped
echo ========================================
pause
