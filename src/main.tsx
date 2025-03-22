import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove strict mode for now to avoid double rendering in development
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
