import { React, useState } from 'react'
import { Button, Form, Container } from "react-bootstrap";
import TableForm from "./TableForm";

import { postShipment } from '../../utils/apicalls';

function FormShipping() {

    const [tel_s, setTelS] = useState('');
    const [tel_c, setTelC] = useState('');
    const [telSError, setTelSError] = useState(false);
    const [telCError, setTelCError] = useState(false);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);

    //Shipments
    const [data, setData] = useState([]);

    const handleTelSChange = (e) => {
        const input = e.target.value.replace(/[^0-9]/g, '');
        setTelS(input);
        setTelSError(!input);
      };
    
      const handleTelCChange = (e) => {
        const input = e.target.value.replace(/[^0-9]/g, '');
        setTelC(input);
        setTelCError(!input);
      };


    // Function that triggers on submitting the form
    const submitForm = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        try {
            await postShipment(payload.name_s, payload.address_s, Number(payload.tel_s), payload.id_s, payload.name_c, payload.address_c, Number(payload.tel_c), payload.id_c, data);

            // Show success banner
            setShowSuccessBanner(true);

            // Clear form fields
            

            e.target.reset();
            clearForm();
            setTimeout(() => {
                setShowSuccessBanner(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error if submission fails
        }
    }

    const clearForm = () => {
        setData([])
        setTelS('');
        setTelC('');
        setTelSError(false);
        setTelCError(false);
    };

    return (
        <Container>
            {showSuccessBanner && (
                <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999 }}>
                    Your form has been submitted successfully.
                </div>
            )}
            <h2 className='mt-3'>Sender</h2>
            <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name_s" placeholder="Enter name of Sender"/>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address_s" placeholder="Enter Address"/>
                <Form.Label>Telephone</Form.Label>
                <Form.Control 
            type="text" 
            name="tel_s" 
            placeholder="Enter telephone number"
            value={tel_s}
            onChange={handleTelSChange}
            isInvalid={telSError}
                />
                {telSError && <Form.Control.Feedback type="invalid">Please enter a valid 10-digit telephone number.</Form.Control.Feedback>}
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
                <Form.Control 
          type="text" 
          name="tel_c" 
          placeholder="Enter telephone number"
          value={tel_c}
          onChange={handleTelCChange}
          isInvalid={telCError}
        />
        {telCError && <Form.Control.Feedback type="invalid">Please enter a valid 10-digit telephone number.</Form.Control.Feedback>}
                <Form.Label>DNI</Form.Label>
                <Form.Control text="text" name="id_c" placeholder="Enter identification"/>
            </Form.Group>

            <Form.Group className='mb-3'>
                <TableForm data={data} setData={setData} onSubmit={setData}/>
            </Form.Group>
            
            <Button className='mb-5' variant="primary" type="submit">
                Submit
            </Button>
            </Form>

        </Container>
  );
}

export default FormShipping;