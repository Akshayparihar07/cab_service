import { Redirect, Stack } from "expo-router";

const loggedIn = false;
const TabsLayout = () => {
    if (!loggedIn) return <Redirect href="/login"/>
    return <Stack screenOptions={{headerShown: false}}/>
}
export default TabsLayout;