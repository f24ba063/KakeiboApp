import {  Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './assets/pages/Login.jsx';
import Home from './assets/pages/Home.jsx';
import CreateUser from './assets/pages/CreateUser.jsx';
import NewData from './assets/pages/NewData.jsx';
import ShowData from './assets/pages/ShowData.jsx';


function App() {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home"     element={<Home   /> } />
            <Route path="/newdata"  element={<NewData /> } />
            <Route path="/showdata/:id" element={<ShowData />} />
            <Route path="/createUser" element={<CreateUser/>}/>
        </Routes>
  )
}

export default App
