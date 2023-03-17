import React, { Fragment, useEffect, useState, useRef, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import backgroundVideo from "../../assets/videos/monuments.mp4";
import Popover from '@mui/material/Popover';
import DateRangeInput from "./DateRange";
import { Navbar } from "../components"
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Information } from "./Iternary";

const WhereToDate = () => {
    const { info, setInfo } = useContext(Information)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [destination, setDestination] = useState("mumbai");
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // console.log(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const rangeHandler = (e) => {
        // console.log(e.target.value)
        setInfo(prev => ({ ...prev, price: e.target.value, search: false }))
    }
    const textHandler = (e) => {
        setInfo(prev => ({ ...prev, destination: e.target.value, search: false }))
        setDestination(e.target.value)
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
<<<<<<< HEAD
    console.log()
=======
    const previousTrip = JSON.parse(localStorage.getItem("trips"));
>>>>>>> ad01618f76e9b69dbb1b886394065b8962e04ba4
    return (
        <div>
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
                                    value={info.destination}
                                    onChange={(e) => textHandler(e)}
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
                                    value={`${info.start}->${info.end}`}
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
                                    <h1 className="text-xl text-gray-500">₹{info.price}</h1>
                                </div>
                                <div className="flex items-center px-4 py-3 bg-gray-100 rounded-full">
                                    <input
                                        type="range"
                                        min={50000}
                                        max={1000000}
                                        className="w-full focus:outline-none accent-gray-500"
                                        onChange={(e) => rangeHandler(e)}
                                    />
                                </div>
                            </div>
                            <button onClick={() => {
                                setInfo(prev => ({ ...prev, search: true }))
                                console.log(destination)
<<<<<<< HEAD
                                Swal.fire("Itinerary is ready", "Scroll down", "success")
                                localStorage.setItem("destination", destination);
=======
                                Swal.fire("Itinerary is ready","Scroll down","success")
                                localStorage.setItem("destination",destination);
                                previousTrip.append(destination);
                                localStorage.setItem("trips",JSON.stringify(previousTrip))
>>>>>>> ad01618f76e9b69dbb1b886394065b8962e04ba4
                            }} className="absolute -bottom-5 left-[45%] text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhereToDate