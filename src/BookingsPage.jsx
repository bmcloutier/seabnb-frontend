import axios from "axios";
import { BookingsIndex } from "./BookingsIndex";
import { withCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function BookingsPage({ cookies }) {
  const navigate = useNavigate();

  const handleSetCookies = (start_p, end_p, start_d, start_c, end_c, book_id) => {
    cookies.set("start_port", start_p);
    cookies.set("end_port", end_p);
    cookies.set("start_date", start_d);
    cookies.set("start_coords", start_c);
    cookies.set("end_coords", end_c);
    cookies.set("book_id", book_id);
  };

  const handleDestroy = (id) => {
    axios.delete(`http://localhost:3000/bookings/${id}.json`).then(() => {
      navigate("/booklist");
    });
  };

  return (
    <div>
      <BookingsIndex onDestroy={handleDestroy} onSetCookies={handleSetCookies} />
    </div>
  );
}

export default withCookies(BookingsPage);
