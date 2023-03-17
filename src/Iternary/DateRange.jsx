import { DateRange } from 'react-date-range';
import { Component } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';


import React from 'react'


const DateRangeInput = () => {
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
            onChange={item => setState([item.selection])}
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