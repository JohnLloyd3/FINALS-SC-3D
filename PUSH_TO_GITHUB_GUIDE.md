# 🚀 How to Push This Project to GitHub

## Current Status
- ✅ Git repository initialized
- ❌ No commits made yet
- ❌ No GitHub remote repository connected

---

## 📋 Step-by-Step Guide

### Step 1: Create a GitHub Repository

1. Go to **https://github.com**
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name**: `food-ordering-app` (or your preferred name)
   - **Description**: Food ordering mobile app built with React Native and Expo
   - **Visibility**: Choose Public or Private
   - ⚠️ **DO NOT** check "Add a README file"
   - ⚠️ **DO NOT** check "Add .gitignore"
   - ⚠️ **DO NOT** choose a license (we'll add it later)
4. Click **"Create repository"**

GitHub will show you commands - **keep this page open!**

---

### Step 2: Configure Git (First Time Only)

If you haven't set up Git on your computer, run these commands:

```cmd
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email (the email you use for GitHub).

---

### Step 3: Add All Files and Make First Commit

Open Command Prompt or PowerShell in your project folder and run:

```cmd
# Navigate to your project (if not already there)
cd "c:\Users\johnl\OneDrive\Desktop\FINAL SC"

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Food ordering app with Firebase"
```

---

### Step 4: Connect to GitHub Repository

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and repository name:

```cmd
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
```

Example:
```cmd
git remote add origin https://github.com/johnsmith/food-ordering-app.git
```

---

### Step 5: Push to GitHub

```cmd
# Rename branch to main (GitHub's default)
git branch -M main

# Push your code
git push -u origin main
```

---

## 🔐 Authentication

When you push, GitHub will ask for authentication:

### Option 1: Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Food Ordering App"
4. Select scopes: Check **"repo"** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. When git asks for password, paste the token

### Option 2: GitHub Desktop (Easier)

1. Download **GitHub Desktop** from https://desktop.github.com
2. Sign in with your GitHub account
3. Add your repository: File → Add Local Repository
4. Select your project folder
5. Make commits and push through the GUI

---

## 📝 Quick Reference Commands

```cmd
# Check status
git status

# Add specific files
git add filename.js

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Check remote connections
git remote -v

# View commit history
git log --oneline
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Permission denied" or "Authentication failed"

**Solution:** Use a Personal Access Token instead of password
- GitHub no longer accepts passwords for git operations
- Follow "Option 1: Personal Access Token" above

### Issue 2: "Repository already exists"

**Solution:** 
```cmd
# Remove existing remote
git remote remove origin

# Add the correct one
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
```

### Issue 3: "Files too large"

**Solution:** Make sure `node_modules/` is in `.gitignore`
```cmd
# Check .gitignore
type .gitignore

# If node_modules is listed but still tracked:
git rm -r --cached node_modules/
git commit -m "Remove node_modules"
```

### Issue 4: "fatal: 'origin' does not appear to be a git repository"

**Solution:** You haven't added the remote yet
```cmd
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
```

### Issue 5: OneDrive sync conflicts

**Solution:** If you're using OneDrive, git might have issues
```cmd
# Move project outside OneDrive
# Example: Move to C:\Projects\FINAL SC
# Then initialize git there
```

---

## 📦 What Will Be Pushed

With the `.gitignore` file I created, these will be **ignored** (not pushed):
- ❌ `node_modules/` (too large)
- ❌ `.expo/` (build files)
- ❌ `package-lock.json` (auto-generated)
- ❌ Environment variables (`.env` files)
- ❌ Logs and temporary files

These will be **pushed** (good to include):
- ✅ All `.js` files (your code)
- ✅ `package.json` (dependencies list)
- ✅ Configuration files (`app.json`, `babel.config.js`, etc.)
- ✅ `.gitignore` (tells git what to ignore)
- ✅ Documentation files (`.md` files)
- ✅ Assets and data

---

## 🎯 Complete Script (Copy & Paste)

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual values:

```cmd
REM Navigate to project
cd "c:\Users\johnl\OneDrive\Desktop\FINAL SC"

REM Configure git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

REM Add all files and commit
git add .
git commit -m "Initial commit: Food ordering app"

REM Connect to GitHub (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

REM Push to GitHub
git branch -M main
git push -u origin main
```

---

## ✅ After Successful Push

You should see:
```
Enumerating objects: 100, done.
Counting objects: 100% (100/100), done.
Delta compression using up to 8 threads
Compressing objects: 100% (95/95), done.
Writing objects: 100% (100/100), 50.00 KiB | 5.00 MiB/s, done.
Total 100 (delta 30), reused 0 (delta 0)
To https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Now go to your GitHub repository page and refresh - you'll see all your files! 🎉

---

## 📚 Future Updates

After the initial push, to update your repository:

```cmd
# Check what changed
git status

# Add changes
git add .

# Commit with a message
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

---

## 🔒 Important: Firebase Config Security

⚠️ **WARNING:** Your Firebase API keys are currently in `config/firebase.js`

**Before pushing, consider:**

1. **Option 1: Use environment variables (Recommended)**
   - Move sensitive keys to `.env` file
   - `.env` is already in `.gitignore`

2. **Option 2: Make repository private**
   - On GitHub, Settings → Danger Zone → Change visibility → Private

3. **Option 3: Regenerate keys after push**
   - If you accidentally push keys publicly, regenerate them in Firebase Console

---

## 📞 Need Help?

If you encounter issues:
1. Read the error message carefully
2. Check the "Common Issues & Solutions" section above
3. Search the error on Google
4. Ask on GitHub Community or Stack Overflow

---

**Good luck pushing your project to GitHub! 🚀**
