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
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomButton from "../../components/Button";
import styles from "../../style.js";

// Use a random placeholder image from Unsplash
const image = {
  uri: "https://img.freepik.com/premium-vector/car-rental-service-rent-vehicle-automobile-cartoon-illustration_212005-189.jpg",
};

// Button Component
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

// HandleResponse Component
const HandleResponse = ({ isError, isSuccess, error, message, onSuccess }) => {
  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
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

// Logo Component
const Logo = ({ style }) => (
  <View
    style={[{ alignItems: "center", flex: 1, justifyContent: "center" }, style]}
  >
    <Text style={{ fontSize: hp(3), fontWeight: "bold", color: "#374151" }}>
      App Logo
    </Text>
  </View>
);

// TextField Component
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

export default function LoginScreen() {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loginScreen, setLoginScreen] = useState("login_1");

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    setFocus,
    watch,
  } = useForm({
    resolver: yupResolver(mobileLoginSchema),
    defaultValues: { mobile: "", otp: "", isOtpSent: false },
  });

  useEffect(() => {
    setFocus("mobile");
  }, []);

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

  return (
    <>
      <Stack.Screen
        options={{
          title: "Go Back",
          headerBackTitleVisible: false,
        }}
      />
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}

      {loginScreen === "login_1" && (
        <View style={styles.login1Container}>
          {/* Logo centered on the screen */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")} // Verify path
              style={styles.logoImage}
            />
            <Text style={styles.logoText}>Logo</Text>
          </View>

          {/* Input field and button container */}
          <View style={styles.inputButtonContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            <CustomButton
              title="Send OTP" // Fixed typo from "Send Otp"
              onPress={() => {
                console.log("Send OTP pressed");
                setLoginScreen("login_2");
              }}
            />
          </View>
        </View>
      )}
      {loginScreen === "login_2" && (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={{ height: hp(30) }}>
            <Image
              source={image}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </View>
          <View style={{ paddingHorizontal: wp(6), flex: 1 }}>
            <View
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: wp(8),
                paddingVertical: hp(3),
                marginBottom: hp(0.5),
                shadowColor: "grey",
                shadowOffset: { width: 0, height: hp(0.5) },
                shadowOpacity: 0.3,
                shadowRadius: wp(1.2),
                elevation: 8,
                borderRadius: wp(3),
                flex: 1,
              }}
            >
              <View style={{ height: hp(20), justifyContent: "center" }}>
                <Logo
                  style={{
                    marginHorizontal: "auto",
                    width: wp(40),
                    height: "100%",
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: hp(1),
                  marginBottom: hp(1.5),
                  fontSize: hp(2.5),
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>

              <TextField
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
                    const inputs = useRef([]);

                    const handleChange = (text, index) => {
                      const otpArray = value.split("");
                      otpArray[index] = text;
                      const newValue = otpArray.join("");
                      onChange(newValue);

                      if (text && index < 5) {
                        inputs.current[index + 1]?.focus();
                      }
                    };

                    const handleKeyPress = (e, index) => {
                      if (
                        e.nativeEvent.key === "Backspace" &&
                        !value[index] &&
                        index > 0
                      ) {
                        inputs.current[index - 1]?.focus();
                      }
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
                              style={styles.textInput}
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
              <Button
                isLoading={isLoading}
                onPress={
                  otpSent ? handleSubmit(onSubmitOtp) : handleSubmit(onSendOtp)
                }
              >
                {otpSent ? "Submit" : "Send OTP"}
              </Button>

              <View style={{ flexDirection: "row", paddingTop: hp(1) }}>
                <Text
                  style={{
                    marginRight: wp(2),
                    color: "#374151",
                    fontSize: hp(1.5),
                  }}
                >
                  I don't have an account yet.
                </Text>
                <Link
                  replace
                  href="/register"
                  style={{ color: "#3b82f6", fontSize: hp(1.5) }}
                >
                  Create an account
                </Link>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}