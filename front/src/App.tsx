import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTripPage from "./routes/create-trip";
import TripDetailsPage from "./routes/trip-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "trips/:tripId",
    element: <TripDetailsPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
