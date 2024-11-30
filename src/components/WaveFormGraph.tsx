import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/subComp/card"
import { TabComponent } from './genericComp/TabComp'
import LabelInput from './genericComp/LabelInput'
import { Slider } from "@/components/subComp/slider"
import { Label } from "@/components/subComp/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/subComp/select"
import DropdownList from './genericComp/DropDownList'

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

function formatFrequency(freq: number): string {
  if (freq >= 1e9) return `${(freq / 1e9).toFixed(2)} GHz`;
  if (freq >= 1e6) return `${(freq / 1e6).toFixed(2)} MHz`;
  if (freq >= 1e3) return `${(freq / 1e3).toFixed(2)} kHz`;
  return `${freq.toFixed(2)} Hz`;
}

type Props = {
  title: string
}

export default function SquareWaveChart({ title }: Props) {
  const [frequency, setFrequency] = useState(10000); // Start with 10 kHz
  const [dutyCycle, setDutyCycle] = useState(0.5); // Start with 50% duty cycle
  const [freqUnit, setFreqUnit] = useState('kHz');
  const amplitude = 1;
  const duration = 1e-6; // 1 microsecond
  const sampleRate = 100; // 1000 samples for the duration

  const freqMultiplier = useMemo(() => {
    switch (freqUnit) {
      case 'kHz': return 1e3;
      case 'MHz': return 1e6;
      case 'GHz': return 1e9;
      default: return 1;
    }
  }, [freqUnit]);

  const actualFrequency = frequency;

  const data = useMemo(() =>
    generateSquareWaveData(actualFrequency, amplitude, duration, sampleRate, dutyCycle),
    [actualFrequency, dutyCycle]
  );

  // Calculate transition duration based on frequency
  const transitionDuration = Math.max(50, 500 - Math.log10(actualFrequency) * 50);
  const xAxisDomain = [0, 10 * (1 / frequency)]
  console.log("frequency:", frequency)
  return (
    <Card className="w-full max-w-4xl">
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              domain={xAxisDomain}
              label={{ value: 'Time (μs)', position: 'insideBottomRight', offset: -10 }}
              tickFormatter={(value) => (value * 1e6).toFixed(3)}
            />
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
          <TabComponent
            title={'Clock Settings'}
            content={[
              // { title: 'Frequency', comp: <LabelInput title={"Frequency"} description="hello" min={1} value={1 / clockPeriod} setValue={(val) => handleClockPeriod(1 / val)} /> },
              {
                title: 'Frequency', comp:
                  <>
                    <LabelInput title={"Frequency"} description="hello" min={1} value={frequency} setValue={formatFrequency} />
                    <Select value={freqUnit} onValueChange={setFreqUnit}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kHz">kHz</SelectItem>
                        <SelectItem value="MHz">MHz</SelectItem>
                        <SelectItem value="GHz">GHz</SelectItem>
                      </SelectContent>
                    </Select>

                  </>
              },
              { title: 'Period', comp: <LabelInput title={"Period"} description="hello" min={1} value={frequency} setValue={formatFrequency} /> },
            ]}
          />
          <div className="flex items-center space-x-4">
            <Slider
              id="frequency-slider"
              min={10}
              max={300}
              step={1}
              value={[frequency]}
              onValueChange={(value) => setFrequency(value[0])}
              className="flex-grow"
            />
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
            Amplitude: {amplitude}, Duration: {duration} seconds
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

