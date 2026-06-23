import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRestaurantById } from '../data/restaurantData';
import { COLORS } from '../styles/colors';

const RestaurantMenuScreen = ({ route, navigation }) => {
  const { restaurantId } = route.params;
  const restaurant = getRestaurantById(restaurantId);
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Restaurant not found</Text>
      </SafeAreaView>
    );
  }

  // Get unique categories from menu
  const categories = ['All', ...new Set(restaurant.menu.map(item => item.category))];

  // Filter menu items by category
  const filteredMenu = selectedCategory === 'All'
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate('Product', { product: item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.menuItemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.menuItemPrice}>₱{item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Product', { product: item })}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.selectedCategoryButtonText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredMenu}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Restaurant Banner */}
            <View style={styles.bannerContainer}>
              <Image source={{ uri: restaurant.image }} style={styles.bannerImage} />
              <View style={styles.bannerOverlay}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
              </View>
            </View>

            {/* Restaurant Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.description}>{restaurant.description}</Text>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
              </View>
              <Text style={styles.deliveryTime}>🕐 {restaurant.deliveryTime}</Text>
            </View>

            {/* Category Filter */}
            <View style={styles.categorySection}>
              <Text style={styles.menuTitle}>Menu</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryContainer}
                contentContainerStyle={styles.categoryContent}
              >
                {categories.map(renderCategoryButton)}
              </ScrollView>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 50,
  },
  bannerContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  separator: {
    fontSize: 14,
    color: COLORS.muted,
    marginHorizontal: 6,
  },
  description: {
    fontSize: 14,
    color: COLORS.muted,
  },
  priceRange: {
    fontSize: 14,
    color: COLORS.muted,
    fontWeight: '600',
  },
  deliveryTime: {
    fontSize: 13,
    color: COLORS.muted,
  },
  categorySection: {
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoryContainer: {
    paddingHorizontal: 20,
  },
  categoryContent: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  selectedCategoryButtonText: {
    color: COLORS.background,
  },
  listContent: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 6,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.background,
  },
});

export default RestaurantMenuScreen;
