import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import SignUp from './components/Auth/SignUp'
import Home from './pages/Home'
function App() {


  return (<>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>


  </>)
}

export default App

