import { React, useState } from 'react'
import { Button, Form, Container } from "react-bootstrap";
import { saveAs } from 'file-saver';

// Functions
import { generatePDF } from './GeneratePDF';

// Components
import MainBanner from '../Banner/MainBanner';
import Footer from '../Footer/Footer';
import TableForm from "./TableForm";

// API Calls
import { postShipment } from '../../utils/apicalls';

function FormShipping() {

    const [tel_s, setTelS] = useState('');
    const [tel_c, setTelC] = useState('');
    const [telSError, setTelSError] = useState(false);
    const [telCError, setTelCError] = useState(false);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);
    const [errors, setErrors] = useState({})

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
    const submitForm = async (e) => {
        e.preventDefault();
        
        const validationErrors = {};
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        Array.from(e.target.elements)
        .filter(element => element.name)
        .forEach(input => {
            const key = input.name;
            if (!payload[key]) {   
                validationErrors[key] = `${key.charAt(0).toLocaleUpperCase() + key.slice(1)} is required.`;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return;
        }
        try {
            await postShipment(payload.name_s, payload.address_s, Number(payload.tel_s), payload.id_s, payload.name_c, payload.address_c, Number(payload.tel_c), payload.id_c, data);

            const pdfBytes = await generatePDF(payload, data);
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            saveAs(pdfBlob, 'empty_pdf.pdf');

            // Show success banner
            setShowSuccessBanner(true);

            // Clear form fields
            clearForm();

            e.target.reset();


            setTimeout(() => {
                setShowSuccessBanner(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const clearForm = () => {
        setData([]);
        setTelS('');
        setTelC('');
        setTelSError(false);
        setTelCError(false);
    };

    const styles = {
        successBanner: {
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            left: 0,
            width: '100%',
            zIndex: 999,
        },
        container: {
            minHeight: 'calc(100vh - 225px)',
            position: 'relative'
        },
        pageBackground: {
            backgroundColor: '#f8f7ff'
        },
        error: {
            color: '#FF0000'
        }
    };

    return (
        <div style={styles.pageBackground}>
        <MainBanner/>
            {showSuccessBanner && (
                <div style={styles.successBanner}>
                    Your form has been submitted successfully.
                </div>
            )}
        <Container style={styles.container}>
            <h2 className='mt-3'>Sender</h2>
            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name_s" placeholder="Enter name of Sender" />
                    {errors.name_s && <div style={styles.error}>Sender's name is required.</div>}
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address_s" placeholder="Enter Address" />
                    {errors.address_s && <div style={styles.error}>Sender's address is required.</div>}
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
                    {errors.tel_s && <div style={styles.error}>Consignee's number is required.</div>}
                    <Form.Label>DNI</Form.Label>
                    <Form.Control text="text" name="id_s" placeholder="Enter identification" />
                    {errors.id_s && <div style={styles.error}>Sender's identification is required.</div>}
                </Form.Group>
                <hr></hr>
                <h2>Consignee</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name_c" placeholder="Enter name of Consignee" />
                    {errors.name_c && <div style={styles.error}>Consignee's name is required.</div>}
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address_c" placeholder="Enter Address" />
                    {errors.address_c && <div style={styles.error}>Consignee's address is required.</div>}
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
                    {errors.tel_c && <div style={styles.error}>Consignee's number is required.</div>}
                    <Form.Label>Email:</Form.Label>
                    <Form.Control text="text" name="id_c" placeholder="Enter identification" />
                    {errors.id_c && <div style={styles.error}>Consignee's e-mail is required.</div>}
                </Form.Group>

                <Form.Group className='mb-3'>
                    <TableForm data={data} setData={setData} onSubmit={setData} />
                </Form.Group>

                <Button className='mb-5' variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </Container>
        <Footer style={{ position: 'sticky', bottom: 0 }} />
        </div>
    );
}

export default FormShipping;