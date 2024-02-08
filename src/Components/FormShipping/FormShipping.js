import { Button, Form, Container } from "react-bootstrap";

function FormShipping() {
  return (
    <Container>
        <h2>Sender</h2>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"/>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text"/>
            <Form.Label>Telephone</Form.Label>
            <Form.Control text="text"/>
            <Form.Label>DNI</Form.Label>
            <Form.Control text="text"/>
        </Form.Group>
        <hr></hr>
        <h2>Consignee</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"/>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text"/>
            <Form.Label>Telephone</Form.Label>
            <Form.Control text="text"/>
            <Form.Label>DNI</Form.Label>
            <Form.Control text="text"/>
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