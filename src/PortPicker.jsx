import { useState } from "react";
import { useLocation } from "react-router-dom";

export function PortPicker({ ports, onVesselIndex, onStartPortSelection, onEndPortSelection }) {
  const location = useLocation();
  const [selectedStart, setSelectedStart] = useState(location.state.startPort);
  const [selectedEnd, setSelectedEnd] = useState(location.state.endPort);

  return (
    <div>
      <h2>Select Port:</h2>
      <label>
        Start:&nbsp;
        <select
          value={selectedStart}
          onChange={(e) => {
            setSelectedStart(e.target.value);
            onVesselIndex(e.target.value);
            onStartPortSelection(e.target.value);
          }}
          name="selectedStart"
          id=""
        >
          {ports.map((port) => (
            <option key={port.id} value={port.id}>
              {port.city}, {port.country}
            </option>
          ))}
        </select>
      </label>
      &nbsp;
      <label>
        End:&nbsp;
        <select
          value={selectedEnd}
          onChange={(e) => {
            setSelectedEnd(e.target.value);
            onEndPortSelection(e.target.value);
          }}
          name="selectedEnd"
          id=""
        >
          {ports.map((port) => (
            <option key={port.id} value={port.id}>
              {port.city}, {port.country}
            </option>
          ))}
        </select>
      </label>
      <form action="">
        Start Date: <input type="date" defaultValue={location.state.startDate} />
      </form>
    </div>
  );
}
