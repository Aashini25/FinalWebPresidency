import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import rightArrow from "../assets/icons/right-arrow.svg";
import hammenu from "../assets/icons/ham-menu.svg";

// eslint-disable-next-line react/prop-types
const Navbar = ({ onApplyNowClick, onProgramsClick, onLifeAtClick, onAboutClick }) => {
  const navLinks = [
    { name: "Life@", onClick: onLifeAtClick },
    { name: "Programs", onClick: onProgramsClick },
    { name: "About", onClick: onAboutClick },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu') && !event.target.closest('.menu-btn')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavLinkClick = (onClick) => {
    setIsOpen(false); // Close the menu first
    if (onClick) {
      setTimeout(onClick, 300); // Scroll to the section after a short delay
    }
  };

  return (
    <div className="flex justify-between items-center p-4 mx-16 max-lg:mx-10 max-md:mx-8 m-2 max-md:m-1 border-b-[#DDDDED] border-b-2">
      <Link to="/">
        <img src={logo} alt="logo" className="lg:pl-7 max-md:h-[44px]" />
      </Link>

      <ul className="flex gap-16 items-center max-lg:gap-8 max-md:hidden cursor-pointer">
        {navLinks.map((item) => (
          <li key={item.name} onClick={() => handleNavLinkClick(item.onClick)}>
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
        <img src={rightArrow} alt="right arrow" />
      </div>

      <button className="hidden max-md:block menu-btn" onClick={handleMenuClick}>
        <img src={hammenu} alt="menu" className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute top-0 right-0 w-48 bg-white p-2 rounded shadow-lg menu">
          <ul className="space-y-2">
            {navLinks.map((item) => (
              <li key={item.name} onClick={() => handleNavLinkClick(item.onClick)}>
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
