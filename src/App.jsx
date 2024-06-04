import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Rank from "./sections/Rank";
import Video from "./sections/Video";
import Scholarship from "./sections/Scholarship";
import Programme from "./sections/Programme";
import BSchool from "./sections/BSchool";
import Testimontials from "./sections/Testimontials";
import CampusLife from "./sections/CampusLife";
//import Blog from "./sections/Blog";
import Footer from "./components/Footer";
import AdmissionForm from "./components/Application_form";

const App = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const programmeRef = useRef(null);
  const campusLifeRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    if (!isFormSubmitted) {
      const timer = setTimeout(() => {
        setIsFormVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFormSubmitted]);

  const handleApplyNowClick = () => {
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
    setIsFormVisible(false);
  };

  const handleProgramsClick = () => {
    if (programmeRef.current) {
      programmeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLifeAtClick = () => {
    if (campusLifeRef.current) {
      campusLifeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAboutClick = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Router>
      <Navbar
        onApplyNowClick={handleApplyNowClick}
        onProgramsClick={handleProgramsClick}
        onLifeAtClick={handleLifeAtClick}
        onAboutClick={handleAboutClick}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-0 m-0 overflow-hidden">
              <Hero onApplyNowClick={handleApplyNowClick} />
              <Rank />
              <div ref={aboutRef}>
                <Video />
              </div>
              <Scholarship />
              <div ref={programmeRef}>
                <Programme onApplyNowClick={handleApplyNowClick} />
              </div>
              <BSchool />
              <Testimontials />
              <div ref={campusLifeRef}>
                <CampusLife />
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
      <AdmissionForm isVisible={isFormVisible} onClose={handleFormClose} onSubmit={handleFormSubmit} />
    </Router>
  );
};

export default App;
