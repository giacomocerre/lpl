import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { navigationPages } from "../../config";
import { getCurrentUser } from "../../firebase/api/user.api";
import IMG from "../../assets";
import { logOut } from "../../firebase/auth";
import ConfirmationModal from "../confirmationModal/confirmationModal";
import { useIsMobile } from "../../utils/utils";

export const Navbar = ({ item }) => {
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the menu's visibility

  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogoutClick = () => {
    setIsModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    logOut();
    window.location.href = '/home';
  };

  const handleLogoutCancel = () => {
    setIsModalVisible(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <>
      <nav className="bg-black bg-opacity-95 border-gray-200 py-5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-2xl mx-auto">
          <button
            onClick={toggleMenu} // Toggle menu visibility
            type="button"
            className="inline-flex ml-4 p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
            aria-controls="mobile-menu-2"
            aria-expanded={isMenuOpen} // Update aria-expanded attribute
          >
            <svg
              className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${isMenuOpen ? 'block' : 'hidden'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {!isMobile && (
            <a href="/home" className="flex items-center">
              <img
                src={IMG.logo}
                className="h-24 mr-0 md:mr-4"
                alt="Lega Pauper Livorno Logo"
              />
              <span className="self-center text-xl font-bold text-white whitespace-nowrap">
                LegaPauperLivorno
              </span>
            </a>
          )}
          <div className="flex lg:order-2">
            {!user && (
              <a
                href="/login"
                className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-900 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 lg:mr-0 focus:outline-none"
              >
                <i className="bi bi-file-lock"></i>
                <span className="ml-3">Area Riservata</span>
              </a>
            )}
            {user && (
              <>
                <a
                  href="/login"
                  className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-900 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 lg:mr-0 focus:outline-none"
                >
                  <i className="bi bi-person-circle"></i>
                  <span className="ml-3">{user.name}</span>
                </a>
                <p
                  onClick={handleLogoutClick}
                  className="text-white bg-red-600 ml-5 hover:bg-red-700 focus:ring-4 focus:ring-red-900 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none cursor-pointer"
                >
                  <i className="bi bi-box-arrow-left"></i>
                  <span className="ml-3">Logout</span>
                </p>
              </>
            )}
          </div>
          <div
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} // Toggle menu visibility
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navigationPages.map(page =>
                <li key={page.path} className="rounded-md">
                  <div className={page.name.toLocaleLowerCase() === item.toLocaleLowerCase() ? "bg-blue-500 rounded-md" : "bg-transparent"}>
                    <a
                      href={page.path}
                      className={"block text-white pl-5 py-3"}
                      aria-current="page"
                    >
                      <i className={page.icon}></i>
                      <span className="ml-3 mr-5">{page.label}</span>
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Render the modal */}
      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
};
