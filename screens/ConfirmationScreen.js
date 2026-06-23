import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../styles/colors';

const ConfirmationScreen = ({ route, navigation }) => {
  const { orderData } = route.params;
  
  // Format date and time from createdAt or use existing orderDate/orderTime
  const getFormattedDate = () => {
    if (orderData.createdAt) {
      const date = new Date(orderData.createdAt);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return orderData.orderDate;
  };
  
  const getFormattedTime = () => {
    if (orderData.createdAt) {
      const date = new Date(orderData.createdAt);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return orderData.orderTime;
  };

  // Navigate back to home
  const handleContinueShopping = () => {
    // Navigate to the bottom of the Home stack (HomeMain screen)
    navigation.navigate('HomeMain');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Success Section */}
        <View style={styles.successSection}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Order Placed Successfully!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for your order. We'll start preparing your food right away.
          </Text>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Order Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>#{orderData.id}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Customer</Text>
            <Text style={styles.detailValue}>{orderData.customerName}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contact</Text>
            <Text style={styles.detailValue}>{orderData.contactNumber}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{getFormattedDate()}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{getFormattedTime()}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{orderData.status}</Text>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🍽️ Order Items</Text>
          
          {orderData.items.map((item) => (
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
            <Text style={styles.totalAmount}>
              ₱{orderData.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* What's Next */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 What's Next?</Text>
          
          <View style={styles.stepContainer}>
            <Text style={styles.stepIcon}>📞</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Confirmation Call</Text>
              <Text style={styles.stepDescription}>
                We'll call you within 5 minutes to confirm your order details.
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <Text style={styles.stepIcon}>👨‍🍳</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Food Preparation</Text>
              <Text style={styles.stepDescription}>
                Our chefs will start preparing your fresh meal (15-30 mins).
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <Text style={styles.stepIcon}>🚗</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Delivery/Pickup</Text>
              <Text style={styles.stepDescription}>
                Your order will be ready for delivery or pickup as requested.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Continue Shopping Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinueShopping}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>🏠 Continue Shopping</Text>
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
  successSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    margin: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  successIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 22,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.muted,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statusBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
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
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  stepIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  stepDescription: {
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
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;