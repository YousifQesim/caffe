import { useOrder } from "../context/OrderContext"; // Import context

export default function Welcome() {
  const { setPage, fetchCategories } = useOrder();

  return (
    <div className="h-screen relative flex flex-col  ">
      <img
        className="absolute top-5 left-0 w-32 h-auto "
        src="/src/assets/Haus.png"
        alt="Haus caffe"
      />
      <div className="text-center flex flex-col items-center justify-center  h-screen xl:h-auto mt-6 w-full xl:w-1/2 xl:absolute xl:top-1/3 xl:mt-0  p-4 xl:p-0">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          <span className="text-main font-dancing">KAFFEE HAUS</span>
        </h1>
        <pre className="font-roboto text-text_main my-6 w-full md:w-1/2 text-left whitespace-pre-wrap">
          Today's good mood is sponsored by coffee
          search for your coffee now
        </pre>
        <button
          onClick={() => {
            setPage("menu");
            fetchCategories();
          }}
          className="px-4 py-2 bg-text_main text-main font-bold font-roboto rounded-2xl transition duration-300 hover:bg-main hover:text-text_main"
        >
          Please Tap To Continue
        </button>
      </div>
      <div className="flex justify-end w-full mt-auto md:mt-0 ">
        <img
        className="hidden xl:block"
          src="/src/assets/HERO.png"
          alt="Haus caffe"
          height={screen.height}
          width={screen.width/1.8}
        />
      </div>
    </div>
  );
}
