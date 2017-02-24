import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#42f4c2',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 500,
    borderWidth: 1,
    borderColor: '#42f4c2',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'transparent'


  }
};

export { Button };
