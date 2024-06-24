import { useOrder } from '../context/OrderContext'; 
import { FaShoppingCart } from 'react-icons/fa'; 
import { useEffect } from 'react';
import Categories from '../components/categories/categories';
import Items from '../components/items/Items'
import Modal from '../components/modal/Modal';
export default function Menu() {


    
  const { 
    selectedCategory,
    selectedItems,  
     
    setIsModalOpen,
    isModalOpen,
  
    fetchOrders,
   
  } = useOrder();
  useEffect(() => {
    fetchOrders();
  }, []);



const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
};


const totalItems = selectedItems.reduce((sum, selectedItem) => sum + selectedItem.quantity, 0);




  return (
    <div className="min-h-screen p-4 relative w-full">

      <h1 className="text-2xl font-bold mb-4 text-white text-center my-4">Menu</h1>
        <div className='mt-24'>
      <img
        className="absolute top-5 left-0"
        src="/src/assets/Haus.png"
        alt="Haus caffe"
        height={100}
        width={120}
      />
      <div className="flex justify-center flex-wrap gap-4 mb-4">
        {Categories()}
      </div>
      <div>
        {selectedCategory && <Items categoryId={selectedCategory} />}
      </div>
      <button 
        onClick={toggleModal} 
        className="absolute top-4 right-4 p-3 bg-main text-white rounded-full shadow-lg hover:bg-main-dark transition duration-300"
      >
        <FaShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {totalItems}
          </span>
        )}
      </button>

        <Modal />
      </div>

    </div>
  );
}
