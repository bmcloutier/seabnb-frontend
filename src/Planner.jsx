import { useRef, useEffect } from "react";
import { withCookies } from "react-cookie";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

function Planner({
  ports,
  vessels,
  startPortId,
  endPortId,
  startPortCoords,
  endPortCoords,
  startDate,
  cookies,
  onStartPortSelection,
  onEndPortSelection,
  onStartDateSelection,
  onVesselIndex,
  onBook,
  onBookUpdate,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const startMarker = useRef(null);
  const endMarker = useRef(null);

  if (vessels.length == 0) {
    onVesselIndex(startPortId, endPortId);
  }

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        interactive: true,
      });
      startMarker.current = new mapboxgl.Marker({ color: "#66CC00" }).setLngLat(startPortCoords).addTo(map.current);
      endMarker.current = new mapboxgl.Marker({ color: "#CC3300" }).setLngLat(endPortCoords).addTo(map.current);

      map.current.on("load", () => {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [startPortCoords, endPortCoords],
            },
          },
        });
        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
      });
    }

    startMarker.current.setLngLat(startPortCoords);
    endMarker.current.setLngLat(endPortCoords);
    map.current.fitBounds([startPortCoords, endPortCoords], {
      padding: { top: 50, bottom: 30, left: 75, right: 75 },
      duration: 500,
    });
    if (map.current.getSource("route")) {
      map.current.getSource("route").setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [startPortCoords, endPortCoords],
        },
      });
    }
  });
  return (
    <div className="mt-10">
      <div className="flex justify-center text-xl">
        <label>
          <select
            className="shadow-md p-2 rounded italic bg-blue-100 text-blue-900 hover:bg-blue-200"
            value={startPortId}
            onChange={(e) => {
              onVesselIndex(e.target.value, endPortId);
              onStartPortSelection(e.target.value);
            }}
            name="startPortId"
            id=""
          >
            {ports.map((port) => (
              <option key={port.id} value={port.id}>
                {port.city}, {port.country}
              </option>
            ))}
          </select>
        </label>
        <p className="text-2xl italic p-1 ml-4 mr-4 text-blue-900">to</p>
        <label>
          <select
            className="shadow-md p-2 rounded italic bg-blue-100 text-blue-900 hover:bg-blue-200"
            value={endPortId}
            onChange={(e) => {
              onVesselIndex(startPortId, e.target.value);
              onEndPortSelection(e.target.value);
            }}
            name="endPortId"
            id=""
          >
            {ports.map((port) => (
              <option key={port.id} value={port.id}>
                {port.city}, {port.country}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex justify-center text-2xl p-5 italic text-blue-900">
        <form action="">
          on&nbsp;&nbsp;{" "}
          <input
            className="italic rounded border-2 shadow-md border-slate-200 bg-blue-100 text-blue-900 hover:bg-blue-200"
            type="date"
            defaultValue={startDate}
            onChange={(e) => onStartDateSelection(e.target.value)}
          />
        </form>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <div ref={mapContainer} className="map-container rounded border-2 shadow-md border-slate-200" />
          <p className="text-sm italic mt-2 text-blue-900">Cookie: {cookies.get("end_coords")}</p>
        </div>
        <div>
          {vessels.map((vessel) => (
            <div
              key={vessel.id}
              className="flex mb-4 rounded border-2 shadow-md text-blue-900 bg-slate-50 border-slate-200"
            >
              <div className="flex-none w-32">
                <img src={vessel.image_url} alt="" className="h-32 w-32 float-start mr-4 object-cover" />
              </div>
              <div className="grow mt-2 ml-4">
                <p className="text-lg font-bold">{vessel.name}</p>
                <p>
                  {vessel.length}&apos; {vessel.propulsion}
                </p>
                <p className="italic">{vessel.amenities}</p>
              </div>
              <div className="p-2 grid">
                <p className="justify-self-end">
                  {Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(vessel.daily_price)} per
                  day
                </p>
                <p className="justify-self-end">{vessel.duration} day journey</p>
                <div className="flex justify-end mt-4">
                  {cookies.get("book_id") === undefined ? (
                    <>
                      <button
                        className="rounded border text-blue-900 bg-blue-100 border-blue-900 p-2 hover:bg-blue-200"
                        onClick={() => onBook(vessel.id, startPortId, endPortId, startDate)}
                      >
                        Book for&nbsp;
                        {Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(vessel.price)}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="rounded border text-blue-900 bg-blue-100 border-blue-900 p-2 hover:bg-blue-200"
                        onClick={() =>
                          onBookUpdate(vessel.id, startPortId, endPortId, startDate, cookies.get("book_id"))
                        }
                      >
                        Update to&nbsp;
                        {Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(vessel.price)}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withCookies(Planner);
