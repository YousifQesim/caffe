import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOrder } from "../../context/OrderContext";

import OrderItem from "../../interfaces/OrderItemProps";
import Order from "../../interfaces/OrderProps";


const ViewOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const { fetchCategories, view } = useOrder();

  useEffect(() => {
    fetchCategories();
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:3000/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

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
        <div className="mt-16">
          <div className="overflow-x-auto flex justify-center">
            <table className="container md:w-3/4 table-auto border-collapse">
              <thead>
                <tr className="bg-thmain text-white">
                  <th className="px-4 py-2">Table Number</th>
                  <th className="px-4 py-2">Ordered Items</th>
                  <th className="px-4 py-2">Total Price</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
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
                    <td className="border px-4 py-2">{order.tableNumber}</td>
                    <td className="border px-4 py-2">
                      {order.items.map((item: OrderItem) => (
                        <p key={`${order.id}-${item.id}`}>
                          {item.name} x {item.quantity}
                        </p>
                      ))}
                    </td>
                    <td className="border px-4 py-2">{order.totalPrice} IQD</td>
                    <td className="border px-4 py-2">
                      {order.accepted ? "Accepted" : "Pending"}
                    </td>
                    <td className="border px-4 py-2">
                      {!order.accepted && (
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Accept
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveOrder(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-2 focus:outline-none focus:shadow-outline"
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
