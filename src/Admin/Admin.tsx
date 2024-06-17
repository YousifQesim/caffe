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
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedItemImage, setSelectedItemImage] = useState<File | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  
  const { fetchCategories, categories, fetchItems, items } = useOrder();

  const [view, setView] = useState<"addItems" | "viewOrders">("addItems");
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
        fetchItems(selectedCategoryId);
      })
      .catch((error) => console.error("Error adding item:", error));
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
      </nav>

      {view === "addItems" && (
        <div className="flex justify-center items-center gap-8 flex-wrap min-h-screen w-full">
          <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3 shadow-lg">
            <h2 className="font-bold text-center text-white text-2xl mt-4">Add Category</h2>
            <form onSubmit={handleAddCategory} className="w-full flex flex-col p-4">
              <input
                type="text"
                required
                placeholder="New Category Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
              />
              <div className="flex justify-center">
                <button type="submit" className="bg-main text-white font-bold py-4 w-48 mt-4 rounded-xl">
                  Add Category
                </button>
              </div>
            </form>
          </div>

          <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3 shadow-lg">
            <h2 className="font-bold text-center text-white text-2xl mt-4">Update/Delete Category</h2>
            {categories.map((category) => (
              <form key={category.id} onSubmit={(e) => handleUpdateCategory(e, category.id)} className="flex flex-col p-4 mb-4">
                <input
                  type="text"
                  placeholder="Category Name"
                  defaultValue={category.name}
                  onChange={(e) => setUpdateCategoryName(e.target.value)}
                  className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
                />
                <div className="flex justify-between mt-2">
                  <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Update
                  </button>
                  <button type="button" onClick={() => handleDeleteCategory(category.id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </div>
              </form>
            ))}
          </div>

          <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3 shadow-lg">
            <h2 className="font-bold text-center text-white text-2xl mt-4">Add Item</h2>
            <form onSubmit={handleAddItem} className="flex flex-col p-4">
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
                  <div className="file-input mt-2">
            <input
              type="file"
              name="file-input"
              id="file-input"
              accept="image/*"
              onChange={(e) => setSelectedItemImage(e.target.files && e.target.files[0])}
              className="file-input__input"
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
              <span>Upload file</span>
            </label>
          </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-main text-white font-bold py-4 w-48 mt-4 rounded-xl">
                  Add Item
                </button>
              </div>
            </form>
          </div>

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
        </div>
      )}

      {view === "viewOrders" && (
        <div className="flex flex-col items-center min-h-screen w-full">
          <h2 className="font-bold text-center text-white text-2xl mt-4">Orders</h2>
          <div className="w-full flex flex-wrap justify-center mt-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3 m-2 p-4 shadow-lg">
                <h3 className="font-bold text-white text-xl">Table {order.tableNumber}</h3>
                <p className="text-white">Total Price: ${order.totalPrice.toFixed(2)}</p>
                <p className="text-white">Accepted: {order.accepted ? "Yes" : "No"}</p>
                <table className="w-full mt-2">
                  <thead>
                    <tr>
                      <th className="text-white">Item</th>
                      <th className="text-white">Quantity</th>
                      <th className="text-white">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="text-white">{item.name}</td>
                        <td className="text-white">{item.quantity}</td>
                        <td className="text-white">${item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-4">
                  {!order.accepted && (
                    <button onClick={() => handleAcceptOrder(order.id)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                      Accept Order
                    </button>
                  )}
                  <button onClick={() => handleRemoveOrder(order.id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                    Remove Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
