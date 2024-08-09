import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './components/user/user'
import UniversityManagement from './components/university/universityManagement'
import EtablissementManagement from './components/etablissement/etablissementManagement'
import MentionManagement from './components/mention/metionManagement'
import ParcoursManagement from './components/parcours/parcoursManagement'
import HomePage from './components/user/homePage'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/universityManagement" element={<UniversityManagement />} />
        <Route path="/etablissementManagement" element={<EtablissementManagement />} />
        <Route path="/mentionManagement" element={<MentionManagement />} />
        <Route path="/parcoursManagement" element={<ParcoursManagement />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


