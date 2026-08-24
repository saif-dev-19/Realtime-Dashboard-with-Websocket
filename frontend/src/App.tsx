import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import DeviceDetails from "./pages/DeviceDetails";
import AddDevice from "./pages/AddDevice";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/devices/:id"
          element={<DeviceDetails />}
        />

        <Route
          path="/devices/add"
          element={<AddDevice />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;