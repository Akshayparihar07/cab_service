import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7} // Adds feedback on press
    >
      <Text style={styles.buttonText} allowFontScaling={false}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: hp(6),
    backgroundColor: '#28282B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(0.5), // Added padding to prevent text clipping
  },
  buttonText: {
    color: '#ffffff', // Explicitly using full hex for clarity
    fontSize: hp(2),
    fontWeight: 'bold',
    fontFamily: 'System', // Fallback to system font for reliability
    textAlign: 'center', // Ensure text is centered
  },
});

export default CustomButton;