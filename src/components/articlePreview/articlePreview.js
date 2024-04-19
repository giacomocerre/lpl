import React from "react";
import { Link } from "react-router-dom";

const ArticlePreview = ({ link, image, title, descr, tag, date, authors }) => {

  return (
    <Link to="">
      <div style={{backgroundImage:"url("+image+")"}} className="w-full hover:opacity-80 h-[200px] bg-cover bg-center rounded-xl mt-10 overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-70">
        <div className="relative z-20 max-w-screen-lg p-10 h-full items-center">
        <h6 className="mb-2 block font-sans text-sm bg-pink-500 rounded-full w-fit px-5 text-white font-semibold uppercase leading-relaxed tracking-normal antialiased">
              {tag}
            </h6>
        <h4 className="mb-2 block font-sans text-xl text-white font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {title}
            </h4>
        <p className="text-white text-sm hidden md:block">{descr}</p>
        {authors?
            <div className="absolute bottom-5 left-5">
                {authors.map(author =>
                    <p className="text-white text-xs float-left mr-2 underline">{author}</p>
                )}
            </div> : null}
        {date?
            <div className="absolute bottom-5 right-5">
                <p className="text-white text-xs">{date}</p>
            </div> : null}
        </div>
        </div>
    </Link>

  );
};

export default ArticlePreview;
