import { StyleSheet, View } from 'react-native'
import { Link } from 'expo-router'

export default function compte() {
    return (
        <View>
            <Link style={styles.link} href="/entrepots">Entrepots</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    link: {
        marginVertical: 30
    }
})
