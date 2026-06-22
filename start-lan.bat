@echo off
echo ========================================
echo  Starting Expo with LAN Mode
echo ========================================
echo.
echo Make sure:
echo 1. Phone and computer are on SAME WiFi
echo 2. WiFi network allows device communication
echo 3. Firewall is not blocking port 8081
echo.
echo Your computer IP: 192.168.1.11
echo.
echo Starting LAN mode...
echo.

call npx expo start --lan

pause
