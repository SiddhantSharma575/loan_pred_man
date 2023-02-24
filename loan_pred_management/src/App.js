import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from './pages/About';
import Home from './pages/Home';
import Team from './pages/Team';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import LoanDetail from './pages/LoanDetail';
import Profile from './pages/Profile';
import PreviousLoan from './pages/PreviousLoan';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/team' element={<Team />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/loan_detail' element={<LoanDetail />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/prev_loan' element={<PreviousLoan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
