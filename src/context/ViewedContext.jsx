import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Stack } from '../utils/dataStructures';

const ViewedContext = createContext();

export const ViewedProvider = ({ children }) => {
  const [viewedItems, setViewedItems] = useState([]);
  
  // Use useMemo to persist the Stack instance across renders
  const stack = useMemo(() => new Stack(10), []);

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      const parsed = JSON.parse(saved);
      stack.load(parsed);
      setViewedItems(stack.getItems());
    }
  }, [stack]);

  const addViewedItem = (item) => {
    stack.push(item);
    const newItems = stack.getItems();
    setViewedItems(newItems);
    localStorage.setItem('recentlyViewed', JSON.stringify(stack.items)); // Save the array representation
  };

  const clearViewed = () => {
    stack.clear();
    setViewedItems([]);
    localStorage.removeItem('recentlyViewed');
  };

  return (
    <ViewedContext.Provider value={{ viewedItems, addViewedItem, clearViewed }}>
      {children}
    </ViewedContext.Provider>
  );
};

export const useViewed = () => useContext(ViewedContext);
