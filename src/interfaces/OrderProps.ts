import OrderItem  from './OrderItemProps';

interface Order {
  id: number;
  tableNumber: number;
  items: OrderItem[];
  totalPrice: number;
  accepted: boolean;
}

export default Order;

