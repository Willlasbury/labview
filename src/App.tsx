import './App.css'
import { DropdownList } from './components/DropDownList'
import { useState } from 'react';
import OnOffButton from './components/OnOffToggle';
import { ScrollAreaComp } from './components/ScollAreaList';

function App() {
  const [items, setItems] = useState<String>('');
  
  const pulseWidth: Array<string> = Array.from({length: 15}).map((_,i)=>`${i + 1} E-9`)
  const pulseFrequencey: Array<string> = Array.from({length: 15}).map((_,i)=>`${i + 1} E-9`)
  const pulseGate: Array<string> = ['Pass All', 'Block All', 'Periodic', 'Single Shot']
  const pulseClockOut: Array<string> = Array.from({length: 10}).map((_,i,a) => `${10 * (a.length-i)}E+6`)
  const period: Array<string> = Array.from({length: 5}).map((_,i)=>`${i + 1}n`)
  
  return (
    <>
      <DropdownList setItems={setItems}/>
      <div>{items}</div>
      <OnOffButton/>
      <ScrollAreaComp title={'Placeholder'} pulseWidth={pulseWidth}/>
    </>
  )
}

export default App

