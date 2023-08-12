import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Bike from "../Bike";
import axios from "axios";

export default function StationPage() {
  const { id } = useParams();

  const [bikes, setBikes] = useState([]);
  const [station, setStation] = useState({});

  useEffect(() => {
    axios
      .get(`/api/v1/bike/station/${id}`)
      .then((response) => {
        setBikes(response.data.bikes);
        setStation(response.data.station);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="px-36 flex justify-between">
      <div className="my-10 bg-white mb-auto py-10 rounded-2xl">
        <img
          src="https://www.google.com/maps/d/thumbnail?mid=1D6AL57Aj1Io5RMIo18tJbFv8iVU&hl=en_US"
          alt=""
          className="w-1/2 mx-auto"
        />
        <div className="text-3xl font-bold py-3 text-center">
          {station.location}
        </div>
        <div className="flex px-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <h1 className="text-xl font-semibold">Address: Hanoi</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-5 my-10">
        {bikes.map((bike) => (
          <Link to={`/bike/${bike.id}`} key={bike}>
            <Bike bike={bike} />
          </Link>
        ))}
      </div>
    </div>
  );
}
