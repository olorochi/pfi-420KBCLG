import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import HeaderBar from '../../components/HeaderBar';

function CartBadge({ count }) {
  if (count === 0) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
    </View>
  );
}

export default function TabsLayout() {
  const { totalItems } = useCart();
  const { user, getI18n } = useAuth();

  const i18n = getI18n({
    en: {
      products: "Products",
      cart: "Cart",
      account: "Account",
      admin: "Admin",
    },
    fr: {
      products: "Produits",
      cart: "Panier",
      account: "Compte",
      admin: "Admin",
    }
  });

  return (
    <>
      <HeaderBar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2d5a27',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#e0e0e0', paddingBottom: 6, height: 60 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        }}
      >
        <Tabs.Screen
          name="produits"
          options={{
            title: i18n.t("products"),
            tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="panier"
          options={{
            title: i18n.t("products"),
            href: user?.admin ? null : "panier",
            tabBarIcon: ({ color }) => (
              <View>
                <Ionicons name="cart-outline" size={28} color={color} />
                <CartBadge count={totalItems} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="admin"
          options={{
            title: i18n.t("admin"),
            href: user?.admin ? "admin" : null,
            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="compte"
          options={{
            title: i18n.t("admin"),
            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute', top: -4, right: -8,
    backgroundColor: '#c0392b', borderRadius: 10,
    minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
