import React from "react";
import { Navbar } from "../../components/navbar/navbar";

const StatsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar item={"stats"} />
      <main className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Arrrr, in Arrivo!</h1>
          <p className="text-gray-600">Stiamo lavorando duramente per portare questa funzione a bordo. Resta in ascolto!</p>
        </div>
      </main>
    </div>
  );
};

export default StatsPage;
