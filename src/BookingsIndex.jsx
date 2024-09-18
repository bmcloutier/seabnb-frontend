import { Link, useLoaderData } from "react-router-dom";
import { RouteView } from "./RouteView";
export function BookingsIndex({ onDestroy }) {
  const books = useLoaderData();
  return (
    <div className="flex justify-items-center grid grid-cols-2 mt-10 mx-32">
      {books.map((booking) => (
        <div key={booking.id} className="relative mb-32">
          <div className="border-2 border-slate-300 shadow-md bg-slate-50 w-96 p-1">
            <RouteView
              startPortCoords={[booking.port_start.longitude, booking.port_start.latitude]}
              endPortCoords={[booking.port_end.longitude, booking.port_end.latitude]}
            />
          </div>
          <div className="rounded text-blue-900 text-lg italic font-medium bg-slate-50/50 p-2 absolute top-4 left-4">
            <p className="font-semibold">
              {booking.port_start.city} to {booking.port_end.city}
            </p>
            <p>{booking.start_date}</p>
          </div>
          <div className="grid border-2 bg-slate-50 border-slate-300 shadow-md w-32 h-40 rotate-3 absolute top-44 right-3 z-10">
            <img className="h-32 p-2 object-cover saturate-50" src={booking.vessel.image_url} alt="" />
            <p className="justify-self-center -mt-2 text-lg font-['Brush_Script_MT']">{booking.vessel.name}</p>
          </div>
          <div className="absolute top-72 left-1">
            <Link
              className="rounded border shadow-md text-blue-900 bg-blue-100 border-blue-900 p-2 hover:bg-blue-200 mr-2"
              to="/plan"
              state={{
                startPort: booking.port_start.id,
                endPort: booking.port_end.id,
                startCoords: [booking.port_start.longitude, booking.port_start.latitude],
                endCoords: [booking.port_end.longitude, booking.port_end.latitude],
                vessel: booking.vessel.id,
                startDate: booking.start_date,
                bookingId: booking.id,
                startCurrency: booking.port_start.currency,
                endCurrency: booking.port_end.currency,
              }}
            >
              View Plan
            </Link>
            <Link
              className="rounded border shadow-md text-blue-900 bg-blue-100 border-blue-900 p-2 hover:bg-blue-200"
              onClick={() => onDestroy(booking.id)}
            >
              Delete
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
