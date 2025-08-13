import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginForm } from './components/login/LoginForm'
import { Route , Router , Routes } from 'react-router-dom'
import React from 'react'
import LoginUI from './pages/LoginUI'
import DashboardPage from './app/DashboardPage'
import AiVisitsPage from './app/dashboard/ai-visits/page'
import AllQuestionsPage from './app/dashboard/all-questions/page'
import CreditHistoryPage from './app/dashboard/credit-history/page'
function App() {
  const [count, setCount] = useState(0)

  return (
     <Routes>
      <Route path="/" element={<LoginUI />} />
      <Route path="/dashboard" element={<DashboardPage/>} />
      <Route path="/dashboard/ai-visits" element={<AiVisitsPage/>} />
      <Route path="/dashboard/all-questions" element={<AllQuestionsPage/>} />
      <Route path="/dashboard/credit-history" element={<CreditHistoryPage/>} />
    </Routes>
  )
}

export default App
