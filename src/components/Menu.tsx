
import { useOrder } from '../context/OrderContext'; 
import { FaShoppingCart,FaTimes } from 'react-icons/fa'; 
import Modal from 'react-modal'; 
import axios from 'axios';
export default function Menu() {
  const { categories, items, selectedItems,  addItem, changeQuantity, removeItem,fetchItems ,setIsModalOpen,isModalOpen,tableNumber,clearSelectedItems} = useOrder();
 console.log(items.length);
  const handleCategoryClick = (categoryId: number) => {
    fetchItems(categoryId); // Ensure fetchItems is called when selecting a category
  };
const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};

const totalItems = selectedItems.reduce((sum, selectedItem) => sum + selectedItem.quantity, 0);
const handleSubmitOrder = () => {
    if (tableNumber === null || selectedItems.length === 0) return;
  
    axios.post('http://localhost:3000/api/orders', {
        tableNumber,
        items: selectedItems.map(selectedItem => ({ id: selectedItem.item.id, quantity: selectedItem.quantity }))
    }).then(response => {
        console.log('Order submitted:', response.data);
        clearSelectedItems(); // Clear selected items after successful submission
        setIsModalOpen(false); // Close the modal after submitting the order
    }).catch(error => console.error('Error submitting order:', error));
  };
  

  return (
    <div>
        <div className="p-4 relative w-full h-screen ">
                <h1 className="text-2xl font-bold mb-4 text-white text-center my-4">Menu</h1>
                <img
        className=" absolute top-5 left-0"
          src="/src/assets/Haus.png"
          alt="Haus caffe"
          height={100}
          width={120}
        />
                <div className="flex  justify-center flex-wrap gap-8 space-x-4 mb-4">
                    {categories.map(category => (
                        <button key={category.id} onClick={() => handleCategoryClick(category.id)} className="px-6 py-4 w-32 h-24 bg-category_back rounded-xl text-white transition duration-300">
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(item => (
                        <div key={item.id} className="border p-4 rounded-lg hover:shadow-lg bg-item_back transition duration-300">
                            <img src={`http://localhost:3000/uploads/${item.image_url}`} alt={item.name} className="w-full h-48 object-cover" />
                            <div className='bg-item_back mb-0 flex justify-center items-center gap-6 mt-2'>
                                
                            <p className="text-lg font-semibold">{item.name} | {item.price} IQD</p>
                            <button onClick={() => addItem(item)} className=" px-6 w-24 py-2 bg-thmain text-white rounded-lg hover:bg-green-700 transition duration-300">Add</button>
                            </div>
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
<Modal 
    isOpen={isModalOpen} 
    onRequestClose={toggleModal} 
    contentLabel="Selected Items" 
    className="modal border" 
    overlayClassName="modal-overlay"
>
    <div className="p-16 bg-main text-white absolute top-1/3 right-1/3 rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Selected Items</h2>
        <button onClick={toggleModal} className='absolute top-2 right-2'>
            <FaTimes size={24} />
        </button>
        {selectedItems.length === 0 ? (
            <p>No items selected.</p>
        ) : (
            selectedItems.map((selectedItem, index) => (
                <table className="min-w-full table-fixed">
                    <tbody className="divide-y w-full">
                        <tr key={index}>
                            <td className="py-4 text-left max-w-36 whitespace-nowrap text-sm font-medium text-gray-900">
                                {selectedItem.item.name} - {selectedItem.item.price} IQD
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center text-sm text-gray-500">
                                <input
                                    type="number"
                                    value={selectedItem.quantity}
                                    onChange={(e) => changeQuantity(selectedItem.item.id, parseInt(e.target.value))}
                                    className="w-16 p-2 text-cat border rounded-lg"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => removeItem(selectedItem.item.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))
        )}
        {selectedItems.length > 0 && (
            <div className='flex justify-center mt-4'>
                <button onClick={handleSubmitOrder} className="px-4 py-2 bg-category_back text-white rounded-lg transition duration-300">Submit Order</button>
            </div>
        )}
    </div>
</Modal>

            </div>
    </div>
  )
}
