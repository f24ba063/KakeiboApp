import { useState } from 'react'
import {  Routes, Route } from 'react-router-dom';
import './App.css'
import Index from './assets/pages/Index.jsx';
import NewData from './assets/pages/NewData.jsx';
import ShowData from './assets/pages/ShowData.jsx';

function App() {

    return (
        <Routes>
            <Route path="/index"    element={<Index   /> } />
            <Route path="/newdata"  element={<NewData /> } />
            <Route path="/showdata/:id" element={<ShowData />} />
        </Routes>
  )
}

export default App
