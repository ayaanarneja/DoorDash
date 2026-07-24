import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize from LocalStorage
  const [cartMap, setCartMap] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : {}; // HashMap implementation
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartMap));
  }, [cartMap]);

  // O(1) Add to cart
  const addToCart = (food) => {
    setCartMap(prev => {
      const existing = prev[food.id];
      return {
        ...prev,
        [food.id]: {
          ...food,
          quantity: existing ? existing.quantity + 1 : 1
        }
      };
    });
  };

  // O(1) Remove entirely
  const removeFromCart = (foodId) => {
    setCartMap(prev => {
      const newMap = { ...prev };
      delete newMap[foodId];
      return newMap;
    });
  };

  // O(1) Update quantity
  const updateQuantity = (foodId, delta) => {
    setCartMap(prev => {
      const item = prev[foodId];
      if (!item) return prev;
      
      const newQuantity = item.quantity + delta;
      
      if (newQuantity <= 0) {
        const newMap = { ...prev };
        delete newMap[foodId];
        return newMap;
      }
      
      return {
        ...prev,
        [foodId]: {
          ...item,
          quantity: newQuantity
        }
      };
    });
  };

  const clearCart = () => setCartMap({});

  const cartItems = Object.values(cartMap);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Calculate bill
  const taxes = Math.round(subtotal * 0.05); // 5% tax
  const deliveryCharges = subtotal > 0 ? 40 : 0; // Flat 40 delivery
  const discount = subtotal > 500 ? Math.round(subtotal * 0.1) : 0; // 10% off over 500
  const total = subtotal + taxes + deliveryCharges - discount;

  return (
    <CartContext.Provider value={{
      cartMap,
      cartItems,
      cartCount,
      subtotal,
      taxes,
      deliveryCharges,
      discount,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
