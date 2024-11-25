import { useState, useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/subComp/card"
import { TabComponent } from "./genericComp/TabComp"
import { cn } from "@/lib/utils"

import Counter from "./genericComp/Counter"
import DropdownList from "./genericComp/DropDownList"
import LabelInput from "./genericComp/LabelInput"
import { constantData } from "@/utils/constantData"

interface WaveformWithClockProps {
  title?: string
  clockPeriod: number
  setClockPeriod: (clockPeriod: number) => void
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
  clockPeriod,
  setClockPeriod,
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
  // Sets the time scale for the x axis on the graph and is used in creating data points
  const [timeScale, setTimeScale] = useState(10)
  // Controls the pulse width and sets it at the clockPeriod to start 
  const [pulseWidth, setPulseWidth] = useState(clockPeriod);

  const generateWaveform = useMemo(() => {
    const dataPoints = 10000
    return Array.from({ length: dataPoints }, (_, i) => {
      const x = (i / (dataPoints - 1)) * timeScale

      const sinePatternLength = pulseNumOn + pulseNumOff
      const sinePatternPosition = Math.floor(x * pulseFreq * pulseClockRatio) % sinePatternLength
      const sineActivePeriod = (x % (1 / pulseFreq)) < pulseWidth

      const sinePhaseWithinPeriod = sineActivePeriod ? ((x % (clockPeriod)) / pulseWidth) * (2 * Math.PI) : null


      const sineValue = sinePatternPosition < pulseNumOn && sineActivePeriod && sinePhaseWithinPeriod !== null
        ? Math.sin(sinePhaseWithinPeriod) + dcOffset
        : null

      const squareValue = Math.sign(Math.sin(x * 1 / clockPeriod * 2 * Math.PI))

      return { x, sine: sineValue, square: squareValue }
    })
  }, [clockPeriod, pulseFreq, pulseNumOn, pulseNumOff, timeScale, pulseClockRatio, dcOffset, pulseWidth])

  const xAxisDomain = [0, timeScale]

  const handleDutyCycle = (val: number) => {
    setPulseWidth(clockPeriod * val / 100)
  }

  const handleClockPeriod = (val: number) => {
    // keep the time scale moving with increases in the clock
    if (val > timeScale) {
      setTimeScale(val)
    }
    // make sure the clock doesn't stay massive if we decrease the clock width
    if (val < (timeScale / 10)) {
      setTimeScale(10 * val)
    }
    // make sure the pulse width can never be shorter than the clock width
    if (val < pulseWidth) {
      setPulseWidth(val)
    }
    setClockPeriod(val)
  }

  // const handleMasterFreq = (val: number) => {
  //   const freq = 1/val
  //   if (freq < (pulseWidth)) {
  //     setPulseWidth(1/freq)
  //   }
  //   setClockPeriod(1/freq)
  // }

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
        <div className="flex flex-row flex-wrap justify-evenly">

          {/* Adjust the Clock frequency aka blue/square line */}
          <div className={cn("flex space-y-2 m-2 w-1/4 max-h-36",
          "lg:w-1/4",
          "md:w-5/12",
          "max-sm:w-full max-sm:min-w-full"
            
          )}>
            <TabComponent
              title={'Clock Settings'}
              content={[
                { title: 'Frequency', comp: <LabelInput title={"Frequency"} description="hello" min={1} value={1 / clockPeriod} setValue={(val) => handleClockPeriod(1 / val)} /> },
                { title: 'Period', comp: <LabelInput title={"Period"} description="hello" min={1} value={clockPeriod} setValue={handleClockPeriod} /> }
              ]}
            />
          </div>

          {/* handle the period of the pulse wave through either the specifying the period or as a fraction of the clock period*/}
          <div className={cn("flex space-y-2 m-2 w-1/3 max-h-36",
           "lg:w-1/4",
          "md:w-5/12",
          "max-sm:w-full max-sm:min-w-full"
            
          )}>
            <TabComponent
            title={'Pulse Settings'}
              content={[

                // <OnOffButton title={["Pulse Lock", "Duty Cycle Lock"]} value={pulseLock} setValue={setPulseLock} />
                { title: 'Duty Cycle', comp: <Counter title={"Duty Cycle"} unit="%" min={0} max={100} step={1} value={(pulseWidth / clockPeriod) * 100} setValue={handleDutyCycle} /> },
                { title: 'PulseWidth', comp: <LabelInput title={"Pulse Width"} description="hello" unit="s" min={0} max={clockPeriod} step={0.01} value={pulseWidth} setValue={setPulseWidth} /> }
              ]} />
          </div>


          <div>
          <DropdownList title={"Pulse Gate"} description={'some text'} valueOptions={constantData.pulseGate.array} defaultValue={pulseGate} setValue={setPulseGate} />
          <Counter title="DC Offset" value={dcOffset} setValue={setDcOffset} min={-100} max={100} />
          <Counter title={"Pulse Number On"} value={pulseNumOn} setValue={setPulseNumOn} min={1} />
          <Counter title={"Pulse Number Off"} value={pulseNumOff} setValue={setPulseNumOff} />
          </div>

          <div className="space-y-2">
            <DropdownList title={"Pulse to Clock Out Ratio"} defaultValue={1} valueOptions={constantData.pulseClockOut.array} setValue={setPulseClockRatio} />

          </div>
        </div>
      </CardContent>
    </Card>
  )
}

