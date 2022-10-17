import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Stats from './pages/Stats'
import LibraryPage from './pages/LibraryPage'
import DBpage from './pages/DBpage'
import Workspace from './pages/Workspace'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct'
import AddPattern from './pages/AddPattern'
import UpdatePattern from './pages/UpdatePattern'
import PatternPreview from './pages/PatternPreview'

function App() {

  return (
    <>
    <Router>
          <Route path="/" exact>
            <Login/>
          </Route>
          <Route path="/database">
            <DBpage />
          </Route>
          <Route path="/library">
            <LibraryPage />
          </Route>
          <Route path="/workspace">
            <Workspace />
          </Route>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/add-product">
            <AddProduct />
          </Route>
          <Route path="/add-pattern">
            <AddPattern />
          </Route>
          <Route path="/update-pattern">
            <UpdatePattern />
          </Route>
          <Route path="/pattern-preview">
            <PatternPreview />
          </Route>
    </Router>
    </>
  )
}

export default App;
