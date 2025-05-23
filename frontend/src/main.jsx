import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MainCon from './MainCon.jsx'

createRoot(document.getElementById('root')).render(
  <MainCon>
    <App />
  </MainCon>,
)
