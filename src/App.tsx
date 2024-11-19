import './App.css'
import { useState } from 'react';
import { CommandWindow } from './pages/CommandWindow';
import { SessionLog } from './pages/SessionLog';
import { SideNavigationComponent } from './components/genericComp/Navigation';

function App() {

  const pageList: Array<{
    label: string,
    content: React.ReactNode
  }> = [{
    label: 'Session Log',
    content: <SessionLog />

  }, {
    label: 'Command Window',
    content: <CommandWindow />
  }]
  
  return (
    <>
      <SideNavigationComponent pageList={pageList} />
    </>
  )
}

export default App

