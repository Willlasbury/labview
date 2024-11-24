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
import DropdownList  from "./genericComp/DropDownList"
import LabelInput from "./genericComp/LabelInput"
import { constantData } from "@/utils/constantData"

interface WaveformWithClockProps {
  pulseFreq: number
  setPulseFreq: (pulseFreq: number) => void
  pulseLock: boolean
  setPulseLock: (bool: boolean) => void
  pulseWidth: number
  setPulseWidth: (num: number) => void
  pulseNumOn: number
  setPulseNumOn: (num: number) => void
  pulseNumOff: number
  setPulseNumOff: (num: number) => void
  pulseGate: string
  setPulseGate: (str: string) => void
  
  // period: number
  // setPeriod: (period: number) => void
  initialTimeScale?: number
  initialSineCycles?: number
  initialSquareCycles?: number
  initialSineBreakPattern?: { on: number; off: number }
  initialSquareBreakPattern?: { on: number; off: number }
  title?: string
}

export default function WaveformWithClock({
  pulseFreq,
  setPulseFreq,
  pulseLock,
  setPulseLock,
  pulseNumOn,
  setPulseNumOn,
  pulseNumOff,
  setPulseNumOff,
  pulseGate,
  setPulseGate,
  // period,
  // setPeriod,

  initialTimeScale = 10,
  initialSineCycles = 0,
  initialSquareCycles = 0,
  initialSineBreakPattern = { on: 3, off: 1 },
  title = "Waveform with Independent Clock Output"
}: WaveformWithClockProps) {
  const [timeScale, setTimeScale] = useState(initialTimeScale)
  const [sineCycles, setSineCycles] = useState(initialSineCycles)
  const [squareCycles, setSquareCycles] = useState(initialSquareCycles)
  const [sineBreakPattern, setSineBreakPattern] = useState(initialSineBreakPattern)
  const [showSquareWave, setShowSquareWave] = useState(true)
  const [frequencyRatio, setFrequencyRatio] = useState({ sine: 1, square: 1 })

  const generateWaveform = useMemo(() => {
    const sineCycleLength = sineCycles > 0 ? (sineCycles / pulseFreq) : timeScale
    const squareCycleLength = squareCycles > 0 ? (squareCycles / pulseFreq) : timeScale
    const maxLength = Math.max(sineCycleLength, squareCycleLength)

    return Array.from({ length: 400 }, (_, i) => {
      const x = (i / 399) * maxLength

      const sinePatternLength = pulseNumOn + pulseNumOff
      const sinePatternPosition = Math.floor(x * pulseFreq * frequencyRatio.sine) % sinePatternLength
      const sineValue = sinePatternPosition < pulseNumOn
        ? Math.sin(x * pulseFreq * frequencyRatio.sine * 2 * Math.PI)
        : null

      // const squarePatternLength = squareBreakPattern.on + squareBreakPattern.off
      // const squarePatternPosition = Math.floor(x * pulseFreq * frequencyRatio.square) 
      // const squareValue = squarePatternPosition < squareBreakPattern.on
      //   ? Math.sign(Math.sin(x * pulseFreq * frequencyRatio.square * 2 * Math.PI))
      //   : null

      const squareValue = Math.sign(Math.sin(x * pulseFreq * frequencyRatio.square * 2 * Math.PI))

      return { x, sine: sineValue, square: squareValue }
    })
  }, [pulseFreq, pulseNumOn, pulseNumOff, timeScale, sineCycles, squareCycles, sineBreakPattern, frequencyRatio])

  const xAxisDomain = [0, Math.max(
    sineCycles > 0 ? sineCycles / pulseFreq : timeScale,
    squareCycles > 0 ? squareCycles / pulseFreq : timeScale
  )]

  const handleFrequencyRatioChange = (wave: "sine" | "square", value: number) => {
    setFrequencyRatio(prev => ({ ...prev, [wave]: value }))
  }

  const handleBreakPatternChange = (wave: "sine" | "square", type: "on" | "off", value: number) => {
    setSineBreakPattern(prev => ({ ...prev, [type]: value }))
  }

  const handlePulseNumOnChange = (value: number) => {
    return
  }

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
              <YAxis domain={[-1.1, 1.1]} />
              <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" />
              <Line
                type="monotone"
                dataKey="sine"
                stroke='red'
                dot={false}
                isAnimationActive={false}
                name="Sine Wave"
                connectNulls={false}
              />
              {showSquareWave && (
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
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CONTROLS */}
        {/* <Tabs defaultValue="sine" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sine">Sine Wave</TabsTrigger>
            <TabsTrigger value="square">Square Wave</TabsTrigger>
          </TabsList>
          <TabsContent value="sine" className="space-y-4"> */}
        <div className="space-y-2">
        <LabelInput title={"Pulse Frequency"} description="hello" unit="MHz" value={pulseFreq} setValue={setPulseFreq} />

          {/* <Label htmlFor="sine-frequency-slider">Frequency: {pulseFreq.toFixed(2)} Hz</Label>
          <Slider
            id="sine-frequency-slider"
            min={0.1}
            max={5}
            step={0.1}
            value={[pulseFreq]}
            onValueChange={(value) => setPulseFreq(value[0])}
          /> */}
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="sine-cycles-select">Number of Cycles</Label>
          <Select
            value={sineCycles.toString()}
            onValueChange={(value) => setSineCycles(parseInt(value))}
          >
            <SelectTrigger id="sine-cycles-select">
              <SelectValue placeholder="Select number of cycles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Full Time Scale</SelectItem>
              <SelectItem value="1">1 Cycle</SelectItem>
              <SelectItem value="2">2 Cycles</SelectItem>
              <SelectItem value="5">5 Cycles</SelectItem>
              <SelectItem value="10">10 Cycles</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <Counter title={"Pulse Number On"} value={pulseNumOn} setValue={setPulseNumOn} min={1}/>
        <Counter title={"Pulse Number Off"} value={pulseNumOff} setValue={setPulseNumOff} />
        <DropdownList title={"Pulse Gate"} description={'some text'} valueOptions={constantData.pulseGate.array} value={pulseGate} setValue={setPulseGate} />

        {/* <div className="space-y-2">
          <Label htmlFor="sine-break-pattern-on">Break Pattern (On Cycles)</Label>
          <Input
            id="sine-break-pattern-on"
            type="number"
            min="1"
            value={pulseNumOn}
            onChange={(e) => handleBreakPatternChange("sine", "on", parseInt(e.target.value) || 1)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sine-break-pattern-off">Break Pattern (Off Cycles)</Label>
          <Input
            id="sine-break-pattern-off"
            type="number"
            min="0"
            value={pulseNumOff}
            onChange={(e) => handleBreakPatternChange("sine", "off", parseInt(e.target.value) || 0)}
          />
        </div> */}
        <div className="space-y-2">
          <Label htmlFor="sine-frequency-ratio">Pulse Clock Out Ratio</Label>
          <Input
            id="sine-frequency-ratio"
            type="number"
            min="1"
            max="10"
            value={frequencyRatio.sine}
            onChange={(e) => handleFrequencyRatioChange("sine", parseInt(e.target.value) || 1)}
          />
        </div>
        <OnOffButton title={["Pulse Lock", "Duty Cycle Lock"]} value={pulseLock} setValue={setPulseLock} />
        {/* </TabsContent> */}
        {/* </Tabs>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="timescale-slider">Time Scale: {timeScale.toFixed(1)} seconds</Label>
            <Slider
              id="timescale-slider"
              min={1}
              max={20}
              step={0.1}
              value={[timeScale]}
              onValueChange={(value) => setTimeScale(value[0])}
              disabled={sineCycles > 0 || squareCycles > 0}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-square-wave"
              checked={showSquareWave}
              onCheckedChange={setShowSquareWave}
            />
            <Label htmlFor="show-square-wave">Show Clock Output</Label>
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}

