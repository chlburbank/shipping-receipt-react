import { React, useState } from 'react'
import { Button, Container } from "react-bootstrap";

function ShippingData(props) {
    // State of the objects
    const [description, setDescription] =  useState("");
    const [quantity, setQuantity] =  useState(0);
    const idShipping = Math.floor(Math.random() * 1000000)

    //Functions that changes the state
    const changeDescription = (event) => {
        setDescription(event.target.value);
    };

    const changeQuantity = (event) => {
        setQuantity(Number(event.target.value));
    };

    // Transers the values of this component to be passed to the parent
    const transferValue = (e) => {
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
        setQuantity(0);
    }
    return (
        <Container>
            <label className='m-1'>Description</label>
            <input type='text' value={description} onChange={changeDescription}></input>
            <label className='m-1'>Quantity</label>
            <input type='text' value={quantity} onChange={changeQuantity}></input>
            <Button className='ms-3' onClick={transferValue}>Add</Button>
        </Container>
    );
}

export default ShippingData;