import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import StationPage from "./pages/StationPage";
import StationsPage from "./pages/StationsPage";
import BikePage from "./pages/BikePage";
import RentalPage from "./pages/RentalPage";
import ScanBikePage from "./pages/ScanBikePage";
import StationReturnPage from "./pages/StationReturnPage";
import PaymentPage from "./pages/PaymentPage";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/station/:id" element={<StationPage />} />
          <Route path="/stations/:query" element={<StationsPage />} />
          <Route path="/stations" element={<StationsPage />} />
          <Route path="/bike/:id" element={<BikePage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/scan-bike" element={<ScanBikePage />} />
          <Route
            path="/select-station-return"
            element={<StationReturnPage />}
          />
          <Route
            path="/select-station-return/:query"
            element={<StationReturnPage />}
          />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
      </Routes>
  );
}

export default App;
