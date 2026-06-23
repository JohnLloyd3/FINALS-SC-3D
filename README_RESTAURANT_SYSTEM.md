# 🍔 Food Ordering App - Restaurant System

## 📖 Overview

This is a React Native food ordering application built with Expo. The app features a **restaurant-based system** where users browse restaurants first, then view their menus - just like Grab, Uber Eats, or DoorDash.

---

## ✨ Key Features

### 🏪 Restaurant System
- Browse list of restaurants with ratings and delivery times
- View detailed restaurant menus with categories
- Search for food across all restaurants
- Results grouped by restaurant (Grab-style)

### 🛒 Shopping & Orders
- Add items to cart from any restaurant
- View cart with total calculation
- Checkout with delivery details
- Track order status (Preparing → Complete)
- Mark orders as received

### 👤 User Management
- Email/password authentication
- User registration with profile creation
- Profile management with full name display
- Settings screen
- Forgot password functionality

### 💰 Pricing
- All prices in Philippine Pesos (₱)
- Clear price display throughout app
- Total calculation in cart

---

## 🎯 How It Works

### User Flow
```
1. Login/Register
   ↓
2. Browse Restaurants (Home Tab)
   ↓
3. Select Restaurant
   ↓
4. View Restaurant Menu
   ↓
5. Select Food Item
   ↓
6. Add to Cart
   ↓
7. Checkout
   ↓
8. Track Order (Orders Tab)
```

### Search Flow
```
1. Type search query (e.g., "burger")
   ↓
2. See results grouped by restaurant:
   
   McDonald's
   ├─ Big Mac ₱225
   └─ Cheeseburger ₱150
   
   Jollibee
   ├─ Yumburger ₱95
   └─ Champ ₱175
   
3. Tap restaurant → Full menu
   OR
   Tap food item → Product detail
```

---

## 🏗️ Project Structure

```
FINAL SC/
├── components/
│   ├── FoodCard.js              # Food item display card
│   ├── LoadingSpinner.js        # Loading indicator
│   └── RestaurantCard.js        # Restaurant display card ✨NEW
│
├── config/
│   └── firebase.js              # Firebase configuration
│
├── context/
│   ├── AuthContext.js           # Authentication state
│   └── CartContext.js           # Shopping cart state
│
├── data/
│   ├── foodData.js              # Legacy food data
│   └── restaurantData.js        # Restaurant & menu data ✨NEW
│
├── screens/
│   ├── LoginScreen.js           # User login
│   ├── RegisterScreen.js        # User registration (redirects to login) ✨MODIFIED
│   ├── ForgotPasswordScreen.js  # Password reset
│   ├── RestaurantListScreen.js  # Restaurant list (new home) ✨NEW
│   ├── RestaurantMenuScreen.js  # Restaurant menu detail ✨NEW
│   ├── HomeScreen.js            # Legacy home (not used)
│   ├── ProductScreen.js         # Food item detail
│   ├── CartScreen.js            # Shopping cart
│   ├── CheckoutScreen.js        # Order checkout
│   ├── ConfirmationScreen.js    # Order confirmation
│   ├── OrderScreen.js           # Order tracking (Orders tab)
│   ├── OrderHistoryScreen.js    # Order history
│   ├── ProfileScreen.js         # User profile
│   └── SettingsScreen.js        # App settings
│
├── styles/
│   └── colors.js                # Color theme
│
├── App.js                       # Main app component ✨MODIFIED
└── package.json                 # Dependencies
```

---

## 🍽️ Available Restaurants

### 1. McDonald's 🍔
- **Type**: Fast Food
- **Rating**: ⭐ 4.5
- **Delivery**: 15-20 min
- **Price Range**: ₱₱
- **Menu**: Burgers, Chicken, Sides, Drinks

### 2. Jollibee 🐝
- **Type**: Filipino Fast Food
- **Rating**: ⭐ 4.7
- **Delivery**: 10-15 min
- **Price Range**: ₱
- **Menu**: Burgers, Chickenjoy, Pasta, Desserts

### 3. Pizza Hut 🍕
- **Type**: Pizza & Italian
- **Rating**: ⭐ 4.3
- **Delivery**: 20-30 min
- **Price Range**: ₱₱₱
- **Menu**: Pizzas, Sides, Wings

### 4. KFC 🍗
- **Type**: Fried Chicken
- **Rating**: ⭐ 4.4
- **Delivery**: 15-25 min
- **Price Range**: ₱₱
- **Menu**: Chicken, Burgers, Sides

### 5. Starbucks ☕
- **Type**: Coffee & Cafe
- **Rating**: ⭐ 4.6
- **Delivery**: 10-15 min
- **Price Range**: ₱₱₱
- **Menu**: Coffee, Tea, Pastries

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Expo CLI installed
- Expo Go app on your phone

### Installation
```bash
# Install dependencies
npm install

# Start development server
npx expo start --tunnel

# Scan QR code with Expo Go app
```

### Quick Scripts
```bash
# Start with tunnel (most reliable)
npx expo start --tunnel

# Clear cache and start
npx expo start --clear

# Fix connection issues
fix-and-start.bat
```

---

## 📱 Bottom Navigation

The app has 4 main tabs:

```
┌────────┬────────┬────────┬────────┐
│   🏠   │   🛒   │   📦   │   👤   │
│  Home  │  Cart  │ Orders │Profile │
└────────┴────────┴────────┴────────┘
```

1. **🏠 Home**: Browse restaurants and search
2. **🛒 Cart**: View shopping cart
3. **📦 Orders**: Track your orders (3rd position)
4. **👤 Profile**: Manage account

---

## 🔍 Search Feature

The search function works like **Grab**:

1. Type any food name (e.g., "chicken", "pizza", "burger")
2. Results are grouped by restaurant
3. Each group shows:
   - Restaurant name with rating and delivery time
   - Matching food items with prices
   - "Add" button for quick add to cart
4. Tap restaurant name → View full menu
5. Tap food item → View product detail

---

## 📦 Order Tracking

Orders have 2 statuses:

1. **PREPARING** 👨‍🍳 (Orange)
   - Order is being prepared
   - Shows "✓ ORDER RECEIVED" button
   
2. **COMPLETE** ✅ (Green)
   - Order has been delivered
   - Marked as received by user

---

## 🎨 Customization

### Add a New Restaurant

1. Open `data/restaurantData.js`
2. Add new restaurant object:

```javascript
{
  id: 'your-restaurant-id',
  name: 'Your Restaurant Name',
  image: 'https://your-image-url.jpg',
  description: 'Food Type',
  rating: 4.5,
  deliveryTime: '15-20 min',
  priceRange: '₱₱',
  menu: [
    {
      id: 'food-item-1',
      name: 'Food Name',
      price: 150,
      image: 'https://food-image-url.jpg',
      description: 'Food description',
      category: 'Category Name',
      restaurantId: 'your-restaurant-id',
      restaurantName: 'Your Restaurant Name',
    }
  ]
}
```

3. Save and reload app

### Change Colors

Edit `styles/colors.js`:
```javascript
export const COLORS = {
  primary: '#FF6B6B',      // Main color
  background: '#FFFFFF',    // Background
  text: '#2D3436',          // Text color
  // ... etc
};
```

---

## 🔧 Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **Local Storage**: AsyncStorage
- **UI Components**: React Native core components

---

## 📚 Documentation

- `RESTAURANT_SYSTEM_PLAN.md` - Original implementation plan
- `RESTAURANT_SYSTEM_IMPLEMENTATION.md` - Complete implementation details
- `CHANGES_SUMMARY.md` - All changes made to codebase
- `BEFORE_VS_AFTER.md` - Visual comparison of old vs new system
- `QUICK_START_RESTAURANT_SYSTEM.md` - Quick start guide
- `FINAL_STATUS.md` - Overall project status

---

## 🐛 Troubleshooting

### Can't Connect to Development Server
```bash
# Run the fix script
fix-and-start.bat

# Or manually
npx expo start --clear --tunnel
```

### Metro Bundler Errors
```bash
# Clear all caches
npx expo start --clear

# Delete cache folders
rmdir /s /q .expo
rmdir /s /q node_modules\.cache
```

### Firebase Timeout Errors
- App works offline-first with AsyncStorage
- Orders save locally even when Firebase is slow
- Profile cached locally for instant loading

### App Crashes
1. Close app completely
2. Clear cache: `npx expo start --clear`
3. Reinstall app via Expo Go
4. Scan QR code again

---

## 🔐 Security Notes

### Firebase Setup Required
- Configure Firebase Realtime Database rules
- See `FIREBASE_SETUP_REQUIRED.md` for details
- Enable Email/Password authentication in Firebase Console

### Environment Variables
- Firebase config in `config/firebase.js`
- Update with your Firebase project credentials

---

## 📈 Future Enhancements

Possible features to add:

- [ ] Restaurant favorites
- [ ] User reviews and ratings
- [ ] Order history with reorder option
- [ ] Multiple delivery addresses
- [ ] Payment integration
- [ ] Real-time order tracking
- [ ] Push notifications
- [ ] Restaurant filters (cuisine type, price range)
- [ ] Promo codes and discounts
- [ ] Order scheduling

---

## 📄 License

This project is for educational/demonstration purposes.

---

## 👥 Contributors

Developed with assistance from Kiro AI.

---

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review error logs in console
3. Check Firebase configuration
4. Clear cache and restart

---

## 🎉 Enjoy!

Your restaurant-based food ordering system is ready to use! 

Start the app, browse restaurants, and order some delicious food! 🍕🍔🍗☕

