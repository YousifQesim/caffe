import React, { createContext, useContext, useState } from "react";
import Category from "../interfaces/CategoryProps";
import Item from "../interfaces/ItemProps";
import SelectedItem from "../interfaces/SelectedItems";
import Order from "../interfaces/OrderProps";
import api from "../utilities/getServer";
type OrderContextType = {
  page: "welcome" | "tableSelection" | "menu";
  setPage: React.Dispatch<
    React.SetStateAction<"welcome" | "tableSelection" | "menu">
  >;
  view: "addItems" | "viewOrders" | "editCategory" | "editItems";
  setView: React.Dispatch<
    React.SetStateAction<
      "addItems" | "viewOrders" | "editCategory" | "editItems"
    >
  >;
  tableNumber: number | null;
  setTableNumber: React.Dispatch<React.SetStateAction<number | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  items: Item[];
  selectedItems: SelectedItem[];
  fetchCategories: () => void;
  fetchItems: (categoryId: number) => void;
  addItem: (item: Item) => void;
  changeQuantity: (itemId: number, newQuantity: number) => void;
  removeItem: (itemId: number) => void;
  clearSelectedItems: () => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  fetchOrders: () => void;
  selectedCategory: number | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  handleCategoryClick: (categoryId: number) => number | null;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [page, setPage] = useState<"welcome" | "tableSelection" | "menu">(
    "welcome"
  );
  const [view, setView] = useState<
    "addItems" | "viewOrders" | "editCategory" | "editItems"
  >("addItems");
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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

  const fetchItems = (categoryId: number) => {
    api(`/items/${categoryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => setItems(data));
        console.log(items);
  };

  const addItem = (item: Item) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.item.id === item.id
    );

    if (existingItem) {
      const updatedItems = selectedItems.map((selectedItem) =>
        selectedItem.item.id === item.id
          ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
          : selectedItem
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { item, quantity: 1 }]);
    }
  };

  const changeQuantity = (itemId: number, newQuantity: number) => {
    const updatedItems = selectedItems.map((selectedItem) =>
      selectedItem.item.id === itemId
        ? { ...selectedItem, quantity: newQuantity }
        : selectedItem
    );
    setSelectedItems(updatedItems);
  };

  const removeItem = (itemId: number) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem.item.id !== itemId
    );
    setSelectedItems(updatedItems);
  };

  const clearSelectedItems = () => {
    setSelectedItems([]);
  };
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
  const handleCategoryClick = (categoryId: number) => {
    categories?.find((category) => category.id === categoryId);
    return categoryId;
  };

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

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
