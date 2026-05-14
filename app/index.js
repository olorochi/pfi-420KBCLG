import { useState } from 'react';
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, KeyboardAvoidingView, Platform, ScrollView, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function AccueilScreen() {
  const [nom, setNom] = useState('');
  const [mdp, setMdp] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const i18n = new I18n({
    en: {
      title: "Garden Citizens",
      subtitle: '"THE" garden gnome shop!',
      login: "Login",
      username: "Username",
      password: "Password",
      passwordPlaceholder: "Password",
      connect: "Sign in",
      testAccounts: "Test accounts",
      error: "Error",
      fillFields: "Please fill all fields.",
      invalidLogin: "Invalid username or password.",
      and: "and",
      winter: "Winter",
    },
    fr: {
      title: "Citoyens de jardin",
      subtitle: '"LA" boutique de nains de jardins!',
      login: "Connexion",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      passwordPlaceholder: "Mot de passe",
      connect: "Se connecter",
      testAccounts: "Comptes test",
      error: "Erreur",
      fillFields: "Veuillez remplir tous les champs.",
      invalidLogin: "Nom d'utilisateur ou mot de passe invalide.",
      and: "et",
      winter: "Hiver",
    }
  });
  i18n.locale = getLocales()[0].languageCode;

  const handleLogin = async () => {
    if (!nom.trim() || !mdp.trim()) {
      Alert.alert(i18n.t("error"), i18n.t("fillFields"));
      return;
    }
    const success = await login(nom.trim(), mdp.trim());
    if (success) {
      router.replace('/(tabs)/produits');
    } else {
      Alert.alert(i18n.t("error"), i18n.t("invalidLogin"));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.heroContainer}>
          <Image source={{ uri: 'https://imgur.com/a/aWqETz3' }} style={styles.logo} resizeMode="contain"/>
          <Text style={styles.title}>{i18n.t("title")}</Text>
          <Text style={styles.subtitle}>{i18n.t("subtitle")}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{i18n.t("login")}</Text>
          <Text style={styles.label}>{i18n.t("username")}</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="ex: Damien"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.label}>{i18n.t("password")}</Text>
          <TextInput
            style={styles.input}
            value={mdp}
            onChangeText={setMdp}
            placeholder={i18n.t("passwordPlaceholder")}
            secureTextEntry={true}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>{i18n.t("connect")}</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>{i18n.t("testAccounts")} : Damien / 1234  |  Admin / admin123</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Damien Lefebvre {i18n.t("and")} Théotime Perras</Text>
          <Text style={styles.footerSub}>420-KBC-LG — {i18n.t("winter")} 2026</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7ee' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  heroContainer: { alignItems: 'center', marginBottom: 32 },
  logo: { width: 150, height: 150, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800', color: '#2d5a27', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#5a7a54', marginTop: 4, textAlign: 'center' },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#2d5a27', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#c8e6c9', borderRadius: 10, padding: 12,
    fontSize: 16, marginBottom: 16, backgroundColor: '#f9fdf9', color: '#222',
  },
  btn: { backgroundColor: '#2d5a27', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  hint: { marginTop: 12, fontSize: 12, color: '#aaa', textAlign: 'center' },
  footer: { marginTop: 40, alignItems: 'center' },
  footerText: { color: '#5a7a54', fontSize: 13, fontWeight: '600' },
  footerSub: { color: '#aaa', fontSize: 11, marginTop: 2 },
});
