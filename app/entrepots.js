import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EntrepotsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Nos entrepôts</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.body}>
        <Text style={styles.icon}>🗺️</Text>
        <Text style={styles.text}>Page entrepôts</Text>
        <Text style={styles.sub}>(à compléter par Théothyme)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7ee' },
  navBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2d5a27', paddingTop: 48, paddingBottom: 12, paddingHorizontal: 12 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  navTitle: { flex: 1, color: '#fff', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 64, marginBottom: 16 },
  text: { fontSize: 20, fontWeight: '700', color: '#333' },
  sub: { color: '#888', marginTop: 6 },
});
