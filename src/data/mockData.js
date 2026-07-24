export const categories = [
  "Pizza", "Burger", "Salad", "Biryani", "Chinese", "Drinks", "Desserts", "Pasta", "Healthy Food", "Seafood", "Italian", "Mexican", "Fast Food", "Indian"
];

const foodImages = {
  Pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
  Burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
  Indian: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80",
  Chinese: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
  Desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&q=80",
  Healthy: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
  Italian: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80",
  Mexican: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
  Seafood: "https://images.unsplash.com/photo-1615141982883-c7da0e698d5c?w=500&q=80"
};

// Helper to generate food items
const generateFoodItems = (restaurantId, cuisine) => {
  const foodNames = {
    Pizza: ['Margherita Pizza', 'Pepperoni Pizza', 'BBQ Chicken Pizza', 'Veggie Supreme', 'Cheese Burst Pizza', 'Mushroom Truffle Pizza', 'Hawaiian Pizza', 'Paneer Tikka Pizza'],
    Burger: ['Classic Cheeseburger', 'Double Patty Burger', 'Chicken Zinger', 'Veggie Delight Burger', 'Spicy Mexican Burger', 'Mushroom Swiss Burger', 'BBQ Bacon Burger', 'Crispy Fish Burger'],
    Indian: ['Chicken Biryani', 'Paneer Butter Masala', 'Mutton Rogan Josh', 'Dal Makhani', 'Butter Chicken', 'Tandoori Roti', 'Garlic Naan', 'Aloo Gobi', 'Palak Paneer', 'Gulab Jamun'],
    Chinese: ['Hakka Noodles', 'Manchow Soup', 'Chilli Chicken', 'Veg Spring Rolls', 'Fried Rice', 'Kung Pao Chicken', 'Dim Sums', 'Sweet and Sour Pork', 'Szechuan Noodles'],
    Desserts: ['Chocolate Lava Cake', 'Cheesecake', 'Tiramisu', 'Vanilla Ice Cream', 'Brownie with Ice Cream', 'Red Velvet Cake', 'Macarons', 'Fruit Tart'],
    Healthy: ['Quinoa Salad', 'Grilled Chicken Breast', 'Greek Salad', 'Avocado Toast', 'Acai Bowl', 'Kale Smoothie', 'Oatmeal', 'Fruit Salad', 'Steamed Veggies'],
    Italian: ['Spaghetti Carbonara', 'Fettuccine Alfredo', 'Lasagna', 'Pesto Pasta', 'Risotto', 'Garlic Bread', 'Bruschetta', 'Ravioli'],
    Mexican: ['Tacos', 'Burritos', 'Quesadillas', 'Nachos', 'Enchiladas', 'Fajitas', 'Churros', 'Guacamole'],
    Seafood: ['Grilled Salmon', 'Fish and Chips', 'Shrimp Scampi', 'Lobster Roll', 'Crab Cakes', 'Oysters', 'Calamari', 'Clam Chowder']
  };

  const getCategoryData = () => {
    for (const key of Object.keys(foodNames)) {
      if (cuisine.toLowerCase().includes(key.toLowerCase())) return { key, names: foodNames[key] };
    }
    return { key: 'Burger', names: foodNames.Burger }; // fallback
  };

  const { key, names } = getCategoryData();
  
  return names.map((name, index) => ({
    id: `${restaurantId}-f${index + 1}`,
    restaurantId,
    name,
    image: foodImages[key] || foodImages.Burger,
    description: `Delicious ${name} prepared with fresh ingredients and authentic recipe.`,
    category: cuisine,
    price: Math.floor(Math.random() * 400) + 100,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5 to 5.0
    calories: Math.floor(Math.random() * 500) + 200,
    isVeg: !name.toLowerCase().includes('chicken') && !name.toLowerCase().includes('mutton') && !name.toLowerCase().includes('fish') && !name.toLowerCase().includes('pork') && !name.toLowerCase().includes('bacon') && !name.toLowerCase().includes('salmon') && !name.toLowerCase().includes('shrimp') && !name.toLowerCase().includes('lobster') && !name.toLowerCase().includes('crab') && !name.toLowerCase().includes('oyster') && !name.toLowerCase().includes('clam') && !name.toLowerCase().includes('calamari'),
    ingredients: ['Fresh Ingredients', 'Secret Spices', 'Love']
  }));
};

export const restaurants = [
  {
    id: "r1",
    name: "Pizza Paradise",
    cuisine: "Pizza, Fast Food",
    rating: 4.5,
    deliveryTime: "30-40 min",
    address: "123 Main St, City Center",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    priceLevel: "₹₹",
    openingHours: "10:00 AM - 11:00 PM",
    discount: "20% OFF",
    deliveryFee: 40,
    isOpen: true
  },
  {
    id: "r2",
    name: "Burger Haven",
    cuisine: "Burger, Fast Food",
    rating: 4.2,
    deliveryTime: "25-35 min",
    address: "456 Oak Avenue, Westside",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    priceLevel: "₹",
    openingHours: "11:00 AM - 10:00 PM",
    discount: "Free Delivery",
    deliveryFee: 0,
    isOpen: true
  },
  {
    id: "r3",
    name: "Spice Route Indian",
    cuisine: "Indian, Biryani",
    rating: 4.8,
    deliveryTime: "40-55 min",
    address: "789 Spice Lane, Downtown",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    priceLevel: "₹₹₹",
    openingHours: "12:00 PM - 11:30 PM",
    discount: "10% OFF",
    deliveryFee: 50,
    isOpen: true
  },
  {
    id: "r4",
    name: "Dragon Wok",
    cuisine: "Chinese, Asian",
    rating: 4.3,
    deliveryTime: "30-45 min",
    address: "321 Lotus Road",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
    priceLevel: "₹₹",
    openingHours: "11:30 AM - 10:30 PM",
    discount: "15% OFF on orders above ₹500",
    deliveryFee: 30,
    isOpen: true
  },
  {
    id: "r5",
    name: "Sweet Tooth Bakery",
    cuisine: "Desserts, Bakery",
    rating: 4.7,
    deliveryTime: "20-30 min",
    address: "55 Sugar Street",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    priceLevel: "₹₹",
    openingHours: "09:00 AM - 09:00 PM",
    discount: "Buy 1 Get 1 Free on Cakes",
    deliveryFee: 20,
    isOpen: true
  },
  {
    id: "r6",
    name: "Green Bowl",
    cuisine: "Healthy, Salad",
    rating: 4.6,
    deliveryTime: "25-35 min",
    address: "88 Fit Avenue",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    priceLevel: "₹₹₹",
    openingHours: "08:00 AM - 08:00 PM",
    discount: "20% OFF",
    deliveryFee: 40,
    isOpen: true
  },
  {
    id: "r7",
    name: "Pasta House",
    cuisine: "Italian, Pasta",
    rating: 4.4,
    deliveryTime: "35-50 min",
    address: "22 Olive Way",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
    priceLevel: "₹₹",
    openingHours: "11:00 AM - 10:00 PM",
    discount: "10% OFF",
    deliveryFee: 35,
    isOpen: false
  },
  {
    id: "r8",
    name: "Biryani Blues",
    cuisine: "Indian, Biryani",
    rating: 4.1,
    deliveryTime: "30-40 min",
    address: "99 Royal Road",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    priceLevel: "₹₹",
    openingHours: "12:00 PM - 12:00 AM",
    discount: "Free Delivery",
    deliveryFee: 0,
    isOpen: true
  },
  {
    id: "r9",
    name: "Taco Fiesta",
    cuisine: "Mexican, Fast Food",
    rating: 4.3,
    deliveryTime: "25-40 min",
    address: "44 Salsa Street",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    priceLevel: "₹",
    openingHours: "11:00 AM - 11:00 PM",
    discount: "15% OFF",
    deliveryFee: 25,
    isOpen: true
  },
  {
    id: "r10",
    name: "Oceanic Seafood",
    cuisine: "Seafood, Healthy",
    rating: 4.5,
    deliveryTime: "45-60 min",
    address: "77 Pier Road",
    image: "https://images.unsplash.com/photo-1615141982883-c7da0e698d5c?w=800&q=80",
    priceLevel: "₹₹₹₹",
    openingHours: "06:00 PM - 11:00 PM",
    discount: "No Discount",
    deliveryFee: 60,
    isOpen: false
  },
  {
    id: "r11",
    name: "The Rolling Pin",
    cuisine: "Desserts, Bakery",
    rating: 4.6,
    deliveryTime: "20-30 min",
    address: "10 Baker Street",
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80",
    priceLevel: "₹₹",
    openingHours: "08:00 AM - 09:00 PM",
    discount: "10% OFF",
    deliveryFee: 20,
    isOpen: true
  },
  {
    id: "r12",
    name: "Noodle Story",
    cuisine: "Chinese, Fast Food",
    rating: 4.0,
    deliveryTime: "20-30 min",
    address: "56 Chopstick Alley",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80",
    priceLevel: "₹",
    openingHours: "10:00 AM - 10:00 PM",
    discount: "Free Delivery",
    deliveryFee: 0,
    isOpen: true
  },
  {
    id: "r13",
    name: "Royal Indian Fare",
    cuisine: "Indian",
    rating: 4.9,
    deliveryTime: "40-60 min",
    address: "1 Palace View",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&q=80",
    priceLevel: "₹₹₹",
    openingHours: "12:00 PM - 11:00 PM",
    discount: "20% OFF",
    deliveryFee: 40,
    isOpen: true
  },
  {
    id: "r14",
    name: "Kebab Junction",
    cuisine: "Indian, Fast Food",
    rating: 4.2,
    deliveryTime: "30-45 min",
    address: "23 Meat Lane",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
    priceLevel: "₹₹",
    openingHours: "04:00 PM - 02:00 AM",
    discount: "10% OFF",
    deliveryFee: 30,
    isOpen: true
  },
  {
    id: "r15",
    name: "Vegan Vibes",
    cuisine: "Healthy, Salad",
    rating: 4.7,
    deliveryTime: "25-35 min",
    address: "44 Plant Street",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80",
    priceLevel: "₹₹₹",
    openingHours: "09:00 AM - 10:00 PM",
    discount: "15% OFF",
    deliveryFee: 35,
    isOpen: true
  },
  {
    id: "r16",
    name: "Mamma Mia Pizzeria",
    cuisine: "Pizza, Italian",
    rating: 4.8,
    deliveryTime: "30-45 min",
    address: "88 Little Italy",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    priceLevel: "₹₹₹",
    openingHours: "11:00 AM - 11:00 PM",
    discount: "Free Garlic Bread",
    deliveryFee: 50,
    isOpen: true
  },
  {
    id: "r17",
    name: "Smash Burgers",
    cuisine: "Burger, Fast Food",
    rating: 4.4,
    deliveryTime: "20-30 min",
    address: "12 Diner Road",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    priceLevel: "₹₹",
    openingHours: "11:00 AM - 01:00 AM",
    discount: "10% OFF",
    deliveryFee: 25,
    isOpen: true
  },
  {
    id: "r18",
    name: "Sushi Zen",
    cuisine: "Seafood, Healthy",
    rating: 4.6,
    deliveryTime: "35-50 min",
    address: "7 Tokyo Street",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    priceLevel: "₹₹₹",
    openingHours: "12:00 PM - 10:30 PM",
    discount: "10% OFF on Rolls",
    deliveryFee: 40,
    isOpen: true
  },
  {
    id: "r19",
    name: "Dim Sum House",
    cuisine: "Chinese, Asian",
    rating: 4.2,
    deliveryTime: "30-45 min",
    address: "99 Dumpling Ave",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80",
    priceLevel: "₹₹",
    openingHours: "11:00 AM - 10:00 PM",
    discount: "Free Delivery over ₹600",
    deliveryFee: 30,
    isOpen: true
  },
  {
    id: "r20",
    name: "Ice Cream Co.",
    cuisine: "Desserts",
    rating: 4.5,
    deliveryTime: "15-25 min",
    address: "3 Cold Street",
    image: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?w=800&q=80",
    priceLevel: "₹",
    openingHours: "12:00 PM - 12:00 AM",
    discount: "20% OFF",
    deliveryFee: 15,
    isOpen: true
  }
];

export const allFoods = restaurants.flatMap(r => generateFoodItems(r.id, r.cuisine));
