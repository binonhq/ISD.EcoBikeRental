import { Link } from "react-router-dom";
import bikeImg from "../assets/bike.png";
export default function IndexPage() {
  return (
    <div className="flex justify-between my-3">
      <div className="mt-auto px-40">
        <h1 className="font-bold text-8xl">Premium</h1>
        <h1 className="font-bold text-8xl">Bike Rental</h1>
        <h1 className="font-bold text-8xl">in Hanoi</h1>
        <h1 className="font-semibold text-2xl mt-16 mb-10">
          Don&apos;t deny yourself the pleasure of <br /> driving the best
          premium bikes from <br />
          around Hanoi here and now.
        </h1>
        <Link to="/stations">
          <button className="px-14 py-2 text-xl font-semibold rounded-full text-white bg-gradient-to-r from-stone-800 to-stone-900 hover:bg-gradient-to-r hover:from-stone-800 hover:to-stone-900 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            Rent now!
          </button>
        </Link>
      </div>
      <div>
        <img src={bikeImg} alt="Bike" />
      </div>
    </div>
  );
}
