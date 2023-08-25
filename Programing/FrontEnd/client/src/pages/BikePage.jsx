import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function BikePage() {
  const { id } = useParams();
  const [cardCode, setCardCode] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expDate, setExpDate] = useState("");
  const [code, setCode] = useState("");
  const [redirect, setRedirect] = useState("");
  const [bike, setBike] = useState({});
  useEffect(() => {
    axios
      .get("/api/v1/bike/" + id)
      .then((response) => {
        setBike(response.data.bike);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  function makeRent(ev) {
    ev.preventDefault;
    if (cardCode === "" || cardHolder === "" || expDate === "" || code === "") {
      alert("Please fill all information!");
      return;
    }
    axios
      .post("/api/v1/bike/rent-bike/" + id, {
        cardCode,
        cardHolder,
        code,
        expDate,
      })
      .then((response) => {
        alert(response.data.message);
        console.log(response);
        localStorage.setItem("bikeId", id);
        setRedirect("/rental");
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }

  if (redirect) {
    return <Navigate to={redirect} />;
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
          Bike information
        </h1>
        <div className="grid grid-cols-2">
          <h1 className="text-2xl font-semibold py-2">
            Bar Code: {bike.barcode}
          </h1>
          <h1 className="text-2xl font-semibold py-2">Type: {bike.type}</h1>
          <h1 className="text-2xl font-semibold py-2">
            Battery: {bike.battery}%
          </h1>
          <h1 className="text-2xl font-semibold py-2">Time remaining: 100h</h1>
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
        <h1 className="font-semibold text-xl">Card&apos;s Holder</h1>
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
          value={expDate}
          onChange={(ev) => setExpDate(ev.target.value)}
          placeholder="Exp date"
          className="border-2 px-2 py-1 rounded-xl mb-2 w-full"
        />
        <h1 className="font-semibold text-xl">CVV code</h1>
        <input
          type="password"
          value={code}
          onChange={(ev) => setCode(ev.target.value)}
          placeholder="•••"
          className="border-2 px-2 py-1 rounded-xl mb-2 w-full"
        />
        <div>
          <button
            onClick={makeRent}
            className="rounded-full hover:-translate-y-1 duration-200 text-white py-1 w-full bg-gradient-to-r from-stone-800 to-stone-900 text-lg font-semibold mt-2"
          >
            Rent this bike
          </button>
        </div>
      </div>
    </div>
  );
}
