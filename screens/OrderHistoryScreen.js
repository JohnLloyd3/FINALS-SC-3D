import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { database } from '../config/firebase';
import { ref, get, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';

export default function OrderHistoryScreen({ route }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Check if this is being shown as "Order History" (completed only) or "Orders" (active only)
  const showCompletedOnly = route?.params?.completedOnly || false;

  // Fetch orders when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [user])
  );

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      if (!user) {
        setOrders([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }
      
      console.log('[ORDER HISTORY] Fetching orders for user:', user.uid);
      console.log('[ORDER HISTORY] Show completed only:', showCompletedOnly);
      
      // Try to load from AsyncStorage first (instant)
      try {
        // Try specific cache first
        const specificCacheKey = showCompletedOnly ? `orders_completed_${user.uid}` : `orders_active_${user.uid}`;
        const cachedOrders = await AsyncStorage.getItem(specificCacheKey);
        
        if (cachedOrders) {
          const parsed = JSON.parse(cachedOrders);
          console.log('[ORDER HISTORY] Loaded', parsed.length, showCompletedOnly ? 'completed' : 'active', 'orders from specific cache');
          setOrders(parsed);
        } else {
          // Fall back to all orders cache and filter
          const allOrdersCache = await AsyncStorage.getItem(`orders_${user.uid}`);
          if (allOrdersCache) {
            const allOrders = JSON.parse(allOrdersCache);
            let filteredOrders;
            if (showCompletedOnly) {
              filteredOrders = allOrders.filter(order => 
                order.status?.toLowerCase() === 'completed' || order.status?.toLowerCase() === 'complete'
              );
            } else {
              filteredOrders = allOrders.filter(order => 
                order.status?.toLowerCase() !== 'completed' && 
                order.status?.toLowerCase() !== 'complete' &&
                order.status?.toLowerCase() !== 'cancelled'
              );
            }
            console.log('[ORDER HISTORY] Loaded', filteredOrders.length, showCompletedOnly ? 'completed' : 'active', 'orders from all cache (filtered)');
            setOrders(filteredOrders);
          }
        }
      } catch (cacheErr) {
        console.warn('[ORDER HISTORY] Cache load failed:', cacheErr.message);
      }
      
      // Try to fetch from Firebase (shorter timeout, fail gracefully)
      try {
        const ordersRef = ref(database, `users/${user.uid}/orders`);
        
        // Reduce timeout to 5 seconds and fail silently
        const snapshot = await Promise.race([
          get(ordersRef),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firebase timeout')), 5000)
          )
        ]);
        
        if (snapshot.exists()) {
          const ordersData = snapshot.val();
          const ordersList = Object.keys(ordersData).map((key) => ({
            id: key,
            ...ordersData[key],
          }));
          
          // Save all orders first
          await AsyncStorage.setItem(`orders_${user.uid}`, JSON.stringify(ordersList));
          
          // Filter based on view type
          let filteredOrders;
          if (showCompletedOnly) {
            // Order History: Show only completed orders
            filteredOrders = ordersList.filter(order => 
              order.status?.toLowerCase() === 'completed' || order.status?.toLowerCase() === 'complete'
            );
          } else {
            // Orders Tab: Show only preparing/pending orders (non-completed)
            filteredOrders = ordersList.filter(order => 
              order.status?.toLowerCase() !== 'completed' && 
              order.status?.toLowerCase() !== 'complete' &&
              order.status?.toLowerCase() !== 'cancelled'
            );
          }
          
          const sortedOrders = filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          console.log('[ORDER HISTORY] ✅ Found', sortedOrders.length, showCompletedOnly ? 'completed' : 'active', 'orders from Firebase');
          setOrders(sortedOrders);
          
          // Cache filtered orders
          const cacheKey = showCompletedOnly ? `orders_completed_${user.uid}` : `orders_active_${user.uid}`;
          await AsyncStorage.setItem(cacheKey, JSON.stringify(sortedOrders));
        } else {
          console.log('[ORDER HISTORY] No orders found in Firebase');
          // Keep cache if Firebase is empty but we have cached data
        }
      } catch (firebaseErr) {
        // Silently fail and use cached data - no warnings shown to user
        if (firebaseErr.message !== 'Firebase timeout') {
          console.warn('[ORDER HISTORY] Firebase error:', firebaseErr.message);
        }
        // Orders already loaded from cache above, so user sees data instantly
      }
    } catch (error) {
      console.error('[ORDER HISTORY] Error:', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handleOrderReceived = async (order) => {
    console.log('[ORDER RECEIVED] Button clicked for order:', order.id);
    
    Alert.alert(
      'Confirm Order Received',
      'Have you received this order? This will mark the order as completed.',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => console.log('[ORDER RECEIVED] Cancelled') },
        {
          text: 'Yes, Received',
          onPress: async () => {
            console.log('[ORDER RECEIVED] User confirmed receipt');
            try {
              // Update order status to completed
              const updatedOrder = { ...order, status: 'completed' };
              console.log('[ORDER RECEIVED] Updated order:', updatedOrder);
              
              // Update in Firebase (non-blocking, fail silently)
              if (user) {
                try {
                  const orderRef = ref(database, `users/${user.uid}/orders/${order.id}`);
                  await Promise.race([
                    set(orderRef, updatedOrder),
                    new Promise((_, reject) => 
                      setTimeout(() => reject(new Error('Firebase timeout')), 3000)
                    )
                  ]);
                  console.log('[ORDER RECEIVED] ✅ Firebase updated');
                } catch (fbError) {
                  // Fail silently - local cache is already updated
                  if (fbError.message !== 'Firebase timeout') {
                    console.warn('[ORDER RECEIVED] Firebase error:', fbError.message);
                  }
                  // Continue anyway - update local cache
                }
              }
              
              // Update local cache - update both caches
              const updatedOrders = orders.map(o => 
                o.id === order.id ? updatedOrder : o
              );
              setOrders(updatedOrders);
              
              // Update both active and completed caches
              const allOrdersCache = await AsyncStorage.getItem(`orders_${user.uid}`);
              if (allOrdersCache) {
                const allOrders = JSON.parse(allOrdersCache);
                const updatedAll = allOrders.map(o => o.id === order.id ? updatedOrder : o);
                await AsyncStorage.setItem(`orders_${user.uid}`, JSON.stringify(updatedAll));
              }
              
              // Update active orders cache (remove this order)
              const activeOrders = updatedOrders.filter(o => 
                o.status?.toLowerCase() !== 'completed' && o.status?.toLowerCase() !== 'cancelled'
              );
              await AsyncStorage.setItem(`orders_active_${user.uid}`, JSON.stringify(activeOrders));
              
              // Update completed orders cache (add this order)
              const completedOrders = updatedOrders.filter(o => 
                o.status?.toLowerCase() === 'completed' || o.status?.toLowerCase() === 'complete'
              );
              await AsyncStorage.setItem(`orders_completed_${user.uid}`, JSON.stringify(completedOrders));
              
              console.log('[ORDER RECEIVED] ✅ Local cache updated');
              
              Alert.alert('✅ Thank You!', 'Order marked as received and completed.');
            } catch (error) {
              console.error('[ORDER RECEIVED] Error:', error);
              Alert.alert('Error', 'Failed to update order status: ' + error.message);
            }
          }
        }
      ]
    );
  };

  const renderOrderItem = ({ item }) => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Get status color and icon - Only Preparing and Complete
    const getStatusStyle = (status) => {
      switch (status?.toLowerCase()) {
        case 'completed':
        case 'complete':
          return { color: '#4CAF50', icon: '✓', label: 'COMPLETE' };
        default:
          // All other statuses show as "Preparing"
          return { color: '#FF9800', icon: '👨‍🍳', label: 'PREPARING' };
      }
    };

    const statusStyle = getStatusStyle(item.status);

    return (
      <View style={styles.orderCard}>
        {/* Order Header */}
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderNumber}>Order #{item.id?.slice(-6).toUpperCase()}</Text>
            <Text style={styles.orderDate}>{formattedDate} at {formattedTime}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.color }]}>
            <Text style={styles.statusIcon}>{statusStyle.icon}</Text>
            <Text style={styles.statusText}>{statusStyle.label}</Text>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.itemCount}>{item.items?.length || 0} item(s)</Text>
          <Text style={styles.totalPrice}>₱{(item.total || 0).toFixed(2)}</Text>
        </View>

        {/* All Details Always Visible */}
        <View style={styles.expandedContent}>
          {/* Order Status Timeline - Simplified */}
          <View style={styles.statusTimeline}>
            <Text style={styles.timelineTitle}>📍 Order Status</Text>
            <View style={styles.timelineSteps}>
              <View style={[styles.timelineStep, styles.timelineStepActive]}>
                <Text style={styles.timelineIcon}>👨‍🍳</Text>
                <Text style={styles.timelineLabel}>Preparing</Text>
              </View>
              <View style={[styles.timelineStep, item.status?.toLowerCase() === 'completed' && styles.timelineStepActive]}>
                <Text style={styles.timelineIcon}>✓</Text>
                <Text style={styles.timelineLabel}>Complete</Text>
              </View>
            </View>
          </View>

          {/* Items List */}
          <View style={styles.itemsList}>
            <Text style={styles.itemsTitle}>Items Ordered:</Text>
            {item.items?.map((foodItem, index) => (
              <View key={index} style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{foodItem.name}</Text>
                  <Text style={styles.itemQty}>Qty: {foodItem.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>₱{(foodItem.price * foodItem.quantity).toFixed(2)}</Text>
              </View>
            ))}
          </View>

          {/* Order Details */}
          <View style={styles.orderDetails}>
            <Text style={styles.detailsTitle}>Order Details:</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Subtotal:</Text>
              <Text style={styles.detailValue}>₱{(item.subtotal || 0).toFixed(2)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Delivery Fee:</Text>
              <Text style={styles.detailValue}>₱{(item.deliveryFee || 0).toFixed(2)}</Text>
            </View>
            <View style={[styles.detailRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>₱{(item.total || 0).toFixed(2)}</Text>
            </View>
          </View>

          {/* Delivery Address */}
          {item.deliveryAddress && (
            <View style={styles.addressSection}>
              <Text style={styles.addressTitle}>Delivery Address:</Text>
              <Text style={styles.addressText}>{item.deliveryAddress}</Text>
            </View>
          )}

          {/* Order Received Button (Show for all non-completed orders) */}
          {item.status?.toLowerCase() !== 'completed' && item.status?.toLowerCase() !== 'cancelled' && (
            <TouchableOpacity 
              style={styles.receivedButton}
              onPress={() => handleOrderReceived(item)}
            >
              <Text style={styles.receivedButtonText}>✓ ORDER RECEIVED</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const emptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyTitle}>
        {showCompletedOnly ? 'No Completed Orders' : 'No Active Orders'}
      </Text>
      <Text style={styles.emptyText}>
        {showCompletedOnly 
          ? 'You have no completed orders yet.' 
          : 'You have no orders in progress. Start ordering now!'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={emptyState}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexGrow: 1,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  orderDate: {
    fontSize: 12,
    color: COLORS.border,
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusIcon: {
    fontSize: 12,
    color: '#FFF',
  },
  statusText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemCount: {
    fontSize: 13,
    color: COLORS.border,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemsList: {
    marginBottom: 16,
  },
  itemsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '500',
  },
  itemQty: {
    fontSize: 11,
    color: COLORS.border,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderDetails: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTopHorizontal: 8,
    marginTop: 4,
    marginBottom: 0,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.border,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addressSection: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  addressTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 12,
    color: COLORS.border,
    lineHeight: 16,
  },
  receivedButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  receivedButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.border,
    textAlign: 'center',
    lineHeight: 20,
  },
  statusTimeline: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  timelineSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineStep: {
    alignItems: 'center',
    opacity: 0.3,
  },
  timelineStepActive: {
    opacity: 1,
  },
  timelineIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  timelineLabel: {
    fontSize: 9,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
  },
});
