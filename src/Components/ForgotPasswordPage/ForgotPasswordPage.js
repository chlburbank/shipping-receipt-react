import React from 'react'
// import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// Components
import MainBanner from '../Banner/MainBanner';
import Footer from '../Footer/Footer';

function ForgotPasswordPage() {
  return (
    <div style={styles.pageBackground}>
        <MainBanner />
        <Footer />
    </div>
  )
}

const styles = {
    pageBackground: {
        backgroundColor: '#dcdcdc',
        minHeight: '100vh',
    }
};


export default ForgotPasswordPage;