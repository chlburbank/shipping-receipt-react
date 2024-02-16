import { Button, Form, Container } from 'react-bootstrap';

import { login } from '../../utils/apicalls';

import { useNavigate } from 'react-router-dom';

function LoginForm() {
    // Redirection
    const navigate = useNavigate()

    // Function that executes upon submitting the form
    const submitForm = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        validate(payload)
    }

    // Function that validates wether user exists on the DB (MongoDb)
    const validate = async (payload) => {
        if (payload.username.length !== 0 && payload.password.length !== 0) {
            const arrayUsers = await login();
            arrayUsers.data.forEach(element => {
                if (payload.username === element.username && payload.password === element.password) {
                    navigate("/FormShipping");
                }
            });
        }
    }

    return (
        <Container>
            <h2>Login Form</h2>
            <form onSubmit={submitForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Username / Email</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter Username or Email"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Enter Password"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    )
}

export default LoginForm;