// src/pages/maintenance/MaintenancePage.js
import React from 'react';
import { Helmet } from 'react-helmet';

const MaintenancePage = () => {
  return (
    <>
      <Helmet>
        <title>Manutenzione - Lega Pauper Livorno</title>
        <meta name="description" content="Il sito è attualmente in manutenzione. Torna presto per scoprire tutte le novità!" />
        <meta name="keywords" content="manutenzione, Lega Pauper, sito in costruzione" />
      </Helmet>
      <div className="h-screen w-screen bg-gray-200 flex items-center justify-center">
        <div className="container mx-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-center md:justify-between text-gray-800">
          <div className="w-full md:w-1/2 lg:w-2/5 text-center md:text-left mb-8 md:mb-0">
            <div className="text-4xl md:text-5xl lg:text-6xl text-blue-600 font-bold mb-6 md:mb-8">Ahoy! Sito in Manutenzione</div>
            <p className="text-lg md:text-xl lg:text-2xl text-black leading-relaxed">
              Stiamo riparando la nave, mateloti! Arghh, tenete d'occhio il vostro cannochiale!
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5 flex justify-center md:justify-end">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e632e5f3-ea51-4a14-a0fe-3478869513d3/dfsqjao-45b666a7-8292-4294-8b9c-2041e82b1d55.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U2MzJlNWYzLWVhNTEtNGExNC1hMGZlLTM0Nzg4Njk1MTNkM1wvZGZzcWphby00NWI2NjZhNy04MjkyLTQyOTQtOGI5Yy0yMDQxZTgyYjFkNTUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kns3GtbPCAOWiAB81DbuWYqMSH8x5y7h0XPm9RZeDMM"
              className="w-full h-full"
              alt="Sito in costruzione"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenancePage;
