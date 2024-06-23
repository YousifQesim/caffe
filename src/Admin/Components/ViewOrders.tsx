import React, {  useEffect } from "react";
import axios from "axios";
import { useOrder } from "../../context/OrderContext";

import OrderItem from "../../interfaces/OrderItemProps";


const ViewOrders: React.FC = () => {
  

  const { fetchCategories, view,orders,fetchOrders } = useOrder();

  useEffect(() => {
    fetchCategories();
    fetchOrders();
  }, []);
  
  console.log(orders)

  const handleAcceptOrder = (orderId: number) => {
    axios
      .put(`http://localhost:3000/api/orders/${orderId}/accept`)
      .then(() => fetchOrders())
      .catch((error) => console.error("Error accepting order:", error));
  };

  const handleRemoveOrder = (orderId: number) => {
    axios
      .delete(`http://localhost:3000/api/orders/${orderId}`)
      .then(() => fetchOrders())
      .catch((error) => console.error("Error removing order:", error));
  };

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
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`${
                      order.accepted ? "bg-green-300" : "bg-red-300"
                    } `}
                  >
                    <td className="border px-2 md:px-4 py-2">{order.tableNumber}</td>
                    <td className="border px-2 md:px-4 py-2">
                      <div className="flex flex-col">
                        {order.items.map((item: OrderItem) => (
                          <p key={`${order.id}-${item.id}`}>{item.toString()}</p>
                        ))}
                      </div>
                    </td>
                    <td className="border px-2 md:px-4 py-2">{order.totalPrice} IQD</td>
                    <td className="border px-2 md:px-4 py-2">
                      {order.accepted ? "Accepted" : "Pending"}
                    </td>
                    <td className="border px-2 md:px-4 py-2">
                      {!order.accepted && (
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none focus:shadow-outline mr-2 mb-2 md:mr-0 md:mb-0"
                        >
                          Accept
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveOrder(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:shadow-outline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
