import React from "react";
import { Helmet } from "react-helmet";

export const SectionHead = ({ background, title, infoRight, backButton }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={`Dettagli su ${title}`} />
        <meta name="keywords" content={`Lega Pauper, ${title}, eventi`} />
      </Helmet>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="h-64 md:rounded-t-xl w-full bg-cover bg-center flex justify-center items-center overflow-hidden z-0 relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-40"
      >
        {backButton && (
          <p
            className="text-3xl cursor-pointer hover:opacity-85 w-fit font-bold absolute top-5 left-5 z-20 text-white space-x-2"
            onClick={() => (window.location.href = backButton)}
          >
            <i className="bi bi-arrow-left-circle-fill"></i>
          </p>
        )}
        {infoRight && (
          <p className={`absolute text-white right-5 z-20 top-5 ${infoRight === "In Corso" ? 'bg-green-500' : 'bg-red-600'} px-5 py-2 rounded-full bg-opacity-70`}>
            {infoRight}
          </p>
        )}
        {title && (
          <h1 className="text-white font-bold text-3xl md:text-5xl relative z-20">
            {title}
          </h1>
        )}
      </div>
    </>
  );
};
