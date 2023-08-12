import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function RentalPage() {

  const rentalBikeId = localStorage.getItem("bikeId");
  const [bike, setBike] = useState(null);
  useEffect(() => {
    if (rentalBikeId)
      axios
        .get("/api/v1/bike/" + rentalBikeId)
        .then((response) => {
          setBike(response.data.bike);
        })
        .catch((e) => {
          console.log(e.response.data);
        });
  }, []);
  return (
    <div className="">
      {!localStorage.getItem("bikeId") && (
        <div className="bg-white rounded-3xl px-20 w-1/2 py-10 mx-auto mt-10">
          <h1 className="text-4xl text-center font-bold">
            You are not renting any bike now !!!
          </h1>
        </div>
      )}
      {bike && (
        <div className="flex gap-20 justify-center mx-auto">
          <img
            src="https://www.emw.gr/thumbnails/32/1/fpgal_747/resize/0/255.255.255/700x700/1665667120_0_Sxedio-xoris-titlo.png/format.webp"
            alt=""
          />
          <div className="bg-white w-1/3 rounded-3xl py-5 px-10 my-auto">
            <h1 className="text-4xl font-bold text-center">
              Rental information
            </h1>
            <h1 className="text-2xl font-semibold py-2">
              Bar Code: {bike.barcode}
            </h1>
            <h1 className="text-2xl font-semibold py-2">Type: {bike.type}</h1>
            <h1 className="text-2xl font-semibold py-2">
              Battery: {bike.battery}%
            </h1>
            <h1 className="text-2xl font-semibold py-2">
              Start rent time: {bike.rentTime}
            </h1>
            <Link
              to="/select-station-return"
              className="flex justify-center mt-5"
            >
              <button className="rounded-full hover:-translate-y-1 duration-200 text-white py-2 px-10 bg-gradient-to-r from-stone-800 to-stone-900 text-2xl font-semibold">
                Return
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
