import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
export default function Header() {
  return (
    <div className="flex mb-5 mt-7 justify-between px-20 pb-6 border-b-2 border-stone-200">
      <Link to="/" className="flex">
        <img src={logo} alt="logo" className="h-12" />
      </Link>
      <div className="flex gap-10 text-xl font-bold my-auto">
        <Link to="/" className="py-2 hover:-translate-y-1 duration-200">
          About Us
        </Link>
        <Link to="/stations" className="py-2 hover:-translate-y-1 duration-200">
          Stations
        </Link>
        <Link
          to="/scan-bike"
          className="py-2  hover:-translate-y-1 duration-200"
        >
          Scan
        </Link>
        <Link
          to="/rental"
          className="rounded-full hover:-translate-y-1 duration-200 text-white py-2 px-10 bg-gradient-to-r from-stone-800 to-stone-900"
        >
          Your rental
        </Link>
      </div>
    </div>
  );
}
