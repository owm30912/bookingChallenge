import Home from "./pages/Home";
import "./apps/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HotelList from "./pages/HotelsList";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotelsList" element={<HotelList />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
