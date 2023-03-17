import React, { Fragment, useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundVideo from "../assets/videos/mountain.mp4";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbClipboardList } from "react-icons/tb";
import { Navbar } from "../../../ClashOfCodes_EnemiesOfSyntax/src/components/Navbar";
import Popover from '@mui/material/Popover';
import { beaches, temples, Popular } from "../Data/PreferenceData"
import { createClient } from 'pexels';
import axios from "axios";
import { Link } from "react-router-dom";
import DateRangeInput from "../Iternary/DateRange";
import { BiMapPin, BiMap } from "react-icons/bi";
import { events } from "../../../ClashOfCodes_EnemiesOfSyntax/src/pages/eventData";
import { CometChat } from "@cometchat-pro/chat";
import { Dialog, Transition } from "@headlessui/react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  FeatureGroup,
  withLeaflet,
} from "react-leaflet";
import L from "leaflet";
import mark from "../../assets/images/markers.png"

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

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [packages, setPackages] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) getPackages();
  }, []);
  const getPackages = () => {
    var config = {
      method: "get",
      url: "http://vismayvora.pythonanywhere.com/tourist_app/tourpackage",
      headers: {
        Authorization: "Token " + user.token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setPackages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className="w-full h-full relative">
      <video autoPlay loop muted className="absolute -z-10 w-full h-auto">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <Navbar />
      <div className="h-[90vh]">
        <div className="w-full h-full px-36 py-28 bg-gray-900/50">
          <h1 className="text-white uppercase mb-2">Hello</h1>
          <h1 className="text-white text-4xl font-bold mb-12">
            Explore the world, one
            <span className="underline decoration-cyan-500 underline-offset-4">
              &nbsp;itinerary&nbsp;
            </span>
            at a time.
          </h1>
          <div className="relative grid grid-cols-3 bg-white w-full rounded-xl p-8 gap-8">
            <div className="">
              <h1 className="text-gray-400 font-semibold mb-3">
                Search your destination:
              </h1>
              <input
                type="text"
                placeholder="Mumbai"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-full text-sm text-gray-500 font-semibold"
              />
            </div>
            <div className="">
              <h1 className="text-gray-400 font-semibold mb-3">
                Select your dates:
              </h1>
              <input
                type="button"
                onClick={handleClick}
                value="DD-MM-YYYY"
                className="w-full cursor-pointer focus:outline-none px-4 py-3 bg-gray-100 rounded-full text-sm text-gray-500 font-semibold"
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <DateRangeInput />
              </Popover>
            </div>
            <div className="">
              <div className="flex justify-between text-gray-400 font-semibold mb-3">
                <h1>Max price:</h1>
                <h1 className="text-xl text-gray-500">$5000</h1>
              </div>
              <div className="flex items-center px-4 py-3 bg-gray-100 rounded-full">
                <input
                  type="range"
                  min={2000}
                  max={100000}
                  className="w-full focus:outline-none accent-gray-500"
                />
              </div>
            </div>
            <button className="absolute -bottom-5 left-[45%] text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
              More filters
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full px-36 py-24 bg-gray-50">
        <h1 className="text-gray-600 text-2xl font-bold mb-12">
          Most visited{" "}
          <span className="underline decoration-cyan-500">destinations</span>
        </h1>
        <div className="grid grid-cols-3 gap-8">
          {Popular !== []
            ? Popular.length > 0 &&
            Popular.map((item) => <Card data={item} />)
            : beaches.length > 0 &&
            Popular.map((item) => <Card data={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;