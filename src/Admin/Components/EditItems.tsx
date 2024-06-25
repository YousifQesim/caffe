import React, { useState, useEffect, useCallback } from "react";
import { useOrder } from "../../context/OrderContext";
import api from "../../utilities/getServer";

/**
 * EditItems component allows editing and removing items within selected categories.
 * It fetches categories, items, and orders on mount and provides forms for editing and removing items.
 */
const EditItems: React.FC = React.memo(() => {
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const {
    fetchCategories,
    categories,
    items,
    view,
    fetchOrders,
    fetchItems,
    selectedCategory,
    setSelectedCategory,
  } = useOrder();
  const [editItemId, setEditItemId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch categories and orders on component mount
    fetchCategories();
    fetchOrders();
    // Fetch items for the selected category if selectedCategory is not null
    if (selectedCategory !== null) {
      fetchItems(selectedCategory);
    }
  }, [fetchCategories, fetchOrders, fetchItems, selectedCategory]);

  // Handle edit item form submission
  const handleEditItem = useCallback(
    (event: React.FormEvent<HTMLFormElement>, editItemId: number) => {
      event.preventDefault();

      if (editItemId === null) {
        console.error("No item selected for editing");
        return;
      }

      // API call to update item
      api(`/items/${editItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newItemName, price: newItemPrice }),
      })
        .then((response) => response.json())
        .then(() => {
          // Reset form fields and item id after successful update
          setNewItemName("");
          setNewItemPrice(0);
          setEditItemId(null);
          // Refresh items for the selected category
          fetchItems(selectedCategory!);
        })
        .catch((error) => console.error("Error editing item:", error));
    },
    [fetchItems, selectedCategory, newItemName, newItemPrice]
  );

  // Handle remove item
  const handleRemoveItem = useCallback(
    (itemId: number) => {
      // API call to delete item
      api(`/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => fetchItems(selectedCategory!)) // Refresh items for the selected category after deletion
        .catch((error) => console.error("Error removing item:", error));
    },
    [fetchItems, selectedCategory]
  );

  return (
    <div>
      {view === "editItems" && (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="bg-category_back rounded-xl flex flex-col w-full md:w-2/3 lg:w-1/3 shadow-lg">
            <h2 className="font-bold text-center text-white text-2xl mt-4">
              Edit Item
            </h2>
            {/* Select dropdown for choosing a category */}
            <select
              required
              onChange={(e) => {
                const categoryId = parseInt(e.target.value);
                setSelectedCategory(categoryId);
                fetchItems(categoryId); // Fetch items for the selected category
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

            {/* Render items table if a category is selected */}
            {selectedCategory !== null && (
              <div className="p-4">
                {items.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full mt-4 table-auto">
                      <thead>
                        <tr>
                          <th className="text-white px-2 py-2">Name</th>
                          <th className="text-white px-2 py-2">Price</th>
                          <th className="text-white px-2 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item: any) => (
                          <tr key={item.id}>
                            <td className="border px-2 py-2 text-white">
                              {item.name}
                            </td>
                            <td className="border px-2 py-2 text-white">
                              {item.price}
                            </td>
                            <td className="border px-2 py-2 text-white flex justify-between">
                              {/* Edit and Remove buttons */}
                              <button
                                onClick={() => {
                                  setEditItemId(item.id);
                                  setNewItemName(item.name);
                                  setNewItemPrice(item.price);
                                }}
                                className="bg-blue-500 text-white font-bold py-1 px-3 rounded flex flex-wrap"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="bg-red-500 text-white font-bold py-1 px-3 rounded"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-white mt-4">
                    No items found for this category
                  </p>
                )}

                {/* Edit item form */}
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
                      className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main w-full"
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
                    <div className="flex justify-center mt-4">
                      <button
                        type="submit"
                        className="bg-main text-white font-bold py-2 px-4 rounded"
                      >
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
    </div>
  );
});

export default EditItems;
