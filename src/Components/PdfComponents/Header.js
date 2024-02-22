import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtext: {
    fontSize: 12,
    marginBottom: 10,
  },
  id: {
    fontSize: 12,
  },
});

const Header = ({ companyName, subtext, id }) => (
  <View style={styles.container}>
    {/* Logo */}
    {/* <Image style={styles.logo} src="/path/to/logo.png" /> */}

    {/* Company title and subtext */}
    <View>
      <Text style={styles.title}>{companyName}</Text>
      <Text style={styles.subtext}>{subtext}</Text>
    </View>

    {/* Document ID */}
    <Text style={styles.id}>ID: {id}</Text>
  </View>
);

export default Header;
