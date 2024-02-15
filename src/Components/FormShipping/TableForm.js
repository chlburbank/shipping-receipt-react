import { React, useState } from 'react'
import ShippingData from './ShippingData';

function TableForm(props){
    // State of the body of the table
    const [shippingState, setShippingState] = useState([]);

    // Deleting the shipment
    const deleteShipment = (id) => {
        const newState =  shippingState.filter(li => li.idShipping !== id )
        setShippingState(newState)
    }
    
    // Adding Rows
    const addRows = (data) => {
        const total = shippingState.length;
        data.idShipping = total + 1;
        const updatedShippingData = [...shippingState];
        updatedShippingData.push(data);
        setShippingState(updatedShippingData);
        props.onSubmit(updatedShippingData);
    }

    // Drawing the body
    const tableRows = shippingState.map((info) => {
        return (
            <tr key={info.idShipping}>
                <td>{info.idShipping}</td>
                <td>{info.description}</td>
                <td>{info.quantity}</td>
                <td><button onClick={() => {deleteShipment(info.idShipping)}}>Delete</button></td>
            </tr>
        )
    });

    return (
        <div>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            <ShippingData func={addRows}/>
        </div>
    )
}


export default TableForm;