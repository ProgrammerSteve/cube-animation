import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import VantaBg from './VantaBg.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <VantaBg>
      <div className='animation-container'>
      <App />
      </div>

    </VantaBg>
  </React.StrictMode>,
)
