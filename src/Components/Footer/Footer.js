// Footer.jsx

import React from 'react';

function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.footerContent}>
                {/* About */}
                <div>About</div>
                
                {/* Social Media */}
                <div style={styles.socialMedia}>
                    <a href="https://www.facebook.com">Facebook</a>
                </div>
            </div>
            
            {/* Copyright */}
            <div style={styles.copyright}>
                © 2024 Your Company. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;

// CSS styles
const styles = {
    footer: {
        backgroundColor: '#000000',
        color: '#fff',
        padding: '10px',
        left: 0,
        bottom: 0,
        width: '100%',
    },
    footerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    socialMedia: {
        display: 'flex',
    },
    socialMediaLink: {
        color: '#fff',
        marginRight: '10px',
    },
    copyright: {
        marginTop: '10px',
        textAlign: 'center',
    },
};
