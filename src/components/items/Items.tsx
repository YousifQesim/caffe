import { useOrder } from "../../context/OrderContext";
import useFetch from "../../hooks/useFetch";
import item from "../../interfaces/ItemProps";

export default function Items({ categoryId }: { categoryId: number }) {
  const { addItem } = useOrder();

  const { data: items = [], isLoading } = useFetch<item[]>(
    `/items/${categoryId}`
  );
  const renderitemCards = () => {
    return isLoading ? (
      <p>loadiing........</p>
    ) : (
      items!.map((item) => (
        <div
          key={item.id}
          className="p-4 rounded-lg hover:shadow-lg bg-item_back transition duration-300"
        >
          <img
            src={`http://localhost:3000/uploads/${item.image_url}`}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <div className="bg-item_back mb-0 flex justify-center items-center gap-6 mt-2">
            <p className="text-lg font-semibold">
              {item.name} | {item.price} IQD
            </p>
            <button
              onClick={() => addItem(item)}
              className="px-6 w-24 py-2 bg-thmain text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Add
            </button>
          </div>
        </div>
      ))
    );
  };

  return (
    <div className="min-h-screen p-4  ">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
      {renderitemCards()}
    </div>
    </div>
  );
}
