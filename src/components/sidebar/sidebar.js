import React, { useState } from 'react';
import { navigationPages, socialMedia } from '../../config';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, onItemClicked }) => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (item) => {
    setActiveItem(item.path);
    onItemClicked(item.path);
  };

  return (
    <div className="bg-blue-600">
      <span
        className="absolute text-white text-3xl top-5 left-4 cursor-pointer"
        onClick={toggleSidebar}
      >
        <i className="bi bi-list px-2 bg-gray-900 rounded-md"></i>
      </span>
      <div
        className={`sidebar z-30 fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <div className="text-gray-100">
          <div className="my-5 mr-5 flex items-center w-full">
            <i className="bi bi-app-indicator px-2 text-xl py-1 rounded-md bg-yellow-600"></i>
            <h1 className="font-bold text-gray-200 w-2/3 text-base ml-2">
              LPL
            </h1>
            <i
              className="bi bi-x text-xl  mr-5 cursor-pointer ml-28"
              onClick={toggleSidebar}
            ></i>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        {navigationPages.map((item) => (
        //   <Link to={item.path} key={item.path}>
            <div
              className={`p-2.5 mt-3 flex hover:bg-yellow-600 hover:bg-opacity-40 items-center rounded-md px-4 duration-300 cursor-pointer text-white ${
                activeItem === item.path ? 'bg-yellow-600 hover:bg-opacity-100' : ''
              }`}
              onClick={() => handleItemClick(item)}
            >
              <i className={item.icon}></i>
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                {item.label}
              </span>
            </div>
        //   </Link>
        ))}
        <hr className="opacity-20 mt-10" />
        <div className="absolute bottom-10 left-5 text-white text-3xl">
          {socialMedia.map((social) => (
            <Link to={social.link} key={social.link}>
              <i className={social.icon + ' mr-10'} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
