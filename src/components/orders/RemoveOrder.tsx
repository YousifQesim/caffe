import useFetch from "../../hooks/useFetch";
import Orders from "../../interfaces/OrderProps";
export default function RemoveOrders(orderId:{orderId:number}) {
  const { data: RemoveOrders = [], isLoading } = useFetch<Orders[]>(`/orders/${orderId}`);

   
    
  
  
  const RenderRemoveOrder = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const orderToRemove = RemoveOrders?.find(order => order.id === orderId.orderId);

    if (orderToRemove) {
      return orderToRemove;
    }}


  return (
   
<>

    { RenderRemoveOrder()}
</>

      
      
  );
}

