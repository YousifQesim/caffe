import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOrder } from "../context/OrderContext";

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
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedItemImage, setSelectedItemImage] = useState<File | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const { fetchCategories, categories } = useOrder();

  const [view, setView] = useState<"addItems" | "viewOrders">("addItems");

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

  const handleAddCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newCategoryName !== "") {
      axios
        .post("http://localhost:3000/api/categories", { name: newCategoryName })
        .then(() => {
          setNewCategoryName("");
          fetchCategories();
        })
        .catch((error) => console.error("Error adding category:", error));
    } else {
      console.error("Please enter a category name");
    }
  };

  const handleAddItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedCategoryId === null) {
      console.error("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("name", newItemName);
    formData.append("price", newItemPrice.toString());
    formData.append("image", selectedItemImage as Blob);

    axios
      .post(`http://localhost:3000/api/items/${selectedCategoryId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setNewItemName("");
        setNewItemPrice(0);
        setSelectedItemImage(null);
        fetchCategories();
      })
      .catch((error) => console.error("Error adding item:", error));
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
        <button onClick={() => setView("viewOrders") } className="text-white">View Orders</button>
      </nav>

      {view === "addItems" && (
  <div className="flex justify-center items-center gap-8 flex-wrap min-h-screen w-full ">
    <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3  shadow-lg">
      <h2 className="font-bold text-center text-white text-2xl mt-4">Add Category</h2>
      <form onSubmit={handleAddCategory} className="w-full flex flex-col p-4">
        <input
          type="text"
          required
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border rounded-md px-3 py-2 mt-2 focus:outline-none  focus:border-main placeholder-main"
        />
        <div className="flex justify-center">

        <button type="submit" className="bg-main text-white font-bold py-4 w-48 mt-4 rounded-xl">
          Add Category
        </button>
        </ div>
      </form>
    </div>

    <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3  shadow-lg">
      <h2 className="font-bold text-center text-white text-2xl mt-4">Add Item</h2>
      <form onSubmit={handleAddItem} className="flex flex-col p-4">
        <select
        required
          onChange={(e) => setSelectedCategoryId(parseInt(e.target.value))}
          className="border rounded-md px-3 py-2 mt-2 focus:outline-none  focus:border-main text-main"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
          className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main text-main"
        />
        <div className="file-input mt-2 ">
      <input
        type="file"
        name="file-input"
        id="file-input"
        accept="image/*"
        onChange={(e) =>
          setSelectedItemImage(e.target.files && e.target.files[0])
        }
        className="file-input__input "
      />
      <label className="file-input__label bg-main" htmlFor="file-input">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="upload"
          className="svg-inline--fa fa-upload fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
          ></path>
        </svg>
        <span>Upload file</span></label
      >
    </div>
       
        <button type="submit" className="bg-main text-white font-bold py-2 px-4 mt-4 rounded">
          Add Item
        </button>
      </form>
    </div>
  </div>
)}


{view === "viewOrders" && (
  <div className="mt-16 ">
  <div className="overflow-x-auto flex justify-center">
    <table className="container md:w-3/4 table-auto border-collapse  ">
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
            className={`${
              order.accepted ? "bg-green-300" : "bg-red-300"
            } `}
          >
            <td className="border px-4 py-2">{order.tableNumber}</td>
            <td className="border px-4 py-2">
            {order.items.map((item:string)=><p key={item}>{item}</p>)}    
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
