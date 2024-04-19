import React from "react";
import IMG from "../../assets";
import ArticlePreview from "../../components/articlePreview/articlePreview";

const Home = () => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold">Benvenut* nella ciurma!</h1>
      <p>Questa è la pagia ufficiale della Lega Pauper Livorno.</p>
      <div className="mt-10 bg-white p-10 rounded-xl border">
        <h2 className="text-2xl font-bold"> Le Ultime Notizie</h2>
        <p>Qui puoi trovare le ultime novità della <span className="font-extrabold underline">LPL</span></p>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          <ArticlePreview
            link="#"
            title="Perché Tolarian è forte?"
            descr="Lorem Ipsum dolor sit ament di sto cazzo heeheh"
            image={IMG.tolarian}
            tag="Analisi"
            date="1 Feb 2024"
            authors={["Giacomo Cerretini","Bubbio"]}
          />

          <ArticlePreview
            link="#"
            title="5 Modi per Battere Tolatrian"
            descr="Scopri i segreti per sconfiggere Tolarian e dominare il campo di battaglia."
            image={IMG.tolarian}
            tag="Strategia"
          />

          <ArticlePreview
            link="#"
            title="Tolarian: Il Re delle Creature"
            descr="Un'analisi approfondita sulle capacità di Tolarian nel metagame attuale."
            image={IMG.tolarian}
            tag="Creatures"
          />

          <ArticlePreview
            link="#"
            title="Tolarian: Un Campione Incontestato"
            descr="Esplora la storia di Tolarian e la sua ascesa alla gloria nel mondo del gioco."
            image={IMG.tolarian}
            tag="Storia"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
