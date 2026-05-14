import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function HeaderBar() {
  const { user, logout, getI18n } = useAuth();
  const router = useRouter();

  const i18n = getI18n({
    en: {
      disconnect: "Disconnect"
    },
    fr: {
      disconnect: "Déconnexion"
    }
  })

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const langueLabel = user.langue === 'auto' ? '🌐' : user.langue === 'fr' ? '🇫🇷' : '🇬🇧';

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>👤 {user.nom}</Text>
        <Text style={styles.lang}>{langueLabel}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>{i18n.t("disconnect")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2d5a27',
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 48,
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  name: { color: '#fff', fontWeight: '600', fontSize: 15, marginRight: 8 },
  lang: { fontSize: 18 },
  logoutBtn: { backgroundColor: '#c0392b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  logoutText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
