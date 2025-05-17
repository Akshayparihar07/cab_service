import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  textInput: {
    width: wp(90),
    height: hp(6),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(10),
    textAlign: 'center',
    fontSize: hp(2.2),
    marginBottom: 24
  },
});

export default styles;