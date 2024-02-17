import { React, useState } from 'react'
import ShippingData from './ShippingData';
import { Button } from 'react-bootstrap';

function TableForm(props){
    // State of the body of the table
    const [shippingState, setShippingState] = useState([]);

    // Deleting the shipment
    const deleteShipment = (id) => {
        const newState =  shippingState.filter(li => li.idShipping !== id )
        setShippingState(newState)
        props.setData(newState);
    }
    
    // Adding Rows
    const addRows = (data) => {
        setShippingState(prevState => [...prevState, data]);
        props.setData(prevState => [...prevState, data]);
    }

    // Drawing the body


    return (
        <div>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {shippingState.map((info) => (
                        <tr key={info.idShipping}>
                            <td>{info.idShipping}</td>
                            <td>{info.description}</td>
                            <td>{info.quantity}</td>
                            <td>
                                <Button onClick={() => deleteShipment(info.idShipping)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ShippingData func={addRows}/>
        </div>
    )
}


export default TableForm;