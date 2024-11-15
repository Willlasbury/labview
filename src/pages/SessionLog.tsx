import LabelInput from "@/components/valueEditors/PulseFreq"

type SessionLogProps = {
    perFreq: number,
    setPerFreq: (val: number) => void
}

export function SessionLog(props: SessionLogProps) {
    return (
        <>
        <LabelInput label={"Period Frequency"} val={props.perFreq} setVal={props.setPerFreq}/>
        </>
    )
}