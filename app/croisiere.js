import { useLocalSearchParams } from "expo-router";
import Croisiere from "./composants/croisiere.js";

export default function CroisierePage() {
    const {ligne="", croisiereJSON=""} = useLocalSearchParams()
    const croisieres = JSON.parse(croisiereJSON)
    return <Croisiere ligne={ligne} croisieres={croisieres}/>
}
