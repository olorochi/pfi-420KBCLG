import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useDb } from "../../context/DbContext";

export default function admin() {
  const db = useSQLiteContext();
  const { markChanged } = useDb();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const onAdd = async () => {
    if (!name.trim() || !desc.trim() || !price.trim()) {
      Alert.alert("Erreur", "Nom, description et prix obligatoires.");
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO Produit (nom, description, prix, image) VALUES (?, ?, ?, ?)",
        name,
        desc,
        price,
        image
      );

      markChanged();

      setName("");
      setDesc("");
      setPrice("");
      setImage("");

      Alert.alert("Succès", "Produit ajouté.");
    } catch (e) {
      Alert.alert("Erreur", "Impossible d'ajouter le produit.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        style={styles.input}
      />

      <TextInput
        placeholder="Prix"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Image"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={onAdd}
      >
        <Text style={styles.buttonText}>Ajouter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    backgroundColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
