import React from 'react'
import { useState } from 'react'

import { Navbar } from '../components'
import { Tab } from '@headlessui/react'
import { ToStay, ToVisit } from '../components'
import Climate from '../Climate/src/CLimate'
import { HotelsList, RestaurantsList } from '../pages'
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CardGrid from './FormatCardGrid'
import Demo from './Calendar'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Format = () => {
    let [categories] = useState({
        Format: [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2,
            },
        ],
        Calendar: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
    })

    const dataIt1 = {

        "items": [
            {
                "name": "Check in to Hotel A",
                "location": "Vashi",
                "start_time": "9:00 AM",
                "end_time": "10:00 AM"
            },
            {
                "name": "Visit ISKCON Temple",
                "location": "Kharghar",
                "start_time": "11:00 AM",
                "end_time": "12:00 PM"
            },
            {
                "name": "Lunch at The Urban Foundry",
                "location": "Belapur",
                "start_time": "1:00 PM",
                "end_time": "2:00 PM"
            },
            {
                "name": "Explore Central Park",
                "location": "Kharghar",
                "start_time": "3:00 PM",
                "end_time": "4:30 PM"
            },
            {
                "name": "Dinner at Mini Punjab's Lake Side",
                "location": "Vashi",
                "start_time": "7:00 PM",
                "end_time": "8:00 PM"
            }
        ]
    }
    const dataIt2 =
    {
        "day": "Day 2",
        "items": [
            {
                "name": "Breakfast at Cafe Mangii",
                "location": "Vashi",
                "start_time": "9:00 AM",
                "end_time": "10:00 AM"
            },
            {
                "name": "Visit Shri Teenmurti Digambar Jain Mandir",
                "location": "Seawoods",
                "start_time": "11:00 AM",
                "end_time": "12:00 PM"
            },
            {
                "name": "Lunch at Mahesh Lunch Home",
                "location": "Vashi",
                "start_time": "1:00 PM",
                "end_time": "2:00 PM"
            },
            {
                "name": "Explore Pandavkada Falls",
                "location": "Kharghar",
                "start_time": "3:00 PM",
                "end_time": "4:30 PM"
            },
            {
                "name": "Dinner at Barbeque Nation",
                "location": "Belapur",
                "start_time": "7:00 PM",
                "end_time": "8:00 PM"
            }
        ]
    }

    const hotels = {
        "hotels": [
            {
                "name": "Hotel A",
                "location": "Vashi",
                "price": "1000/day"
            },
            {
                "name": "Hotel B",
                "location": "Belapur",
                "price": "1200/day"
            },
            {
                "name": "Hotel C",
                "location": "Kharghar",
                "price": "1240/day"
            }
        ]
    }
    const cardsData = [
        {
            name: "Pizza Hut",
            type: "Pizza",
            rating: 4.5,
            price: "$$",
            timeToReach: "30-40 mins",
            imageUrl: "https://images.unsplash.com/photo-1603004831788-cf4b16f46c85",
        },
        {
            name: "McDonald's",
            type: "Burgers",
            rating: 3.5,
            price: "$",
            timeToReach: "15-20 mins",
            imageUrl: "https://images.unsplash.com/photo-1593642532458-09caf5e5d2c2",
        },
        {
            name: "Subway",
            type: "Sandwiches",
            rating: 4.0,
            price: "$$",
            timeToReach: "20-25 mins",
            imageUrl: "https://images.unsplash.com/photo-1532637771661-19cfa9f9c9f9",
        },
        {
            name: "Pizza Hut",
            type: "Pizza",
            rating: 4.5,
            price: "$$",
            timeToReach: "30-40 mins",
            imageUrl: "https://images.unsplash.com/photo-1603004831788-cf4b16f46c85",
        },
        {
            name: "McDonald's",
            type: "Burgers",
            rating: 3.5,
            price: "$",
            timeToReach: "15-20 mins",
            imageUrl: "https://images.unsplash.com/photo-1593642532458-09caf5e5d2c2",
        },
        {
            name: "Subway",
            type: "Sandwiches",
            rating: 4.0,
            price: "$$",
            timeToReach: "20-25 mins",
            imageUrl: "https://images.unsplash.com/photo-1532637771661-19cfa9f9c9f9",
        },
    ];

    var days = 4;
    return (
        <div>

            <Navbar />
            <center>
                <div className="px-20 sm:px-20 self-center justify-center">
                    <Tab.Group>
                        <Tab.List className="flex space-x-2 rounded-xl self-center  p-1">
                            {Object.keys(categories).map((category) => (
                                <Tab
                                    key={category}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-32 rounded-lg py-2.5 text-lg font-medium leading-5 bg-slate-800 text-zinc-200',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-700 focus:outline-none focus:ring-2',
                                            selected
                                                ? 'bg-slate-600 shadow'
                                                : 'text-white hover:bg-slate-400 hover:text-white'
                                        )
                                    }
                                >
                                    {category}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            <Tab.Panel
                                key={5}
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                )}
                            >
                                <div className="container mx-auto px-4">
                                    <h1 className='text-4xl font-semibold p-5'>Day 1</h1>
                                    <CardGrid cards={cardsData} days1={dataIt1} days2={dataIt2} hotels={hotels}/>
                                    <center>
                                        <Stack spacing={2}>
                                            <Pagination count={days} variant="outlined" shape="rounded" />
                                        </Stack>
                                    </center>
                                </div>

                            </Tab.Panel>
                            <Tab.Panel
                                key={5}
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                )}
                            >
                                <h1 className='p-8 text-2xl  self-center'>Schedule</h1>
                                <Demo />
                            </Tab.Panel>




                        </Tab.Panels>

                    </Tab.Group>
                </div>
            </center>
        </div>
    )
}

export default Format