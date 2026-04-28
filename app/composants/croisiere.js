import { View, Text } from "react-native";

export default function Croisiere({ligne, croisieres}) {
    var key = 0

    return (
        <View>
            <Text style={styles.ligne}>{ligne}</Text>
            {croisieres.map((c) => (
                <Text key={key++} style={styles.croisiere}>
                    Destination: {c.destination}{"\n "}
                    départ de {c.depart}{"\n "}
                    nombre de jours: {c.nbreJours}
                </Text>
            ))}
        </View>
    )
}

const styles = {
    ligne: {
        fontSize: 25,
        color: 'white',
        backgroundColor: 'blue',
        padding: 7,
        margin: 7
    },
    croisiere: {
        fontSize: 15,
        color: 'blue',
        fontWeight: 'bold',
        padding: 4,
        margin: 4
    }
}
