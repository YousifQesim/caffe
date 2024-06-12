import React from 'react'

import { useOrder } from '../context/OrderContext'; // Import context
export default function TableSelection() {
  const {fetchCategories,tableNumber,setTableNumber,setPage } = useOrder();

  return (
    <div>
          <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <select value={tableNumber !== null ? tableNumber.toString() : ""} onChange={e => setTableNumber(Number(e.target.value))} className="bg-main text-white border-none mb-4 p-2 outline-none rounded-lg">
                        <option value="" disabled className='text-main bg-white'>Please Select Your Table Number</option>
                        {Array.from({ length: 20 }, (_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                    <button onClick={() => { setPage('menu'); fetchCategories(); }} className="px-4 py-2 mx-4 bg-white text-main rounded-lg border-2 border-main font-bold transition duration-300">Next</button>
                </div>
            </div>
    </div>
  )
}
