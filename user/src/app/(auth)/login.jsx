import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styles from "../../style.js";
import CustomButton from "../../components/common/Button.jsx";
import { useCustomFonts } from "../../hooks/useCustomFonts.js";
import { Ionicons } from "@expo/vector-icons";
import { TextField as CustomInput } from "../../components/Input.js";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Placeholder image
const image = {
  uri: "https://static.vecteezy.com/system/resources/previews/035/930/226/non_2x/ai-generated-3d-futuristic-car-free-png.png",
};

const Button = ({ isLoading, onPress, children, style }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={isLoading}
    style={[
      {
        backgroundColor: isLoading ? "#ccc" : "#3b82f6",
        paddingVertical: hp(1.5),
        borderRadius: wp(2),
        alignItems: "center",
        marginBottom: hp(2),
      },
      style,
    ]}
  >
    {isLoading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={{ color: "#fff", fontSize: hp(2), fontWeight: "600" }}>
        {children}
      </Text>
    )}
  </TouchableOpacity>
);

const HandleResponse = ({ isError, isSuccess, error, message, onSuccess }) => {
  useEffect(() => {
    if (isSuccess) onSuccess();
  }, [isSuccess, onSuccess]);

  if (isError) {
    return (
      <View
        style={{
          padding: wp(3),
          backgroundColor: "#fee2e2",
          borderRadius: wp(2),
          margin: wp(4),
        }}
      >
        <Text style={{ color: "#dc2626", fontSize: hp(1.8) }}>{error}</Text>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View
        style={{
          padding: wp(3),
          backgroundColor: "#dcfce7",
          borderRadius: wp(2),
          margin: wp(4),
        }}
      >
        <Text style={{ color: "#15803d", fontSize: hp(1.8) }}>{message}</Text>
      </View>
    );
  }

  return null;
};

const Logo = ({ style }) => (
  <View
    style={[{ alignItems: "center", flex: 1, justifyContent: "center" }, style]}
  >
    <Text style={[styles.logoText, inner_styles.oswaldFont]}>App Logo</Text>
    <Text style={{ fontFamily: "Oswald", fontSize: hp(2), fontWeight: "400" }}>
      Test Font
    </Text>
  </View>
);

const TextField = ({ errors, placeholder, name, keyboardType, control }) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
      <View style={{ marginBottom: hp(3) }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: errors ? "#dc2626" : "#ccc",
            borderRadius: wp(2),
            padding: wp(3),
            fontSize: hp(2),
            width: "100%",
          }}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChange}
        />
        {errors && (
          <Text
            style={{ color: "#dc2626", fontSize: hp(1.5), marginTop: hp(0.5) }}
          >
            {errors.message}
          </Text>
        )}
      </View>
    )}
  />
);

const mobileLoginSchema = yup.object().shape({
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  otp: yup.string().when("isOtpSent", {
    is: true,
    then: (schema) =>
      schema
        .required("OTP is required")
        .matches(/^[0-9]{4,6}$/, "OTP must be 4-6 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// ------------------- Login1 -------------------
const Login1 = ({ setLoginScreen }) => (
  <View style={styles.login1Container}>
    <View style={[styles.logoContainer, { marginBottom: 74 }]}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logoImage}
      />
      <Text style={[styles.logoText, inner_styles.oswaldFont]}>Logo</Text>
    </View>

    <View style={styles.inputButtonContainer}>
      <TextInput
        style={styles.phoneInput}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      <CustomButton
        title="Send OTP"
        onPress={() => {
          console.log("Send OTP pressed");
          setLoginScreen("login_2");
        }}
      />
    </View>
  </View>
);

// ------------------- Login2 -------------------
const Login2 = ({
  formErrors,
  control,
  handleSubmit,
  onSendOtp,
  onSubmitOtp,
  otpSent,
  isLoading,
}) => {
  const inputs = useRef([]);

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View>
        <View style={{ padding: 12, flexDirection: "row" }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </View>
        <Image
          source={image}
          style={{ width: "100%", height: "300", resizeMode: "cover" }}
        />
      </View>

      <View style={{ paddingHorizontal: wp(6), flex: 1 }}>
        <View
          style={{
            backgroundColor: "#314efb",
            paddingHorizontal: wp(8),
            paddingVertical: hp(3),
            marginBottom: hp(0.5),
            shadowColor: "grey",
            shadowOffset: { width: 0, height: hp(0.5) },
            shadowOpacity: 0.3,
            shadowRadius: wp(1.2),
            elevation: 8,
            borderRadius: wp(3),
            // flex: 1,
          }}
        >
          <Text
            style={{
              marginTop: hp(1),
              marginBottom: hp(1.5),
              fontSize: hp(2.5),
              fontWeight: "bold",
              fontFamily: "Oswald",
              color: "#fff",
            }}
          >
            Login
          </Text>

          {/* <TextField
            style={[styles.phoneInput, {background:"#fff"}]}
            errors={formErrors.mobile}
            placeholder="Enter Mobile Number"
            name="mobile"
            keyboardType="phone-pad"
            control={control}
          /> */}

          <CustomInput
            style={[styles.phoneInput, { backgroundColor: "#fff" }]}
            errors={formErrors.mobile}
            placeholder="Enter Mobile Number"
            name="mobile"
            keyboardType="phone-pad"
            control={control}
          />

          {otpSent && (
            <Controller
              control={control}
              name="otp"
              render={({
                field: { onChange, value = "" },
                fieldState: { error },
              }) => {
                const handleChange = (text, index) => {
                  const otpArray = value.split("");
                  otpArray[index] = text;
                  const newValue = otpArray.join("");
                  onChange(newValue);
                  if (text && index < 5) inputs.current[index + 1]?.focus();
                };

                const handleKeyPress = (e, index) => {
                  if (
                    e.nativeEvent.key === "Backspace" &&
                    !value[index] &&
                    index > 0
                  )
                    inputs.current[index - 1]?.focus();
                };

                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: hp(3),
                    }}
                  >
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <TextInput
                          key={index}
                          ref={(ref) => (inputs.current[index] = ref)}
                          style={{
                            borderWidth: 1,
                            borderColor: error ? "#dc2626" : "#ccc",
                            borderRadius: wp(2),
                            padding: wp(3),
                            fontSize: hp(2),
                            width: wp(12),
                            textAlign: "center",
                          }}
                          maxLength={1}
                          keyboardType="numeric"
                          value={value[index] || ""}
                          onChangeText={(text) => handleChange(text, index)}
                          onKeyPress={(e) => handleKeyPress(e, index)}
                        />
                      ))}
                    {error && (
                      <Text
                        style={{
                          color: "red",
                          fontSize: hp(1.5),
                          position: "absolute",
                          bottom: -hp(2.5),
                        }}
                      >
                        {error.message}
                      </Text>
                    )}
                  </View>
                );
              }}
            />
          )}

          <CustomButton
            // isLoading={isLoading}
            onPress={
              otpSent ? handleSubmit(onSubmitOtp) : handleSubmit(onSendOtp)
            }
            title={otpSent ? "Submit" : "Send OTP"}
          />

          <View style={{ flexDirection: "row", paddingTop: hp(1) }}>
            <Text
              style={{
                marginRight: wp(2),
                color: "#374151",
                fontSize: hp(1.5),
                fontFamily: "Oswald",
              }}
            >
              I don't have an account yet.
            </Text>
            <Link
              replace
              href="/register"
              style={{
                color: "#3b82f6",
                fontSize: hp(1.5),
                fontFamily: "Oswald",
              }}
            >
              Create an account
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------- Main Component -------------------
export default function LoginScreen() {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loginScreen, setLoginScreen] = useState("login_1");
  const { fontsLoaded, fontError } = useCustomFonts();

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    setFocus,
  } = useForm({
    resolver: yupResolver(mobileLoginSchema),
    defaultValues: { mobile: "", otp: "", isOtpSent: false },
  });

  useEffect(() => {
    setFocus("mobile");
  }, [setFocus]);

  const onSendOtp = async ({ mobile }) => {
    if (mobile) {
      setIsLoading(true);
      try {
        console.log("Sending OTP to", mobile);
        setIsSuccess(true);
        setData({ message: "OTP sent successfully" });
        setOtpSent(true);
      } catch (err) {
        setIsError(true);
        setError("Failed to send OTP");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onSubmitOtp = async ({ mobile, otp }) => {
    setIsLoading(true);
    try {
      console.log("Verifying OTP", { mobile, otp });
      setIsSuccess(true);
      setData({
        message: "Login successful",
        data: { token: "mock-token-123" },
      });
    } catch (err) {
      setIsError(true);
      setError("Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const onSuccess = () => {
    console.log("Login successful with token:", data?.data?.token);
    router.replace("/home");
  };

  if (!fontsLoaded && !fontError)
    return <ActivityIndicator size="large" color="#3b82f6" />;
  if (fontError) return <Text>Error loading fonts: {fontError.message}</Text>;

  return (
    <>
      {/* <Stack.Screen
        options={{ title: "Go Back", headerBackTitleVisible: false }}
      /> */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}
      {loginScreen === "login_1" && <Login1 setLoginScreen={setLoginScreen} />}
      {loginScreen === "login_2" && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          // style={{ flex: 1 }}
          // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <Login2
                formErrors={formErrors}
                control={control}
                handleSubmit={handleSubmit}
                onSendOtp={onSendOtp}
                onSubmitOtp={onSubmitOtp}
                otpSent={otpSent}
                isLoading={isLoading}
              />
            </ScrollView>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      
      )}
    </>
  );
}

const inner_styles = StyleSheet.create({
  oswaldFont: {
    fontWeight: "900",
  },
});
