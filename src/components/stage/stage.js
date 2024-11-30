import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/context';
import { getArtworkImage, getRandomImage } from '../../utils/utils';
import { Link } from 'react-router-dom';

export const Stage = ({ event, stage, final, onClick }) => {
    const { userLoggedIn } = useAuth();
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const top8 = stage.rank[0];
                if (top8.list?.main?.main[0]?.cardName) {
                    const url = await getArtworkImage(top8.list.deck.main[0].cardName);
                    setImageUrl(url);
                } else {
                    const url = getRandomImage();
                    setImageUrl(url);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                const url = getRandomImage();
                setImageUrl(url);
            }
        };

        fetchImage();
    }, [stage]);

    const currentDate = new Date();

    const getDateOnly = (date) => {
        return date.toISOString().split('T')[0];
    };

    const isFutureDate = (stageDate) => {
        const stageDateTime = new Date(stageDate);
        return getDateOnly(stageDateTime) >= getDateOnly(currentDate);
    };

    const isToday = (stageDate) => {
        const stageDateTime = new Date(stageDate);
        return getDateOnly(stageDateTime) === getDateOnly(currentDate);
    };

    const getDateString = (stageDate) => {
        return isToday(stageDate) ? "Oggi" : "Prossimamente";
    };

    const beforeBgColor = final ? 'before:bg-gray-800' : 'before:bg-black';
    const borderColor = final ? 'border-yellow-500' : 'border-white';

    return (
        <>
            <Helmet>
                <meta name="description" content={`Details about Stage ${stage.number}, including players, date, and current status.`} />
                <meta name="keywords" content={`Stage ${stage.number}, Lega Pauper Livorno, ranking, tournament`} />
            </Helmet>
            <Link to={"/event/"+event.urlName+"/"+stage.number} state={{eventId: event.id, stageNumber: stage.number }}>
            <div 
                style={{ backgroundImage: `url(${imageUrl})` }}
                className={`h-64 hover:opacity-85 cursor-pointer border-4 ${borderColor} rounded-xl mb-10 w-full bg-cover bg-center overflow-hidden z-0 relative before:block before:absolute ${beforeBgColor} before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-40`}
            >
                <div className="rounded-3xl p-8 shadow-md text-white relative z-20">
                    <div className='flex space-x-3 justify-between'>
                        <p className="text-2xl font-bold text-white">{final ? "Finale" : "Tappa " + stage.number}</p>
                        <div>
                            {userLoggedIn &&
                            <Link to={"/creation/"+event.urlName+"/"+stage.number} state={{eventId: event.id, stageNumber: stage.number }}>

                                <p 
                                    className='py-2 px-4 cursor-pointer bg-blue-500 text-white rounded-md hover:opacity-90'>
                                    Gestisci <i className="bi bi-gear-fill"></i>
                                </p>
                            </Link>
                            }
                        </div>
                    </div>
                    <p><i className="bi bi-calendar-event-fill text-normal"></i> {stage.date}</p>
                    <p><i className="bi bi-people-fill"></i> {stage.players.length}</p>
                    {stage.rank.length > 0 && <p><i className="bi bi-trophy-fill"></i> {stage.rank[0].player}</p>}
                    {isFutureDate(stage.date) && <p className='bg-green-600 mt-5 absolute w-fit py-1 px-3 text-sm rounded-md'>{getDateString(stage.date)}</p>}
                    {!isFutureDate(stage.date) && <p className='bg-orange-600 mt-5 absolute w-fit py-1 px-3 text-sm rounded-md'>Terminata</p>}
                </div>
            </div>
            </Link>
        </>
    );
};
