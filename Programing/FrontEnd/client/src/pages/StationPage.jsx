import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Bike from "../Bike";
import axios from "axios";

export default function StationPage() {
  const { id } = useParams();
<<<<<<< HEAD

=======
>>>>>>> 7ba75dc890f3f1584b60e8a86f99343b6db33f68
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
        <div className="text-3xl font-bold py-3 pt-5 text-center">
          {station.location}
        </div>
        <div className="flex gap-2 px-20 py-3">
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
        <div className="flex gap-2 px-20 py-3">
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
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
          <h1 className="text-stone-900 text-xl font-semibold">
            Distance: 2 km
          </h1>
        </div>
        <div className="flex gap-2 px-20 py-3">
          <img
            src="https://www.svgrepo.com/download/70289/bike.svg"
            alt=""
            className="h-7"
          />
          <h1 className="text-stone-900 text-xl font-semibold">
            Available: {station.bikes.length} bikes
          </h1>
        </div>
        <div className="flex gap-2 px-20 py-3">
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
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-stone-900 text-xl font-semibold">
            Time arrive: 5 minutes
          </h1>
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
