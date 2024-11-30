import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ArticlePreview = ({
  link,
  type,
  id,
  image,
  title,
  descr,
  tags,
  date,
  authors,
  alt,
}) => {
  return (
    <>
      <Helmet>
        <title>{`Home - Lega Pauper Livorno`}</title>
        <meta name="description" content={descr} />
        <meta
          name="keywords"
          content={`${tags.map((tag) => tag + " ")}, article, ${title}`}
        />
      </Helmet>
      <Link to={link} state={{ type: type, id: id }}>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="w-full hover:opacity-80 h-[200px] bg-cover bg-center rounded-xl mt-10 overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-70"
        >
          <div className="relative z-20 max-w-screen-lg p-5 md:p-10 h-full items-center">
            <div className="flex">
            {tags.map((tag) => (
              <p className="mb-2 mr-2 block font-sans text-xs md:text-sm bg-pink-500 rounded-full w-fit px-5 text-white font-semibold uppercase leading-relaxed tracking-normal antialiased">
                {tag}
              </p>
            ))}
            </div>
            <h2 className="mb-2 block font-sans text-xl text-white font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {title}
            </h2>
            <p className="text-white font-light text-sm block md:block">{descr}</p>
            {authors && (
              <div className="absolute bottom-5 left-5">
                {authors.map((author, i) => (
                  <p
                    key={i}
                    className="text-white text-xs float-left mr-2 underline"
                  >
                    {author}
                  </p>
                ))}
              </div>
            )}
            {date && (
              <div className="absolute bottom-5 right-5">
                <p className="text-white text-xs">{date}</p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArticlePreview;
