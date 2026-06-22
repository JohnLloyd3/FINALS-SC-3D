import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { COLORS } from '../styles/colors';

const CartScreen = ({ navigation }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice 
  } = useCart();

  // Handle remove item with confirmation
  const handleRemoveItem = (item) => {
    Alert.alert(
      'Remove Item',
      `Remove ${item.name} from cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => removeFromCart(item.id), style: 'destructive' },
      ]
    );
  };

  // Handle clear cart with confirmation
  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Remove all items from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', onPress: clearCart, style: 'destructive' },
      ]
    );
  };

  // Navigate to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add some items to your cart first.');
      return;
    }
    navigation.navigate('Checkout');
  };

  // Render cart item
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Product Image */}
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      {/* Product Details */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemPrice}>₱{item.price.toFixed(2)} each</Text>
        <Text style={styles.itemSubtotal}>
          ₱{(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      
      {/* Quantity Controls */}
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={[styles.quantityButton, item.quantity <= 1 && styles.disabledButton]}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Text style={[styles.quantityButtonText, item.quantity <= 1 && styles.disabledText]}>➖</Text>
        </TouchableOpacity>
        
        <View style={styles.quantityDisplay}>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>➕</Text>
        </TouchableOpacity>
      </View>
      
      {/* Remove Button */}
      <TouchableOpacity
        onPress={() => handleRemoveItem(item)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  // Empty cart component
  const EmptyCart = () => (
    <View style={styles.emptyCart}>
      <Text style={styles.emptyCartIcon}>🛒</Text>
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
      <Text style={styles.emptyCartSubtext}>Add some delicious food to get started!</Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.shopButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart ({cartItems.length} items)</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Section - Total and Checkout */}
      <View style={styles.bottomSection}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₱{getTotalPrice().toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>🛒 Proceed to Checkout</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  clearButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 5,
  },
  itemSubtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: COLORS.border,
  },
  quantityButtonText: {
    fontSize: 12,
    color: COLORS.text,
  },
  disabledText: {
    color: COLORS.muted,
  },
  quantityDisplay: {
    marginHorizontal: 15,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    fontSize: 16,
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
  shopButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;