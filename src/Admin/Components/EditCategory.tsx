import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOrder } from "../../context/OrderContext";
import Order from "../../interfaces/OrderProps";
import useFetch from "../../hooks/useFetch";
import api from "../../utilities/getServer";

const EditCategory: React.FC = () => {
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [, setOrders] = useState<Order[]>([]);

  const { fetchCategories, categories, view } = useOrder();

  useEffect(() => {
    fetchCategories();
  
  }, []);

 

  const handleUpdateCategory = (
    event: React.FormEvent<HTMLFormElement>,
    categoryId: number
  ) => {
    event.preventDefault();

    if (updateCategoryName !== "") {
api(`/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updateCategoryName }),
      })
        .then(response => response.json())
        .then(() => {
          setUpdateCategoryName("");
          fetchCategories();
        })
        .catch(error => console.error("Error updating category:", error));
    } else {
      console.error("Please enter a category name");
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    api(`/categories/${categoryId}`, {
        method: "DELETE",
      })
        .then(() => fetchCategories())
        .catch(error => console.error("Error deleting category:", error)
    )
  };

  return (
    <div>
      {view === "editCategory" && (
        <div className="w-full  flex justify-center h-screen items-center ">
          <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3 shadow-lg">
            <h2 className="font-bold text-center text-white text-2xl mt-4">
              Update/Delete Category
            </h2>
            {categories.map((category: any) => (
              <form
                key={category.id}
                onSubmit={(e) => handleUpdateCategory(e, category.id)}
                className="flex flex-col p-4 mb-4"
              >
                <input
                  type="text"
                  placeholder="Category Name"
                  defaultValue={category.name}
                  onChange={(e) => setUpdateCategoryName(e.target.value)}
                  className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
                />
                <div className="flex justify-between mt-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
