@echo off
echo ==========================================
echo PUSH TO GITHUB - Setup Script
echo ==========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please download and install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git is installed: 
git --version
echo.

REM Check if user has configured git
git config user.name >nul 2>&1
if errorlevel 1 (
    echo.
    echo ==========================================
    echo GIT CONFIGURATION REQUIRED
    echo ==========================================
    echo You need to configure Git with your name and email.
    echo.
    set /p USERNAME="Enter your name: "
    set /p EMAIL="Enter your email (used for GitHub): "
    
    git config --global user.name "%USERNAME%"
    git config --global user.email "%EMAIL%"
    
    echo.
    echo Git configured successfully!
    echo Name: %USERNAME%
    echo Email: %EMAIL%
)

echo.
echo ==========================================
echo STEP 1: Create GitHub Repository
echo ==========================================
echo.
echo Before continuing, make sure you have:
echo 1. Created a NEW repository on GitHub
echo 2. DO NOT initialize with README, .gitignore, or license
echo 3. Have your repository URL ready
echo.
echo Example URL: https://github.com/username/food-ordering-app.git
echo.
pause

echo.
echo ==========================================
echo STEP 2: Enter Your GitHub Repository URL
echo ==========================================
echo.
set /p REPO_URL="Paste your GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo ERROR: No URL provided!
    pause
    exit /b 1
)

echo.
echo Repository URL: %REPO_URL%
echo.

REM Check if remote already exists
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
    echo Remote 'origin' already exists. Removing it...
    git remote remove origin
)

echo.
echo ==========================================
echo STEP 3: Adding Files and Creating Commit
echo ==========================================
echo.

echo Adding all files...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: Food ordering app with Firebase and Expo"

if errorlevel 1 (
    echo.
    echo Note: Either nothing to commit or commit failed.
    echo Continuing anyway...
)

echo.
echo ==========================================
echo STEP 4: Connecting to GitHub
echo ==========================================
echo.

echo Adding remote repository...
git remote add origin %REPO_URL%

echo.
echo Renaming branch to 'main'...
git branch -M main

echo.
echo ==========================================
echo STEP 5: Pushing to GitHub
echo ==========================================
echo.
echo This may take a moment...
echo.
echo NOTE: If prompted for credentials:
echo - Username: Your GitHub username
echo - Password: Use a Personal Access Token (NOT your password)
echo.
echo How to get a token:
echo 1. Go to GitHub Settings
echo 2. Developer settings
echo 3. Personal access tokens
echo 4. Generate new token
echo 5. Select 'repo' scope
echo.
pause

git push -u origin main

if errorlevel 1 (
    echo.
    echo ==========================================
    echo PUSH FAILED!
    echo ==========================================
    echo.
    echo Common issues:
    echo 1. Authentication failed - Use Personal Access Token
    echo 2. Repository doesn't exist - Check the URL
    echo 3. Permission denied - Check repository permissions
    echo.
    echo Read PUSH_TO_GITHUB_GUIDE.md for detailed help
    pause
    exit /b 1
)

echo.
echo ==========================================
echo SUCCESS! Your code is now on GitHub!
echo ==========================================
echo.
echo Your repository is live at:
echo %REPO_URL%
echo.
echo To update in the future, use:
echo   git add .
echo   git commit -m "Your message"
echo   git push
echo.
pause
