import useFetch from "../../hooks/useFetch";
import Orders from "../../interfaces/OrderProps";
export default function AcceptOrders(orderId:{orderId:number}) {
  
  const { data: AcceptOrder = [], isLoading } = useFetch<Orders[]>(`/orders/${orderId}/accept`);
 
    const RenderAccepteOrder=()=>{
        return isLoading?
        <p>loadiing</p>
        :
        <>{AcceptOrder}</>;
    }


  return (
   
<div>

    { RenderAccepteOrder()}
</div>
      
      
  );
}
