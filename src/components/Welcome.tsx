import { useOrder } from "../context/OrderContext"; // Import context
export default function Welcome() {
  const { setPage, fetchCategories } = useOrder();

  return (
    <div className=" h-screen w-screen relative">
      
        <img
        className=" absolute top-5 left-0"
          src="/src/assets/Haus.png"
          alt="Haus caffe"
          height={100}
          width={120}
        />
      <div className="text-center flex flex-col items-center mt-6  w-1/2 float-left  absolute top-1/3  ">
          <h1 className="text-4xl font-bold  text-white">
          <span className="text-main font-dancing"> KAFFEE HAUS</span>
          </h1>
          <pre className="font-roboto text-text_main my-6  w-1/2 text-left text-wrap">Today's good mood is sponsored by coffee
search for your coffee now</pre>
        <button
          onClick={() => {
            setPage("menu");
            fetchCategories();
          }}
          className="px-4 py-2 bg-text_main  text-main font-bold font-roboto rounded-2xl transition duration-300"
        >
          Please Tap To Continue
        </button>
      </div>
      <div className="absolute top-0 right-0  ">
        <img
          src="/src/assets/HERO.png"
          alt="Haus caffe"
          height={screen.height}
          width={screen.width/1.8}
        />
      </div>
    </div>
  );
}
