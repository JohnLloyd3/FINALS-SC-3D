import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { restaurants, searchFoodByRestaurant } from '../data/restaurantData';
import RestaurantCard from '../components/RestaurantCard';
import { COLORS } from '../styles/colors';

const RestaurantListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults(null);
    } else {
      const results = searchFoodByRestaurant(query);
      setSearchResults(results);
    }
  };

  const renderRestaurantCard = ({ item }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: item.id })}
    />
  );

  const renderSearchResults = () => {
    if (!searchResults || Object.keys(searchResults).length === 0) {
      return (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
          <Text style={styles.noResultsSubtext}>Try searching for something else</Text>
        </View>
      );
    }

    return (
      <View style={styles.searchResultsContainer}>
        <Text style={styles.searchResultsTitle}>Search Results for "{searchQuery}"</Text>
        {Object.values(searchResults).map((result) => (
          <View key={result.restaurant.id} style={styles.restaurantGroup}>
            {/* Restaurant Header */}
            <TouchableOpacity
              style={styles.restaurantHeader}
              onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: result.restaurant.id })}
            >
              <Text style={styles.restaurantName}>{result.restaurant.name}</Text>
              <Text style={styles.restaurantInfo}>
                ⭐ {result.restaurant.rating} • {result.restaurant.deliveryTime}
              </Text>
            </TouchableOpacity>

            {/* Food Items */}
            <View style={styles.foodItems}>
              {result.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.foodItem}
                  onPress={() => navigation.navigate('Product', { product: item })}
                  activeOpacity={0.7}
                >
                  <View style={styles.foodItemInfo}>
                    <Text style={styles.foodItemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.foodItemPrice}>₱{item.price.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => navigation.navigate('Product', { product: item })}
                  >
                    <Text style={styles.addToCartText}>+ Add</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for food..."
              placeholderTextColor={COLORS.muted}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery !== '' && (
              <TouchableOpacity
                onPress={() => handleSearch('')}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.headerButton}
        >
          <Text style={styles.headerIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {searchQuery.trim() !== '' ? (
        <FlatList
          data={[{ key: 'search-results' }]}
          renderItem={renderSearchResults}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <>
          <Text style={styles.sectionTitle}>Restaurants Near You</Text>
          <FlatList
            data={restaurants}
            renderItem={renderRestaurantCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
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
    paddingTop: 10,
    paddingBottom: 18,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: COLORS.muted,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 18,
    color: COLORS.muted,
    fontWeight: 'bold',
  },
  headerButton: {
    marginLeft: 10,
    padding: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  headerIcon: {
    fontSize: 18,
    color: COLORS.background,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: COLORS.muted,
  },
  searchResultsContainer: {
    paddingTop: 8,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  restaurantGroup: {
    marginBottom: 24,
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  restaurantHeader: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  restaurantInfo: {
    fontSize: 13,
    color: COLORS.muted,
  },
  foodItems: {
    gap: 10,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: COLORS.background,
    borderRadius: 10,
  },
  foodItemInfo: {
    flex: 1,
    marginRight: 12,
  },
  foodItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  foodItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addToCartText: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default RestaurantListScreen;
