import { useState } from "react";
import LabelInput from "@/components/genericComp/LabelInput"
import { DropdownList } from "@/components/genericComp/DropDownList";
import { fakeData } from "@/utils/constantData";
import { OnOffButton } from "@/components/genericComp/OnOffToggle";
import { ScrollAreaList } from "@/components/genericComp/ScollAreaList";
import Counter from "@/components/genericComp/Counter";

export default function CommandWindow() {
    const [pulseFreq, setPulseFreq] = useState<number>(0);
    const [period, setPeriod] = useState<number>(1);
    const [pulseGate, setPulseGate] = useState<string>(fakeData.pulseGate.array[0]);
    const [pulseNumOn, setPulseNumOn] = useState<number>(1);
    const [pulseNumOff, setPulseNumOff] = useState<number>(1);
    const [outPutEnabled, setOutPutEnabled] = useState<boolean>(false);
    const [pulseWidth, setPulseWidth] = useState<number>(1);
    const [dutyCycle, setDutyCycle] = useState<number>(1);
    const [pulseClockRatio, setPulseClockRatio] = useState<number>(1);
    const [pulseDC, setPulseDC] = useState<number>(1);


    return (
        <>
            <LabelInput title={"Pulse Frequency"} unit="Hz" value={pulseFreq} setValue={setPulseFreq} />
            <LabelInput title={"Period"} unit={"s"} value={period} setValue={setPeriod} />
            <ScrollAreaList title={"Pulse Gate"} valueOptions={fakeData.pulseGate} value={pulseGate} setValue={setPulseGate} />
            <LabelInput title={"Pulse Number On"} value={pulseNumOn} setValue={setPulseNumOn} />
            <LabelInput title={"Pulse Number Off"} value={pulseNumOff} setValue={setPulseNumOff} />
            <OnOffButton title={"Output Enabled"} value={outPutEnabled} setValue={setOutPutEnabled} />
            <LabelInput title={"Pulse Width"} unit={"s"} value={pulseWidth} setValue={setPulseWidth} />
            {/* add lock to duty cycle */}
            <LabelInput title={"Duty Cycle"} unit={"%"} value={dutyCycle} setValue={setDutyCycle} />
            <DropdownList title={"Pulse to Clock Out Ratio"} valueOptions={fakeData.pulseClockOut.array} setValue={setPulseClockRatio} />
            <Counter title={'Pulse DC Offset'} unit={'V'} value={pulseDC} setValue={setPulseDC}/>
        </>
    )
}