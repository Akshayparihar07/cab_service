import { Stack, Redirect } from "expo-router";

const RootLayout = () => {
  const isLoggedIn = false; // You should replace this with your actual auth state logic

  // If not logged in and trying to access protected routes, redirect to login
  if (!isLoggedIn) {
    return (
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  }

  // If logged in, show all routes with tabs as initial
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="(tabs)"
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default RootLayout;