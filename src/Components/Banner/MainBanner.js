import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import logo from '../Assets/kabayanboxlogo-transparent.png';

const MainBanner = () => {
    const [bannerHeight, setBannerHeight] = useState(130); // Initial height of the banner
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false); // State to track whether to show hamburger menu
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 456) {
                setBannerHeight(175);
                setShowHamburgerMenu(true);
            } else {
                setBannerHeight(130);
                setShowHamburgerMenu(false);
            }
        };

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures that effect runs only once on component mount

    // Check if the user I logged in to render the header differently.
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) setUser(loggedInUser);
    },[])

    const logOut = () => {
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <div className="banner" style={{ backgroundColor: '#000000', color: '#fff', padding: '30px 0', height: bannerHeight + 'px' }}>
            <Container>
                <Row>
                    <Col xs={6}>
                        <div style={{ backgroundColor: '#fff', borderRadius: '50%', padding: '5px', width: '75px', height: '75px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '100px' }}>
                            <img src={logo} alt="Logo" style={{ width: '60px' }} />
                        </div>
                    </Col>
                    <Col xs={6}>
                        <h1 style={{ textAlign: 'right', marginBottom: '0' }}>KabayanBox S.L</h1>
                        {/* Hamburger menu */}
                        {showHamburgerMenu ? (
                            <Navbar expand="lg" className="justify-content-end">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto" style={{ backgroundColor: '#0f0f0f' , textAlign: 'center', borderRadius: '10px'}}>
                                        <Nav.Link href="#about" style={{ color: '#ffffff' }}>About</Nav.Link>
                                        { !user && <Nav.Link href="/" style={{ color: '#ffffff' }}>Login</Nav.Link>}
                                        { user && <Nav.Link onClick={logOut} style={{ color: '#ffffff' }}>Log Out</Nav.Link>}
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        ) : (
                            <Nav className="justify-content-end">
                                <Nav.Item style={{ marginRight: '10px' }}>
                                    <Nav.Link href="#about">About</Nav.Link>
                                </Nav.Item>
                                {!user && <Nav.Item>
                                    <Nav.Link href="/">Login</Nav.Link>
                                </Nav.Item>}
                                { user && <Nav.Item>
                                    <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                                </Nav.Item>}
                            </Nav>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainBanner;
