// Restaurant data with menus - Using reliable image service
export const restaurants = [
  {
    id: 'mcdonalds',
    name: "McDonald's",
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80',
    description: 'Fast Food',
    rating: 4.5,
    deliveryTime: '15-20 min',
    priceRange: '₱₱',
    menu: [
      {
        id: 'bigmac',
        name: 'Big Mac',
        price: 225,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80',
        description: 'Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun.',
        category: 'Burgers',
        restaurantId: 'mcdonalds',
        restaurantName: "McDonald's",
      },
      {
        id: 'cheeseburger',
        name: 'Cheeseburger',
        price: 150,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
        description: 'Classic cheeseburger with beef patty, cheese, pickles, onions, and ketchup.',
        category: 'Burgers',
        restaurantId: 'mcdonalds',
        restaurantName: "McDonald's",
      },
      {
        id: 'mcnuggets',
        name: 'Chicken McNuggets',
        price: 180,
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80',
        description: 'Tender chicken pieces in a crispy coating. Served with your choice of sauce.',
        category: 'Chicken',
        restaurantId: 'mcdonalds',
        restaurantName: "McDonald's",
      },
      {
        id: 'mcfries',
        name: 'French Fries',
        price: 95,
        image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&q=80',
        description: 'World-famous golden fries, perfectly crispy and salted.',
        category: 'Sides',
        restaurantId: 'mcdonalds',
        restaurantName: "McDonald's",
      },
      {
        id: 'mccoke',
        name: 'Coca-Cola',
        price: 85,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',
        description: 'Refreshing Coca-Cola soft drink.',
        category: 'Drinks',
        restaurantId: 'mcdonalds',
        restaurantName: "McDonald's",
      },
    ],
  },
  {
    id: 'jollibee',
    name: 'Jollibee',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80',
    description: 'Filipino Fast Food',
    rating: 4.7,
    deliveryTime: '10-15 min',
    priceRange: '₱',
    menu: [
      {
        id: 'yumburger',
        name: 'Yumburger',
        price: 95,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80',
        description: 'The iconic Jollibee burger with special dressing.',
        category: 'Burgers',
        restaurantId: 'jollibee',
        restaurantName: 'Jollibee',
      },
      {
        id: 'champ',
        name: 'Champ',
        price: 175,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
        description: 'Large beef patty burger with all the fixings.',
        category: 'Burgers',
        restaurantId: 'jollibee',
        restaurantName: 'Jollibee',
      },
      {
        id: 'chickenjoy',
        name: 'Chickenjoy',
        price: 145,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80',
        description: 'World-famous fried chicken with crispy skin and juicy meat.',
        category: 'Chicken',
        restaurantId: 'jollibee',
        restaurantName: 'Jollibee',
      },
      {
        id: 'jolly-spaghetti',
        name: 'Jolly Spaghetti',
        price: 125,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
        description: 'Sweet-style Filipino spaghetti with hotdog slices.',
        category: 'Pasta',
        restaurantId: 'jollibee',
        restaurantName: 'Jollibee',
      },
      {
        id: 'peach-mango-pie',
        name: 'Peach Mango Pie',
        price: 55,
        image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80',
        description: 'Crispy pie filled with sweet peach and mango filling.',
        category: 'Desserts',
        restaurantId: 'jollibee',
        restaurantName: 'Jollibee',
      },
    ],
  },
  {
    id: 'pizza-hut',
    name: 'Pizza Hut',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
    description: 'Pizza & Italian',
    rating: 4.3,
    deliveryTime: '20-30 min',
    priceRange: '₱₱₱',
    menu: [
      {
        id: 'pepperoni-pizza',
        name: 'Pepperoni Pizza',
        price: 550,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
        description: 'Classic pepperoni pizza with mozzarella cheese.',
        category: 'Pizza',
        restaurantId: 'pizza-hut',
        restaurantName: 'Pizza Hut',
      },
      {
        id: 'meat-lovers',
        name: "Meat Lover's Pizza",
        price: 650,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
        description: 'Loaded with pepperoni, sausage, bacon, and ham.',
        category: 'Pizza',
        restaurantId: 'pizza-hut',
        restaurantName: 'Pizza Hut',
      },
      {
        id: 'hawaiian-pizza',
        name: 'Hawaiian Pizza',
        price: 580,
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
        description: 'Ham and pineapple on a cheese pizza.',
        category: 'Pizza',
        restaurantId: 'pizza-hut',
        restaurantName: 'Pizza Hut',
      },
      {
        id: 'garlic-bread',
        name: 'Garlic Bread',
        price: 180,
        image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=400&q=80',
        description: 'Toasted bread with garlic butter and herbs.',
        category: 'Sides',
        restaurantId: 'pizza-hut',
        restaurantName: 'Pizza Hut',
      },
      {
        id: 'chicken-wings-ph',
        name: 'Buffalo Wings',
        price: 320,
        image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&q=80',
        description: 'Spicy buffalo chicken wings with ranch dip.',
        category: 'Chicken',
        restaurantId: 'pizza-hut',
        restaurantName: 'Pizza Hut',
      },
    ],
  },
  {
    id: 'kfc',
    name: 'KFC',
    image: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=400&q=80',
    description: 'Fried Chicken',
    rating: 4.4,
    deliveryTime: '15-25 min',
    priceRange: '₱₱',
    menu: [
      {
        id: 'original-chicken',
        name: 'Original Recipe Chicken',
        price: 155,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80',
        description: "Colonel's original recipe fried chicken.",
        category: 'Chicken',
        restaurantId: 'kfc',
        restaurantName: 'KFC',
      },
      {
        id: 'zinger-burger',
        name: 'Zinger Burger',
        price: 195,
        image: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=400&q=80',
        description: 'Spicy crispy chicken fillet burger.',
        category: 'Burgers',
        restaurantId: 'kfc',
        restaurantName: 'KFC',
      },
      {
        id: 'popcorn-chicken',
        name: 'Popcorn Chicken',
        price: 165,
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80',
        description: 'Bite-sized crispy chicken pieces.',
        category: 'Chicken',
        restaurantId: 'kfc',
        restaurantName: 'KFC',
      },
      {
        id: 'coleslaw',
        name: 'Coleslaw',
        price: 75,
        image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&q=80',
        description: 'Creamy coleslaw salad.',
        category: 'Sides',
        restaurantId: 'kfc',
        restaurantName: 'KFC',
      },
      {
        id: 'mashed-potato',
        name: 'Mashed Potato with Gravy',
        price: 85,
        image: 'https://images.unsplash.com/photo-1585937421612-70e008356f85?w=400&q=80',
        description: 'Creamy mashed potatoes with savory gravy.',
        category: 'Sides',
        restaurantId: 'kfc',
        restaurantName: 'KFC',
      },
    ],
  },
  {
    id: 'starbucks',
    name: 'Starbucks',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    description: 'Coffee & Cafe',
    rating: 4.6,
    deliveryTime: '10-15 min',
    priceRange: '₱₱₱',
    menu: [
      {
        id: 'caramel-macchiato',
        name: 'Caramel Macchiato',
        price: 185,
        image: 'https://images.unsplash.com/photo-1599750464852-009d8e5a0e4f?w=400&q=80',
        description: 'Espresso with steamed milk and caramel drizzle.',
        category: 'Coffee',
        restaurantId: 'starbucks',
        restaurantName: 'Starbucks',
      },
      {
        id: 'white-chocolate-mocha',
        name: 'White Chocolate Mocha',
        price: 195,
        image: 'https://images.unsplash.com/photo-1568901839119-631418a3910b?w=400&q=80',
        description: 'Espresso with white chocolate and steamed milk.',
        category: 'Coffee',
        restaurantId: 'starbucks',
        restaurantName: 'Starbucks',
      },
      {
        id: 'green-tea-latte',
        name: 'Green Tea Latte',
        price: 175,
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80',
        description: 'Matcha green tea with steamed milk.',
        category: 'Tea',
        restaurantId: 'starbucks',
        restaurantName: 'Starbucks',
      },
      {
        id: 'blueberry-muffin',
        name: 'Blueberry Muffin',
        price: 145,
        image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80',
        description: 'Fresh-baked muffin with blueberries.',
        category: 'Pastries',
        restaurantId: 'starbucks',
        restaurantName: 'Starbucks',
      },
      {
        id: 'chocolate-croissant',
        name: 'Chocolate Croissant',
        price: 165,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
        description: 'Buttery croissant filled with chocolate.',
        category: 'Pastries',
        restaurantId: 'starbucks',
        restaurantName: 'Starbucks',
      },
    ],
  },
];

// Helper function to get all menu items across all restaurants
export const getAllMenuItems = () => {
  return restaurants.flatMap(restaurant => restaurant.menu);
};

// Helper function to search food across all restaurants
export const searchFoodByRestaurant = (query) => {
  if (!query || query.trim() === '') {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results = {};

  restaurants.forEach(restaurant => {
    const matchingItems = restaurant.menu.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );

    if (matchingItems.length > 0) {
      results[restaurant.id] = {
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.image,
          rating: restaurant.rating,
          deliveryTime: restaurant.deliveryTime,
        },
        items: matchingItems,
      };
    }
  });

  return results;
};

// Helper function to get restaurant by ID
export const getRestaurantById = (restaurantId) => {
  return restaurants.find(r => r.id === restaurantId);
};
