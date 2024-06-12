
import { useOrder } from '../context/OrderContext'; // Import context
export default function Welcome() {
  const { setPage } = useOrder();

  return (
    <div className="flex items-center justify-center h-screen bg-gray">
    <div className="text-center flex flex-col items-center justify-center">
        <img src="/src/assets/Haus.png" alt="Haus caffe" height={250} width={250} />
        <h1 className="text-4xl font-bold mb-6 text-white">Welcome To <span className='text-main'> KAFFEE HAUS</span></h1>
        <button onClick={() => setPage('tableSelection')} className="px-4 py-2 bg-main text-white rounded-lg transition duration-300">Please Tap To Continue</button>
    </div>
</div>
  )
}
