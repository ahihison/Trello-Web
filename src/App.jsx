import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import SignUp from './components/Auth/SignUp'
import Home from './pages/Home'

import Login from './components/Auth/Login'
import PublicRoutes from './components/Auth/publicRoute'
import PrivateRoutes from './components/Auth/privateRoute'

// import RequireAuth from './components/Auth/RequireAuth'
function App() {


  return (<>

    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/board" element={<Board />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>


  </>)
}

export default App

