import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ToDoForm from './components/ToDoForm';
import About from './pages/About';
import { ToDoProvider } from './context/ToDoContext';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <ToDoProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/createTask' element={<ToDoForm/>}></Route>
        <Route path='/about' element={<About/>}></Route>
      </Routes>
      </ToDoProvider>
      </BrowserRouter>
    
    </>
  )
}

export default App
