import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

const RestaurantCard = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.description}>{restaurant.description}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
        </View>
        <Text style={styles.deliveryTime}>🕐 {restaurant.deliveryTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
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
});

export default RestaurantCard;
