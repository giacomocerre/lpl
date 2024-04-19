import Events from "./views/events/events";
import Home from "./views/home/home";
import Rank from "./views/rank/rank";
import Stats from "./views/stats/stats";

export const navigationPages = [
    {path: "home", label:"Home", icon:"bi bi-house-door-fill"},
    {path: "rank", label:"Classifica LPL", icon:"bi bi-award-fill"},
    {path: "events", label:"Eventi", icon:"bi bi-calendar-heart-fill"},
    {path: "stats", label:"Statistiche", icon:"bi bi-bar-chart-fill"},
]

export const socialMedia = [
    {link:"https://www.instagram.com/lega_pauper_livorno/", label:"Instagram", icon:"bi bi-instagram"},
    {link:"https://www.facebook.com/profile.php?id=61555829590452&locale=it_IT", label:"Facebook", icon:"bi bi-facebook"},
    {link:"https://chat.whatsapp.com/Jk8VagNVLVmFVQz8tVh9jj", label:"Whatsapp", icon:"bi bi-whatsapp "}
    // {link:"mailto:legapauperlivorno@gmail.com", label:"EMail", icon:"bi bi-envelope"},
]