"use client";
import './App.css'
import { useState } from 'react';
import { constantData } from './utils/constantData';
import SquareWaveChart from './components/WaveFormGraph';

// TODOS
// Add logic for pulse gate
// adjust pulse width to low res pulse width when freq is less than 10MHz
// create better edits for pulse freq and period
// create feedback log
// create pulse clock ratio


;
function App() {
  const [frequency, setFreq] = useState(10000);
  const [dutyCycle, setDutyCycle] = useState(0.5); // Start with 50% duty cycle
  const [clockPeriod, setClockPeriod] = useState<number>(1);
  const [pulseWidth, setPulseWidth] = useState<number>(1);
  const [pulseLock, setPulseLock] = useState<boolean>(true);
  const [pulseNumOn, setPulseNumOn] = useState<number>(1)
  const [pulseNumOff, setPulseNumOff] = useState<number>(0);
  const [pulseGate, setPulseGate] = useState<string>(constantData.pulseGate.array[0]);
  const [pulseClockRatio, setPulseClockRatio] = useState<number>(1);
  const [dcOffset, setDcOffset] = useState(0);

  return (
    <div className=''>
      <SquareWaveChart
        title={'title'}
        frequency={frequency}
        setFrequency={setFreq}
        dutyCycle={dutyCycle}
        setDutyCycle={setDutyCycle} />
    </div>
  )
}

export default App

