import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Schedule from "./pages/Schedule";
import Pricing from "./pages/Pricing";
import OurStory from "./pages/OurStory";
import ClubSolace from "./pages/ClubSolace";
import GetInTouch from "./pages/GetInTouch";
import Events from "./pages/Events";
import Standards from "./pages/Standards";
import PurchaseAgreement from "./pages/PurchaseAgreement";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/club-solace" element={<ClubSolace />} />
          <Route path="/get-in-touch" element={<GetInTouch />} />
          <Route path="/events" element={<Events />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/purchase-agreement" element={<PurchaseAgreement />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
