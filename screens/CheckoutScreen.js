import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../styles/colors';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = ({ navigation }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    if (!customerName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!contactNumber.trim()) {
      Alert.alert('Error', 'Please enter your contact number');
      return false;
    }
    if (contactNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid contact number');
      return false;
    }
    if (!deliveryAddress.trim()) {
      Alert.alert('Error', 'Please enter your delivery address');
      return false;
    }
    return true;
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    if (!user) {
      Alert.alert('Error', 'You must be logged in to place an order');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const orderId = `order_${Date.now()}`;
      const orderData = {
        id: orderId,
        customerName: customerName.trim(),
        contactNumber: contactNumber.trim(),
        deliveryAddress: deliveryAddress.trim(),
        items: cartItems,
        subtotal: getTotalPrice(),
        deliveryFee: 0,
        total: getTotalPrice(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      console.log('[CHECKOUT] Saving order to Firebase...');
      
      // Save order to local cache immediately (both all orders and active orders)
      try {
        // Save to all orders cache
        const allOrdersKey = `orders_${user.uid}`;
        const existingOrders = await AsyncStorage.getItem(allOrdersKey);
        const ordersList = existingOrders ? JSON.parse(existingOrders) : [];
        ordersList.unshift(orderData); // Add new order at the beginning
        await AsyncStorage.setItem(allOrdersKey, JSON.stringify(ordersList));
        
        // Save to active orders cache (for Orders tab)
        const activeOrdersKey = `orders_active_${user.uid}`;
        const existingActiveOrders = await AsyncStorage.getItem(activeOrdersKey);
        const activeOrdersList = existingActiveOrders ? JSON.parse(existingActiveOrders) : [];
        activeOrdersList.unshift(orderData);
        await AsyncStorage.setItem(activeOrdersKey, JSON.stringify(activeOrdersList));
        
        console.log('[CHECKOUT] ✅ Order saved to local cache (all & active)');
      } catch (cacheErr) {
        console.warn('[CHECKOUT] Cache save failed:', cacheErr.message);
      }
      
      // Try to save order to Firebase with shorter timeout (silent failure)
      try {
        await Promise.race([
          set(ref(database, `users/${user.uid}/orders/${orderId}`), orderData),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firebase timeout')), 3000)
          )
        ]);
        console.log('[CHECKOUT] ✅ Order synced to Firebase');
      } catch (err) {
        // Silent failure - order is already in cache
        if (err.message !== 'Firebase timeout') {
          console.log('[CHECKOUT] Firebase error:', err.message);
        }
        console.log('[CHECKOUT] Order saved locally (Firebase sync skipped)');
      }
      
      // Clear cart
      clearCart();
      
      // Navigate to confirmation immediately
      setIsLoading(false);
      navigation.replace('Confirmation', { orderData });
      
      // No alert needed - user sees confirmation screen
    } catch (error) {
      console.error('[CHECKOUT] Error:', error);
      Alert.alert('❌ Order Failed', 'Failed to place order: ' + error.message);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Customer Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={customerName}
              onChangeText={setCustomerName}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.muted}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contact Number *</Text>
            <TextInput
              style={styles.input}
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.muted}
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Delivery Address *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
              placeholder="Enter your delivery address"
              placeholderTextColor={COLORS.muted}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Order Summary</Text>
          
          {cartItems.map((item, index) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  ₱{item.price.toFixed(2)} × {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemSubtotal}>
                ₱{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₱{getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>

        {/* Order Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Order Instructions</Text>
          
          <View style={styles.instructionItem}>
            <Text style={styles.instructionIcon}>🍳</Text>
            <Text style={styles.instructionText}>
              Your order will be prepared fresh after confirmation
            </Text>
          </View>
          
          <View style={styles.instructionItem}>
            <Text style={styles.instructionIcon}>⏱️</Text>
            <Text style={styles.instructionText}>
              Estimated preparation time: 15-30 minutes
            </Text>
          </View>
          
          <View style={styles.instructionItem}>
            <Text style={styles.instructionIcon}>📞</Text>
            <Text style={styles.instructionText}>
              You will receive a confirmation call shortly
            </Text>
          </View>
          
          <View style={styles.instructionItem}>
            <Text style={styles.instructionIcon}>💳</Text>
            <Text style={styles.instructionText}>
              Payment can be made upon delivery/pickup
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.placeOrderButton, isLoading && styles.disabledButton]}
          onPress={handlePlaceOrder}
          disabled={isLoading || cartItems.length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.placeOrderText}>
            {isLoading ? 'Processing Order... ⏳' : `🛒 Place Order - ₱${getTotalPrice().toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: COLORS.background,
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  itemDetails: {
    fontSize: 14,
    color: COLORS.muted,
  },
  itemSubtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.primary,
    marginVertical: 15,
    borderRadius: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  instructionIcon: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 20,
  },
  bottomSection: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  placeOrderButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: COLORS.muted,
  },
  placeOrderText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;