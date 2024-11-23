import { useState } from "react";
import LabelInput from "@/components/genericComp/LabelInput"
import { DropdownList } from "@/components/genericComp/DropDownList";
import { fakeData } from "@/utils/fakeData";
import { OnOffButton } from "@/components/genericComp/OnOffToggle";
import { ScrollAreaList } from "@/components/genericComp/ScollAreaList";
import Counter from "@/components/genericComp/Counter";
import { StringLogger } from "@/components/genericComp/LogDisplay";

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
        <div className="flex flex-col overflow-y-auto w-full h-full">
            {/* <main className="flex flex-1 flex-col overflow-y-auto py-4 px-6 rounded-md"> */}
                <header className="pl-10">
                    <h1 className="mb-8 text-2xl font-extrabold">Session Log</h1>
                </header>
                <section className="flex flex-col h-1/8 w-full mb-8">
                    <div className="w-full flex flex-col justify-center">

                        <LabelInput title={"Pulse Frequency"} description="hello" unit="MHz" value={pulseFreq} setValue={setPulseFreq} />
                        <LabelInput title={"Period"} unit="ns" value={period} setValue={setPeriod} />
                    </div>
                    <div className="w-full">
                        <Counter title={"Pulse Number On"} value={pulseNumOn} setValue={setPulseNumOn} />
                        <Counter title={"Pulse Number Off"} value={pulseNumOff} setValue={setPulseNumOff} />
                        <Counter title={'Pulse DC Offset'} unit={'V'} value={pulseDC} setValue={setPulseDC} />
                    </div>
                </section>
                <section className="mb-8 flex flex-col flex-wrap w-full">

                    <DropdownList title={"Pulse Gate"} description={'some text'} valueOptions={fakeData.pulseGate.array} value={pulseGate} setValue={setPulseGate} />
                    <DropdownList title={"Low Res Pulse Width"} description={'some text'} unit="ns" valueOptions={fakeData.lowResPulseWidth.array} setValue={setLowResPulseWidth} />
                    <DropdownList title={"Low Res Pulse DC"} unit="%" valueOptions={fakeData.lowResPulseDC.array} setValue={setLowResPulseDC} />
                    <DropdownList title={"Pulse to Clock Out Ratio"} valueOptions={fakeData.pulseClockOut.array} setValue={setPulseClockRatio} />
                </section>
                <OnOffButton title={"Output Enabled"} value={outPutEnabled} setValue={setOutPutEnabled} />
            {/* </main> */}
            {/* <footer className="w-full mx-auto"> */}
                <StringLogger title={'Session Log'} input={'input'} />
            {/* </footer> */}
        </div>
    )
}