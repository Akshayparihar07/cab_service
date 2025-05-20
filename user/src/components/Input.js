import {
  Text,
  TextInput,
  View,

} from "react-native";
import {  Controller } from "react-hook-form";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TextField = ({ errors, placeholder, name, keyboardType, control, style }) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
      <View style={{ marginBottom: hp(3) }}>
        <TextInput
          style={[
            {
              borderWidth: 1,
              borderColor: errors ? "#dc2626" : "#ccc",
              borderRadius: wp(2),
              padding: wp(3),
              fontSize: hp(2),
              width: "100%",
            },
            style, // <-- apply external styles here
          ]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChange}
        />
        {errors && (
          <Text
            style={{ color: "#f7f7f7", fontSize: hp(1.5), marginTop: hp(0.5) }}
          >
            {errors.message}
          </Text>
        )}
      </View>
    )}
  />
);

export {TextField} ;