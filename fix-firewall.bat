@echo off
echo ========================================
echo  Fix Firewall for Expo Development
echo ========================================
echo.
echo This will add firewall rules to allow:
echo - Port 8081 (Metro bundler)
echo - Port 19000-19006 (Expo dev tools)
echo.
echo NOTE: You need to run this as Administrator!
echo.
echo Right-click this file and select "Run as Administrator"
echo.
pause

echo.
echo Adding firewall rules...
echo.

netsh advfirewall firewall add rule name="Expo Metro Bundler" dir=in action=allow protocol=TCP localport=8081
netsh advfirewall firewall add rule name="Expo Dev Tools" dir=in action=allow protocol=TCP localport=19000-19006

echo.
echo ========================================
echo Firewall rules added successfully!
echo ========================================
echo.
echo Now you can start Expo normally:
echo - Run: start-lan.bat
echo - Or: npx expo start --lan
echo.

pause
