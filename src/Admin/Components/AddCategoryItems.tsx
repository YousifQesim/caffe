import { useMemo } from "react";
import { useOrder } from "../../context/OrderContext";
import api from "../../utilities/getServer";
import { useFormik } from "formik";
import { categorySchema, itemSchema } from "../../validation/ValidationSchemas";

export default function AddCategoryItems() {
  const { categories, setCategories, view } = useOrder();

  const formikCategory = useFormik({
    initialValues: { newCategoryName: "" },
    validationSchema: categorySchema,
    onSubmit: (values, { resetForm }) => {
      api(`/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: values.newCategoryName }),
      })
        .then((response) => response.json())
        .then((data) => {
          resetForm();
          setCategories((prevCategories) => [...prevCategories, data]);
        })
        .catch((error) => console.error("Error adding category:", error));
    },
  });

  const formikItem = useFormik({
    initialValues: {
      newItemName: "",
      newItemPrice: 0,
      selectedItemImage: null,
      selectedCategory: "",
    },
    validationSchema: itemSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.newItemName);
      formData.append("price", values.newItemPrice.toString());
      formData.append("image", values.selectedItemImage || "");

      api(`/items/${values.selectedCategory}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          resetForm();
        })
        .catch((error) => console.error("Error adding item:", error));
    },
  });

  const MapThroughCategories = useMemo(
    () =>
      categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      )),
    [categories]
  );

  function setSelectedItemImage(arg0: File | null): any {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 flex-wrap w-full">
      {view === "addItems" && (
        <div className="flex justify-center items-center gap-8 flex-wrap min-h-screen w-full">
          <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3 shadow-lg">
            <h2 className="font-bold text-center text-white text-2xl mt-4">
              Add Category
            </h2>
            <form
              onSubmit={formikCategory.handleSubmit}
              className="w-full flex flex-col p-4"
            >
              <input
                type="text"
                name="newCategoryName"
                placeholder="New Category Name"
                value={formikCategory.values.newCategoryName}
                onChange={formikCategory.handleChange}
                onBlur={formikCategory.handleBlur}
                className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
              />
              {formikCategory.touched.newCategoryName &&
                formikCategory.errors.newCategoryName && (
                  <div className="text-red-500 text-sm">
                    {formikCategory.errors.newCategoryName}
                  </div>
                )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-main text-white font-bold py-4 w-48 mt-4 rounded-xl"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>

          <div className="bg-category_back rounded-xl flex flex-col w-full md:w-1/3 shadow-lg">
            <h2 className="font-bold text-center text-white text-2xl mt-4">
              Add Item
            </h2>
            <form
              onSubmit={formikItem.handleSubmit}
              className="flex flex-col p-4"
            >
              <select
                name="selectedCategory"
                value={formikItem.values.selectedCategory}
                onChange={formikItem.handleChange}
                onBlur={formikItem.handleBlur}
                className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main text-main"
              >
                <option value="">Select Category</option>
                {MapThroughCategories}
              </select>
              {formikItem.touched.selectedCategory &&
                formikItem.errors.selectedCategory && (
                  <div className="text-red-500 text-sm">
                    {formikItem.errors.selectedCategory}
                  </div>
                )}
              <input
                type="text"
                name="newItemName"
                placeholder="Item Name"
                value={formikItem.values.newItemName}
                onChange={formikItem.handleChange}
                onBlur={formikItem.handleBlur}
                className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
              />
              {formikItem.touched.newItemName &&
                formikItem.errors.newItemName && (
                  <div className="text-red-500 text-sm">
                    {formikItem.errors.newItemName}
                  </div>
                )}
              <input
                type="number"
                name="newItemPrice"
                placeholder="Item Price"
                value={formikItem.values.newItemPrice}
                onChange={formikItem.handleChange}
                onBlur={formikItem.handleBlur}
                className="border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-main placeholder-main"
              />
              {formikItem.touched.newItemPrice &&
                formikItem.errors.newItemPrice && (
                  <div className="text-red-500 text-sm">
                    {formikItem.errors.newItemPrice}
                  </div>
                )}
              <div className="file-input mt-2">
                <input
                  type="file"
                  name="selectedItemImage"
                  id="file-input"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      formikItem.setFieldValue("selectedItemImage", file);
                    }
                  }}
                  className="file-input__input"
                />
                <label
                  className="file-input__label bg-main"
                  htmlFor="file-input"
                >
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
                <button
                  type="submit"
                  className="bg-main text-white font-bold py-4 w-48 mt-4 rounded-xl"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
