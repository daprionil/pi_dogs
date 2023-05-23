import './App.css'

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DogPageDetails from './pages/DogPageDetails';
import CreateDog from './pages/CreateDog';
import PageMeDogs from './pages/PageMeDogs';
import LandingPage from './pages/LandingPage';
import { useDispatch } from 'react-redux';
import { getDogs } from './redux/createActions';
import HomeDogsContext from './context/HomeDogsContext';

function App() {
  const dispatch = useDispatch();
  (() => {dispatch(getDogs())})()
  
  return (
    //! Definir Rutas
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path='/home' element={<HomeDogsContext><Home /></HomeDogsContext>} />
        <Route path='/dogs/:idDog' element={<DogPageDetails />}/>
        <Route path='/medogs' element={<PageMeDogs />}/>
        <Route path='/createdog' element={<CreateDog/>} />
      </Routes>
    </div>
  )
}

export default App
