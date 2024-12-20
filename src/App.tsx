"use client";
import './App.css'
import { useState } from 'react';
import { constantData } from './utils/constantData';
import WaveformWithClock from './components/WaveFormGraph';


// TODOS
// Add logic for pulse gate
// adjust pulse width to low res pulse width when freq is less than 10MHz
// create better edits for pulse freq and period
// create feedback log
// create pulse clock ratio


;
function App() {
  const [clockPeriod, setClockPeriod] = useState<number>(1);
  const [pulseWidth, setPulseWidth] = useState<number>(1);
  const [pulseLock, setPulseLock] = useState<boolean>(true);
  const [pulseNumOn, setPulseNumOn] = useState<number>(1)
  const [pulseNumOff, setPulseNumOff] = useState<number>(0);
  const [pulseGate, setPulseGate] = useState<string>(constantData.pulseGate.array[0]);
  const [pulseClockRatio, setPulseClockRatio] = useState<number>(1);
  const [dcOffset, setDcOffset] = useState(0);

  return (
    <>
      <WaveformWithClock 
        // title="" 
        // add new freq and put it into the squareValue to handle the master freq
        clockPeriod={clockPeriod}
        setClockPeriod={setClockPeriod}
        pulseWidth={pulseWidth}
        setPulseWidth={setPulseWidth}
        dcOffset={dcOffset}
        setDcOffset={setDcOffset}
        pulseLock={pulseLock}
        setPulseLock={setPulseLock}
        pulseNumOn={pulseNumOn}
        setPulseNumOn={setPulseNumOn}
        pulseNumOff={pulseNumOff}
        setPulseNumOff={setPulseNumOff}
        pulseGate={pulseGate}
        setPulseGate={setPulseGate}
        pulseClockRatio={pulseClockRatio}
        setPulseClockRatio={setPulseClockRatio}
      />
    </>
  )
}

export default App

