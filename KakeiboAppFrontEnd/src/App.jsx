import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import PrivateRoute from'./PrivateRoute';
import Login from './assets/pages/Login.jsx';
import Home from './assets/pages/Home.jsx';
import CreateUser from './assets/pages/CreateUser.jsx';
import NewData from './assets/pages/NewData.jsx';
import ShowData from './assets/pages/ShowData.jsx';
import Header from './feature/Header';

import './App.css'

function App() {

    return (
        <AuthProvider>
            <Header />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/createUser" element={<CreateUser />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/newdata" element={<PrivateRoute><NewData /></PrivateRoute> } />
                <Route path="/showdata/:id" element={<PrivateRoute><ShowData /></PrivateRoute>} />
            </Routes>
        </AuthProvider>
  )
}

export default App
