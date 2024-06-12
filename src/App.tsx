import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import Modal from 'react-modal'; // Import modal for showing selected items
import { useOrder } from './context/OrderContext'; // Import context
import axios from 'axios';
import Welcome from './components/Welcome';
const App: React.FC = () => {
  
    const [tableNumber, setTableNumber] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const { page,categories, items, selectedItems, fetchCategories, fetchItems, addItem, changeQuantity, removeItem, clearSelectedItems } = useOrder();

    const handleCategoryClick = (categoryId: number) => {
        fetchItems(categoryId);
    };

    const handleSubmitOrder = () => {
        if (tableNumber === null) return;

        axios.post('http://localhost:3000/api/orders', {
            tableNumber,
            items: selectedItems.map(selectedItem => ({ id: selectedItem.item.id, quantity: selectedItem.quantity }))
        }).then(response => {
            console.log('Order submitted:', response.data);
            clearSelectedItems();
            setIsModalOpen(false); // Close the modal after submitting the order
        }).catch(error => console.error('Error submitting order:', error));
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const totalItems = selectedItems.reduce((sum, selectedItem) => sum + selectedItem.quantity, 0);

    if (page === 'welcome') {
        return (
          <Welcome/>
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
                    <button onClick={() => { setPage('menu'); fetchCategories(); }} className="px-4 py-2 mx-4 bg-white text-main rounded-lg border-2 border-main font-bold transition duration-300">Next</button>
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
                            <button onClick={() => addItem(item)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300">Add</button>
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
                                    <input type="number" value={selectedItem.quantity} onChange={(e) => changeQuantity(selectedItem.item.id, parseInt(e.target.value))} className="w-16 p-2 border rounded-lg" />
                                    <button onClick={() => removeItem(selectedItem.item.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300">Remove</button>
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
