// import { useState, useEffect } from "react";
import axios from "axios";
import { BookingsIndex } from "./BookingsIndex";
import { useNavigate } from "react-router-dom";

export function BookingsPage() {
  const navigate = useNavigate();

  const handleDestroy = (id) => {
    axios.delete(`http://localhost:3000/bookings/${id}.json`).then(() => {
      navigate("/booklist");
    });
  };

  return (
    <div>
      <BookingsIndex onDestroy={handleDestroy} />
    </div>
  );
}
