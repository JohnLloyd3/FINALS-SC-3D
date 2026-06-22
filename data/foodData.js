// Sample food data - In a real app, this would come from a backend API
export const foodItems = [
  // Meals
  {
    id: 1,
    name: 'Classic Burger',
    price: 725,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80',
    description: 'Juicy beef patty with fresh lettuce, tomato, onion, and our special sauce on a toasted bun.',
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    price: 950,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    description: 'Fresh mozzarella, basil, and tomato sauce on our handmade pizza dough.',
  },
  {
    id: 3,
    name: 'Chicken Caesar Salad',
    price: 780,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80',
    description: 'Grilled chicken breast on fresh romaine lettuce with Caesar dressing and croutons.',
  },
  {
    id: 4,
    name: 'Fish and Chips',
    price: 895,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1579208570378-8c970854bc23?w=400&q=80',
    description: 'Beer-battered fish fillet served with golden fries and tartar sauce.',
  },
  {
    id: 5,
    name: 'Spaghetti Carbonara',
    price: 840,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80',
    description: 'Creamy pasta with bacon, parmesan cheese, and fresh black pepper.',
  },

  // Drinks
  {
    id: 6,
    name: 'Fresh Orange Juice',
    price: 280,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    description: 'Freshly squeezed orange juice served chilled.',
  },
  {
    id: 7,
    name: 'Iced Coffee',
    price: 225,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&q=80',
    description: 'Cold brew coffee served with ice and your choice of milk.',
  },
  {
    id: 8,
    name: 'Smoothie Bowl',
    price: 450,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80',
    description: 'Tropical fruit smoothie topped with granola and fresh berries.',
  },
  {
    id: 9,
    name: 'Lemonade',
    price: 170,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80',
    description: 'Fresh lemonade made with real lemons and a hint of mint.',
  },

  // Snacks
  {
    id: 10,
    name: 'Chicken Wings',
    price: 560,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&q=80',
    description: 'Crispy chicken wings tossed in your choice of sauce.',
  },
  {
    id: 11,
    name: 'Nachos Supreme',
    price: 505,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&q=80',
    description: 'Tortilla chips loaded with cheese, jalapeños, and sour cream.',
  },
  {
    id: 12,
    name: 'Mozzarella Sticks',
    price: 390,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?w=400&q=80',
    description: 'Golden fried mozzarella sticks served with marinara sauce.',
  },
  {
    id: 13,
    name: 'Chocolate Cake',
    price: 335,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    description: 'Rich chocolate cake with layers of chocolate frosting.',
  },
  {
    id: 14,
    name: 'Ice Cream Sundae',
    price: 280,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=400&q=80',
    description: 'Vanilla ice cream topped with chocolate sauce, nuts, and a cherry.',
  },
];

// Categories for filtering
export const categories = ['All', 'Meals', 'Drinks', 'Snacks'];