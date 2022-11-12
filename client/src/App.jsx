import Header from './components/layout/Header';
import Footer from "./components/layout/Footer";
import Home from "./components/pages/blog/Home";
import List from "./components/pages/blog/crud/List";
import Record from "./components/pages/blog/crud/Record";
import Add from './components/pages/blog/crud/Add';
import Remove from './components/pages/blog/crud/Remove';
import Edit from './components/pages/blog/crud/Edit';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/list" element={<List/>}/>
            <Route path="Add" element={<Add/>}/>
            <Route path="/record/:id" element={<Record/>}/>
            <Route path="edit/:id" element={<Edit/>}/>
            <Route path="/remove/:id" element={<Remove/>}/>
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
