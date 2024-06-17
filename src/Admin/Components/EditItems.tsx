import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOrder } from "../../context/OrderContext";
import Order from "../../interfaces/OrderProps";

const EditItems: React.FC = () => {
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [orders, setOrders] = useState<Order[]>([]);

  const { fetchCategories, categories, fetchItems, items, view } = useOrder();

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

  const handleEditItem = (
    event: React.FormEvent<HTMLFormElement>,
    itemId: number
  ) => {
    event.preventDefault();

    if (editItemId === null) {
      console.error("No item selected for editing");
      return;
    }

    axios
      .put(`http://localhost:3000/api/items/${editItemId}`, {
        name: newItemName,
        price: newItemPrice,
      })
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

  return (
    <div>
      {view === "editItems" && (
        <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3 shadow-lg">
          <h2 className="font-bold text-center text-white text-2xl mt-4">
            Edit Item
          </h2>
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
            {categories.map((category: any) => (
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
                    {items.map((item: any) => (
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
                <p className="text-white mt-4">
                  No items found for this category
                </p>
              )}

              {editItemId !== null && (
                <form
                  onSubmit={(e) => handleEditItem(e, editItemId)}
                  className="mt-4"
                >
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
                    onChange={(e) =>
                      setNewItemPrice(parseFloat(e.target.value))
                    }
                    className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
                  />
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-main text-white font-bold py-4 w-48 mt-4 rounded-xl"
                    >
                      Update Item
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditItems;
