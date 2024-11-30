import React from 'react';
import IMG from '../../assets';

const Loader = ({ card, onClose }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <img src={IMG.loading} alt="loading..." className="w-80 lg:w-64" />
      </div>
    </div>
  );
};

export default Loader;
