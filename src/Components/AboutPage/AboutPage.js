import React from 'react'
import { Container } from 'react-bootstrap';

// Components
import MainBanner from '../Banner/MainBanner';
import Footer from '../Footer/Footer';

import posts_office_img from '../Assets/post-office.jpg';

function AboutPage() {
  return (
    <div style={styles.mainContainer}>
          <MainBanner />
            <Container style={{display:'flex', justifyContent:'center'}}>
              <div style={styles.forgotPasswordBox}>
                  <div style={styles.containerText}>
                    <h1 style={{ fontWeight: 'bolder', margin: '20px 30px 10px'}}>who are we.</h1>
                    <p style={{ width: '90%', margin: '10px 30px 10px', textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p style={{ width: '90%', margin: 'auto 30px', textAlign: 'justify'}}>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                <div style={styles.containerPicture}>
                    <img src={posts_office_img} alt='post-office-jpg' style={{ minWidth: '100%', minHeight: '100%'}}></img>
                </div>
              </div>
            </Container>
          <Footer style={{alignSelf: 'flex-end'}}/>
    </div>
  )
}

const styles = {
    mainContainer: {
        backgroundColor: '#dcdcdc',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-between',
        minHeight: '100vh'
    },
    forgotPasswordBox: {
      backgroundColor: '#53A2BE',
      width: '80vw',
      height: '60vh', 
      display: 'flex',
      borderRadius: '5px',
      overflow: 'hidden',

    },
    containerPicture: {
      // backgroundColor: 'red',
      width: '50%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerText: {
      // backgroundColor: 'green',
      width: '50%',
      height: '100%',
      display: 'flex',
      flexFlow: 'wrap column',
    },

};


export default AboutPage;