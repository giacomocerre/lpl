import Events from "./events/events";
import Home from "./home/home";
import Rank from "./rank/rank";
import Stats from "./stats/stats";

const VIEWS =  {
    home: <Home />,
    rank: <Rank />,
    events: <Events />,
    stats: <Stats />,
};

export default VIEWS;