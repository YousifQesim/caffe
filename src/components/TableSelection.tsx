import { useOrder } from '../context/OrderContext'; 
export default function TableSelection() {
  const {tableNumber,setTableNumber } = useOrder();

  return (
    <div>
          <div className="flex items-center justify-center ">
                <div className="text-center">
                    <select value={tableNumber !== null ? tableNumber.toString() : ""}  required onChange={e => setTableNumber(Number(e.target.value))} className="bg-white text-main border-none mb-4 p-2 outline-none rounded-lg">
                        <option value="" disabled className='text-main bg-white'>Please Select Your Table Number</option>
                        {Array.from({ length: 20 }, (_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>
            </div>
    </div>
  )
}
