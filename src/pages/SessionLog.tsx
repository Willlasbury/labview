import { useState } from "react";
import LabelInput from "@/components/genericComp/LabelInput"
import { DropdownList } from "@/components/genericComp/DropDownList";
import { fakeData } from "@/utils/fakeData";
import { OnOffButton } from "@/components/genericComp/OnOffToggle";
import { ScrollAreaList } from "@/components/genericComp/ScollAreaList";
import Counter from "@/components/genericComp/Counter";

export function SessionLog() {
    const [pulseFreq, setPulseFreq] = useState<number>(0);
    const [period, setPeriod] = useState<number>(1);
    const [pulseGate, setPulseGate] = useState<string>(fakeData.pulseGate.array[0]);
    const [pulseNumOn, setPulseNumOn] = useState<number>(1);
    const [pulseNumOff, setPulseNumOff] = useState<number>(1);
    const [outPutEnabled, setOutPutEnabled] = useState<boolean>(false);
    const [lowResPulseWidth, setLowResPulseWidth] = useState<number>(1);
    const [lowResPulseDC, setLowResPulseDC] = useState<number>(1);
    const [pulseClockRatio, setPulseClockRatio] = useState<number>(1);
    const [pulseDC, setPulseDC] = useState<number>(1);


    return (
        <>
            <LabelInput label={"Pulse Frequency"} unit="Hz" value={pulseFreq} setValue={setPulseFreq} />
            <LabelInput label={"Period"} unit="s" value={period} setValue={setPeriod} />
            <ScrollAreaList title={"Pulse Gate"} valueOptions={fakeData.pulseGate} value={pulseGate} setValue={setPulseGate} />
            <LabelInput label={"Pulse Number On"} value={pulseNumOn} setValue={setPulseNumOn} />
            <LabelInput label={"Pulse Number Off"} value={pulseNumOff} setValue={setPulseNumOff} />
            <OnOffButton title={"Output Enabled"} value={outPutEnabled} setValue={setOutPutEnabled} />
            <DropdownList title={"Low Res Pulse Width"} unit="s" valueOptions={fakeData.lowResPulseWidth.array} setValue={setLowResPulseWidth} />
            <DropdownList title={"Low Res Pulse DC"} unit="%" valueOptions={fakeData.lowResPulseDC.array} setValue={setLowResPulseDC} />
            <DropdownList title={"Pulse to Clock Out Ratio"} valueOptions={fakeData.pulseClockOut.array} setValue={setPulseClockRatio} />
            <Counter title={'Pulse DC Offset'} unit={'V'} count={pulseDC} setCount={setPulseDC}/>
        </>
    )
}