import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/subComp/card"
import { Slider } from "@/components/subComp/slider"
import { Label } from "@/components/subComp/label"
import DropdownList from './genericComp/DropDownList'
import FrequencyLabel from './FreqLabel'
import Counter from './genericComp/Counter'



type Props = {
  title: string
  dutyCycle: number
  setDutyCycle: (num: number) => void
  dcOffSet: number
  setDcOffset: (val: number) => void
}

export default function SquareWaveChart({ title, dutyCycle, setDutyCycle, dcOffset, setDcOffset }: Props) {
  const [frequency, setFrequency] = useState(1000);
  const [freqUnit, setFreqUnit] = useState('kHz');
  const amplitude = 1;
  const duration = 1e-6; // 1 microsecond
  const sampleRate = 100; // n samples

  function squareWave(frequency: number, amplitude: number, time: number, dutyCycle: number): number {
    const period = 1 / frequency;
    const cyclePosition = time % period;
    const value = cyclePosition < period * dutyCycle ? amplitude : -amplitude;
    console.log("value, dcOffest:", value, dcOffset)
    return value + dcOffset
  }

  function generateSquareWaveData(frequency: number, amplitude: number, duration: number, sampleRate: number, dutyCycle: number) {
    const data = [];
    const period = 1 / frequency;
    for (let t = 0; t <= duration; t += period / sampleRate) {
      data.push({
        time: t,
        value: squareWave(frequency, amplitude, t, dutyCycle)
      });
    }
    return data;
  }

  const handleFrequency = (val: number, unit: string) => {
    console.log('===\n\n\ntest\n\n\n===')
    if (unit == 'GHz') {
      setFrequency(val * 1e9)
    }
    if (unit == 'MHz') {
      setFrequency(val * 1e6)
    }
    if (unit == 'kHz') {
      setFrequency(val * 1e3)
    }
  }

  const freqMultiplier = useMemo(() => {
    switch (freqUnit) {
      case 'kHz': return 1e3;
      case 'MHz': return 1e6;
      case 'GHz': return 1e9;
      default: return 1;
    }
  }, [freqUnit]);

  const actualFrequency = frequency * freqMultiplier;

  const data = useMemo(() =>
    generateSquareWaveData(actualFrequency, amplitude, duration, sampleRate, dutyCycle),
    [actualFrequency, dutyCycle, freqUnit, dcOffset]
  );

  // Calculate transition duration based on frequency
  // const transitionDuration = Math.max(50, 500 - Math.log10(actualFrequency) * 50);
  // const xAxisDomain = [0, 1000]
  console.log("freqUnit:", data)



  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}

          >
            <CartesianGrid strokeDasharray="5  " fill='' fillOpacity={0.5} horizontalPoints={[0]} verticalPoints={[1]} />
            <XAxis

              tickLine={false}
              tick={false}
              // domain={[0,10]}
              tickCount={5}
            // label={{ value: 'Time (μs)', position: 'insideBottomRight', offset: -5 }}
            // tickFormatter={(value) => (value * 1e6).toFixed(2)}


            />
            <YAxis
              // domain={[-amplitude * 1.1, amplitude * 1.1]} 
              label={{ value: '', angle: -90, position: 'insideLeft' }}
            />
            <ReferenceLine y={1} stroke="grey" strokeDasharray="5 5" />
            <Line
              type="stepAfter"
              dataKey="value"
              stroke="black"
              dot={false}
              isAnimationActive={true}
              animationDuration={0}
              animationEasing="linear"
            />
          </LineChart>
        </ResponsiveContainer>


        <div className="space-y-2">
          {/* <Label htmlFor="frequency-slider">Frequency: {formatFrequency(actualFrequency)}</Label> */}
          {/* <TabComponent
            title={'Clock Settings'}
            content={[
              // { title: 'Frequency', comp: <LabelInput title={"Frequency"} description="hello" min={1} value={1 / clockPeriod} setValue={(val) => handleClockPeriod(1 / val)} /> },
              {
                title: 'Frequency', comp:
                  <>
                    <LabelInput title={"Frequency"} description="hello" min={1} value={frequency} setValue={formatFrequency} />

                  </>
              },
              { title: 'Period', comp: <LabelInput title={"Period"} description="hello" min={1} value={frequency} setValue={formatFrequency} /> },
            ]}
          /> */}
          <div className="flex items-center space-x-4">
            <FrequencyLabel title='Frequency' unit={freqUnit} min={1} max={999} step={1} value={frequency} setValue={handleFrequency} freqUnit={freqUnit} setFreqUnit={setFreqUnit} />

          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duty-cycle-slider">Duty Cycle: {(dutyCycle * 100).toFixed(0)}%</Label>
          <Slider
            id="duty-cycle-slider"
            min={0}
            max={1}
            step={0.01}
            value={[dutyCycle]}
            onValueChange={(value) => setDutyCycle(value[0])}
          />
        </div>
        <Counter title={"DC Offset"} value={dcOffset} setValue={setDcOffset} min={-100} max={100}/>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            {/* Amplitude: {amplitude}, Duration: {duration} seconds */}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

