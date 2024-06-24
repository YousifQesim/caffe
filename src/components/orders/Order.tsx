import useFetch from "../../hooks/useFetch";
import category from "../../interfaces/CategoryProps";
import SkeletonLoadingCard from "../SkeltonLoading";
import { useOrder } from "../../context/OrderContext";
export default function Menu() {


    
  const { 
    setSelectedCategory,
    handleCategoryClick,

  } = useOrder();



  const { data: categories = [], isLoading } = useFetch<category[]>('/categories');
  
  const renderCategoryCards = () => {
    return isLoading
      ?
     Array.from({ length: 5 }).map((_, index) => (
          <SkeletonLoadingCard key={index} />
        ))
      : categories!
      .map(category => (
        <button 
          key={category.id} 
          onClick={() => {handleCategoryClick(category.id);setSelectedCategory(category.id)}} 
          
          className="px-6 py-4 w-32 h-24 bg-category_back rounded-xl text-white transition duration-300"
        >
          {category.name}
        </button>
      ))
  };
// find selected category






 




  return (
   
    
      <div className="flex justify-center flex-wrap gap-4 mb-4">
        {renderCategoryCards()}
      </div>
      
     
      
  );
}
