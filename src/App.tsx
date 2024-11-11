import './App.css'
import { DropdownList } from './components/dropdown-list'
import { useState } from 'react';
import OnOffButton from './components/on-off-button';

function App() {
  const [items, setItems] = useState<String>('');
  
  return (
    <>
      <DropdownList setItems={setItems}/>
      <div>{items}</div>
      <OnOffButton/>
    </>
  )
}

export default App

