import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import PrivateRoute from'./PrivateRoute';
import LoginForm from './assets/pages/LoginForm.jsx';
import Home from './assets/pages/Home.jsx';
import RegisterUser from './assets/pages/RegisterUser.jsx';
import NewData from './assets/pages/NewData.jsx';
import ShowData from './assets/pages/ShowData.jsx';
import Header from './feature/Header';

import './App.css'

//ログイン、新規ユーザー作成画面以外では、ログアウト画面を共通ヘッダーとして表示
function PrivateLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

function App() {

    return (
        <AuthProvider>
            <Routes>
                <Route path="/login"        element={<LoginForm />}    />
                <Route path="/registerUser" element={<RegisterUser/> } />
            
                <Route element={<PrivateLayout /> } >
                    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/newdata" element={<PrivateRoute><NewData /></PrivateRoute> } />
                    <Route path="/showdata/:id" element={<PrivateRoute><ShowData /></PrivateRoute>} />
                </Route>
            </Routes>
        </AuthProvider>
  )
}

export default App
