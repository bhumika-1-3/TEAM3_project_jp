import { Navbar, WhereTo, ToVisit, ToEat, ToStay, Footer } from '../components';
import travelerChoiceBg from "../img/tc_cards_desktop.jpeg";
import travelerChoiceBgSM from "../img/tc_cards_tablet.jpeg";
import botb from "../img/botb_mark.svg";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { beaches, Popular } from "../Data/PreferenceData"
import { createClient } from 'pexels';
import { BiMapPin, BiMap } from "react-icons/bi";
import { Dialog, Transition } from "@headlessui/react";
import {
  MapContainer,
  Marker,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import mark from "../../assets/images/markers.png"


const Home = () => {


    const Card = ({ data, theme }) => {
        const client = createClient
            ('LMe16MzbE3xAVjnzK4CBaAiAwyTbgJ73idgPufKhvl5CpmYkwJ420Bit');
        const query = data.name;
        const [tempPic, setTempPic] = useState("https://travel.home.sndimg.com/content/dam/images/travel/fullset/2011/09/23/1d/idea_matira-beach,-bora-bora_311x175.rend.hgtvcom.1280.720.suffix/1491585576492.jpeg")

        client.photos.search({ query, per_page: 1 }).then(photos => photos ? setTempPic(photos.photos[0].src.original) : null);
        const [openMap, setOpenMap] = useState(false);
        const [openView, setOpenView] = useState(false);


        const markerIcon = new L.Icon({
            iconUrl: mark,
            iconSize: [35, 45],
            iconAnchor: [17, 46],
            popupAnchor: [3, -46],
        });

        const cancelButtonRef = useRef(null);
        const [center, setCenter] = useState({
            lat: 13.084,
            lng: 80.24
        });
        return (
            <div
                key={data.id}
                className="w-full rounded-xl shadow-lg border relative bg-gray-100"
            >
                <img
                    className="rounded-t-xl h-[35vh] w-full"
                    src={tempPic}
                    alt=""
                />
                <div className="px-4 py-6">
                    <h1 className="text-gray-600 text-xl font-bold mb-2">{data.name}</h1>
                    <h1 className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                        <HiOutlineLocationMarker className="text-lg" /> {data.location}
                    </h1>
                    {/* <div className="border-t border-b p-3 flex justify-between items-center">
            <h1 className="text-gray-400"> Date :</h1>
            <h1 className="text-gray-600 text-2xl font-bold">{data.date}</h1>
          </div> */}
                    <div className="flex justify-between">
                        <button
                            onClick={() => setOpenMap(true)}
                            className={`flex items-center gap-2 text-white font-semibold uppercase rounded-full px-6 py-2 ${theme == "emerald"
                                ? "bg-emerald-500"
                                : theme == "amber"
                                    ? "bg-amber-500"
                                    : theme == "sky"
                                        ? "bg-sky-500"
                                        : theme == "red"
                                            ? "bg-red-500"
                                            : theme == "violet"
                                                ? "bg-sky-500"
                                                : "bg-sky-500"
                                }`}
                        >
                            Location <BiMap />
                        </button>
                        <button
                            onClick={() => setOpenView(true)}
                            className={`flex items-center gap-2 text-white font-semibold uppercase rounded-full px-6 py-2 ${theme == "emerald"
                                ? "bg-emerald-500"
                                : theme == "amber"
                                    ? "bg-amber-500"
                                    : theme == "sky"
                                        ? "bg-sky-500"
                                        : theme == "red"
                                            ? "bg-red-500"
                                            : theme == "violet"
                                                ? "bg-sky-500"
                                                : "bg-sky-500"
                                }`}
                        >
                            <BiMapPin /> View
                        </button>
                    </div>
                </div>
                <Transition.Root show={openMap} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        initialFocus={cancelButtonRef}
                        onClose={setOpenMap}
                    >
                        <div className="fixed inset-0 z-10">
                            <div className="flex min-h-screen min-w-screen items-end justify-center text-center sm:items-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[70vw]">
                                        <MapContainer
                                            center={center}
                                            zoom="8"
                                        >
                                            <TileLayer url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=3DHOohQB1Ufdr3SDSGbf"></TileLayer>
                                            <Marker
                                                position={[data.latitude, data.longitude]}
                                                icon={markerIcon}
                                                key={data.name}
                                            ></Marker>
                                        </MapContainer>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                onClick={() => setOpenMap(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

            </div>
        );
    };
    // Home Page Trending in Travel toggle state 
    const [toggle, setToggle] = useState({
        toGo: true, // Place to Go state, active by defaul
        toDo: false, //Things to Do state
        toStay: false //Places to staty
    })

    return (
        <>
            {/* Navbar with Sticky poperty */}
            <Navbar sticky />
            {/* --- */}

            {/* Search Form - Where to */}
            <WhereTo />
            {/* --- */}
            <div className="grid grid-cols-3 gap-8 m-10">
                {Popular !== []
                    ? Popular.length > 0 &&
                    Popular.map((item) => <Card data={item} />)
                    : beaches.length > 0 &&
                    Popular.map((item) => <Card data={item} />)}
            </div>

            {/* Traveler Choice Section */}
            <div className="bg-[#004f32]">
                <div className="container mx-auto mmd:grid mmd:grid-cols-12 h-[400px] sm:h-[500px] mmd:h-[600px] overflow-hidden">
                    <div className="col-span-3 text-center py-6 flex flex-col items-center justify-center p-4 md:p-2">
                        <img src={botb} alt="" className="h-16 lg:h-20 mb-5 lg:mb-10" />
                        <h2 className="text-white font-bold text-2xl md:text-[2.15em]">
                            Travelers' Choice Best of the Best
                        </h2>
                        <button className="rounded-full bg-black hover:bg-gray-600 transition ease-out duration-200 text-white w-fit py-2 sm:py-3 px-3 sm:px-4 mt-5 lg:mt-14">
                            <p className="font-semibold text-sm">
                                See the winners
                            </p>
                        </button>
                    </div>
                    {/* Section Background Image - Displays only on Large devices, Like Desktop */}
                    <div className="hidden mmd:block h-full col-span-9 bg-cover" style={{ backgroundImage: `url(${travelerChoiceBg})` }} />
                    {/* --- */}

                    {/* Section Background Image - Displays only on Small Devices, Mobile */}
                    <div className="block mmd:hidden h-full bg-contain bg-top" style={{ backgroundImage: `url(${travelerChoiceBgSM})`, backgroundRepeat: 'no-repeat' }} />
                    {/* --- */}
                </div>
            </div>
            {/* --- */}

            {/* Trending in Travel Section */}
            <div className="container mx-auto px-4 py-10">
                <h2 className="font-bold text-lg md:text-2xl my-5">
                    Trending in Travel
                </h2>
                <div>
                    {/* Trending in Travel Toggles */}
                    <div className="flex text-sm md:text-base space-x-4 md:space-x-8 whitespace-nowrap overflow-x-auto travel_toggle">
                        {/* Places to go toggle */}
                        <h3 className={`${toggle.toGo ? 'border-black' : 'border-transparent'} font-medium mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
                            // onClick toggle, all items in the 'toggle' state object is set to false while 'toGo' is true
                            onClick={() => setToggle({ toGo: true, toDo: false, toStay: false })}
                        >
                            Places to Go
                        </h3>
                        {/* --- */}

                        {/* Things to Do toggle */}
                        <h3 className={`${toggle.toDo ? 'border-black' : 'border-transparent'} font-medium mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
                            // onClick toggle, all items in the 'toggle' state object is set to false while 'toDo' is true
                            onClick={() => setToggle({ toGo: false, toDo: true, toStay: false })}
                        >
                            Things to Do
                        </h3>
                        {/* --- */}

                        {/* Places to Stay toggle */}
                        <h3 className={`${toggle.toStay ? 'border-black' : 'border-transparent'} font-medium mb-3 border-b-2 pb-1 hover:border-black w-fit cursor-pointer`}
                            // onClick toggle, all items in the 'toggle' state object is set to false while 'toStay' is true
                            onClick={() => setToggle({ toGo: false, toDo: false, toStay: true })}
                        >
                            Places to Stay
                        </h3>
                        {/* --- */}
                    </div>
                    {/* --- */}
                    <div>
                        {/* List of Places to Go - Display only if 'toGo'is true */}
                        {toggle.toGo && (
                            <div className="grid grid-cols-12">
                                {/* Mapping throughlist of items to render */}
                                {["Las Vegas Hotels", "Destin Hotels", "Myrtle Beach Hotels", "Gatlinburg Hotels", "Walt Disney World Hotels",
                                    "Orlando Hotels", "Ocean City Hotels", "Panama City Beach Hotels", "Branson Hotels", "Seattle Hotels",
                                    "Turks and Caicos Hotels", "Mazatlan Hotels", "Amalfi Coast Hotels", "Miami Beach Hotels", "Fort Lauderdale Hotels",
                                    "South Padre Island Hotels", "Jackson Hotels", "Yosemite National Park Hotels", "South Lake Tahoe Hotels"]
                                    .map((item, i) => (
                                        <a key={i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:underline mb-1" href="#">
                                            {item}
                                        </a>
                                    ))
                                }
                                {/* --- */}
                            </div>
                        )}
                        {/* --- */}

                        {/* List of Things to Do - Displays only if 'toDo' is true */}
                        {toggle.toDo && (
                            <div className="grid grid-cols-12">
                                {/* Mapping through List of Items to render */}
                                {["Things to Do in Atlanta", "Things to Do in Austin", "Things to Do in Denver", "Things to Do in Kansas City",
                                    "Things to Do in Gatlinburg", "Things to Do in Asheville", "Things to Do in Pigeon Forge", "Things to Do in Philadelphia",
                                    "Things to Do in Santa Barbara", "Things to Do in Myrtle Beach", "Things to Do in Jacksonville", "Things to Do in Colorado",
                                    "Things to Do in Lake Tahoe (California)", "Things to Do in Fredericksburg", "Things to Do in California", "Things to Do in Puerto Rico",
                                    "Things to Do in Rome", "Things to Do in Venice", "Things to Do in Edinburgh", "Things to Do in Niagara Falls"]
                                    .map((item, i) => (
                                        <a key={i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:underline mb-1" href="#">
                                            {item}
                                        </a>
                                    ))
                                }
                                {/* --- */}
                            </div>
                        )}
                        {/* --- */}

                        {/* List of Places to Stay - Displays only if 'toStay' is true */}
                        {toggle.toStay && (
                            <div className="grid grid-cols-12">
                                {/* Mapping through list of Items to render */}
                                {["Beaches Turks & Caicos", "Moon Palace Cancun", "Majestic Elegance Costa Mujeres", "Hyatt Ziva Cancun", "Moon Palace Jamaica", "Dreams Punta Cana Resort & Spa",
                                    "Disney's Grand Floridian Resort & Spa", "Majestic Mirage Punta Cana", "Planet Hollywood Cancun", "Barcelo Aruba", "Sheraton Waikiki", "Finest Playa Mujeres", "Hyatt Ziva Cap Cana",
                                    "JW Marriott Marco Island Beach Resort", "Wyndham Alltra Cancun", "Atelier Playa Mujeres", "Hotel Riu Palace Cabo San Lucas", "Grand Hyatt Baha Mar", "The Venetian Resort", "Hyatt Ziva Puerto Vallarta",
                                    "Barcelo Maya Riviera", "Grand Velas Riviera Maya", "Hard Rock Hotel Cancun", "The Ritz-Carlton Orlando, Grande Lakes", "Sandos Caracol Eco Resort", "Hyatt Ziva Los Cabos", "Grand Fiesta Americana Coral Beach",
                                    "Hard Rock Hotel Riviera Maya", "Andaz Maui At Wailea Resort", "Caribe Hilton", "Live Aqua Beach Resort Cancun", "Iberostar Selection Cancun", "Hyatt Zilara Cancun", "Hilton Playa del Carmen",
                                    "Ka'anapali Beach Hotel", "Paris Las Vegas", "Planet Hollywood Resort & Casino", "Club Med Sandpiper Bay", "Hyatt Zilara Cap Cana", "Beloved Playa Mujeres", "Hilton Hawaiian Village Waikiki Beach Resort"]
                                    .map((item, i) => (
                                        <a key={i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 text-xs md:text-sm font-medium cursor-pointer hover:underline mb-1" href="#">
                                            {item}
                                        </a>
                                    ))
                                }
                                {/* --- */}
                            </div>
                        )}
                        {/* --- */}
                    </div>
                </div>
            </div>
            {/* --- */}

            {/* Footer */}
            <Footer />
            {/* --- */}

        </>
    );
}

export default Home;