import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  textInput: {
    width: wp(10),
    height: hp(6),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(10),
    textAlign: 'center',
    fontSize: hp(2.2),
  },
  button: {
    width: '100%',
    height: hp(6),
    backgroundColor: '#212121',
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(0.5),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: hp(2),
    fontWeight: 'bold',
    fontFamily: 'System',
    textAlign: 'center',
  },
  login1Container: {
    flex: 1,
    backgroundColor: '#314efb',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: hp(2), // Reduced margin to keep input/button closer
  },
  logoImage: {
    width: wp(30),
    height: hp(15),
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: hp(5),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: wp(1),
  },
  inputButtonContainer: {
    width: '100%',
    paddingHorizontal: wp(5),
    alignItems: 'center',
  },
  phoneInput: {
    width: '100%',
    height: hp(6),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(10),
    paddingHorizontal: wp(3),
    fontSize: hp(2),
    backgroundColor: '#fff',
    marginBottom: hp(2),
  },
});

export default styles;