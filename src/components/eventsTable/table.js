import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { encryptId, eventsMapping, eventTypes, getEventType, useIsMobile } from "../../utils/utils";
import { useAuth } from "../../context/context";

const ITEMS_PER_PAGE = 5;

export const Table = ({ title, rows, cols, emptyMessage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("Tutti");
  const [statusFilter, setStatusFilter] = useState("Qualsiasi Stato");
  const [searchQuery, setSearchQuery] = useState("");

  const isMobile = useIsMobile();
  const { userLoggedIn } = useAuth();

  const filteredRows = rows
    .filter(row => typeFilter === "Tutti" || row.type === eventsMapping[typeFilter])
    .filter(row => 
      statusFilter === "Qualsiasi Stato" ||
      (statusFilter === "In Corso" && row.status) ||
      (statusFilter === "Terminato" && !row.status)
    )
    .filter(row => row.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const paginatedRows = filteredRows.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content={`Browse through the events table for ${title}.`} />
        <meta name="keywords" content={eventTypes.join(', ') + ', events'} />
      </Helmet>
      <div className="mx-auto mt-12">
        <div className="py-8">
          <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  aria-label="Filter by event type"
                >
                  <option>Tutti</option>
                  {eventTypes.map((event, index) => (
                    <option key={index}>{event}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                >
                  <option>Qualsiasi Stato</option>
                  <option>In Corso</option>
                  <option>Terminato</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Cerca"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="appearance-none rounded-l border border-gray-400 block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                aria-label="Search events"
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal" aria-labelledby="table-title">
                <thead>
                  <tr>
                    {cols.map((col, index) => (
                      <th key={index} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" scope="col">
                        {col}
                      </th>
                    ))}
                    {userLoggedIn && (
                      <th key="event_manage" className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" scope="col">
                        Gestione
                      </th>
                    )}
                  </tr>
                </thead>
                {paginatedRows.length > 0 ? (
                  <tbody>
                    {paginatedRows.map((row, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" onClick={() => console.log(row.name)}>
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 font-bold text-xl whitespace-no-wrap">{row.name}</p>
                            </div>
                          </div>
                        </td>
                        {!isMobile && (
                          <>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{row.dateStart.toString()}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{row.dateEnd}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{getEventType(row.type)}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span className={`relative inline-block px-3 rounded-full py-1 font-semibold text-green-900 leading-tight ${row.status ? "bg-green-200 opacity-60" : "bg-red-200 opacity-60"}`}>
                                <span aria-hidden className={`absolute inset-0 rounded-full ${row.status ? "bg-green-200 opacity-60" : "bg-red-200 opacity-60"}`}></span>
                                <span className="relative text-gray-900">{row.status ? "In Corso" : "Terminato"}</span>
                              </span>
                            </td>
                          </>
                        )}
                        {userLoggedIn && (
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p
                              className="text-gray-500 text-xl w-fit ml-5 cursor-pointer"
                              onClick={() => window.location.href = `/event/${row.type}/${encryptId(row.id)}`}
                              aria-label={`Manage event ${row.name}`}
                            >
                              <i className="bi bi-gear-fill"></i>
                            </p>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={cols.length} className="text-l text-center py-5 w-full font-normal text-gray-400 bg-white">
                        {emptyMessage}
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>

              {filteredRows.length > 0 && (
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between" aria-live="polite">
                  <span className="text-xs xs:text-sm text-gray-900 font-normal">
                    Pagina {currentPage} di {totalPages} - {filteredRows.length} Elementi
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                      aria-label="Previous page"
                    >
                      Prew
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
