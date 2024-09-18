import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Planner } from "./Planner";

export function PlannerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ports, setPorts] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [startPortCoords, setStartPortCoords] = useState(location.state.startCoords);
  const [endPortCoords, setEndPortCoords] = useState(location.state.endCoords);
  const [startPortCurrency, setStartPortCurrency] = useState(location.state.startCurrency);
  const [exchangeRate, setExchangeRate] = useState("");

  const handlePortIndex = () => {
    axios.get("http://localhost:3000/ports.json").then((response) => {
      setPorts(response.data);
    });
  };

  const handleVesselIndex = (port_id) => {
    axios.get("http://localhost:3000/vessels.json", { params: { port_id: port_id } }).then((response) => {
      setVessels(response.data);
    });
  };

  const handleStartPortSelection = (port_id) => {
    axios.get(`http://localhost:3000/ports/${port_id}.json`).then((response) => {
      setStartPortCoords([parseFloat(response.data.longitude), parseFloat(response.data.latitude)]);
      setStartPortCurrency(response.data.currency);
    });
  };
  const handleEndPortSelection = (port_id) => {
    axios.get(`http://localhost:3000/ports/${port_id}.json`).then((response) => {
      setEndPortCoords([parseFloat(response.data.longitude), parseFloat(response.data.latitude)]);
    });
  };

  const handleCreateBooking = (vessel, start, end, startDate) => {
    console.log("handleCreateBooking");
    axios
      .post("http://localhost:3000/bookings.json", {
        vessel_id: vessel,
        port_start_id: start,
        port_end_id: end,
        start_date: startDate,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/booklist");
      });
  };

  const handleUpdateBooking = (vessel, start, end, startDate, booking_id) => {
    console.log("handleUpdateBooking");
    axios
      .patch(`http://localhost:3000/bookings/${booking_id}.json`, {
        vessel_id: vessel,
        port_start_id: start,
        port_end_id: end,
        start_date: startDate,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/booklist");
      });
  };

  const handleGetExchangeRate = () => {
    let rates = {
      USD: 1,
      EUR: 0.9,
      JMD: 157.18,
      BRL: 5.5,
      ISK: 136.98,
      MAD: 9.74,
      XOF: 598.97,
      ZAR: 17.64,
    };
    setExchangeRate(rates[startPortCurrency]);
    // axios
    //   .get(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_API_KEY}/pair/USD/${startPortCurrency}`)
    //   .then((response) => {
    //     setExchangeRate(response.data.conversion_rate);
    //   });
  };

  useEffect(handlePortIndex, []);
  useEffect(handleGetExchangeRate);

  return (
    <main>
      <Planner
        ports={ports}
        vessels={vessels}
        onVesselIndex={handleVesselIndex}
        onStartPortSelection={handleStartPortSelection}
        onEndPortSelection={handleEndPortSelection}
        startPortCoords={startPortCoords}
        endPortCoords={endPortCoords}
        onBook={handleCreateBooking}
        onBookUpdate={handleUpdateBooking}
        onGetExchangeRate={handleGetExchangeRate}
        startPortCurrency={startPortCurrency}
        exchangeRate={exchangeRate}
      />
    </main>
  );
}
