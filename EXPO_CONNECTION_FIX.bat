@echo off
echo ==========================================
echo EXPO CONNECTION FIX - Comprehensive Setup
echo ==========================================
echo.

REM Step 1: Kill any running Metro/Expo processes
echo Step 1: Killing existing Metro/Expo processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM expo.exe 2>nul
timeout /t 2 >nul

REM Step 2: Clear Expo cache
echo Step 2: Clearing Expo cache...
if exist "%USERPROFILE%\.expo" (
    rd /s /q "%USERPROFILE%\.expo\cache" 2>nul
)
npx expo start --clear

REM Step 3: Configure Windows Firewall
echo.
echo Step 3: Configuring Windows Firewall for Expo...
netsh advfirewall firewall delete rule name="Expo Metro Bundler" 2>nul
netsh advfirewall firewall add rule name="Expo Metro Bundler" dir=in action=allow protocol=TCP localport=8081
netsh advfirewall firewall add rule name="Expo Metro Bundler" dir=out action=allow protocol=TCP localport=8081
netsh advfirewall firewall add rule name="Expo Dev Server" dir=in action=allow protocol=TCP localport=19000-19006
echo Firewall rules added successfully!

REM Step 4: Get the local IP address
echo.
echo Step 4: Detecting your local IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4 Address" ^| findstr "192.168"') do (
    set IP=%%a
    for /f "tokens=* delims= " %%b in ("!IP!") do set LOCAL_IP=%%b
)

if not defined LOCAL_IP (
    echo Warning: Could not detect IP starting with 192.168
    for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4 Address" ^| findstr /v "127.0.0.1"') do (
        set IP=%%a
        for /f "tokens=* delims= " %%b in ("!IP!") do set LOCAL_IP=%%b
    )
)

if defined LOCAL_IP (
    echo Found IP Address: %LOCAL_IP%
    set EXPO_DEVSERVER_HOST=%LOCAL_IP%
) else (
    echo Could not detect IP. Using localhost mode.
    set EXPO_DEVSERVER_HOST=127.0.0.1
)

echo.
echo ==========================================
echo SETUP COMPLETE!
echo ==========================================
echo Your IP: %LOCAL_IP%
echo Port: 8081
echo.
echo IMPORTANT: Make sure your phone is connected to the SAME WiFi network!
echo.
echo Starting Expo with LAN mode...
echo ==========================================
echo.

REM Step 5: Start Expo
npx expo start --lan --clear

pause
