import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import VantaBg from './VantaBg.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <VantaBg>
      <h1>Welcome to Ekkolapto.</h1>
      <div className='animation-container'>
      <App />
    <div>Hello</div>
      </div>

    </VantaBg>
  </React.StrictMode>,
)
