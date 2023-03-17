import React, { createContext, useState } from 'react'
import ItineraryNav from './IternaryNav'
import WhereToDate from './WhereToDate'
export const Information = createContext(null)
const Iternary = () => {
    const [info, setInfo] = useState({
        start: 'StartDate',
        end: 'EndDate',
        price: '50000',
        destination: 'Mumbai',
        adults: 1,
        search: false
    })
    return (
        <div>
            <Information.Provider value={{ info, setInfo }}>
                <WhereToDate />
                <ItineraryNav />
            </Information.Provider>
        </div>
    )
}

export default Iternary