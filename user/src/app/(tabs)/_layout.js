import { Redirect, Stack } from "expo-router";

const TabsLayout = () => {
    const isLoggedInTab = false; // You should replace this with your actual auth state logic

    if (!isLoggedInTab) {
        return (
            <Redirect href="/(auth)/login" />
        )
    }

    return <Stack screenOptions={{headerShown: false}}/>
}
export default TabsLayout;