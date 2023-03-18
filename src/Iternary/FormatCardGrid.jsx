import React from "react";


const Card = ({ cardData }) => {
    const { name, type, rating, price, timeToReach, imageUrl } = cardData;

    return (
        <div >
            <div style={{ transform: "translate(-100px,10px)", zIndex: 0, position: "relative" }} className="bg-green-500 pb-2 pt-1 py-1  rounded-lg w-32 self-start flex">
                <span className="text-zinc-200 mr-4 text-center text-lg font-semibold px-1">Rating {rating.toFixed(1)}

                </span>
            </div>
            <div style={{ zIndex: 5, position: "relative" }} className="bg-white shadow-md rounded-md p-10 mb-4  border-l-4 border-green-500 flex">
                <div className="w-32 h-20 mr-4">
                    {/* <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-md" /> */}
                    <img src="https://ychef.files.bbci.co.uk/976x549/p04tx3m6.jpg" alt={name} className="w-full h-full object-cover rounded-md" />
                </div>
                <div>
                    <h3 className="font-medium text-lg mb-2">{name}</h3>
                    <p className="text-gray-600">{type}</p>
                    <div className="flex items-center mt-2">
                        <span className="text-gray-600 mr-4">{price}</span>
                        <span className="text-gray-600">{timeToReach}</span>
                    </div>
                </div>
            </div>
        </div>

    );
};


const CardGrid = ({ cards }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
                cards.map((card) => (
                    <div key={card.id} className="flex">
                        <Card cardData={card} />
                    </div>
                ))
            }


        </div>
    );
};

export default CardGrid;
