import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const TabsLayout = () => {
    return (
        <Tabs name="tabs" screenOptions={{tabBarInactiveTintColor: "lightblue", headerShown: false}}>
            <Tabs.Screen name="index" options={{title: "Produits",
            tabBarIcon: ({color}) => <Ionicons size={28} name="" color={color}/> }} />
            <Tabs.Screen name="panier" options={{title: "Panier",
            tabBarIcon: ({color}) => <Ionicons size={28} name="" color={color}/> }} />
            <Tabs.Screen name="compte" options={{ title: "Compte",
            tabBarIcon: ({color}) => <Ionicons size={28} name="" color={color}/> }} />
        </Tabs>)
}
export default TabsLayout
