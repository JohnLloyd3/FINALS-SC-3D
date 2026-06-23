import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Platform, Text, TextInput } from 'react-native';
import { COLORS } from './styles/colors';

const defaultFontFamily = Platform.OS === 'ios' ? 'System' : 'sans-serif';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { ...Text.defaultProps.style, fontFamily: defaultFontFamily };
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = { ...TextInput.defaultProps.style, fontFamily: defaultFontFamily };

// Import Context Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import RestaurantListScreen from './screens/RestaurantListScreen';
import RestaurantMenuScreen from './screens/RestaurantMenuScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

// Create Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

// Home Stack Navigator (nested in tab)
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color: COLORS.text,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="RestaurantList" 
        component={RestaurantListScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RestaurantMenu" 
        component={RestaurantMenuScreen} 
        options={{ title: '' }}
      />
      <Stack.Screen 
        name="Product" 
        component={ProductScreen} 
        options={{ title: '' }}
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ title: 'My Cart' }}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen} 
        options={{ title: 'Checkout' }}
      />
      <Stack.Screen 
        name="Confirmation" 
        component={ConfirmationScreen} 
        options={{ title: 'Order Placed' }}
      />
    </Stack.Navigator>
  );
}

// Profile Stack Navigator (nested in tab)
function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color: COLORS.text,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ title: 'My Profile' }}
      />
      <Stack.Screen 
        name="OrderHistory" 
        component={OrderHistoryScreen} 
        options={{ title: 'Order History' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          backgroundColor: 'transparent',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🛒</Text>,
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: COLORS.text,
          },
          title: 'My Cart',
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrderScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📦</Text>,
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: COLORS.text,
          },
          title: 'ORDERS',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

// App Navigator (after login)
function AppNavigator() {
  return <TabNavigator />;
}

// Root Navigator Component
function RootNavigator() {
  const { user, loading } = useAuth();

  // Don't show white screen during loading, go straight to auth or app
  if (loading && !user) {
    // App is initializing, user state not yet determined
    return <AuthNavigator />;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor={COLORS.background} />
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}