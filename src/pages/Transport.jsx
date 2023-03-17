import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { Footer, HotelCard, Navbar } from "../components";
import { getPlacesByLatLng } from "../api";
import { PlaceListLoader } from "../components/loaders";
import map from "../img/map.png";
import moment from "moment";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Information } from "../Iternary/Iternary";
const HotelsList = () => {
    // Destructuring the neccessary states from the main context
    const { coordinates, isLoading, setIsLoading, setType } = useContext(MainContext);
    const [flights, setFlights] = useState();
    const { info, setInfo } = useContext(Information)
    const [guestsToggle, setGuestsToggle] = useState(false);
    const history = useHistory();
    const location = localStorage.getItem('destination')
    // console.log(location)
    // Scroll State Handler
    const [scrolled, setScrolled] = useState(false);
    document.addEventListener('scroll', () => window.scrollY > 100 ? setScrolled(true) : setScrolled(false));

    // Filter Parameter state with certain Default value set

    useEffect(() => {
        var config = {
            method: 'get',
            url: `https://jpmc-project.onrender.com/api/transport/flights/paris/${location}/${info.start}/${info.end}/${info.adults}/0`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(response.data.data);
                // setPlaces(response.data.data)
                setFlights(response.data.data)
                // places.reverse();
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(filterParams.checkin, filterParams.checkout, filterParams.rooms, filterParams.adults)
    }, [location])
    return (
        <>
            <div className="pb-4">
                <div className="my-2 border border-gray-200 hover:shadow-xl h-fit" style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', padding: '16px 24px', marginBottom: '10px' }}>
                    <p style={{ margin: 'auto', width: '20%', fontWeight: '600' }}>Company Name</p>
                    <p style={{ margin: 'auto', width: '20%', fontWeight: '600' }}>Departure</p>
                    <p style={{ margin: 'auto', width: '20%', fontWeight: '600' }}>Duration</p>
                    <p style={{ margin: 'auto', width: '20%', fontWeight: '600' }}>Arrival</p>
                    <p style={{ margin: 'auto', width: '20%', fontWeight: '600' }}>Price</p>
                </div>
                {!flights ? (<PlaceListLoader />) : (
                    <div >
                        {flights?.map((flight) => {
                            let arrival = new Date(flight.legs[0].arrival)
                            let departure = new Date(flight.legs[0].departure)
                            let arrivalDate = arrival.toLocaleDateString()
                            let departureDate = departure.toLocaleDateString()
                            let departureTime = departure.toTimeString().slice(0, 5)
                            let arrivalTime = arrival.toTimeString().slice(0, 5)
                            console.log(arrivalTime, departureTime)
                            return (<div className="my-2 border border-gray-200 hover:shadow-xl h-fit" style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', padding: '16px 24px', marginBottom: '10px' }}>
                                <p style={{ margin: 'auto', width: '20%' }}>{flight.legs[0].carriers.marketing[0].name}</p>
                                <div style={{ margin: 'auto', width: '20%' }}>
                                    <p style={{ fontWeight: '600' }}>{departureTime}</p>
                                    <p style={{ fontSize: '0.7rem' }}>{flight.legs[0].origin.city}</p>
                                </div>
                                <p style={{ margin: 'auto', width: '20%' }}>{flight.legs[0].durationInMinutes} minutes</p>
                                <div style={{ margin: 'auto', width: '20%' }}>
                                    <p style={{ fontWeight: '600' }}>{arrivalTime}</p>
                                    <p style={{ fontSize: '0.7rem' }}>{flight.legs[0].destination.city}</p>
                                </div>
                                <p style={{ margin: 'auto', width: '20%', fontWeight: '600' }}>{flight.price.formatted}</p>
                            </div>)


                        })}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default HotelsList;