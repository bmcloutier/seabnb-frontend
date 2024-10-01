import axios from "axios";
import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { withCookies } from "react-cookie";
import Planner from "./Planner";

function PlannerPage({ cookies }) {
  const navigate = useNavigate();
  const ports = useLoaderData();
  const [vessels, setVessels] = useState([]);
  const [startPortId, setStartPortId] = useState(cookies.get("start_port"));
  const [endPortId, setEndPortId] = useState(cookies.get("end_port"));
  const [startPortCoords, setStartPortCoords] = useState(cookies.get("start_coords"));
  const [endPortCoords, setEndPortCoords] = useState(cookies.get("end_coords"));
  const [startDate, setStartDate] = useState(cookies.get("start_date"));

  const coordinates = new Map();
  ports.map((port) => coordinates.set(port.id.toString(), [parseFloat(port.longitude), parseFloat(port.latitude)]));
  const handleStartPortSelection = (port_id) => {
    setStartPortCoords(coordinates.get(port_id));
    setStartPortId(port_id);
    cookies.set("start_port", port_id);
    cookies.set("start_coords", coordinates.get(port_id));
  };
  const handleEndPortSelection = (port_id) => {
    setEndPortCoords(coordinates.get(port_id));
    setEndPortId(port_id);
    cookies.set("end_port", port_id);
    cookies.set("end_coords", coordinates.get(port_id));
  };

  const handleStartDateSelection = (date) => {
    setStartDate(date);
    cookies.set("start_date", date);
  };

  const handleVesselIndex = (port_id, end_port_id) => {
    axios
      .get("http://localhost:3000/vessels.json", { params: { port_id: port_id, end_port_id: end_port_id } })
      .then((response) => {
        setVessels(response.data);
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

  return (
    <main>
      <Planner
        ports={ports}
        vessels={vessels}
        startPortId={startPortId}
        endPortId={endPortId}
        startPortCoords={startPortCoords}
        endPortCoords={endPortCoords}
        startDate={startDate}
        onStartPortSelection={handleStartPortSelection}
        onEndPortSelection={handleEndPortSelection}
        onStartDateSelection={handleStartDateSelection}
        onVesselIndex={handleVesselIndex}
        onBook={handleCreateBooking}
        onBookUpdate={handleUpdateBooking}
      />
    </main>
  );
}

export default withCookies(PlannerPage);
