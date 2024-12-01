import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/subComp/card"
import { Slider } from "@/components/subComp/slider"
import { Label } from "@/components/subComp/label"
import DropdownList from './genericComp/DropDownList'
import FrequencyLabel from './FreqLabel'



type Props = {
  title: string
  frequency: number
  setFrequency: (freq: number) => void
  dutyCycle: number
  setDutyCycle: (num: number) => void
}

export default function SquareWaveChart({ title, frequency, setFrequency, dutyCycle, setDutyCycle }: Props) {

  const [freqUnit, setFreqUnit] = useState('kHz');
  const amplitude = 1;
  const duration = 1e-6; // 1 microsecond
  const sampleRate = 999; // 1000 samples

  function squareWave(frequency: number, amplitude: number, time: number, dutyCycle: number): number {
    const period = 1 / frequency;
    const cyclePosition = time % period;
    return cyclePosition < period * dutyCycle ? amplitude : -amplitude;
  }

  function generateSquareWaveData(frequency: number, amplitude: number, duration: number, sampleRate: number, dutyCycle: number) {
    const data = [];
    for (let t = 0; t <= duration; t += duration / sampleRate) {
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
    [actualFrequency, dutyCycle, freqUnit]
  );

  // Calculate transition duration based on frequency
  // const transitionDuration = Math.max(50, 500 - Math.log10(actualFrequency) * 50);
  // const xAxisDomain = [0, 1000]
  console.log("freqUnit:", freqUnit)



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
            <CartesianGrid strokeDasharray="" />
            {/* <XAxis
              dataKey="time"
              // domain={[0,10]}
              label={{ value: 'Time (μs)', position: 'insideBottomRight', offset: -5 }}
              tickFormatter={(value) => (value * 1e6).toFixed(2)}
            /> */}
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
            <FrequencyLabel title='Frequency' unit={freqUnit} min={1} max={999} step={1} value={frequency} setValue={handleFrequency} freqUnit={freqUnit} setFreqUnit={setFreqUnit}/>
              
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
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            {/* Amplitude: {amplitude}, Duration: {duration} seconds */}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

