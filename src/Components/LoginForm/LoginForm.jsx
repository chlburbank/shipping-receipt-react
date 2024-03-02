import { useState, useEffect } from 'react'; 
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { login } from '../../utils/apicalls';
import { useNavigate } from 'react-router-dom';

import MainBanner from '../Banner/MainBanner';
import Footer from '../Footer/Footer'; 

import vector_design_transparent from "../Assets/media-officevector-transparent.png";

function LoginForm() {
    const [user, setUser] = useState();
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); 

    useEffect(() => {
        // Check if user exists
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(loggedInUser);
        } 

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize); 

        return () => {
            window.removeEventListener('resize', handleResize); 
        };
    }, []);

    useEffect(() => {
        if (user) {
            navigate("/FormShipping");
        } else {
            navigate("/");
        }
    }, [user, navigate]);

    const submitForm = (e) => {
        e.preventDefault();
        var validationErrors = {};
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        Array.from(e.target.elements)
        .filter(element => element.name)
        .forEach(input => {
            const key = input.name;
            if (!payload[key]) {
                validationErrors[key] = `${key.charAt(0).toLocaleUpperCase() + key.slice(1)} is required.`;
            }
        })

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        validate(payload);
    };

    const validate = async (payload) => {
        if (payload.username.length !== 0 && payload.password.length !== 0) {
            const arrayUsers = await login();
            arrayUsers.data.forEach(element => {
                if ((payload.username === element.username && payload.password === element.password) || (payload.username === element.email && payload.password === element.password)) {
                    navigate("/FormShipping");
                    localStorage.setItem("user", payload.username)
                } else {
                    setErrors({verification: "Username or Password is incorrect. Try Again."})
                }
            });
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <div style={styles.pageBackground} className="d-flex flex-column justify-content-between">
            <MainBanner />
            <div>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} md={8}>
                            <div style={{...styles.formBox, ...(windowWidth <= 991 && windowWidth >= 768 && styles.widerFormBox)}}>
                                <Row>
                                    {windowWidth > 768 && (
                                        <Col xs={3} style={styles.vectorContainer}>
                                            <img src={vector_design_transparent} alt="Logo" style={styles.logo} />
                                        </Col>
                                    )}
                                    <Col xs={windowWidth > 768 ? 9 : 12}>
                                        <h2 className="text-center mb-4">Login</h2>
                                        <form onSubmit={submitForm}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Username / Email</Form.Label>
                                                <Form.Control type="text" name="username" placeholder="Enter Username or Email" autoComplete='off'/>
                                                {errors.username && <div style={styles.errors}>{errors.username}</div>}
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" name="password" placeholder="Enter Password" autoComplete='off'/>
                                                {errors.password && <div style={styles.errors}>{errors.password}</div>}
                                                {errors.verification && <div style={styles.errors}>{errors.verification}</div>}
                                            </Form.Group>
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <Button variant="primary" type="submit" >
                                                    Log In
                                                </Button>
                                                <span onClick={handleForgotPassword} style={windowWidth <= 362 ? styles.forgotPassword320 : styles.forgotPassword}>Forgot your password?</span>
                                            </div>
                                        </form>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div >
            <Footer />
            </div>
        </div>
    );
}

export default LoginForm;

const styles = {
    pageBackground: {
        backgroundColor: '#f8f7ff',
        minHeight: '100vh',
    },
    logo: {
        width: '200px',
    },
    formBox: {
        backgroundColor: '#53A2BE',
        borderRadius: '5px',
        padding: '20px',
        paddingLeft: '20px',
        paddingBottom: '10px'
    },
    vectorContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgotPassword: {
        cursor: 'pointer',
        textDecoration: 'underline',
        marginLeft: 'auto', // Move to the right
    },
    forgotPassword320: {
        cursor: 'pointer',
        textDecoration: 'underline',
        marginLeft: '40%', // Move to the right
    },
    widerFormBox: {
        width: '120%', // Adjust the width as desired
        margin: '0 auto', // Centering the wider form box
    },  
    errors: {
        color: '#FF0000'
    }
};
