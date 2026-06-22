@echo off
echo ========================================
echo  Fixing Expo Cache Issues
echo ========================================

echo.
echo Step 1: Clearing caches...
rmdir /s /q .expo 2>nul
rmdir /s /q node_modules\.cache 2>nul
del /f /q metro.config.js.* 2>nul

echo.
echo Step 2: Clearing watchman cache (if installed)...
watchman watch-del-all 2>nul

echo.
echo Step 3: Clearing npm cache...
call npm cache clean --force

echo.
echo Step 4: Reinstalling dependencies...
call npm install

echo.
echo Step 5: Starting Expo with clean slate...
echo.
call npx expo start --clear

pause
