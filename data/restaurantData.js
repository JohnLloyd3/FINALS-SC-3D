// Restaurant data with menus
export const restaurants = [
  {
    id: 'mcdonalds',
    name: "McDonald's",
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80',
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
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=400&q=80',
    description: 'Filipino Fast Food',
    rating: 4.7,
    deliveryTime: '10-15 min',
    priceRange: '₱',
    menu: [
      {
        id: 'yumburger',
        name: 'Yumburger',
        price: 95,
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80',
        description: 'The iconic Jollibee burger with special dressing.',
        category: 'Burgers',
        restaurantId: 'jollibee',
        restaurantName: 'Jollibee',
      },
      {
        id: 'champ',
        name: 'Champ',
        price: 175,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80',
        description: 'Large beef patty burger with all the fixings.',
        category: 'Burgers',
        restaurantId: 'jollibee',
        restaurantName: 'Jollibee',
      },
      {
        id: 'chickenjoy',
        name: 'Chickenjoy',
        price: 145,
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80',
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
        image: 'https://images.unsplash.com/photo-1519915212116-715fb0c3595d?w=400&q=80',
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
        image: 'https://images.unsplash.com/photo-1573140401552-388e7e4de50c?w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1598514982901-ae62764ae75e?w=400&q=80',
    description: 'Fried Chicken',
    rating: 4.4,
    deliveryTime: '15-25 min',
    priceRange: '₱₱',
    menu: [
      {
        id: 'original-chicken',
        name: 'Original Recipe Chicken',
        price: 155,
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80',
        description: "Colonel's original recipe fried chicken.",
        category: 'Chicken',
        restaurantId: 'kfc',
        restaurantName: 'KFC',
      },
      {
        id: 'zinger-burger',
        name: 'Zinger Burger',
        price: 195,
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80',
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
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80',
        description: 'Creamy coleslaw salad.',
        category: 'Sides',
        restaurantId: 'kfc',
        restaurantName: 'KFC',
      },
      {
        id: 'mashed-potato',
        name: 'Mashed Potato with Gravy',
        price: 85,
        image: 'https://images.unsplash.com/photo-1585158742937-8b0a7378c672?w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=80',
    description: 'Coffee & Cafe',
    rating: 4.6,
    deliveryTime: '10-15 min',
    priceRange: '₱₱₱',
    menu: [
      {
        id: 'caramel-macchiato',
        name: 'Caramel Macchiato',
        price: 185,
        image: 'https://images.unsplash.com/photo-1568649929103-cb32bfb222d8?w=400&q=80',
        description: 'Espresso with steamed milk and caramel drizzle.',
        category: 'Coffee',
        restaurantId: 'starbucks',
        restaurantName: 'Starbucks',
      },
      {
        id: 'white-chocolate-mocha',
        name: 'White Chocolate Mocha',
        price: 195,
        image: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=400&q=80',
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
