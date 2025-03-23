import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Medicine from './Medicine.jsx'


createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Login />
    <Medicine />
  </>,
)
