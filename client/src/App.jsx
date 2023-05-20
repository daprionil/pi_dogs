import './App.css'

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DogPageDetails from './pages/DogPageDetails';
import CreateDog from './pages/CreateDog';
import PageMeDogs from './pages/PageMeDogs';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    //! Definir Rutas
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />}/>
        <Route path='/dogs/:idDog' element={<DogPageDetails />}/>
        <Route path='/medogs' element={<PageMeDogs />}/>
        <Route path='/createdog' element={<CreateDog/>} />
      </Routes>
    </div>
  )
}

export default App
