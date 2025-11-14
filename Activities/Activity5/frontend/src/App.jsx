import { useState } from 'react'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import Dashboard from './Layouts/Dashboard.jsx'
import './index.css'

function App() {
  const [currentView, setCurrentView] = useState('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setCurrentUser(userData)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setCurrentView('login')
  }

  const switchToRegister = () => setCurrentView('register')
  const switchToLogin = () => setCurrentView('login')

  if (isLoggedIn) {
    return (
      <Dashboard 
        currentUser={currentUser} 
        onLogout={handleLogout}
      />
    )
  }
//hello
  return (
    <div className="container">
      {currentView === 'login' && (
        <Login 
          onLogin={handleLogin}
          onSwitchToRegister={switchToRegister}
        />
      )}
      {currentView === 'register' && (
        <Register 
          onRegister={handleLogin}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </div>
  )
}

export default App
