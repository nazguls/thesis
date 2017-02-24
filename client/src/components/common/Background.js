import React from 'react';
import { Image, View } from 'react-native';

const Background = (props) => {
  return (
    <Image source={require('../assets/background5.jpg')} style={styles.containerStyle}>
      {props.children}
    </Image>
  );
};


export { Background };

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null
  }
};
