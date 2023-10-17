import Gender from '../assets/Gender.svg'
import Calendar from '../assets/Calendar.svg'
import Temperature from '../assets/Temperature.svg'
import Saturation from '../assets/Saturation.svg'

export let inputsData = [
    {
        name: 'Sexe',
        icon: Gender,
        min: '',
        max: '',
        unit: '',
    },
    {
        name: 'Age',
        icon: Calendar,
        min: 1,
        max: 120,
        unit: 'ans',
    },
    {
        name: 'Temperature',
        icon: Temperature,
        min: 36,
        max: 41,
        unit: '°C',
    },
    {
        name: 'Saturation',
        icon: Saturation,
        min: 1,
        max: 100,
        unit: '%',
    },
]