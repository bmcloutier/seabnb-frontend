import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import axios from "axios";

import { Header } from "./Header";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { PlannerPage } from "./PlannerPage";
import { BookingsPage } from "./BookingsPage";
import { Footer } from "./Footer";

const router = createBrowserRouter([
  {
    element: (
      <div className="flex min-h-screen flex-col font-serif">
        <Header />
        <div className="container mx-auto flex-auto justify-center p-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/plan",
        element: <PlannerPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/booklist",
        element: <BookingsPage />,
        loader: () => axios.get("http://localhost:3000/bookings.json").then((response) => response.data),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
