# Quick Start Guide - Restaurant System

## 🚀 How to Start the App

1. **Start the Development Server**
   ```bash
   npx expo start --tunnel
   ```

2. **Scan QR Code** with Expo Go app on your phone

---

## 📱 What's New

### Home Screen Shows Restaurants Now
- Instead of seeing food items directly
- You now see a list of restaurants
- Tap any restaurant to view their menu

### Search Works Like Grab
- Search for any food (e.g., "burger", "pizza")
- Results are grouped by restaurant
- Shows which restaurant has what food
- Example:
  ```
  Search: "Burger"
  
  McDonald's
  ├─ Big Mac ₱225.00
  └─ Cheeseburger ₱150.00
  
  Jollibee
  ├─ Yumburger ₱95.00
  └─ Champ ₱175.00
  ```

### Registration Flow Changed
- After creating account, you're redirected to login
- Must login manually with your new credentials
- This is what you requested

---

## 🍔 Available Restaurants

1. **McDonald's** - Fast Food, ⭐ 4.5
   - Burgers, Chicken, Fries, Drinks
   
2. **Jollibee** - Filipino Fast Food, ⭐ 4.7
   - Burgers, Chickenjoy, Spaghetti, Desserts
   
3. **Pizza Hut** - Pizza & Italian, ⭐ 4.3
   - Pizzas, Sides, Wings
   
4. **KFC** - Fried Chicken, ⭐ 4.4
   - Chicken, Burgers, Sides
   
5. **Starbucks** - Coffee & Cafe, ⭐ 4.6
   - Coffee, Tea, Pastries

---

## 🎯 User Flow

```
1. Login/Register
   ↓
2. See Restaurant List (🏠 Home)
   ↓
3a. TAP RESTAURANT          3b. USE SEARCH
    ↓                           ↓
    Restaurant Menu             Grouped Results
    ↓                           ↓
    Tap Food Item               Tap Food Item
    ↓                           ↓
4. Product Detail
   ↓
5. Add to Cart (🛒)
   ↓
6. Checkout
   ↓
7. Order Placed
   ↓
8. View in Orders Tab (📦)
```

---

## ✅ Features Working

- ✅ Restaurant list on home screen
- ✅ Restaurant menu screen
- ✅ Search groups by restaurant
- ✅ Category filters (Burgers, Chicken, etc.)
- ✅ Add to cart from anywhere
- ✅ Bottom navigation (Home, Cart, Orders, Profile)
- ✅ Order tracking with status
- ✅ Profile with full name display
- ✅ Registration redirects to login
- ✅ All prices in Philippine Pesos (₱)

---

## 🧪 Test Scenarios

### Test 1: Browse Restaurants
1. Open app → Login
2. See 5 restaurants on home
3. Tap "McDonald's"
4. See Big Mac, Cheeseburger, McNuggets, etc.
5. Filter by "Burgers" category
6. Tap "Big Mac"
7. Add to cart

### Test 2: Search for Food
1. On home screen, tap search bar
2. Type "burger"
3. See results grouped:
   - McDonald's (Big Mac, Cheeseburger)
   - Jollibee (Yumburger, Champ)
   - KFC (Zinger Burger)
4. Tap any item to view details
5. Or tap restaurant name to see full menu

### Test 3: Registration Flow
1. Tap "Sign up here" on login
2. Fill in details
3. Tap "CREATE ACCOUNT"
4. See success message
5. Automatically redirected to Login
6. Login with new credentials

### Test 4: Order Flow
1. Add items from different restaurants
2. Go to Cart tab (🛒)
3. See all items
4. Checkout
5. Place order
6. Go to Orders tab (📦) - 3rd position
7. See order with "PREPARING" status
8. Tap "✓ ORDER RECEIVED" when received
9. Status changes to "COMPLETE"

---

## 🐛 Troubleshooting

### Can't Connect to Server?
Run: `fix-and-start.bat`

### Metro Cache Issues?
```bash
npx expo start --clear
```

### App Crashes on Startup?
1. Close app completely
2. Delete from phone
3. Reinstall via Expo Go
4. Scan QR code again

---

## 📝 Notes

- Old `HomeScreen.js` still exists but is not used
- Old `foodData.js` still exists but replaced by `restaurantData.js`
- All existing features (cart, checkout, orders, profile) work exactly the same
- You can add more restaurants by editing `data/restaurantData.js`

---

## 🎨 Customization

Want to add a new restaurant?

1. Open `data/restaurantData.js`
2. Copy one of the existing restaurant objects
3. Change the details (name, image, menu items)
4. Save and reload app

Example:
```javascript
{
  id: 'burger-king',
  name: 'Burger King',
  image: 'https://...',
  description: 'Burgers',
  rating: 4.2,
  deliveryTime: '15-20 min',
  priceRange: '₱₱',
  menu: [
    {
      id: 'whopper',
      name: 'Whopper',
      price: 250,
      image: 'https://...',
      description: 'Flame-grilled burger',
      category: 'Burgers',
      restaurantId: 'burger-king',
      restaurantName: 'Burger King',
    }
  ]
}
```

---

## 🎉 You're All Set!

The restaurant system is fully implemented and ready to use. Enjoy ordering food! 🍔🍕🍗☕

