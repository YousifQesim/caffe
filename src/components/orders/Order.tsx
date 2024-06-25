import { useEffect, useCallback, useMemo } from 'react';
import OrderItem from "../../interfaces/OrderItemProps";
import api from "../../utilities/getServer";
import { useOrder } from "../../context/OrderContext";

export default function Order() {
  const { setOrders, orders, fetchOrders } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleRemoveOrder = useCallback((orderId: number) => {
    api(`/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      } else {
        console.error('Failed to delete order');
      }
    });
  }, [setOrders]);

  const handleAcceptOrder = useCallback((orderId: number) => {
    api(`/orders/${orderId}/accept`, {  
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        setOrders(prevOrders => prevOrders.map(order => 
          order.id === orderId ? { ...order, accepted: true } : order
        ));
      } else {
        console.error('Failed to accept order');
      }
    });
  }, [setOrders]);

  const renderedOrders = useMemo(() => {
    return orders.map(order => (
      <tr
        key={order.id}
        className={`${order.accepted ? "bg-green-300" : "bg-red-300"} `}
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
    ));
  }, [orders, handleAcceptOrder, handleRemoveOrder]);
  return (
    <>
        {renderedOrders}
    </>
    
  );
}
