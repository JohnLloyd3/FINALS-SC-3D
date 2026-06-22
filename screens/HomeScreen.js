import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { foodItems, categories } from '../data/foodData';
import { COLORS } from '../styles/colors';

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();

  // Filter food items based on category and search query
  const filteredFoodItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Navigate to cart with badge
  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  // Render food item card
  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodCard}
      onPress={() => navigation.navigate('Product', { product: item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.cardContent}>
        <Text style={styles.foodName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.foodPrice}>₱{item.price.toFixed(2)}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('Product', { product: item })}
        >
          <Text style={styles.addButtonText}>➕ Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Render category filter button
  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategoryButton
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.selectedCategoryButtonText
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredFoodItems}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.foodList}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Text style={styles.searchIcon}>🔍</Text>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search for food..."
                    placeholderTextColor={COLORS.muted}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
                style={styles.headerButton}
              >
                <Text style={styles.headerIcon}>⚙️</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
              contentContainerStyle={styles.categoryContent}
            >
              {categories.map(renderCategoryButton)}
            </ScrollView>
          </>
        }
        stickyHeaderIndices={[0]}
      />
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
  searchContainer: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 15,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  categoryContent: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  selectedCategoryButtonText: {
    color: COLORS.background,
  },
  foodList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  foodCard: {
    width: '48%',
    backgroundColor: COLORS.background,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    minHeight: 40,
  },
  foodPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;