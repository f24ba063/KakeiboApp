import { useState } from 'react'
import { Routes, Route,Router } from 'react-router-dom';
import './App.css'
import Index from './assets/pages/Index.jsx';

function App() {

    return (
    <Router>
        <Routes>
            <Route path="index" element={<Index /> } />

        </Routes>
    </Router>
  )
}

export default App
