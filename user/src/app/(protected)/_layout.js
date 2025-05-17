import { Redirect, Stack } from 'expo-router';

const isLoggedIn = true;
const ProtectedLayout = () => {
    if (!isLoggedIn) return <Redirect href=''/>
    return <Stack screenOptions={{headerShown: false}}/>
}

export default ProtectedLayout;