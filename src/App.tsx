import './App.css'
import { useState } from 'react';
import { PopOver } from './components/PopOver'
import { fakeData } from './utils/fakeData'

function App() {
  const [item, setItem] = useState<String>('fdsa');
  
  return (
    <>
      <PopOver label={'Pulse Features'} setItem={setItem} />
    </>
  )
}

export default App

