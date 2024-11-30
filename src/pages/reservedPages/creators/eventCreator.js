import React from "react";
import { Helmet } from "react-helmet";
import IMG from "../../../assets";
import { Navbar } from "../../../components/navbar/navbar";
import { SectionHead } from "../../../components/sectionHead/sectionHead";

export const EventCreator = () => {
  return (
    <div>
      <Helmet>
        <title>Crea Evento - Lega Pauper Livorno</title>
        <meta name="description" content="Crea un nuovo evento per la Lega Pauper Livorno. Unisciti a noi e inizia la tua avventura!" />
        <meta name="keywords" content="crea evento, Lega Pauper, torneo, eventi" />
      </Helmet>
      <Navbar item={"creatorLeague"} />
      <div className="p-0 md:p-10 bg-[#f6f6f6]">
        <div className="rounded-t-xl shadow-md w-full">
          <SectionHead background={IMG.tolarian} title="Crea un nuovo evento singolo" backButton="/login" />
          <div className="p-10">
            <p>ciao</p>
          </div>
        </div>
      </div>
    </div>
  );
};
