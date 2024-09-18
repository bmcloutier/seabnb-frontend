import { Link } from "react-router-dom";
import { useState } from "react";
import { LogoutLink } from "./LogoutLink";
import { LoginPage } from "./LoginPage";

export function Header() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const handleShowLogin = () => {
    setIsLoginVisible(true);
  };
  const handleCloseLogin = () => {
    setIsLoginVisible(false);
  };
  var today = new Date();
  var todayString =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");
  return (
    <header className="text-blue-900 bg-blue-100 font-bold">
      <nav className="flex p-2 ml-6">
        <Link to="/" className="flex-none w-32 flex mr-12">
          <img src="src/assets/anchor.png" to="/" alt="" className="h-8" />
          <p className="ml-2 text-3xl text-bold">seabnb</p>
        </Link>
        <Link
          className="text-xl mt-2"
          to="/plan"
          state={{
            startPort: 1,
            endPort: 10,
            startCoords: [-73.9, 40.73],
            endCoords: [-9.1388, 38.707],
            startDate: todayString,
            startCurrency: "USD",
            endCurrency: "EUR",
          }}
        >
          Plan
        </Link>
        <div className="grow text-xl mt-2 ml-6">
          {localStorage.jwt ? (
            <>
              <Link to="/booklist">My Trips</Link>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="place-content-end text-xl mr-6">
          {localStorage.jwt === undefined ? (
            <>
              <Link to="/signup">Sign up</Link> or&nbsp;
              <button onClick={handleShowLogin}>Login</button>
            </>
          ) : (
            <>
              <LogoutLink />
            </>
          )}
        </div>
      </nav>
      <LoginPage show={isLoginVisible} onClose={handleCloseLogin} />
    </header>
  );
}
