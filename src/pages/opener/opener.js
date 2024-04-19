// Opener.js
import React from 'react';
import IMG from '../../assets';
import { Link } from "react-router-dom";

const Opener = () => {
  return (
    <div className='bg-slate-800'>
      <div style={{backgroundImage:"url("+IMG.opener+")"}} className="w-screen bg-cover bg-center h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-70">
        <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-0 md:grid-cols-5 p-10 h-full items-center">
          <div className="col-span-6">
            <span className="uppercase text-md font-bold mb-2 block bg-white w-fit py-1 px-5 rounded-full text-black">WE ARE ALL PIRATES</span>
            <h1 className="text-white font-extrabold md:text-6xl text-5xl mb-8">Sito ufficiale <br/>Lega Pauper Livorno</h1>
            <p className="text-stone-100 text-md text-base">
              Esplorando i meandri della Lega: Un'esauriente rassegna degli eventi e delle curiosità che coinvolgono la nostra ciurma
            </p>
            <Link to="/dashboard">
              <button className="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">Entra nel Galeone</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Opener;
