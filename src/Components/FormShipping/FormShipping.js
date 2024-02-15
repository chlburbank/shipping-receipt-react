import { React, useState } from 'react'
import { Button, Form, Container } from "react-bootstrap";
import TableForm from "./TableForm";

function FormShipping() {

    const [data, setData] = useState();

    // Function that triggers on submitting the form
    function submitForm(e) {
        e.preventDefault();

        // const formData = new FormData(e.target);
        // const payload = Object.fromEntries(formData);

        // console.log(payload);
        // console.log(data);
    }
    return (
        <Container>
            <h2>Sender</h2>
            <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name-s" placeholder="Enter name of Sender"/>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address-s" placeholder="Enter Address"/>
                <Form.Label>Telephone</Form.Label>
                <Form.Control text="text" name="tel-s" placeholder="Enter telephone number"/>
                <Form.Label>DNI</Form.Label>
                <Form.Control text="text" name="id-s" placeholder="Enter identification"/>
            </Form.Group>
            <hr></hr>
            <h2>Consignee</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name-c" placeholder="Enter name of Consignee"/>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address-c" placeholder="Enter Address"/>
                <Form.Label>Telephone</Form.Label>
                <Form.Control text="text" name="tel-c" placeholder="Enter telephone number"/>
                <Form.Label>DNI</Form.Label>
                <Form.Control text="text" name="id-c" placeholder="Enter identification"/>
            </Form.Group>

            <Form.Group>
                <TableForm onSubmit={setData}/>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group> */}
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Container>
  );
}

export default FormShipping;