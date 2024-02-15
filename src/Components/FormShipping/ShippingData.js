import { React, useState } from 'react'
// import { Button, Form, Container } from "react-bootstrap";

function ShippingData(props) {
    // State of the objects
    const [description, setDescription] =  useState("");
    const [quantity, setQuantity] =  useState("0");
    const [idShipping, setIdShipping] = useState(0);

    //Functions that changes the state
    const changeId = (event) => {
        setIdShipping(idShipping + 1);
    }

    const changeDescription = (event) => {
        setDescription(event.target.value);
    };

    const changeQuantity = (event) => {
        setQuantity(event.target.value);
    };

    // Transers the values of this component to be passed to the parent
    const transferValue = (e) => {
        changeId()
        e.preventDefault();
        const val = {
            idShipping,
            description,
            quantity
        };
        props.func(val);
        clearState();
    };

    // Clears the state
    const clearState = () => {
        setDescription("");
        setQuantity("");
    }
    return (
        <div>
            <label>Description</label>
            <input type='text' value={description} onChange={changeDescription}></input>
            <label>Quantity</label>
            <input type='text' value={quantity} onChange={changeQuantity}></input>
            <button onClick={transferValue}>Add</button>
        </div>
    );
}

export default ShippingData;