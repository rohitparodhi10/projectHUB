import 'regenerator-runtime/runtime';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import Login from "./Components/Login";
import Logout from './Components/Logout';
import Register from './Components/Register';
import Home from './Components/Home';
import Background from './Components/Background';
import ForgotPassword from './Components/ForgotPassword';
import ProtectedRoute from './Components/ProtectedRoute';
import Loading from './Components/Loading';
import Projects from './Components/Projects';
import Account from './Components/Account';
import ProjectUpload from './Components/ProjectUpload';
import SuccesfulUpload from './Components/SuccesfulUpload';
import HubList from './Components/HubList';
import TrendingProjects from './Components/TrendingProjects';
import Footer from './Components/Footer';
import Contact from './Components/Contact';
import About from './Components/About';
import Query from './Components/Query';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Background/>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgot" element={<ForgotPassword/>}/>
            <Route path="/loading" element={<Loading/>}/>
            <Route path='/projectupload' element={<ProtectedRoute><ProjectUpload/></ProtectedRoute>}/>
            <Route path='/successupload' element={<SuccesfulUpload/>}/>
            <Route path="/footer" element={<Footer/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/query" element={<Query/>}/>
            <Route path='/projectuploadlist' element={<ProtectedRoute><HubList/></ProtectedRoute>}/>
            <Route path='/projects' element={<ProtectedRoute><Projects/></ProtectedRoute>}/>
            <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>}/>
            <Route path="/trending" element={<TrendingProjects/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
      </BrowserRouter> 
    </AuthProvider>  
  )
}

export default App;