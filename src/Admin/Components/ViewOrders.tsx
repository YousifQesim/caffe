import React, {  useEffect } from "react";

import { useOrder } from "../../context/OrderContext";
import Order from "../../components/orders/Order";


const ViewOrders: React.FC = () => {
  const {  view } = useOrder();


  return (
    <div>
      {view === "viewOrders" && (
        <div className="mt-16 overflow-hidden">
          <div className="">
            <table className="table-auto  divide-y divide-gray-200 w-full">
              <thead className="bg-thmain text-white">
                <tr>
                  <th className="px-2 md:px-4 py-2">Table Number</th>
                  <th className="px-2 md:px-4 py-2">Ordered Items</th>
                  <th className="px-2 md:px-4 py-2">Total Price</th>
                  <th className="px-2 md:px-4 py-2">Status</th>
                  <th className="px-2 md:px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <Order />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;