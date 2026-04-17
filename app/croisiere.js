import { useLocalSearchParams } from "expo-router";
import Croisiere from "../composants/croisiere";

export default function CroisierePage() {
    const {ligne="", croisieres=[]} = useLocalSearchParams()
    return <Croisiere ligne={ligne} voyage={croisieres}/>
}
