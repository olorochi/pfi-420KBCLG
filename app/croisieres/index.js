import Croisiere from '../../composants/croisiere'
import croisieres from '../../trips.json'
import { Text, View, FlatList, Pressable } from 'react-native'
import styles from '../../styles.json'
import { useRouter } from 'expo-router'

const index = () => {
    return (
        <View>
            <Text style={styles.titre}>Nos Lignes de Croisières</Text>
            <FlatList
                data={croisieres}
                renderItem={({item:l}) =>
                    <PressableCroisiere voyage={l}/>
                }
            />
        </View>
    )
}

const PressableCroisiere = ({voyage}) => {
    const router = useRouter();

    return (
        <Pressable style={({pressed}) => {
                const base = {
                    padding: 25,
                    margin: 5,
                    borderRadius: 10,
                    flex: 1,
                    backgroundColor: 'lightblue'
                }

                return pressed ? [base, {backgroundColor: '#5555aa'}] : base
            }}
            onPress={() => {
                router.navigate({
                    pathname:'/croisiere.js',
                    params:{ ligne: voyage.cruiseLine, croisiere: voyage.croisieres }
                })
            }}>
            <Text style={{
                color: 'blue',
                fontWeight: 'bold'
            }}>{voyage.cruiseLine}</Text>
        </Pressable>
    )
}

export default index
