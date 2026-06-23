# How to View Your Orders

## 📍 Where to Find Your Orders

There are **2 ways** to access your order history:

---

## Method 1: From Profile Screen (Quick Access)

1. **Tap the Profile tab** at the bottom navigation bar
2. Scroll down to **"Quick Links"** section
3. Tap on **"📦 Order History"**
4. You'll see all your past orders

---

## Method 2: Direct Navigation (if available)

1. Look for **"Order History"** in the main navigation menu
2. Or check if there's a tab/button for orders

---

## 📋 What You'll See in Order History

### Order Card (Collapsed View)
- **Order Number**: Short ID (last 6 characters)
- **Date & Time**: When you placed the order
- **Status Badge**: 
  - 🟢 **COMPLETED** (green)
  - 🟠 **PENDING** (orange)
- **Item Count**: Number of items ordered
- **Total Price**: In Philippine Pesos (₱)

### Order Card (Expanded View - Tap to Open)
When you tap on an order, you'll see:

1. **Items Ordered**
   - Item name
   - Quantity
   - Price per item

2. **Order Details**
   - Subtotal: ₱XXX.XX
   - Delivery Fee: ₱XXX.XX
   - Total: ₱XXX.XX

3. **Delivery Address**
   - Your full delivery address

4. **REORDER Button**
   - Quick way to order the same items again

---

## 🔍 If You Don't See Your Orders

### Issue 1: "No Orders Yet" Message
**Possible Reasons:**
- You haven't placed any orders
- Orders weren't saved to Firebase (connection issue during checkout)
- You're logged in with a different account

**Solution:**
1. Check console logs during checkout for:
   - `[CHECKOUT] ✅ Order saved to Firebase successfully` ✅ Good
   - `[CHECKOUT] ⚠️ Firebase save failed` ⚠️ Problem
2. If Firebase save failed, your order won't appear in history
3. Make sure you followed the Firebase Database Rules setup (see `FIREBASE_DATABASE_RULES.md`)

### Issue 2: Loading Forever
**Problem:** Firebase Database timeout

**Solution:**
1. Wait up to 8 seconds (automatic timeout)
2. Will show "No Orders Yet" if connection fails
3. Check your internet connection
4. Verify Firebase Database Rules are set correctly

### Issue 3: Orders Show Up After Second Visit
**Explanation:** Orders are saved to Firebase during checkout, but if there was a connection issue, they might not load immediately.

**Solution:**
1. Pull down to refresh (if refresh feature exists)
2. Or navigate away and come back
3. The screen automatically fetches orders when you open it

---

## 🛠️ Troubleshooting

### Check Console Logs
Look for these messages when viewing Order History:
```
[ORDER HISTORY] Fetching orders for user: uvCbjduTz...
[ORDER HISTORY] Found X orders  ✅ Success
[ORDER HISTORY] No orders found  ℹ️ Empty
[ORDER HISTORY] Error fetching orders: Timeout  ⚠️ Connection issue
```

### Verify Firebase Setup
1. Orders are stored at: `/users/{your-uid}/orders/`
2. Check Firebase Console > Realtime Database > Data tab
3. Look for your user ID: `uvCbjduTz9XqvDTqX2WYLvIQdk03`
4. Expand to see orders

### Test Order Flow
1. Place a test order
2. Watch for success alert: "✅ Order Successful!"
3. Immediately go to Order History
4. Your order should appear at the top

---

## 📊 Order Status Meanings

| Status | Color | Meaning |
|--------|-------|---------|
| **PENDING** | 🟠 Orange | Order received, awaiting confirmation |
| **COMPLETED** | 🟢 Green | Order fulfilled and delivered |

---

## 💡 Tips

1. **Most Recent First**: Orders are sorted by newest to oldest
2. **Tap to Expand**: See full details by tapping an order card
3. **Reorder Feature**: Quickly reorder your favorite meals
4. **Keep Order IDs**: Save confirmation screen for reference

---

## 🔗 Related Files
- Order History Screen: `screens/OrderHistoryScreen.js`
- Checkout Process: `screens/CheckoutScreen.js`
- Firebase Setup: `FIREBASE_DATABASE_RULES.md`
