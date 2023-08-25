import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [bike, setBike] = useState({});
  const [cardCode, setCardCode] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expDate, setExpDate] = useState("");
  const [code, setCode] = useState("");
  useEffect(() => {
    const rentalBikeId = localStorage.getItem("bikeId");
    if (!rentalBikeId) {
      return <Navigate to="/" />;
    } else
      axios
        .get("/api/v1/bike/" + rentalBikeId)
        .then((response) => {
          setBike(response.data.bike);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e.response.data);
        });
  }, []);

  async function payment() {
    axios
      .post("/api/v1/bike/return-bike", {
        bikeId: localStorage.getItem("bikeId"),
        stationId: localStorage.getItem("stationId"),
        creditCardInfo: {
          cardCode,
          cardHolder,
          expDate,
          code,
        },
      })
      .then((response) => {
        alert(response.data.message);
        localStorage.removeItem("bikeId");
        localStorage.removeItem("stationId");
        navigate("/");
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }
  return (
    <div className="flex gap-20 justify-center my-auto">
      <div className="bg-white rounded-3xl py-10 px-10 my-auto w-1/2">
        <img
          src="https://www.emw.gr/thumbnails/32/1/fpgal_747/resize/0/255.255.255/700x700/1665667120_0_Sxedio-xoris-titlo.png/format.webp"
          alt=""
          className="w-80 mx-auto"
        />
        <h1 className="text-4xl font-bold text-center mb-5">
          Rental bike information
        </h1>
        <div className="grid grid-cols-2">
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
        </div>
      </div>
      <div className="justify-center my-auto  px-10 py-5 rounded-2xl w-96 bg-white">
        <h1 className="font-semibold text-xl">Card code</h1>
        <input
          type="text"
          value={cardCode}
          onChange={(ev) => setCardCode(ev.target.value)}
          placeholder="Your card code"
          className="border-2 px-2 py-1 rounded-xl mb-2 w-full"
        />
        <h1 className="font-semibold text-xl">Card&apos;s owner</h1>
        <input
          type="text"
          value={cardHolder}
          onChange={(ev) => setCardHolder(ev.target.value)}
          placeholder="Your name"
          className="border-2 px-2 py-1 rounded-xl mb-2 w-full"
        />
        <h1 className="font-semibold text-xl">Expiration Date (MM/YY)</h1>
        <input
          type="text"
          placeholder="Exp date"
          value={expDate}
          onChange={(ev) => setExpDate(ev.target.value)}
          className="border-2 px-2 py-1 rounded-xl mb-2 w-full"
        />
        <h1 className="font-semibold text-xl">CVV code</h1>
        <input
          type="password"
          placeholder="•••"
          value={code}
          onChange={(ev) => setCode(ev.target.value)}
          className="border-2 px-2 py-1 rounded-xl mb-2 w-full"
        />
        <div>
          <button
            onClick={() => payment()}
            className="rounded-full hover:-translate-y-1 duration-200 text-white py-1 w-full bg-gradient-to-r from-stone-800 to-stone-900 text-lg font-semibold mt-2"
          >
            Payment
          </button>
        </div>
      </div>
    </div>
  );
}
