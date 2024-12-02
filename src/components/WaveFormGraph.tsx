import { useState, useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/subComp/card"
import { TabComponent } from "./genericComp/TabComp"
import { cn } from "@/lib/utils"
import { Button } from "./subComp/button"
import Counter from "./genericComp/Counter"
import LabelInput from "./genericComp/LabelInput"
import PulseClockRatio from "./PulseClock"
import { constantData } from "@/utils/constantData"
import { StringLogger } from "./genericComp/LogDisplay"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/subComp/select"

interface WaveformWithClockProps {
  title?: string
  clockPeriod: number
  setClockPeriod: (clockPeriod: number) => void
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
  // pulseLock,
  // setPulseLock,
  dcOffset,
  // setDcOffset,
  pulseNumOn,
  setPulseNumOn,
  pulseNumOff,
  setPulseNumOff,
  // pulseGate,
  // setPulseGate,
  pulseClockRatio = 1,
  setPulseClockRatio,

}: WaveformWithClockProps) {
  const [freqUnit, setFreqUnit] = useState('khz');
  const [periodUnit, setPeriodUnit] = useState('ms');
  // Sets the time scale for the x axis on the graph and is used in creating data points
  const [timeScale, setTimeScale] = useState(10)
  // Controls the pulse width and sets it at the clockPeriod to start 
  const [pulseWidth, setPulseWidth] = useState(clockPeriod);

  const generateWaveform = useMemo(() => {
    const dataPoints = 1000
    return Array.from({ length: dataPoints }, (_, i) => {
      const x = (i / (dataPoints - 1)) * timeScale

      const sinePatternLength = pulseNumOn + pulseNumOff
      const sinePatternPosition = Math.floor(x * clockPeriod * pulseClockRatio) % sinePatternLength
      const sineActivePeriod = (x % (1 / clockPeriod)) < pulseWidth

      const sinePhaseWithinPeriod = sineActivePeriod ? ((x % (clockPeriod)) / pulseWidth) * (2 * Math.PI) : null


      const sineValue = sinePatternPosition < pulseNumOn && sineActivePeriod && sinePhaseWithinPeriod !== null
        ? Math.sign(Math.sin(sinePhaseWithinPeriod)) + dcOffset
        : null

      const squareValue = Math.sign(Math.sin(x * 1 / clockPeriod * 2 * Math.PI))
      if (sineValue == null) {
        // console.log("(x % (1 / pulseFreq)) < pulseWidth:", (x % (1 / pulseFreq)) < pulseWidth)
        // console.log("(1 / pulseFreq)", 1 / pulseFreq)
        // console.log("(x % (1 / pulseFreq)) ", (x % (1 / pulseFreq)))
        // console.log("pulseWidth:", pulseWidth)
      }
      return { x, sine: sineValue, square: squareValue }
    })
  }, [clockPeriod, pulseNumOn, pulseNumOff, timeScale, pulseClockRatio, dcOffset, pulseWidth])

  const xAxisDomain = [0, timeScale]

  const handleDutyCycle = (val: number) => {
    setPulseWidth(clockPeriod * val / 100)
  }

  const handleClockPeriod = (val: number) => {
    // keep the time scale moving with increases in the clock
    console.log("val:", val)
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
  const handleClockFreqChange = (val: number) => {

    setClockPeriod(1 / val)

    if (pulseWidth == clockPeriod) {
      setPulseWidth(1 / val)
      console.log('===\n\n\ntest\n\n\n===')
    }

    // if 
  }
  return (
    <Card className="h-dvh w-dvw">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* GRAPH */}
        <div className="h-[300px] w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateWaveform} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3" />
              <YAxis domain={[dcOffset - 1, dcOffset + 1]} />
              <Line
                type="monotone"
                dataKey="sine"
                stroke='blue'
                dot={false}
                isAnimationActive={false}
                name="Sine Wave"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>


        {/* CONTROLS */}
        <div className="flex flex-row flex-wrap justify-evenly">
          <div className={cn("h-full flex-col justify-evenly",
            "lg:w-5/12",
            "md:w-5/12",
            "max-md:w-full max-sm:min-w-full"
          )}>

            {/* Adjust the Clock frequency aka blue/square line */}
            <div className={cn("flex space-y-2 m-2  max-h-36 min-w-fit",
              "lg:w-10/12",
              "md:w-5/12",
              "sm:w-full max-sm:min-w-full"
            )}>
              <TabComponent
                title={'Clock Settings'}
                content={[
                  // { title: 'Frequency', comp: <LabelInput title={"Frequency"} description="hello" min={1} value={1 / clockPeriod} setValue={(val) => handleClockPeriod(1 / val)} /> },
                  { title: 'Frequency', comp: <>
                  <LabelInput title={"Frequency"} description="hello" min={1} max={999} value={1 / clockPeriod} setValue={handleClockFreqChange} /> 
                      <Select value={freqUnit} onValueChange={(e:string) => setFreqUnit(e)}>
                        <SelectTrigger className="w-20 h-6">
                          <SelectValue placeholder={freqUnit} />
                        </SelectTrigger>
                        <SelectContent >
                          <SelectItem value="kHz">kHz</SelectItem>
                          <SelectItem value="MHz">MHz</SelectItem>
                          <SelectItem value="GHz">GHz</SelectItem>
                        </SelectContent>
                      </Select>
                  </>},
                    {
                        title: 'Period', comp: <>
                          <LabelInput title={"Period"} description="hello" min={1} max={999} value={clockPeriod} setValue={handleClockPeriod} />
                          <Select value={periodUnit} onValueChange={e => setPeriodUnit(e)}>
                            <SelectTrigger className="w-20 h-6">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kHz">ms</SelectItem>
                              <SelectItem value="MHz">µs</SelectItem>
                              <SelectItem value="GHz">ns</SelectItem>
                            </SelectContent>
                          </Select>
                        </>
                      },
                ]}
              />
            </div>

            {/* handle the period of the pulse wave through either the specifying the period or as a fraction of the clock period*/}
            <div className={cn("flex space-y-2 m-2  max-h-36 min-w-fit",
              "lg:w-10/12",
              "md:w-5/12",
              "sm:w-full max-sm:min-w-full"
            )}>
              <TabComponent
                title={'Pulse Settings'}
                content={[

                  // <OnOffButton title={["Pulse Lock", "Duty Cycle Lock"]} value={pulseLock} setValue={setPulseLock} />
                  { title: 'Duty Cycle', comp: <Counter title={"Duty Cycle"} unit="%" min={0} max={100} step={1} value={(pulseWidth / clockPeriod) * 100} setValue={handleDutyCycle} /> },
                  { title: 'PulseWidth', comp: <LabelInput title={"Pulse Width"} description="hello" unit="s" min={0} max={clockPeriod} step={0.01} value={pulseWidth} setValue={setPulseWidth} /> }
                ]} />
            </div>
          </div>


          <div className={cn("flex flex-col space-y-2 m-2 w-1/3 max-h-36",
            "lg:w-5/12",
            // "md:w-5/12",
            "max-md:w-full max-sm:min-w-full"
          )}>
            <TabComponent
              title={'Pulse Settings'}
              content={[

                // <OnOffButton title={["Pulse Lock", "Duty Cycle Lock"]} value={pulseLock} setValue={setPulseLock} />
                { title: 'Pass All', comp: <></> },
                { title: 'Block All', comp: <></> },
                {
                  title: 'Periodic', comp:
                    <div className="">
                      <Counter title={"Pulse Number On"} value={pulseNumOn} setValue={setPulseNumOn} min={1} />
                      <Counter title={"Pulse Number Off"} value={pulseNumOff} setValue={setPulseNumOff} />
                    </div>
                },
                {
                  title: 'Single Shot', comp:
                    <div className="flex flex-col py-2 w-3/4 items-center">
                      <Counter title={"Pulse Number On"} value={pulseNumOn} setValue={setPulseNumOn} min={1} />
                      <Button className="bg-blue-500 max-w-36 hover:bg-blue-800 hover:font-semibold">Single Shot</Button>
                    </div>
                }
              ]} />
            <div className={cn("flex flex-col space-y-2 max-h-36",
              "lg:max-w-5/6 ",
              "md:w-full",
              "max-sm:w-full max-sm:min-w-full"
            )}>
              <PulseClockRatio title={"Pulse to Clock Out Ratio"} defaultValue={1} valueOptions={constantData.pulseClockOut.array} setValue={setPulseClockRatio} />


            </div >
          </div>
        </div>
        <div>

          <StringLogger title="Session Log" input={['']} />
        </div>
      </CardContent>
    </Card>
  )
}

