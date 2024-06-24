import React, {  useEffect } from "react";

import { useOrder } from "../../context/OrderContext";
import Order from "../../components/orders/Order";




const ViewOrders: React.FC = () => {
  

  const { fetchCategories, view,fetchOrders } = useOrder();

  useEffect(() => {
    fetchCategories();
    fetchOrders();
  }, []);
  
 

 

  return (
    <div>
      {view === "viewOrders" && (
        <div className="mt-16 overflow-x-auto">
          <div className="w-full">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              <thead className="bg-thmain text-white">
                <tr>
                  <th className="px-2 md:px-4 py-2">Table Number</th>
                  <th className="px-2 md:px-4 py-2">Ordered Items</th>
                  <th className="px-2 md:px-4 py-2">Total Price</th>
                  <th className="px-2 md:px-4 py-2">Status</th>
                  <th className="px-2 md:px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className=" ">
               <Order/>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
