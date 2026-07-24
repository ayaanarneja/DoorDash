import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : { restaurants: [], foods: [] };
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavoriteRestaurant = (restaurantId) => {
    setFavorites(prev => {
      const isFav = prev.restaurants.includes(restaurantId);
      return {
        ...prev,
        restaurants: isFav 
          ? prev.restaurants.filter(id => id !== restaurantId)
          : [...prev.restaurants, restaurantId]
      };
    });
  };

  const toggleFavoriteFood = (foodId) => {
    setFavorites(prev => {
      const isFav = prev.foods.includes(foodId);
      return {
        ...prev,
        foods: isFav 
          ? prev.foods.filter(id => id !== foodId)
          : [...prev.foods, foodId]
      };
    });
  };

  const isFavoriteRestaurant = (id) => favorites.restaurants.includes(id);
  const isFavoriteFood = (id) => favorites.foods.includes(id);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavoriteRestaurant,
      toggleFavoriteFood,
      isFavoriteRestaurant,
      isFavoriteFood
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
