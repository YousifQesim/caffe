import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

type Category = {
    id: number;
    name: string;
};

type Item = {
    id: number;
    category_id: number;
    name: string;
    price: number;
    image_url: string;
};

type SelectedItem = {
    item: Item;
    quantity: number;
};

type OrderContextType = {
    page: 'welcome' | 'tableSelection' | 'menu';
    setPage: React.Dispatch<React.SetStateAction<'welcome' | 'menu'>>;
    tableNumber: number | null;
    setTableNumber: React.Dispatch<React.SetStateAction<number | null>>;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    categories: Category[];
    items: Item[];
    selectedItems: SelectedItem[];
    fetchCategories: () => void;
    fetchItems: (categoryId: number) => void;
    addItem: (item: Item) => void;
    changeQuantity: (itemId: number, newQuantity: number) => void;
    removeItem: (itemId: number) => void;
    clearSelectedItems: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [page, setPage] = useState<'welcome'| 'menu'>('welcome');
    const [tableNumber, setTableNumber] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

    const fetchCategories = () => {
        axios.get('http://localhost:3000/api/categories')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Error fetching categories: Response data is not an array');
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

    const fetchItems = (categoryId: number) => {
        axios.get(`http://localhost:3000/api/items/${categoryId}`)
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching items:', error));
    };

    const addItem = (item: Item) => {
        const existingItem = selectedItems.find(selectedItem => selectedItem.item.id === item.id);

        if (existingItem) {
            const updatedItems = selectedItems.map(selectedItem =>
                selectedItem.item.id === item.id ? { ...selectedItem, quantity: selectedItem.quantity + 1 } : selectedItem
            );
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([...selectedItems, { item, quantity: 1 }]);
        }
    };

    const changeQuantity = (itemId: number, newQuantity: number) => {
        const updatedItems = selectedItems.map(selectedItem =>
            selectedItem.item.id === itemId ? { ...selectedItem, quantity: newQuantity } : selectedItem
        );
        setSelectedItems(updatedItems);
    };

    const removeItem = (itemId: number) => {
        const updatedItems = selectedItems.filter(selectedItem => selectedItem.item.id !== itemId);
        setSelectedItems(updatedItems);
    };

    const clearSelectedItems = () => {
        setSelectedItems([]);
    };

    return (
        <OrderContext.Provider value={{ page, setPage, tableNumber, setTableNumber, isModalOpen, setIsModalOpen, categories, items, selectedItems, fetchCategories, fetchItems, addItem, changeQuantity, removeItem, clearSelectedItems }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};
