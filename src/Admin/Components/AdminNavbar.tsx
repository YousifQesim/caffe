import { useOrder } from "../../context/OrderContext";

export default function AdminNavbar() {
  const { setView } = useOrder();
  return (
    <nav className="flex justify-center items-center gap-12 mt-8 font-dancing text-xl text-white">
      <button onClick={() => setView("addItems")} className="text-white">
        Add Category/Items
      </button>
      <button onClick={() => setView("viewOrders")} className="text-white">
        View Orders
      </button>
      <button onClick={() => setView("editCategory")} className="text-white">
        Edit/Remove Category
      </button>
      <button onClick={() => setView("editItems")} className="text-white">
        Edit/remove Items
      </button>
    </nav>
  );
}
