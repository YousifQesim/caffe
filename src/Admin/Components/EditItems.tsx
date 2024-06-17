import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOrder } from "../context/OrderContext";
import AddCategoryItems from "./Components/AddCategoryItems";
import EditCategory from "./Components/EditCategory";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  tableNumber: number;
  items: OrderItem[];
  totalPrice: number;
  accepted: boolean;
}

const Admin: React.FC = () => {
 
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  
  const { fetchCategories, categories, fetchItems, items,view,setView} = useOrder();

 
  const [editItemId, setEditItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:3000/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

 

  const handleUpdateCategory = (event: React.FormEvent<HTMLFormElement>, categoryId: number) => {
    event.preventDefault();

    if (updateCategoryName !== "") {
      axios
        .put(`http://localhost:3000/api/categories/${categoryId}`, { name: updateCategoryName })
        .then(() => {
          setUpdateCategoryName("");
          fetchCategories();
        })
        .catch((error) => console.error("Error updating category:", error));
    } else {
      console.error("Please enter a category name");
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    axios
      .delete(`http://localhost:3000/api/categories/${categoryId}`)
      .then(() => fetchCategories())
      .catch((error) => console.error("Error deleting category:", error));
  };

 

  const handleEditItem = (event: React.FormEvent<HTMLFormElement>, itemId: number) => {
    event.preventDefault();

    if (editItemId === null) {
      console.error("No item selected for editing");
      return;
    }

    axios
      .put(`http://localhost:3000/api/items/${editItemId}`, { name: newItemName, price: newItemPrice })
      .then(() => {
        setNewItemName("");
        setNewItemPrice(0);
        setEditItemId(null);
        fetchItems(selectedCategoryId as number);
      })
      .catch((error) => console.error("Error editing item:", error));
  };

  const handleRemoveItem = (itemId: number) => {
    axios
      .delete(`http://localhost:3000/api/items/${itemId}`)
      .then(() => fetchItems(selectedCategoryId as number))
      .catch((error) => console.error("Error removing item:", error));
  };

  const handleAcceptOrder = (orderId: number) => {
    axios
      .put(`http://localhost:3000/api/orders/${orderId}/accept`)
      .then(() => fetchOrders())
      .catch((error) => console.error("Error accepting order:", error));
  };

  const handleRemoveOrder = (orderId: number) => {
    axios
      .delete(`http://localhost:3000/api/orders/${orderId}`)
      .then(() => fetchOrders())
      .catch((error) => console.error("Error removing order:", error));
  };

  return (
    <div className="min-h-screen my-4">
      <h1 className="font-roboto font-bold text-center text-white text-2xl mt-4">Admin Page</h1>
      <nav className="flex justify-center items-center gap-12 mt-8 font-dancing text-xl text-white">
        <button onClick={() => setView("addItems")} className="text-white">Add Category/Items</button>
        <button onClick={() => setView("viewOrders")} className="text-white">View Orders</button>
        <button onClick={() => setView("editCategory")} className="text-white">Edit/Remove Category</button>
        <button onClick={() => setView("editItems")} className="text-white">Edit/remove Items</button>
      </nav>
      <div>
        <AddCategoryItems/>
      </div>
      
   <div>

     <EditCategory/>
   </div>
   
      {view === "editItems" && (
     <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3 shadow-lg">
     <h2 className="font-bold text-center text-white text-2xl mt-4">Edit Item</h2>
     <select
       required
       onChange={(e) => {
         const categoryId = parseInt(e.target.value);
         setSelectedCategoryId(categoryId);
         fetchItems(categoryId);
       }}
       className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main text-main"
     >
       <option value="">Select Category</option>
       {categories.map((category) => (
         <option key={category.id} value={category.id}>
           {category.name}
         </option>
       ))}
     </select>

     {selectedCategoryId !== null && (
       <div className="p-4">
         {items.length > 0 ? (
           <table className="w-full mt-4">
             <thead>
               <tr>
                 <th className="text-white">Name</th>
                 <th className="text-white">Price</th>
                 <th className="text-white">Actions</th>
               </tr>
             </thead>
             <tbody>
               {items.map((item) => (
                 <tr key={item.id}>
                   <td className="text-white">{item.name}</td>
                   <td className="text-white">{item.price}</td>
                   <td className="text-white flex justify-between">
                     <button
                       onClick={() => {
                         setEditItemId(item.id);
                         setNewItemName(item.name);
                         setNewItemPrice(item.price);
                       }}
                       className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                     >
                       Edit
                     </button>
                     <button
                       onClick={() => handleRemoveItem(item.id)}
                       className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                     >
                       Remove
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         ) : (
           <p className="text-white mt-4">No items found for this category</p>
         )}

         {editItemId !== null && (
           <form onSubmit={(e) => handleEditItem(e, editItemId)} className="mt-4">
             <input
               type="text"
               placeholder="Item Name"
               value={newItemName}
               onChange={(e) => setNewItemName(e.target.value)}
               className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
             />
             <input
               type="number"
               placeholder="Item Price"
               value={newItemPrice}
               onChange={(e) => setNewItemPrice(parseFloat(e.target.value))}
               className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
             />
             <div className="flex justify-center">
               <button type="submit" className="bg-main text-white font-bold py-4 w-48 mt-4 rounded-xl">
                 Update Item
               </button>
             </div>
           </form>
         )}
       </div>
     )}
   </div>
          )}

{view === "viewOrders" && (
    <div className="mt-16">
      <div className="overflow-x-auto flex justify-center">
        <table className="container md:w-3/4 table-auto border-collapse">
          <thead>
            <tr className="bg-thmain text-white">
              <th className="px-4 py-2">Table Number</th>
              <th className="px-4 py-2">Ordered Items</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr
                key={order.id}
                className={`${order.accepted ? "bg-green-300" : "bg-red-300"} `}
              >
                <td className="border px-4 py-2">{order.tableNumber}</td>
                <td className="border px-4 py-2">
                  {order.items.map((item: OrderItem) => (
                    <p key={item.id}>
                      {item.name} x {item.quantity}
                    </p>
                  ))}
                </td>
                <td className="border px-4 py-2">{order.totalPrice} IQD</td>
                <td className="border px-4 py-2">
                  {order.accepted ? "Accepted" : "Pending"}
                </td>
                <td className="border px-4 py-2">
                  {!order.accepted && (
                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Accept
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveOrder(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-2 focus:outline-none focus:shadow-outline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
    </div>
  );
};

export default Admin;
