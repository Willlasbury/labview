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
  const [sineCycles, setSineCycles] = useState(0)
  const [squareCycles, setSquareCycles] = useState(0)
  const [sineYPosition, setSineYPosition] = useState(0)

  const generateWaveform = useMemo(() => {

    return Array.from({ length: 400 }, (_, i) => {
      const x = (i / 399) * timeScale

      const sinePatternLength = pulseNumOn + pulseNumOff
      const sinePatternPosition = Math.floor(x * pulseFreq * pulseClockRatio) % sinePatternLength
      const sineValue = sinePatternPosition < pulseNumOn
        ? Math.sin(x * pulseFreq * pulseClockRatio * 2 * Math.PI) + dcOffset
        : null
            const squareValue = Math.sign(Math.sin(x * pulseFreq * 2 * Math.PI))

      return { x, sine: sineValue, square: squareValue }
    })
  }, [pulseFreq, pulseNumOn, pulseNumOff, timeScale, sineCycles, squareCycles, pulseClockRatio, dcOffset])

  const xAxisDomain = [0, timeScale]


  console.log("x, pulseFreq, pulseClockRaio:",  generateWaveform)

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
              <YAxis domain={[dcOffset - 1.1, dcOffset + 1.1]} />
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
          <LabelInput title={"Pulse Frequency"} description="hello" unit="MHz" value={pulseFreq} setValue={setPulseFreq} />
          <Counter title="DC Offset" value={dcOffset} setValue={setDcOffset} />
        </div>
        <Counter title={"Pulse Number On"} value={pulseNumOn} setValue={setPulseNumOn} min={1} />
        <Counter title={"Pulse Number Off"} value={pulseNumOff} setValue={setPulseNumOff} />
        <DropdownList title={"Pulse Gate"} description={'some text'} valueOptions={constantData.pulseGate.array} defaultValue={pulseGate} setValue={setPulseGate} />

        <div className="space-y-2">
          <DropdownList title={"Pulse to Clock Out Ratio"} defaultValue={1} valueOptions={constantData.pulseClockOut.array} setValue={setPulseClockRatio} />

        </div>
        <OnOffButton title={["Pulse Lock", "Duty Cycle Lock"]} value={pulseLock} setValue={setPulseLock} />
      </CardContent>
    </Card>
  )
}

