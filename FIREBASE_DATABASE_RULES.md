# Firebase Realtime Database Security Rules

## Problem
Your app is timing out when trying to write to Firebase Realtime Database. This is likely because the database security rules are blocking writes.

## Solution

### Step 1: Open Firebase Console
1. Go to https://console.firebase.google.com/
2. Select your project: **lloydii**
3. In the left sidebar, click **Realtime Database**

### Step 2: Check Current Rules
1. Click the **Rules** tab at the top
2. You'll see the current security rules

### Step 3: Update Rules for Development
For **development/testing**, use these rules (allows authenticated users to read/write their own data):

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "usernames": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "orders": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

### Step 4: For Production (Recommended)
For **production**, use more restrictive rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        ".validate": "newData.hasChildren(['email', 'username'])"
      }
    },
    "usernames": {
      "$username": {
        ".read": "auth != null",
        ".write": "auth != null && !data.exists()"
      }
    },
    "orders": {
      "$uid": {
        "$orderId": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid && !data.exists()",
          ".validate": "newData.hasChildren(['items', 'total', 'timestamp'])"
        }
      }
    }
  }
}
```

### Step 5: Publish Rules
1. After pasting the rules, click **Publish** button
2. Wait for confirmation: "Rules published successfully"

## What These Rules Do

**Development Rules:**
- Users can read/write their own data at `/users/{uid}`
- Any authenticated user can read/write to `/usernames`
- Users can read/write their own orders at `/orders/{uid}`

**Production Rules:**
- Same read/write permissions
- Validates data structure (must have required fields)
- Prevents overwriting existing usernames
- Prevents modifying existing orders (write once only)

## Testing
After updating the rules:
1. Restart your app
2. Log in with your account
3. Go to Profile screen
4. Edit and save your profile information
5. Check the console logs - should see: `[UPDATE PROFILE] Successfully saved to Firebase Database`

## Troubleshooting
If still having issues:
1. Check that user is authenticated: `auth.uid` must exist
2. Verify database URL in `firebase.js`: `https://lloydii-default-rtdb.firebaseio.com`
3. Check Firebase Console > Database > Data tab to see if data appears
4. Look for error messages in console starting with `[UPDATE PROFILE]`
