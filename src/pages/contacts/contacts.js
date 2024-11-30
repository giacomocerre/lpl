import React from "react";
import { Helmet } from "react-helmet";
import { Navbar } from "../../components/navbar/navbar";
import IMG from "../../assets";
import { socialMedia } from "../../config";

export const ContactsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Contatti - Direttivo Lega Pauper Livorno</title>
        <meta
          name="description"
          content="Chi siamo. Il direttivo della Lega Pauper Livorno nomi e contatti."
        />
        <meta name="keywords" content="Lega Pauper, direttivo, contatti, lpl" />
      </Helmet>
      <Navbar item={"contacts"} />
      <div className="p-5 md:p-20 bg-[#f6f6f6]">
        <h1 className="text-4xl font-extrabold">Il Direttivo</h1>
        <p className="mt-4 text-lg">
          Qua puoi trovare tutte le informazioni relative alle persone che
          gestiscono e portano avanti la Lega Pauper Livorno
        </p>
        <div className="mt-10 bg-white p-10 rounded-xl border">
          <h3 className="text-2xl font-bold mb-10">Contatti Generali</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl dark:bg-gray-50 dark:text-gray-800">
              <img
                src={socialMedia.lpl.profileImage}
                alt=""
                className="w-32 h-32 mx-auto rounded-full dark:bg-gray-300 aspect-square"
              />
              <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                <div className="my-2 space-y-1">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Lega Pauper Livorno
                  </h2>
                  <p className="px-5 text-xs sm:text-base dark:text-gray-600">
                    Contatti Centrali
                  </p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                  <a
                    href={socialMedia.lpl.instagram.link}
                    aria-label={socialMedia.lpl.instagram.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href={socialMedia.lpl.facebook.link}
                    aria-label={socialMedia.lpl.facebook.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href={socialMedia.lpl.moxfield.link}
                    aria-label={socialMedia.lpl.moxfield.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <img
                      src={IMG.moxfield}
                      alt="logo moxfield"
                      className="w-6"
                    />
                  </a>
                  <a
                    rel="noopener noreferrer"
                    href={socialMedia.lpl.email.link}
                    aria-label={socialMedia.lpl.email.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-envelope-at-fill"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl dark:bg-gray-50 dark:text-gray-800">
              <img
                src={socialMedia.cdf.profileImage}
                alt=""
                className="w-32 h-32 mx-auto rounded-full dark:bg-gray-300 aspect-square"
              />
              <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                <div className="my-2 space-y-1">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Centro Del Fumetto
                  </h2>
                  <p className="px-5 text-xs sm:text-base dark:text-gray-600">
                    Contatti Centrali
                  </p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                  <a
                    href={socialMedia.cdf.instagram.link}
                    aria-label={socialMedia.cdf.instagram.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href={socialMedia.cdf.facebook.link}
                    aria-label={socialMedia.cdf.facebook.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href={socialMedia.cdf.whatsapp.link}
                    aria-label={socialMedia.cdf.whatsapp.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-whatsapp"></i>
                  </a>
                  <a
                    href={socialMedia.cdf.telegram.link}
                    aria-label={socialMedia.cdf.telegram.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-telegram"></i>
                  </a>
                  <a
                    href={socialMedia.cdf.website.link}
                    aria-label={socialMedia.cdf.website.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-globe"></i>
                  </a>
                  <a
                    rel="noopener noreferrer"
                    href={socialMedia.cdf.email.link}
                    aria-label={socialMedia.cdf.email.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-envelope-at-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold my-10">Le Persone</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl dark:bg-gray-50 dark:text-gray-800">
              <img
                src={socialMedia.bomber.profileImage}
                alt=""
                className="w-32 h-32 mx-auto rounded-full dark:bg-gray-300 aspect-square"
              />
              <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                <div className="my-2 space-y-1">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Matteo Salvador
                  </h2>
                  <p className="px-5 text-xs sm:text-base dark:text-gray-600">
                    Referente di Lega
                  </p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                  <a
                    href={socialMedia.bomber.instagram.link}
                    aria-label={socialMedia.bomber.instagram.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href={socialMedia.bomber.facebook.link}
                    aria-label={socialMedia.bomber.facebook.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    rel="noopener noreferrer"
                    href={socialMedia.bomber.email.link}
                    aria-label={socialMedia.bomber.email.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-envelope-at-fill"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl dark:bg-gray-50 dark:text-gray-800">
              <img
                src={socialMedia.bubbe.profileImage}
                alt=""
                className="w-32 h-32 mx-auto rounded-full dark:bg-gray-300 aspect-square"
              />
              <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                <div className="my-2 space-y-1">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Roberto "Bubberio" Paoli
                  </h2>
                  <p className="px-5 text-xs sm:text-base dark:text-gray-600">
                    Gestione e Organizzazione
                  </p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                  <a
                    href={socialMedia.bubbe.instagram.link}
                    aria-label={socialMedia.bubbe.instagram.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href={socialMedia.bubbe.facebook.link}
                    aria-label={socialMedia.bubbe.facebook.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    rel="noopener noreferrer"
                    href={socialMedia.bubbe.email.link}
                    aria-label={socialMedia.bubbe.email.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-envelope-at-fill"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl dark:bg-gray-50 dark:text-gray-800">
              <img
                src={socialMedia.cerre.profileImage}
                alt=""
                className="w-32 h-32 mx-auto rounded-full dark:bg-gray-300 aspect-square"
              />
              <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                <div className="my-2 space-y-1">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Giacomo Cerretini
                  </h2>
                  <p className="px-5 text-xs sm:text-base dark:text-gray-600">
                    Developer and Designer
                  </p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                  <a
                    href={socialMedia.cerre.instagram.link}
                    aria-label={socialMedia.cerre.instagram.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href={socialMedia.cerre.facebook.link}
                    aria-label={socialMedia.cerre.facebook.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    rel="noopener noreferrer"
                    href={socialMedia.cerre.email.link}
                    aria-label={socialMedia.cerre.email.label}
                    className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
                  >
                    <i className="bi bi-envelope-at-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
