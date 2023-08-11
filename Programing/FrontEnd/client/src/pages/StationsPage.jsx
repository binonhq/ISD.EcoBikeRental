import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function StationsPage() {
  const [search, setSearch] = useState("");
  const [stations, setStations] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/station", {
        params: {
          location: search,
        },
      })
      .then((response) => {
        setStations(response.data.stations);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [search]);
  return (
    <div>
      <h1 className="text-center font-bold text-5xl">Our stations</h1>
      <h1 className="text-center font-semibold text-3xl pt-3">
        Select your suitable station for rent
      </h1>
      <div className="relative w-2/3 mx-auto mt-10">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          onChange={(ev) => setSearch(ev.target.value)}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-10 py-2 sm:py-2"
          placeholder="Search for station..."
        />
      </div>
      <div className="px-36 grid grid-cols-3 gap-x-5 gap-y-5 mt-10 transition duration-150 ease-out hover:ease-in">
        {stations.map((station) => (
          <Link
            to={`/station/${station.id}`}
            key={station}
            className="flex gap-5 bg-white hover:-translate-y-1 p-5 rounded-2xl duration-200 "
          >
            <img
              className="h-36 rounded-xl "
              src="https://www.google.com/maps/d/thumbnail?mid=1D6AL57Aj1Io5RMIo18tJbFv8iVU&hl=en_US"
              alt=""
            />
            <div className="">
              <h1 className="font-semibold text-2xl uppercase text-stone-900 border-b-2 pb-2">
                {station.location}
              </h1>
              <div className="grid grid-cols-2 gap-3 place-content-between text-xl font-semibold pt-3">
                <div className="flex gap-1">
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
                  <h1 className="text-stone-900 text-xl">Ha Noi</h1>
                </div>
                <div className="flex gap-2">
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
                  <h1 className="text-stone-900 text-xl">2 km</h1>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://www.svgrepo.com/download/70289/bike.svg"
                    alt=""
                    className="h-6"
                  />
                  <h1 className="text-stone-900 text-xl">
                    {station.bikes.length}
                  </h1>
                </div>
                <div className="flex gap-2">
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
                  <h1 className="text-stone-900 text-xl">5 minutes</h1>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
