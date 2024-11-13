import './App.css'
import { fakeData } from './utils/fakeData'
import { ScrollAreaComp } from './components/ScollAreaList'

function App() {
  
  
  return (
    <>
      <ScrollAreaComp title={'Pulse Width'} data={fakeData.pulseWidth}/>
    </>
  )
}

export default App

