import './App.css'
import { useState } from 'react';
import { usePulseFreq } from './hooks/usePulseFreq';

import  CommandWindow  from './pages/CommandWindow';
import { SessionLog } from './pages/SessionLog';
import { SideNavigationComponent } from './components/genericComp/Navigation';
import { constantData } from './utils/constantData';
import WaveformWithClock from './components/WaveFormGraph';

function App() {

  // const pageList: Array<{
  //   label: string,
  //   content: React.ReactNode
  // }> = [{
  //   label: 'Session Log',
  //   content: <SessionLog />

  // }, {
  //   label: 'Command Window',
  //   content: <CommandWindow />
  // }]
  
  // const {pulseFreq, setPulseFreq, period, setPeriod} = usePulseFreq(4);
  const [pulseFreq, setPulseFreq] = useState<number>(1);
  const [pulseWidth, setPulseWidth] = useState<number>(1);
  const [pulseLock, setPulseLock] = useState<boolean>(true);
  const [pulseNumOn, setPulseNumOn] = useState<number>(1)
  const [pulseNumOff, setPulseNumOff] = useState<number>(0);
  const [pulseGate, setPulseGate] = useState<string>(constantData.pulseGate.array[0]);
  // const [pulseNumOn, setPulseNumOn] = useState<number>(1);
  // const [pulseNumOff, setPulseNumOff] = useState<number>(1);
  // const [outPutEnabled, setOutPutEnabled] = useState<boolean>(false);
  // const [lowResPulseWidth, setLowResPulseWidth] = useState<number>(1);
  // const [lowResPulseDC, setLowResPulseDC] = useState<number>(1);
  // const [pulseClockRatio, setPulseClockRatio] = useState<number>(1);
  // const [pulseDC, setPulseDC] = useState<number>(1);

  // console.log("period:", period)
  // console.log("pulseFreq:", pulseFreq)

  return (
    <>
      {/* <SideNavigationComponent pageList={pageList} /> */}
      <WaveformWithClock 
        title="" 
        pulseFreq={pulseFreq}
        setPulseFreq={setPulseFreq}
        pulseWidth={pulseWidth}
        setPulseWidth={setPulseWidth}
        pulseLock={pulseLock}
        setPulseLock={setPulseLock}
        pulseNumOn={pulseNumOn}
        setPulseNumOn={setPulseNumOn}
        pulseNumOff={pulseNumOff}
        setPulseNumOff={setPulseNumOff}
        pulseGate={pulseGate}
        setPulseGate={setPulseGate}
        
        // period={period}
        // setPeriod={setPeriod}

        initialTimeScale={10}
        initialSineCycles={0}
        initialSquareCycles={0}
        initialSineBreakPattern={{ on: 3, off: 1 }}
      />
    </>
  )
}

export default App

