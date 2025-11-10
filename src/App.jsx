import { Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Preview from './pages/Preview'
import ResumeBuilder from './pages/ResumeBuilder'
import Dashboard from './pages/Dashboard'
import Login from './auth/Login'


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='app' element={<Layout />}>
       <Route index element={<Dashboard />} />
       <Route path='builder/:resumeId' element={<ResumeBuilder />} />
      </Route>
      <Route path='view/:resumeId' element={<Preview />} />
      <Route path='login' element={<Login />} />
    </Routes>
    </>
  )
}

export default App
