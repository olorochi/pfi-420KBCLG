import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { DbProvider } from '../context/DbContext';
import { migrateDbIfNeeded } from '../database/migrations';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="nains2.db" onInit={migrateDbIfNeeded}>
      <DbProvider>
        <AuthProvider>
          <CartProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="produit/[id]" />
              <Stack.Screen name="entrepots" />
            </Stack>
          </CartProvider>
        </AuthProvider>
      </DbProvider>
    </SQLiteProvider>
  );
}
