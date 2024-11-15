type LabelInputProp = {
    label: string,
    val: number,
    setVal: (val: number) => void
}

export default function LabelInput ({label, val, setVal}: LabelInputProp) {
    
    return (
        <div className="border-solid border-white border-2">
        <label htmlFor={label} className="">
        {label}
        </label>
        <input id={label} type='number' defaultValue={val} onChange={(e)=>setVal(Number(e.target.value))}/>
        
        </div>
    )
}