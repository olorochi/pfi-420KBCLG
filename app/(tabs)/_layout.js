import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const TabsLayout = () => {
    return (
        <Tabs name="tabs" screenOptions={{tabBarInactiveTintColor: "lightblue", headerShown: false}}>
            <Tabs.Screen name="index" options={{title: "accueil",
            tabBarIcon: ({color}) => <Ionicons size={28} name="home" color={color}/> }} />
            <Tabs.Screen name="croisieres" options={{title: "croisières",
            tabBarIcon: ({color}) => <Ionicons size={28} name="boat" color={color}/> }} />
            <Tabs.Screen name="recherche" options={{ title: "recherche",
            tabBarIcon: ({color}) => <Ionicons size={28} name="search" color={color}/> }} />
        </Tabs>)
}
export default TabsLayout
