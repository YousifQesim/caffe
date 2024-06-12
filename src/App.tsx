import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import Modal from 'react-modal'; // Import modal for showing selected items

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

const App: React.FC = () => {
    const [page, setPage] = useState<'welcome' | 'tableSelection' | 'menu'>('welcome');
    const [tableNumber, setTableNumber] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    useEffect(() => {
        if (page === 'menu') {
            axios.get('http://localhost:3000/api/categories')
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setCategories(response.data);
                    } else {
                        console.error('Error fetching categories: Response data is not an array');
                    }
                })
                .catch(error => console.error('Error fetching categories:', error));
        }
    }, [page]);

    const handleCategoryClick = (categoryId: number) => {
        axios.get(`http://localhost:3000/api/items/${categoryId}`)
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching items:', error));
    };

    const handleAddItem = (item: Item) => {
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

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        const updatedItems = selectedItems.map(selectedItem =>
            selectedItem.item.id === itemId ? { ...selectedItem, quantity: newQuantity } : selectedItem
        );
        setSelectedItems(updatedItems);
    };

    const handleRemoveItem = (itemId: number) => {
        const updatedItems = selectedItems.filter(selectedItem => selectedItem.item.id !== itemId);
        setSelectedItems(updatedItems);
    };

    const handleSubmitOrder = () => {
        if (tableNumber === null) return;
        
        axios.post('http://localhost:3000/api/orders', {
            tableNumber,
            items: selectedItems.map(selectedItem => ({ id: selectedItem.item.id, quantity: selectedItem.quantity }))
        }).then(response => {
            console.log('Order submitted:', response.data);
            setSelectedItems([]);
            setIsModalOpen(false); // Close the modal after submitting the order
        }).catch(error => console.error('Error submitting order:', error));
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const totalItems = selectedItems.reduce((sum, selectedItem) => sum + selectedItem.quantity, 0);

    if (page === 'welcome') {
        return (
            <div className="flex items-center justify-center h-screen bg-gray">
                <div className="text-center flex flex-col items-center justify-center">
                    <img src="/src/assets/Haus.png" alt="Haus caffe" height={250} width={250} />
                    <h1 className="text-4xl font-bold mb-6 text-red-600">Welcome To <span className='text-main'> KAFFEE HAUS</span></h1>
                    <button onClick={() => setPage('tableSelection')} className="px-4 py-2 bg-main text-white rounded-lg transition duration-300">Please Tap To Continue</button>
                </div>
            </div>
        );
    }

    if (page === 'tableSelection') {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <select value={tableNumber !== null ? tableNumber.toString() : ""} onChange={e => setTableNumber(Number(e.target.value))} className="bg-main text-white border-none mb-4 p-2 outline-none rounded-lg">
                        <option value="" disabled className='text-main bg-white'>Please Select Your Table Number</option>
                        {Array.from({ length: 20 }, (_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                    <button onClick={() => setPage('menu')} className="px-4 py-2 mx-4 bg-white text-main rounded-lg border-2 border-main font-bold transition duration-300">Next</button>
                </div>
            </div>
        );
    }

    if (page === 'menu') {
        return (
            <div className="p-4 relative w-full h-screen">
                <h1 className="text-2xl font-bold mb-4">Menu</h1>
                <div className="flex space-x-4 mb-4">
                    {categories.map(category => (
                        <button key={category.id} onClick={() => handleCategoryClick(category.id)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300">
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(item => (
                        <div key={item.id} className="border p-4 rounded-lg hover:shadow-lg transition duration-300">
                            <img src={`http://localhost:3000/uploads/${item.image_url}`} alt={item.name} className="w-full h-48 object-cover mb-2" />
                            <p className="text-lg font-semibold">{item.name} - {item.price} IQD</p>
                            <button onClick={() => handleAddItem(item)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300">Add</button>
                        </div>
                    ))}
                </div>
                <button onClick={toggleModal} className="absolute top-4 right-4 p-3 bg-main text-white rounded-full shadow-lg hover:bg-main-dark transition duration-300 ">
                    <FaShoppingCart size={24} />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {totalItems}
                        </span>
                    )}
                </button>

                <Modal isOpen={isModalOpen} onRequestClose={toggleModal} contentLabel="Selected Items" className="modal border border-green-400 " overlayClassName="modal-overlay" >
                    <div className="p-16 bg-main text-white absolute top-1/3 right-1/3 rounded-xl">
                        <h2 className="text-xl font-bold mb-4">Selected Items</h2>
                        {selectedItems.length === 0 ? (
                            <p>No items selected.</p>
                        ) : (
                            selectedItems.map((selectedItem, index) => (
                                <div key={index} className="flex items-center space-x-4 mb-4">
                                    <p className="text-lg">{selectedItem.item.name} - {selectedItem.item.price} IQD</p>
                                    <input type="number" value={selectedItem.quantity} onChange={(e) => handleQuantityChange(selectedItem.item.id, parseInt(e.target.value))} className="w-16 p-2 border rounded-lg" />
                                    <button onClick={() => handleRemoveItem(selectedItem.item.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300">Remove</button>
                                </div>
                            ))
                        )}
                        {selectedItems.length > 0 && (
                            <button onClick={handleSubmitOrder} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">Submit Order</button>
                        )}
                    </div>
                </Modal>
            </div>
        );
    }

    return null;
};

export default App;
