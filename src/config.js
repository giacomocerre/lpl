import IMG from "./assets"

export const navigationPages = [
    {path: "/home", name:"home", label:"Home", icon:"bi bi-house-door-fill"},
    {path: "/league", name:"league", label:"Lega", icon:"bi bi-trophy-fill"},
    {path: "/events", name:"events", label:"Eventi", icon:"bi bi-calendar-heart-fill"},
    {path: "/stats", name:"stats", label:"Statistiche", icon:"bi bi-bar-chart-fill"},
    {path: "/contacts", name:"contacts", label:"Chi Siamo", icon:"bi bi-people-fill"},
]

export const socialMedia = {
    lpl: {
        profileImage: IMG.logo,
        instagram: {link:"https://www.instagram.com/lega_pauper_livorno/", label:"Instagram lega pauper livorno"},
        facebook: {link:"https://www.facebook.com/profile.php?id=61555829590452&locale=it_IT", label:"Facebook lega pauper livorno"},
        whatsapp: {link:"https://chat.whatsapp.com/Jk8VagNVLVmFVQz8tVh9jj", label:"Whatsapp gruppo lega pauper livorno"},
        email: {link:"mailto:legapauperlivorno@gmail.com", label:"EMail lega pauper livorno"},
        moxfield: {link:"https://www.moxfield.com/users/LegaPauperLivorno", label:"Moxfield"}
    },
    cdf: {
        profileImage: IMG.cdf,
        instagram: {link:"https://www.instagram.com/centro_del_fumetto/?hl=it", label:"Instagram Centro del fumetto"},
        facebook: {link:"https://www.facebook.com/centro.delfumetto/?locale=it_IT", label:"Facebook Centro del fumetto"},
        whatsapp: {link:"https://api.whatsapp.com/send?phone=3331843228", label:"Whatsapp centro del fumetto"},
        email: {link:"mailto:centrodelfumettoonline@gmail.com", label:"EMail centro del fumetto"},
        website: {link:"https://www.centrodelfumetto.it/", label:"Sito web centro del fumetto"},
        telegram: {link:"https://t.me/CentrodelFumettoOnline", label: "Telegram Centro del fumetto"}
    },
    bomber: {
        profileImage: IMG.bomber,
        instagram: {link:"https://www.instagram.com/the_original_bomber/", label:"Instagram Matteo Salvador the original bomber"},
        facebook: {link:"https://www.facebook.com/matteo.salvador.921/", label:"Facebook Matteo Salvador the original bomber"},
        email: {link:"mailto:legapauperlivorno@gmail.com", label:"EMail Lega pauper livorno"},
    },
    bubbe: {
        profileImage: IMG.bubbe,
        instagram: {link:"https://www.instagram.com/bubberio/", label:"Instagram Roberto Paoli Bubberio"},
        facebook: {link:"https://www.facebook.com/roberto.paoli.56", label:"Facebook Roberto Paoli Bubberio"},
        email: {link:"mailto:legapauperlivorno@gmail.com", label:"EMail Lega pauper livorno"},
    },
    cerre:{
        profileImage: IMG.cerre,
        instagram: {link:"https://www.instagram.com/giacomocerre/", label:"Instagram Giacomo Cerretini"},
        facebook: {link:"https://www.facebook.com/giacomo.cerretini/", label:"Facebook Giacomo Cerretini"},
        email: {link:"mailto:legapauperlivorno@gmail.com", label:"EMail Lega pauper livorno"},
    }

}