@echo off
echo ==========================================
echo EXPO TUNNEL MODE - Works on any network
echo ==========================================
echo.
echo This mode works even if:
echo - Your phone is on different WiFi
echo - You have firewall issues
echo - LAN mode doesn't work
echo.
echo Note: Tunnel mode is slower but more reliable
echo ==========================================
echo.

REM Kill existing processes
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

REM Clear cache
echo Clearing Expo cache...
npx expo start --clear --tunnel

pause
