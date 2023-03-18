import React from "react";

const EmergencyContactCard = ({ title, number, controlRoom, stationName, stationAddress, stationPhone }) => {
  console.log('====================================');
  console.log(title);
  console.log('====================================');
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-2">Emergency Number: {number}</p>
        <p className="text-gray-700 text-base mb-2">Control Room: {controlRoom}</p>
        <hr className="my-2" />
        <p className="text-gray-700 text-base mb-2">Station Name: {stationName}</p>
        <p className="text-gray-700 text-base mb-2">Station Address: {stationAddress}</p>
        <p className="text-gray-700 text-base mb-2">Station Phone: {stationPhone}</p>
      </div>
    </div>
  );
};

export default EmergencyContactCard;
