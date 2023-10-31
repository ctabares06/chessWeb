import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Home title="default title for page" />
  </React.StrictMode>,
)
