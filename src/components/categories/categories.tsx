

import { useOrder } from "../../context/OrderContext";
export default function Categories() {
  const { setSelectedCategory, handleCategoryClick,categories,fetchItems } = useOrder();

  const renderCategoryCards = () => {
    return categories!.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              handleCategoryClick(category.id);
              setSelectedCategory(category.id);
              fetchItems(category.id);
        
            }}
            className="px-6 py-4 w-32 h-24 bg-category_back rounded-xl text-white transition duration-300"
          >
            {category.name}
          </button>
        ));
  };

  return (
    <div className="flex justify-center flex-wrap gap-4 mb-4">
      {renderCategoryCards()}
    </div>
  );
}
