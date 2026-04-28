import Croisiere from '../composants/croisiere'
import croisieres from '../trips.json'
import styles from '../styles.json'
import { FlatList, View, Text } from 'react-native'

const HomePage = () => {
    return (
        <View>
            <Text style={styles.titre}>Nos Croisières en Promotion</Text>
            <FlatList
                data={croisieres}
                renderItem={({item:l}) =>
                    <Croisiere ligne={l.cruiseLine} croisieres={l.croisieres.filter(c => c.surPageAccueil)}/>
                }
            />
        </View>
    )
}
export default HomePage
