import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Stats from './pages/Stats'
import LibraryPage from './pages/LibraryPage'
import DBpage from './pages/DBpage'
import Workspace from './pages/Workspace'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct'
import AddPattern from './pages/AddPattern'
import AddPatternWip from './pages/AddPatternWip'
import UpdatePattern from './pages/UpdatePattern'
import PatternPreview from './pages/PatternPreview'
import Main from './pages/Main'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" exact element={<Main/>}></Route>
          <Route path="/database" element={<DBpage />}></Route>
          <Route path="/library" element={<LibraryPage />}></Route>
          <Route path="/workspace" element={<Workspace />}></Route>
          <Route path="/stats" element={<Stats />}></Route>
          <Route path="/add-product" element={<AddProduct />}></Route>
          <Route path="/add-pattern" element={<AddPattern />}></Route>
          <Route path="/add-pattern-wip" element={<AddPatternWip />}></Route>
          <Route path="/update-pattern" element={<UpdatePattern />}></Route>
          <Route path="/pattern-preview" element={<PatternPreview />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
