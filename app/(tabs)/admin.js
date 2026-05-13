import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

var id = 0;

export default function admin() {
   const [name, setName] = useState("");
   const [desc, setDesc] = useState("");
   const [price, setPrice] = useState("");

   return (
      <View style={styles.container}>
         <TextInput placeholder="Nom" value={name} onChangeText={setName} style={styles.input} />
         <TextInput placeholder="Description" value={desc} onChangeText={setDesc} style={styles.input} />
         <TextInput placeholder="Prix" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />

         <Pressable
         style={styles.button}
         onPress={() => {
            const p = {
               id: id++,
               name,
               description: desc,
               price: parseFloat(price),
            }
            // TODO: insert
         } }
         >
         <Text style={styles.buttonText}>Ajouter</Text>
      </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({
   container: { padding: 10 },
   input: { backgroundColor: "#eee", padding: 10, marginBottom: 10, borderRadius: 8 },
   button: { backgroundColor: "green", padding: 10, borderRadius: 8 },
   buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
