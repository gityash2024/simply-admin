import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'

// Remove strict mode for now to avoid double rendering in development
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  </ThemeProvider>
)
