import { React, useState } from 'react'
import ShippingData from './ShippingData';

function TableForm(){
    // State of the body of the table
    const [shippingState, setShippingState] = useState([]);
    
    // Drawing the body
    const tableRows = shippingState.map((info) => {
        return (
            <tr key={1}>
                <td>{info.description}</td>
                <td>{info.quantity}</td>
            </tr>
        )
    });
    
    // Adding Rows
    const addRows = (data) => {
        const updatedShippingData = [...shippingState];
        updatedShippingData.push(data);
        setShippingState(updatedShippingData);
    }

    return (
        <div>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                {/* Display the content body */}
                <tbody>{tableRows}</tbody>
            </table>
            <ShippingData func={addRows}/>
        </div>
    )
}


export default TableForm;