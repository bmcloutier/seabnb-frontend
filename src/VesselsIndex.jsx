import { useLocation } from "react-router-dom";
export function VesselsIndex({ vessels, onVesselIndex, onBook }) {
  const location = useLocation();

  if (vessels.length == 0) {
    onVesselIndex(location.state.startPort);
  }

  return (
    <div>
      <h2>Vessels</h2>
      {vessels.map((vessel) => (
        <div key={vessel.id}>
          <h3>
            {vessel.name} - {vessel.length}&apos; (${vessel.daily_price} / day)
          </h3>
          <img src={vessel.image_url} alt="" height="100" />
          <button onClick={() => onBook(vessel.id)}>Book</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
