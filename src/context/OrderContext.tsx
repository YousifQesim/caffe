import React, { createContext, useCallback, useContext, useState } from "react";
import Category from "../interfaces/CategoryProps";
import Item from "../interfaces/ItemProps";
import SelectedItem from "../interfaces/SelectedItems";
import Order from "../interfaces/OrderProps";
import api from "../utilities/getServer";

// Define the type for OrderContext
type OrderContextType = {
  // State variables related to page and view management
  page: "welcome" | "tableSelection" | "menu";
  setPage: React.Dispatch<React.SetStateAction<"welcome" | "tableSelection" | "menu">>;
  view: "addItems" | "viewOrders" | "editCategory" | "editItems";
  setView: React.Dispatch<React.SetStateAction<"addItems" | "viewOrders" | "editCategory" | "editItems">>;
  // State variables related to table number and modal
  tableNumber: number | null;
  setTableNumber: React.Dispatch<React.SetStateAction<number | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // State variables related to categories and items
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  items: Item[];
  selectedItems: SelectedItem[];
  // Functions for fetching data
  fetchCategories: () => void;
  fetchItems: (categoryId: number) => void;
  fetchOrders: () => void;
  // Functions for managing selected items
  addItem: (item: Item) => void;
  changeQuantity: (itemId: number, newQuantity: number) => void;
  removeItem: (itemId: number) => void;
  clearSelectedItems: () => void;
  // State variables related to orders
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  // State variable for selected category
  selectedCategory: number | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  // Function for handling category click
  handleCategoryClick: (categoryId: number) => number | null;
};

// Create the context with initial undefined value
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// OrderProvider component to wrap the application with context provider
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State variables using useState
  const [page, setPage] = useState<"welcome" | "tableSelection" | "menu">("welcome");
  const [view, setView] = useState<"addItems" | "viewOrders" | "editCategory" | "editItems">("addItems");
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Function to fetch categories from the server
  const fetchCategories = () => {
    api(`/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data));
  };

  // Function to fetch items for a specific category from the server
  const fetchItems = (categoryId: number) => {
    api(`/items/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setItems(data));
  };

  // Function to clear selected items
  const clearSelectedItems = () => {
    setSelectedItems([]);
  };

  // Function to fetch orders from the server
  const fetchOrders = () => {
    api(`/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data));
  };

  // Function to add an item to selectedItems or increment its quantity if already present
  const addItem = useCallback((item: Item) => {
    setSelectedItems(prevItems => {
      const existingItem = prevItems.find(selectedItem => selectedItem.item.id === item.id);
      if (existingItem) {
        return prevItems.map(selectedItem =>
          selectedItem.item.id === item.id
            ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
            : selectedItem
        );
      } else {
        return [...prevItems, { item, quantity: 1 }];
      }
    });
  }, []);

  // Function to change the quantity of a selected item
  const changeQuantity = useCallback((itemId: number, newQuantity: number) => {
    setSelectedItems(prevItems =>
      prevItems.map(selectedItem =>
        selectedItem.item.id === itemId ? { ...selectedItem, quantity: newQuantity } : selectedItem
      )
    );
  }, []);

  // Function to remove an item from selectedItems
  const removeItem = useCallback((itemId: number) => {
    setSelectedItems(prevItems => prevItems.filter(selectedItem => selectedItem.item.id !== itemId));
  }, []);

  // Function to handle a category click and return the categoryId
  const handleCategoryClick = useCallback((categoryId: number) => {
    categories?.find((category) => category.id === categoryId);
    return categoryId;
  }, []);

  // Provide the context value to consumers
  return (
    <OrderContext.Provider
      value={{
        handleCategoryClick,
        setCategories,
        page,
        setPage,
        view,
        setView,
        orders,
        setOrders,
        tableNumber,
        setTableNumber,
        isModalOpen,
        setIsModalOpen,
        categories,
        items,
        selectedItems,
        fetchCategories,
        fetchItems,
        addItem,
        changeQuantity,
        removeItem,
        clearSelectedItems,
        fetchOrders,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to consume the OrderContext within functional components
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
