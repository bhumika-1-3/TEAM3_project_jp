import { DateRange } from 'react-date-range';
import { Component, useContext } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';


import React from 'react'
import { Information } from './Iternary';


const DateRangeInput = () => {
    const { info, setInfo } = useContext(Information)
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    return (
        <div><DateRange
            editableDateInputs={true}
            onChange={item => {

                let event1 = new Date(item.selection.startDate);
                let event2 = new Date(item.selection.endDate)
                event1 = new Date(event1.getTime() - (event1.getTimezoneOffset() * 60000)).toJSON()
                event2 = new Date(event2.getTime() - (event2.getTimezoneOffset() * 60000)).toJSON()
                let date1 = JSON.stringify(event1)
                let date2 = JSON.stringify(event2)
                date1 = date1.slice(1, 11)
                date2 = date2.slice(1, 11)
                setInfo(prev => ({ ...prev, start: date1, end: date2, search: false }))
                return setState([item.selection])
            }}
            moveRangeOnFirstSelection={false}
            ranges={state}
        /></div>
    )
}

export default DateRangeInput
// class MyComponent extends Component {
//     handleSelect(ranges) {
//         console.log(ranges);
//         // {
//         //   selection: {
//         //     startDate: [native Date Object],
//         //     endDate: [native Date Object],
//         //   }
//         // }
//     }
//     render() {
//         const selectionRange = {
//             startDate: new Date(),
//             endDate: new Date(),
//             key: 'selection',
//         }
//         return (
//             <DateRangePicker
//                 ranges={[selectionRange]}
//                 onChange={this.handleSelect}
//             />
//         )
//     }
// }

// export default MyComponent