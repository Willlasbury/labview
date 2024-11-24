import React, { useState, useMemo, Dispatch } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { OnOffButton } from "./genericComp/OnOffToggle"

import Counter from "./genericComp/Counter"
import DropdownList from "./genericComp/DropDownList"
import LabelInput from "./genericComp/LabelInput"
import { constantData } from "@/utils/constantData"

interface WaveformWithClockProps {
  title?: string
  masterPeriod: number
  setMasterPeriod: (masterPeriod: number) => void
  pulseFreq: number
  setPulseFreq: (pulseFreq: number) => void
  pulseLock: boolean
  setPulseLock: (bool: boolean) => void
  dcOffset: number
  setDcOffset: (num: number) => void
  pulseWidth: number
  setPulseWidth: (num: number) => void
  pulseNumOn: number
  setPulseNumOn: (num: number) => void
  pulseNumOff: number
  setPulseNumOff: (num: number) => void
  pulseGate: string
  setPulseGate: (str: string) => void
  pulseClockRatio: number
  setPulseClockRatio: (num: number) => void

}

export default function WaveformWithClock({
  title,
  masterPeriod,
  setMasterPeriod,
  pulseFreq,
  setPulseFreq,
  pulseLock,
  setPulseLock,
  dcOffset,
  setDcOffset,
  pulseNumOn,
  setPulseNumOn,
  pulseNumOff,
  setPulseNumOff,
  pulseGate,
  setPulseGate,
  pulseClockRatio = 1,
  setPulseClockRatio,

}: WaveformWithClockProps) {
  const [timeScale, setTimeScale] = useState(10)


  // this is currently acting as pulse width 
  const [pulseWidth, setPulseWidth] = useState(masterPeriod);
  
  const generateWaveform = useMemo(() => {
    const dataPoints = 10000
    return Array.from({ length: dataPoints }, (_, i) => {
      const x = (i / (dataPoints - 1)) * timeScale
      
      const sinePatternLength = pulseNumOn + pulseNumOff
      const sinePatternPosition = Math.floor(x * pulseFreq * pulseClockRatio) % sinePatternLength
      const sineActivePeriod = (x % (1 / pulseFreq)) < pulseWidth
      
      const sinePhaseWithinPeriod = sineActivePeriod ? ((x % (masterPeriod)) / pulseWidth) * (2 * Math.PI) : null
      
      
      const sineValue = sinePatternPosition < pulseNumOn && sineActivePeriod && sinePhaseWithinPeriod !== null
      ? Math.sin(sinePhaseWithinPeriod) + dcOffset
      : null
      
      const squareValue = Math.sign(Math.sin(x * 1/masterPeriod * 2 * Math.PI))
      
      return { x, sine: sineValue, square: squareValue }
    })
  }, [masterPeriod, pulseFreq, pulseNumOn, pulseNumOff, timeScale, pulseClockRatio, dcOffset, pulseWidth])
  
  const xAxisDomain = [0, timeScale]
  
  const handleDutyCycle = (val: number) => {
    setPulseWidth(masterPeriod * val/100)
  }

  const handleMasterPeriod = (val: number) => {
    if (val < pulseWidth) {
      setPulseWidth(val)
    }
    setMasterPeriod(val)
  }
  console.log("pulseWidth:", pulseWidth)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* GRAPH */}
        <div className="h-[300px] w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateWaveform} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3" />
              <XAxis
                dataKey="x"
                type="number"
                domain={xAxisDomain}
                tickFormatter={(value) => value.toFixed(2)}
                label={{ value: "Time (s)", position: "insideBottomRight", offset: -5 }}
              />
              <YAxis domain={[dcOffset - 1, dcOffset + 1]} />
              <Line
                type="monotone"
                dataKey="sine"
                stroke='red'
                dot={false}
                isAnimationActive={false}
                name="Sine Wave"
                connectNulls={false}
              />
              <Line
                type="stepAfter"
                dataKey="square"
                stroke='blue'
                dot={false}
                isAnimationActive={false}
                strokeWidth={2}
                name="Square Wave (Clock)"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CONTROLS */}
        <div className="space-y-2">
          {/* grab the to be made master freq and create a component to and flip it adjust period this should then
          go back to adjust the squareValue component */}
          <LabelInput title={"Clock Period"} description="hello" unit="s" value={masterPeriod} setValue={handleMasterPeriod} />
          {/* <LabelInput title={"Pulse Period"} description="hello" unit="s" value={pulseFreq} setValue={setPulseFreq} /> */}
          <OnOffButton title={["Pulse Lock", "Duty Cycle Lock"]} value={pulseLock} setValue={setPulseLock} />
          <Counter title={"Duty Cycle"} unit="%" min={0} max={100} step={1} value={ (pulseWidth / masterPeriod) * 100 } setValue={handleDutyCycle} />
          <LabelInput title={"Pulse Width"} description="hello" unit="s" min={0} max={masterPeriod} step={0.01} value={pulseWidth} setValue={setPulseWidth} />
            
          <Counter title="DC Offset" value={dcOffset} setValue={setDcOffset} min={-100} max={100} />
        </div>
        <Counter title={"Pulse Number On"} value={pulseNumOn} setValue={setPulseNumOn} min={1} />
        <Counter title={"Pulse Number Off"} value={pulseNumOff} setValue={setPulseNumOff} />
        <DropdownList title={"Pulse Gate"} description={'some text'} valueOptions={constantData.pulseGate.array} defaultValue={pulseGate} setValue={setPulseGate} />

        <div className="space-y-2">
          <DropdownList title={"Pulse to Clock Out Ratio"} defaultValue={1} valueOptions={constantData.pulseClockOut.array} setValue={setPulseClockRatio} />

        </div>
      </CardContent>
    </Card>
  )
}

