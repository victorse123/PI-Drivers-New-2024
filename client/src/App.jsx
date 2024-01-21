// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home.component.jsx'
import Detail from './pages/detail/detail.component.jsx'
import CreateForm from './pages/createForm/createForm.component.jsx'
import Landing from './pages/landing/landing.component.jsx'

import './App.css'
function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/driver/:id" element={<Detail/>} />
        <Route path="/driver/create" element={<CreateForm/>} />
      </Routes>
    </div>
  );
}

export default App
