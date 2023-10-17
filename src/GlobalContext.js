import { createContext, useContext, useState } from "react";
import axios from "axios";
let GlobalContext = createContext()

export let ContextProvider = ({ children }) => {
    const [Values, setValues] = useState({})
    const [SelectedElements, setSelectedElements] = useState([])
    const [RedCircles, setRedCircles] = useState({})
    const [ShowData, setShowData] = useState({ explanation: '', diagnoses: [] })
    const [ShowResultPopup, setShowResultPopup] = useState(false)
    const [ShowResults, setShowResults] = useState(false);
    let removeElement = (element) => {
        let elements = SelectedElements.filter(el => el !== element)
        setSelectedElements([...elements])
        delete RedCircles[element]
        setRedCircles(RedCircles)
    }

    let symptoms = {
        head: {
            name: 'Tête et cou',
            elements: ["Acouphène", "Agnosie", "Agueusie", "Amnésie", "Céphalée", "Cervicalgie", "Raideur de la nuque", "Diplopie", "Dysphonie", "Erythrose  faciale", "Hallucination visuelle", "Douleur sans précision", "Apraxie", "Convulsion", "Epistaxis", "Hémianopsie", "Hypoacousie", "Fièvre", "Obstruction nasale", "Rhinorrhée", "Sècheresse buccale", "Ictère", "Mélanodermie", "Myxœdème cutanée", "Hallucination auditive", "Hallucinose sans précision", "Macroglossie", "Otalgie", "Otorrhée", "Pâleur", "Syncope", "Troubles cognitifs", "Troubles de sommeil", "Troubles visuels", "Vertige", "Dysphagie", "Alopécie", "Anosognosie", "Déficit moteur", "Hémiasomatognosie", "Soif", "Somnolence", "Adénopathie", "Surdité", "Cyanose", "confusion", "Troubles de la mémoire", "Difficulté de concentration et à penser clairement", "Changements de personnalité"],
        },
        chest: {
            name: 'Thorax',
            elements: ["Bradycardie", "Bradypnée", "Douleur thoracique", "Éréthisme cardiaque", "Hémoptysie", "Ronflement", "Douleur sans précision", "Dysphagie", "Dyspnée", "Expectoration", "Galactorrhée", "Gynécomastie", "Palpitation", "Pyrosis", "Régurgitation", "Tachycardie", "Tachypnée", "Toux", "Sifflements respiratoires"]
        },
        belly: {
            name: 'Abdomen',
            elements: ["Anorexie", "Ascite", "Ballonnement abdominal", "Circulation veineuse collatérale", "Constipation", "Douleur sans précision", "Douleur abdominale sans précision", "Douleur abdominale hypogastrique", "Douleur abdominale épigastrique", "Douleur abdominale flanc iliaque", "Hématémèse", "Hépatalgie", "Masse abdominale", "Méléna", "Nausée", "Rectorragie", "Vomissement", "Arrêt des matières et des gaz", "Diarrhée", "Dyspepsie", "Faux besoins", "Hématémèse", "Polyphagie", "Ictère", "Hépatomégalie"]
        },
        waist: {
            name: 'Uro-génital',
            elements: ["Incontinence urinaire", "Incontinence vésicale", "Hématurie", "Enurésie", "Oligurie", "Chylurie", "Dysarthrie", "Dysurie", "Dysménorrhée", "Polyurie"]
        },
        feet: {
            name: 'Membres et articulations',
            elements: ["Akinésie", "Amyotrophie", "Crampe musculaire", "Douleur articulaire", "Tuméfaction membre inférieur", "Tuméfaction membre supérieur", "Déficit moteur", "Déformation", "Myxœdème cutanée", "Douleur de jambe (Pieds uniquement)", "Claudication", "Epanchement", "Impotence", "Myalgie", "Raideur", "Tremblements", "Trouble de marche (que les pieds)", "Œdème", "Adénopathie", "Désaxation", "Ataxie", "Fatigue ou faiblesse musculaire", "Gonflements des articulations"]
        },
        hands: {
            name: 'Extrémités supérieurs',
            elements: ["Cyanose", "Hippocratisme digital", "Ongles cassants ou secs"]
        },
        back: {
            name: 'Dos',
            elements: ["Dorsalgie", "Eruption cutanée", "Lombalgie", "Incontinence fécale"]
        },
        general: {
            name: 'global',
            elements: ["Amaigrissement", "Anxiété", "Asthénie", "Erythème", "Frigidite", "Frisson", "Sueur nocturne", "Thermophobie", "Chaleur locale", "Veines dilatés", "Hypotension", "Hypersudation", "Hypothermie", "Lésion bulleuse", "Macule", "Obésité", "Papule", "Prurit", "Pustule", "Ulcération de la peau", "Vésicule", "Peu tendue ou lisse", "Retard de croissance", "Hyperpigmentation de la peau", "Dépression", "perte de libido", "Hypoglycémie", "Hyponatrémie", "Hyperkaliémie", "Plaques rouges sur la peau", "Squames"],
        },
    }

    let handleSubmit = async () => {
        try {
            let url = "https://api.chatbot.symptomator.mediot.io/predict";
            if(!Values.Sexe) return window.alert('Please enter the gender!')
            if(!Values.Age) return window.alert('Please enter the age!')

            let symptoms = {}
            symptoms.age = (Values?.Age).toLowerCase();
            symptoms.sex = Values?.Sexe;
            symptoms.symptoms = {}
            SelectedElements.forEach(el => {
                symptoms.symptoms[el] = true
            })
            symptoms.symptoms['a'] = false

            let res = await axios.post(url, symptoms)
            if(res.data) {
                setShowResultPopup(true)
                setShowData(res.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    let TousSymtoms = []
    for(let key in symptoms) { TousSymtoms.push(...symptoms[key].elements);}

    let state = {
        Values: [Values, setValues],
        SelectedElements: [SelectedElements, setSelectedElements],
        removeElement: removeElement,
        symptoms: symptoms,
        TousSymtoms: TousSymtoms,
        RedCircles: [RedCircles, setRedCircles],
        ShowResultPopup: [ShowResultPopup, setShowResultPopup],
        ShowData: [ShowData, setShowData],
        handleSubmit: handleSubmit,
    }

    return (
        <GlobalContext.Provider value={state}>
            { children }
        </GlobalContext.Provider>
    )
}

export let useGlobalContext = () => useContext(GlobalContext)