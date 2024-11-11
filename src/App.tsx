import './App.css'
import { DropdownList } from './components/dropdown-list'
import { useState } from 'react';

function App() {
  const [items, setItems] = useState<String>('');
  
  return (
    <>
      <DropdownList setItems={setItems}/>
      <div>{items}</div>
    </>
  )
}

export default App

