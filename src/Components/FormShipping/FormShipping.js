import { React, useState } from 'react'
import { Button, Form, Container } from "react-bootstrap";
import TableForm from "./TableForm";

import { postShipment } from '../../utils/apicalls';

function FormShipping() {

    const [data, setData] = useState();

    // Function that triggers on submitting the form
    function submitForm(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        postShipment(payload.name_s, payload.address_s, Number(payload.tel_s), payload.id_s, payload.name_c, payload.address_c, Number(payload.tel_c), payload.id_c, data)

        // console.log(data);
    }
    return (
        <Container>
            <h2 className='mt-3'>Sender</h2>
            <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name_s" placeholder="Enter name of Sender"/>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address_s" placeholder="Enter Address"/>
                <Form.Label>Telephone</Form.Label>
                <Form.Control text="text" name="tel_s" placeholder="Enter telephone number"/>
                <Form.Label>DNI</Form.Label>
                <Form.Control text="text" name="id_s" placeholder="Enter identification"/>
            </Form.Group>
            <hr></hr>
            <h2>Consignee</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name_c" placeholder="Enter name of Consignee"/>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address_c" placeholder="Enter Address"/>
                <Form.Label>Telephone</Form.Label>
                <Form.Control text="text" name="tel_c" placeholder="Enter telephone number"/>
                <Form.Label>DNI</Form.Label>
                <Form.Control text="text" name="id_c" placeholder="Enter identification"/>
            </Form.Group>

            <Form.Group className='mb-3'>
                <TableForm onSubmit={setData}/>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group> */}
            
            <Button className='mb-5' variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Container>
  );
}

export default FormShipping;