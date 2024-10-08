import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import axios from "axios";

const AdmissionForm = ({ isVisible, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: ""
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isVisible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    try {
      const response = await axios.post(
        "https://sheet.best/api/sheets/dc8dd652-139f-459e-b06a-6e35317dd612",
        formData
      );

      console.log("Response from API: ", response); 
      if (response.status === 200) {
        alert("Form submitted successfully!");
        console.log(formData)
        // Optionally, you can reset the form or navigate to another page
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          course: ""
        });
        onSubmit();
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-8 max-sm:px-2">
      <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-gray-500 hover:text-gray-700 h-12 w-12 scale-125"
        >
          &times;
        </button> 

        {/* Top Navbar */}
        <div className="flex justify-between items-center p-0 border-b-2 border-gray-200">
          <img src={logo} alt="logo" className="h-10" />
          <div className="hidden md:flex gap-5">
            <li className="cursor-pointer" onClick={onClose}>
              Home
            </li>
            <li>Life@</li>
            <li>Placements</li>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <ul className="md:hidden flex flex-col gap-2 mt-2">
            <li className="cursor-pointer" onClick={onClose}>
              Home
            </li>
            <li>Life@</li>
            <li>Placements</li>
          </ul>
        )}

        <h2 className="text-2xl font-bold text-center" style={{ color: '#FF7162' }}>
          Application Form For Admission
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="Full Name"
                type="text"
                required
                value={formData["Full Name"]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email ID
              </label>
              <input
                id="email"
                name="Email"
                type="email"
                required
                value={formData["Email"]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="Email ID"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                name="Phone"
                type="text"
                required
                value={formData["Phone"]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label htmlFor="course" className="sr-only">
                Preferred Course
              </label>
              <input
                id="course"
                name="Course"
                type="text"
                required
                value={formData["Course"]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="Please type the preferred course"
              />
            </div>
          </div>
          <div className="w-full px-10 py-2 rounded-full w-48 p-2" style={{ backgroundColor: "#FF7162" }}>
            <button
              type="submit"
              className="text-center w-full text-black font-semibold"
            >
              Apply Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
