import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/blog/Home";
import List from "./pages/blog/crud/List";
import Record from "./pages/blog/crud/Record";
import Add from './pages/blog/crud/Add';
import Remove from './pages/blog/crud/Remove';
import Edit from './pages/blog/crud/Edit';

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
