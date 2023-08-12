export default function Bike(bike) {
  console.log(bike);
  bike = bike.bike;
  return (
    <div className="bg-white px-9 pb-8 rounded-2xl border-2 border-white hover:border-stone-800  duration-300">
      <div className="flex justify-between">
        <div className="pt-10">
          <h1 className="text-3xl capitalize font-semibold">{bike.barcode}</h1>
          <h1 className="text-2xl capitalize text-stone-400">{bike.type}</h1>
          <h1 className="text-2xl font-bold text-green-500 pt-10">
            {new Intl.NumberFormat().format(bike.value)}
            VND{" "}
          </h1>
        </div>
        <img
          className="w-60"
          src="https://www.emw.gr/thumbnails/32/1/fpgal_747/resize/0/255.255.255/700x700/1665667120_0_Sxedio-xoris-titlo.png/format.webp"
          alt=""
        />
      </div>
      <div className="grid grid-cols-4">
        <div className="text-2xl capitalize">
          <h1 className="text-stone-400">Color</h1>
          <h1>{bike.color}</h1>
        </div>
        <div className="text-2xl capitalize">
          <h1 className="text-stone-400">Speed</h1>
          <h1>{bike.speed}kmh</h1>
        </div>
        <div className="text-2xl capitalize">
          <h1 className="text-stone-400">Battery</h1>
          <h1>{bike.battery}%</h1>
        </div>
        <div className="bg-green-400 ml-10 w-16 h-16 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-8 h-8 mx-auto my-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
