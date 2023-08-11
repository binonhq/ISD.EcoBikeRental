import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ScanBikeCode() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const findBikeByBarcode = async (barcode) => {
    try {
      const response = await axios.get("/api/v1/bike/barcode", {
        params: { barcode },
      });
      navigate("/bike/" + response.data.bike.id);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center my-10">
        Scan a bike with bar code
      </h1>
      <img
        src="https://images.vexels.com/media/users/3/157862/isolated/lists/5fc76d9e8d748db3089a489cdd492d4b-barcode-scanning-icon.png"
        alt=""
        className="mx-auto"
      />
      <div className="relative w-1/3 mx-auto mt-10">
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              findBikeByBarcode(search);
            }
          }}
          onChange={(ev) => setSearch(ev.target.value)}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-10 py-2 sm:py-2"
          placeholder="Enter barcode..."
        />
      </div>
    </div>
  );
}
