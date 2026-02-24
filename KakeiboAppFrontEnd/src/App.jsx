import { useState } from 'react'
import {  Routes, Route } from 'react-router-dom';
import './App.css'
import Index from './assets/pages/Index.jsx';

function App() {

    return (
        <Routes>
            <Route path="index" element={<Index /> } />
        </Routes>
  )
}

export default App
