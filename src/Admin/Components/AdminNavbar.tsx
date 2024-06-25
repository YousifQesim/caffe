import { useState } from 'react';
import { useOrder } from "../../context/OrderContext";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
export default function AdminNavbar() {
  const { setView,fetchOrders } = useOrder();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Toggle Button for Small Screens */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="sm:hidden flex justify-center items-center mt-8 font-dancing text-xl text-white fixed -top-5 right-4 bg-main rounded-lg p-2"
      >
        {isDropdownOpen?<IoCloseSharp  className='text-white text-3xl'/>: <IoMdMenu className='text-white text-3xl'/>}
    
     
      </button>

      {/* Navbar Items for Small Screens - Dropdown */}
      {isDropdownOpen && (
        <div className="flex flex-col items-center gap-4 mt-4 sm:hidden bg-main p-4 rounded-lg">
          <button onClick={() => {
            setIsDropdownOpen(false);
            setView("addItems");
          }} className="text-white">
            Add Category/Items
          </button>
          <button onClick={() => {
            setIsDropdownOpen(false);
            setView("viewOrders");
          }} className="text-white">
            View Orders
          </button>
          <button onClick={() => {
            setIsDropdownOpen(false);
            setView("editCategory");
          }} className="text-white">
            Edit/Remove Category
          </button>
          <button onClick={() => {
            setIsDropdownOpen(false);
            setView("editItems");
          }} className="text-white">
            Edit/remove Items
          </button>
        </div>
      )}

      {/* Navbar Items for Larger Screens */}
      <div className="hidden sm:flex justify-center items-center gap-12 mt-8 font-dancing text-xl text-white">
        <button onClick={() => setView("addItems")} className="text-white">
          Add Category/Items
        </button>
        <button onClick={() => {setView("viewOrders")}} className="text-white">
          View Orders
        </button>
        <button onClick={() => setView("editCategory")} className="text-white">
          Edit/Remove Category
        </button>
        <button onClick={() => setView("editItems")} className="text-white">
          Edit/remove Items
        </button>
      </div>
    </nav>
  );
}
