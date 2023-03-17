import ReactStarsRating from 'react-awesome-stars-rating';
import { Link } from "react-router-dom";
import { createClient } from 'pexels';
import { useState } from 'react';

const PlaceCard = ({ place, type }) => {

    const client = createClient
        ('LMe16MzbE3xAVjnzK4CBaAiAwyTbgJ73idgPufKhvl5CpmYkwJ420Bit');
    const query = place?.name;
    const [tempPic, setTempPic] = useState("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2011/09/23/1d/idea_matira-beach,-bora-bora_311x175.rend.hgtvcom.1280.720.suffix/1491585576492.jpeg")
    client.photos.search({ query, per_page: 1 }).then(photos => photos ? setTempPic(photos.photos[0].src.original) : null);
    return (
        <>
            {/* Place card is rendered if place prop is received */}
            {place && <div className="group cursor-pointer">
                {/* Place location_id is passed as parameter to place_type (hotels || restaurants || attractions) route for full place details */}
                <Link to={`${type}/${place?.name}`}>
                    {/* Place Photo is render if found or a default image is renderedas fallback */}
                    <img src={tempPic? tempPic : 'https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg'}
                        alt={place?.name}
                        className="w-full h-[250px] object-cover group-hover:brightness-125"
                    />
                    {/* --- */}

                    {/* Place name */}
                    <h2 className="font-semibold text-lg group-hover:underline">
                        {place?.name}
                    </h2>
                    {/* --- */}

                    {/* Place Rating with place.rating value passed into component to render star rating */}
                    <span className="flex items-center mb-2">
                        <ReactStarsRating
                            value={Number(place?.rate)}
                            className="flex mr-2"
                            size={20}
                            isEdit={false}
                            primaryColor="#00afef"
                            secondaryColor="#e5e7eb"
                        />
                        ~ {place?.dist} Distance
                    </span>
                    {/* --- */}
                </Link>
                {/* --- */}
            </div>}
        </>
    );
}

export default PlaceCard;