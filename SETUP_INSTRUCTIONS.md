# 📱 Food Ordering App - Setup Instructions

## 🚀 Quick Start Guide

Follow these steps to get the Food Ordering Mobile App running on your device.

### 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Expo CLI** - We'll install this in the steps below

### 📱 Required Apps on Your Phone

- **Android**: [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Google Play Store
- **iOS**: [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from App Store

---

## 🛠 Step-by-Step Installation

### Step 1: Install Expo CLI

Open your terminal/command prompt and run:

```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Verify installation
expo --version
```

### Step 2: Navigate to Project Directory

```bash
# Navigate to the food ordering app folder
cd path/to/food-ordering-app
```

### Step 3: Install Project Dependencies

```bash
# Install all required packages
npm install

# This will install:
# - React Native
# - Expo SDK
# - React Navigation
# - React Native Paper
# - All other dependencies
```

### Step 4: Start the Development Server

```bash
# Start Expo development server
npm start

# Alternative commands:
# npx expo start
# expo start
```

### Step 5: Run on Your Device

After running `npm start`, you'll see:

1. **QR Code** in your terminal/browser
2. **Development server** running on localhost

#### For Android:
1. Open **Expo Go** app on your Android phone
2. Tap **"Scan QR Code"**
3. Point camera at the QR code in terminal
4. App will load automatically

#### For iOS:
1. Open **Camera** app on your iPhone
2. Point camera at the QR code
3. Tap the notification that appears
4. This will open **Expo Go** and load the app

#### For Emulator/Simulator:
- **Android Emulator**: Press `a` in terminal
- **iOS Simulator**: Press `i` in terminal (Mac only)
- **Web Browser**: Press `w` in terminal

---

## 🔧 Alternative Setup Methods

### Method 1: Using Yarn (instead of npm)

```bash
# Install Yarn (if not installed)
npm install -g yarn

# Install dependencies
yarn install

# Start development server
yarn start
```

### Method 2: Using npx (no global installation)

```bash
# Run without installing Expo CLI globally
npx create-expo-app --template blank-typescript food-ordering-app
cd food-ordering-app

# Copy our project files to this directory
# Then run:
npm start
```

---

## 📱 Testing the App

### Test Flow:
1. **Home Screen**: Browse food items, use search and filters
2. **Product Screen**: Tap any food item to view details
3. **Add to Cart**: Select quantity and add items
4. **Cart Screen**: Tap cart icon to review items
5. **Checkout**: Fill customer details and place order
6. **Confirmation**: View order confirmation

### Sample Test Data:
- The app comes with 15 pre-loaded food items
- Categories: Meals, Drinks, Snacks
- All items have images and descriptions

---

## 🛠 Development Commands

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --clear

# Run on specific platform
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser

# Install new package
npm install package-name
expo install package-name  # For Expo-managed packages
```

---

## 📂 Project Structure Overview

```
food-ordering-app/
├── App.js                 # Main app with navigation
├── package.json           # Dependencies and scripts
├── app.json              # Expo configuration
├── context/
│   └── CartContext.js    # Shopping cart state
├── screens/              # All app screens
├── components/           # Reusable components
├── data/
│   └── foodData.js       # Sample food data
└── README.md
```

---

## ⚠️ Troubleshooting

### Common Issues and Solutions:

#### 1. "Expo CLI not found"
```bash
# Make sure Node.js is installed first
node --version
npm --version

# Then install Expo CLI
npm install -g @expo/cli
```

#### 2. "Metro bundler stuck"
```bash
# Clear cache and restart
npm start -- --clear
# or
expo start -c
```

#### 3. "Can't connect to development server"
```bash
# Make sure phone and computer are on same WiFi
# Try restarting the development server
# Check firewall settings
```

#### 4. "Module not found" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# For Windows:
rmdir /s node_modules
npm install
```

#### 5. "Expo Go app won't load"
```bash
# Update Expo Go app on your phone
# Clear Expo Go app cache
# Try opening via direct link instead of QR code
```

---

## 🔧 Environment Setup (Optional)

### For Advanced Development:

#### Android Studio (for Android emulator):
1. Download [Android Studio](https://developer.android.com/studio)
2. Install Android SDK and emulator
3. Add Android SDK to PATH

#### Xcode (for iOS simulator - Mac only):
1. Install Xcode from App Store
2. Install iOS Simulator
3. Accept Xcode license

---

## 📱 Device Requirements

### Minimum Requirements:
- **Android**: Android 5.0+ (API level 21+)
- **iOS**: iOS 10.0+
- **RAM**: 2GB+ recommended
- **Storage**: 100MB free space
- **Internet**: WiFi connection for development

---

## 🎯 Next Steps

After successful setup:

1. **Explore the Code**: Check `screens/` folder to understand app structure
2. **Modify Sample Data**: Edit `data/foodData.js` to add your own food items
3. **Customize Styling**: Update colors and styles in screen files
4. **Add Features**: Implement additional functionality as needed

---

## 📞 Getting Help

If you encounter issues:

1. **Check Error Messages**: Read terminal output carefully
2. **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)
3. **React Navigation**: [reactnavigation.org](https://reactnavigation.org)
4. **React Native Paper**: [callstack.github.io/react-native-paper](https://callstack.github.io/react-native-paper)

---

## ✅ Success Checklist

- [ ] Node.js installed and working
- [ ] Expo CLI installed globally
- [ ] Project dependencies installed (`npm install` completed)
- [ ] Development server started (`npm start` running)
- [ ] Expo Go app installed on phone
- [ ] App loaded successfully on device
- [ ] Can navigate between screens
- [ ] Cart functionality working
- [ ] Sample data displaying correctly

**🎉 Congratulations! Your Food Ordering App is ready!**