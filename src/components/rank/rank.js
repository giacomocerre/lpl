import React from "react";
import { Helmet } from "react-helmet";

const Rank = ({ rank }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content="View the rankings of top players with their scores and details." />
        <meta name="keywords" content="ranking, players, scores, leaderboard" />
      </Helmet>
      <div className="bg-white border-2 border-gray-100 shadow-lg rounded-xl lg:p-5 lg:w-full w-fit mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 px-4 text-left text-gray-700">Rank</th>
              <th className="py-3 px-4 text-left text-gray-700">Player</th>
              <th className="py-3 px-4 text-right text-gray-700">Points</th>
            </tr>
          </thead>
          <tbody>
            {rank.map((user, index) => (
              <tr
                key={index}
                className={`border-b border-gray-300 ${index < 8 ? 'bg-yellow-100' : ''}`}
              >
                <td className="py-3 px-4">{index + 1}°</td>
                <td className="py-3 px-4 flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/190/190610.png"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-4"
                  />
                  <span className="text-gray-800 font-bold lg:text-xl">{user.player}</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="bg-green-700 px-3 py-1 rounded-full text-white font-bold lg:text-xl">{user.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Rank;
