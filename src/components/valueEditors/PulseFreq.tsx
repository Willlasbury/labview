import LabelInput from '@/components/genericComp/LabelInput'


type LabelInputProp = {
    label: string
    description: string
    value: number
    setValue: (value: number) => void
}

export default function PulseFreq ({label, value, description setValue}: LabelInputProp) {
    
    return (
        <LabelInput label={label} description={description}/>
    )
}