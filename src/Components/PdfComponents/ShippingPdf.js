import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import Header from './Header';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
});

const ShippingPDF = ({ companyName, subtext, id }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Display header with company information */}
        <Header companyName={companyName} subtext={subtext} id={id} />
        {/* Other content of the PDF */}
      </Page>
    </Document>
  );
};

export default ShippingPDF;
