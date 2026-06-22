@echo off
setlocal enabledelayedexpansion

REM Get the local IP address using ipconfig
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4 Address" ^| findstr "192"') do (
    set IP=%%a
    REM Trim whitespace
    for /f "tokens=* delims= " %%b in ("!IP!") do set LOCAL_IP=%%b
)

if not defined LOCAL_IP (
    echo Could not detect local IP address. Using localhost.
    set LOCAL_IP=127.0.0.1
) else (
    echo Using local IP: !LOCAL_IP!
)

setlocal
set EXPO_DEVSERVER_HOST=!LOCAL_IP!
npx expo start --lan

endlocal
