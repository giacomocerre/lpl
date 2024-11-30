import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Navbar } from "../../components/navbar/navbar";
import ArticlePreview from "../../components/articlePreview/articlePreview";
import { getRandomImage } from "../../utils/utils";
import { getLeagues } from "../../firebase/api/events.api";

export const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getLeagues();
        // Sort events by dateStart in descending order (most recent first)
        const sortedEvents = eventsData.sort((a, b) => {
          const dateA = new Date(a.dateStart);
          const dateB = new Date(b.dateStart);
          return dateB - dateA; // Descending order (most recent first)
        });
        setEvents(sortedEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Home - Lega Pauper Livorno</title>
        <meta name="description" content="Benvenuti nella Lega Pauper Livorno! Scopri eventi, aggiornamenti e notizie entusiasmanti." />
        <meta name="keywords" content="Lega Pauper, eventi, notizie, aggiornamenti" />
      </Helmet>
      <Navbar item={"home"} />
      <div className="p-5 md:p-20 bg-[#f6f6f6]">
        <h1 className="text-4xl font-extrabold">Benvenut* nella ciurma!</h1>
        <p className="mt-4 text-lg">
          Salpa con noi per un'avventura nel mondo della Lega Pauper Livorno! Qui troverai tutte le novità, gli aggiornamenti e le esplorazioni più recenti. Preparati a navigare tra eventi e scoperte esclusive.
        </p>
        <div className="mt-10 bg-white p-10 rounded-xl border">
          <h2 className="text-2xl font-bold">Le Ultime Notizie</h2>
          <p className="mt-2 text-lg">
            Non perdere le ultime novità della <span className="font-extrabold underline">Lega Pauper Livorno</span>. 
            Scopri le ultime tendenze, eventi e aggiornamenti che stanno scuotendo il nostro mondo!
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
          <ArticlePreview
              link="/contacts"
              title="Chi Siamo?"
              descr="La nostra ciurma che porta avanti il galeone."
              image={getRandomImage()}
              tags={["Ciurma", "Contatti"]}
              date="24 Set 2024"
            />
            <ArticlePreview
              link="/league"
              title="Esplora tutte le leghe!"
              descr="Un approfondimento sulle leghe più entusiasmanti e le strategie vincenti."
              image={getRandomImage()}
              tags={["Leghe"]}
              date="02 Set 2024"
            />
            {events.map((event, index) =>
                <ArticlePreview
                link={"/event/"+event.urlName}
                type="1"
                id={event.id}
                title={event.name}
                image={getRandomImage()}
                tags={["Lega"]}
                date="02 Set 2024"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};