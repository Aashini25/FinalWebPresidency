import React from "react";
import logo from "../assets/images/logo.png";
import rightArrow from "../assets/icons/right-arrow.svg";
import hammenu from "../assets/icons/ham-menu.svg";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Navbar = ({ onApplyNowClick, onProgramsClick, onLifeAtClick,onAboutClick}) => {
  const navLinks = [
    { name: "Life@", onClick: onLifeAtClick },
    { name: "Programs", onClick: onProgramsClick },
    { name: "About",onClick:onAboutClick},
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // This function checks if a click was outside the menu
    const handleClickOutside = (event) => {
      if (event.target.closest('.menu') === null) {
        setIsOpen(false);
      }
    };

    // Add the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center p-4 mx-16 max-lg:mx-10 max-md:mx-8 m-2 max-md:m-1 border-b-[#DDDDED] border-b-2">
      <Link to="/">
        <img src={logo} alt="logo" className="lg:pl-7 max-md:h-[44px]" />
      </Link>

      <ul className="flex gap-16 items-center max-lg:gap-8 max-md:hidden cursor-pointer">
        {navLinks.map((item) => (
          <li key={item.name} onClick={item.onClick ? item.onClick : null}>
            {item.name}
          </li>
        ))}
      </ul>

      <div className="h-12 flex justify-between bg-orange w-48 p-2 rounded-full max-md:hidden">
        <button
          className="text-center w-full text-white font-semibold"
          onClick={onApplyNowClick}
        >
          Apply now
        </button>
        <img src={rightArrow} alt="" />
      </div>

      <button className="hidden max-md:block" onClick={handleMenuClick}>
        <img src={hammenu} alt="" className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute top-0 right-0 w-48 bg-white p-2 rounded shadow-lg max-md:block">
          <ul className="space-y-2">
            {navLinks.map((item) => (
              <li key={item.name} onClick={item.onClick ? item.onClick : null}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
