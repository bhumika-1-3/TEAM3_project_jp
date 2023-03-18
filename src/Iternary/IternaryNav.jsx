import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { ToStay, ToVisit } from '../components'
import Climate from '../Climate/src/CLimate'
import { HotelsList, RestaurantsList } from '../pages'
import Transport from '../pages/Transport'
import EmergencyContactCard from './EmergencyContactCard'
import { Link } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ItineraryNav() {
  let [categories] = useState({
    Attractions: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
    Transport: [
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

    Climate: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],


    Hotels: [
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
    Resturants: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
    Format: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
    Emergency: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  })


  const emerg = {
    "Police": {
      "Emergency Number": "100",
      "Control Room": "022-22625020",
      "Police Station (locality)": {
        "Name": "Example Police Station",
        "Address": "123 Main Street, Mumbai",
        "Phone": "022-12345678"
      }
    },
    "Fire": {
      "Emergency Number": "101",
      "Control Room": "022-23076111",
      "Fire Station (locality)": {
        "Name": "Example Fire Station",
        "Address": "456 Elm Street, Mumbai",
        "Phone": "022-23456789"
      }
    },
    "Ambulance": {
      "Emergency Number": "102",
      "Control Room": "022-23079643",
      "Ambulance (locality)": {
        "Name": "Example Ambulance",
        "Address": "789 Oak Street, Mumbai",
        "Phone": "022-34567890"
      }
    }
  }

  const emergencyContacts = {
    police: {
      number: "100",
      controlRoom: "022-22625020",
      stationName: "Example Police Station",
      stationAddress: "123 Main Street, Mumbai",
      stationPhone: "022-12345678"
    },
    fire: {
      number: "101",
      controlRoom: "022-23076111",
      stationName: "Example Fire Station",
      stationAddress: "456 Elm Street, Mumbai",
      stationPhone: "022-23456789"
    },
    ambulance: {
      number: "102",
      controlRoom: "022-23079643",
      stationName: "Example Ambulance",
      stationAddress: "789 Oak Street, Mumbai",
      stationPhone: "022-34567890"
    }
  };

  return (
    <center>

      <div className="px-2 py-24 sm:px-0 self-center justify-center">
        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-xl self-center  p-1">
            {Object.keys(categories).map((category) => (
              category == "Format" ?
                <Link to={`/format/`}>

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
                </Link>
                :
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
              <ToVisit></ToVisit>
            </Tab.Panel>

            <Tab.Panel
              key={5}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <Transport />
            </Tab.Panel>


            <Tab.Panel
              key={5}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className='p-10'>
                <Climate />
              </div>
            </Tab.Panel>
            <Tab.Panel
              key={5}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <HotelsList />
            </Tab.Panel>
            <Tab.Panel
              key={5}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className='p-10'>
                <RestaurantsList />
              </div>
            </Tab.Panel>
            <Tab.Panel
              key={5}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="grid grid-cols-3 gap-4">
                <EmergencyContactCard title="Police" {...emergencyContacts.police} />
                <EmergencyContactCard title="Fire" {...emergencyContacts.fire} />
                <EmergencyContactCard title="Ambulance" {...emergencyContacts.ambulance} />
              </div>
            </Tab.Panel>
            <Tab.Panel
              key={5}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="grid grid-cols-3 gap-4">
                <EmergencyContactCard title="Police" {...emergencyContacts.police} />
                <EmergencyContactCard title="Fire" {...emergencyContacts.fire} />
                <EmergencyContactCard title="Ambulance" {...emergencyContacts.ambulance} />
              </div>
            </Tab.Panel>
          </Tab.Panels>

        </Tab.Group>
      </div>
    </center>
  )
}
