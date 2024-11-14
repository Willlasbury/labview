import './App.css'
import { useState } from 'react';
import { PopOver } from './components/PopOver'
import { fakeData } from './utils/fakeData'
import { ScrollAreaList } from './components/ScollAreaList';

function App() {
  const [item, setItem] = useState<String>('fdsa');
  
  return (
    <>
      <PopOver label={'Pulse Features'} setItem={setItem} />
      <fieldset className="mb-[15px] flex w-full flex-col justify-start">
				<label
					className="mb-2.5 block text-[13px] leading-none text-violet12"
					htmlFor="username"
				>
					Username
				</label>
				<input
					className="h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
					id="username"
					defaultValue="@peduarte"
				/>
			</fieldset>
      <ScrollAreaList title='Pulse Gale' data={fakeData.pulseGate}/>
     </>
  )
}

export default App

