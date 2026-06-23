# Food Ordering Mobile App 🍕📱

A complete food ordering mobile application built with React Native and Expo. This app provides a seamless experience for browsing food items, adding them to cart, and placing orders.

## 🚀 Features

### User Features
- **Home Screen**: Browse food items with categories and search functionality
- **Product Details**: View detailed product information with quantity selection
- **Shopping Cart**: Add, remove, and modify items with real-time total calculation
- **Checkout**: Enter customer details and review order summary
- **Order Confirmation**: Receive order confirmation with detailed receipt

### Technical Features
- **React Navigation**: Smooth navigation between screens
- **Context API**: Global state management for cart functionality
- **React Native Paper**: Modern and consistent UI components
- **Responsive Design**: Works on both Android and iOS devices
- **Local State Management**: No backend required for demo purposes

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: JavaScript
- **State Management**: React Context API + useState
- **Navigation**: React Navigation v6
- **UI Library**: React Native Paper
- **Icons**: Built-in emojis and React Native Paper icons

## 📱 Screens

1. **HomeScreen** - Food menu with categories and search
2. **ProductScreen** - Detailed product view with quantity selector
3. **CartScreen** - Shopping cart management
4. **CheckoutScreen** - Customer information and order summary
5. **ConfirmationScreen** - Order confirmation and receipt

## 🏗 Project Structure

```
food-ordering-app/
├── App.js                 # Main app component with navigation
├── context/
│   └── CartContext.js     # Cart state management
├── screens/
│   ├── HomeScreen.js      # Food menu and categories
│   ├── ProductScreen.js   # Product details
│   ├── CartScreen.js      # Shopping cart
│   ├── CheckoutScreen.js  # Order checkout
│   └── ConfirmationScreen.js # Order confirmation
├── components/
│   ├── FoodCard.js        # Reusable food item card
│   └── LoadingSpinner.js  # Loading component
├── data/
│   └── foodData.js        # Sample food data
├── package.json
├── app.json
├── babel.config.js
└── README.md
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Step 1: Install Expo CLI (if not installed)
```bash
npm install -g expo-cli
# or
npm install -g @expo/cli
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm start
# or
npx expo start
```

### Step 4: Run on Device/Emulator
- **Android**: Press `a` in terminal or scan QR code with Expo Go app
- **iOS**: Press `i` in terminal or scan QR code with Expo Go app (iOS)
- **Web**: Press `w` in terminal to run in browser

## 📱 How to Use

### For Users:
1. **Browse Menu**: Open the app to see the food menu
2. **Filter & Search**: Use category filters or search bar to find items
3. **View Details**: Tap on any food item to see detailed information
4. **Add to Cart**: Select quantity and add items to your cart
5. **Review Cart**: Check cart icon to review selected items
6. **Checkout**: Enter your details and place the order
7. **Confirmation**: Receive order confirmation with receipt

### For Developers:
1. **Add New Food Items**: Edit `data/foodData.js`
2. **Modify Styles**: Update StyleSheet in respective screen files
3. **Add Features**: Create new components in `components/` folder
4. **Backend Integration**: Replace local state with API calls in Context

## 🎨 Customization

### Adding New Food Categories
Edit `data/foodData.js`:
```javascript
export const categories = ['All', 'Meals', 'Drinks', 'Snacks', 'NewCategory'];
```

### Changing App Colors
Update the primary color in screen styles:
```javascript
const styles = StyleSheet.create({
  primaryColor: '#FF6B6B', // Change this color
});
```

### Adding New Screens
1. Create screen file in `screens/` folder
2. Add navigation route in `App.js`
3. Import and configure in Stack Navigator

## 🔧 Configuration

### App Configuration (`app.json`)
- App name, version, and metadata
- Icon and splash screen settings
- Platform-specific configurations

### Dependencies (`package.json`)
- React Native and Expo versions
- Navigation and UI library versions
- Development and build scripts

## 📋 Sample Data

The app includes sample food data with:
- **15 food items** across 3 categories
- **High-quality images** from Unsplash
- **Realistic prices** and descriptions
- **Variety of food types** (meals, drinks, snacks)

## 🚀 Building for Production

### Create APK (Android)
```bash
expo build:android
```

### Create IPA (iOS)
```bash
expo build:ios
```

### Web Deployment
```bash
expo build:web
npm run web
```

## 🔮 Future Enhancements

- **Backend Integration**: Firebase/API integration
- **User Authentication**: Login/signup functionality
- **Payment Gateway**: Stripe/PayPal integration
- **Order Tracking**: Real-time order status updates
- **Push Notifications**: Order updates and promotions
- **Favorites**: Save favorite food items
- **Reviews & Ratings**: User feedback system
- **Location Services**: Delivery address management

## 🐛 Troubleshooting

### Common Issues:

1. **Metro bundler issues**:
   ```bash
   npx expo start -c
   ```

2. **Dependencies not installing**:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Expo CLI not found**:
   ```bash
   npm install -g @expo/cli
   ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer Notes

- **Beginner Friendly**: Code is well-commented and structured
- **No Backend Required**: Uses local state for easy testing
- **Modular Design**: Easy to extend and customize
- **Cross Platform**: Works on Android, iOS, and Web

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review Expo documentation
3. Check React Navigation docs
4. Review React Native Paper components

---

**Happy Coding! 🚀**

Made with ❤️ using React Native & Expo