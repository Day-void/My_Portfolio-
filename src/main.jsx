import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* Reports real-visitor performance data once deployed on Vercel with
        Speed Insights enabled (Project -> Speed Insights -> Enable).
        Does nothing in local dev or on any other host. */}
    <SpeedInsights />
  </StrictMode>,
)
