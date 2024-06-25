import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useOrder } from "../../context/OrderContext";
import api from "../../utilities/getServer";

const EditCategory: React.FC = () => {
  const [updateCategoryName, setUpdateCategoryName] = useState("");

  const { fetchCategories, categories, view } = useOrder();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdateCategory = useCallback(
    (event: React.FormEvent<HTMLFormElement>, categoryId: number) => {
      event.preventDefault();

      if (updateCategoryName !== "") {
        api(`/categories/${categoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: updateCategoryName }),
        })
          .then((response) => response.json())
          .then(() => {
            setUpdateCategoryName("");
            fetchCategories();
          })
          .catch((error) => console.error("Error updating category:", error));
      } else {
        console.error("Please enter a category name");
      }
    },
    [updateCategoryName, fetchCategories]
  );

  const handleDeleteCategory = useCallback(
    (categoryId: number) => {
      api(`/categories/${categoryId}`, {
        method: "DELETE",
      })
        .then(() => fetchCategories())
        .catch((error) => console.error("Error deleting category:", error));
    },
    [fetchCategories]
  );

  const MapThroughCategory = useMemo(() => {
    return categories.map((category: any) => (
      <div key={category.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
        <form
          onSubmit={(e) => handleUpdateCategory(e, category.id)}
          className="flex flex-col rounded-md justify-center items-center"
        >
          <input
            type="text"
            placeholder="Category Name"
            defaultValue={category.name}
            onChange={(e) => setUpdateCategoryName(e.target.value)}
            className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
          />
          <div className="flex justify-between mt-2 gap-4">
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
      </div>
    ));
  }, [categories, handleUpdateCategory, handleDeleteCategory]);

  return (
    <div>
      {view === "editCategory" && (
        <div className="w-full flex justify-center items-center mt-12">
          <div className="bg-category_back rounded-xl w-full max-w-6xl shadow-lg">
            <h2 className="font-bold text-center text-white text-2xl mt-4">
              Update/Delete Category
            </h2>
            <div className="flex flex-wrap justify-center">
              {MapThroughCategory}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
