import Header from './components/layout/Header';
import Footer from "./components/layout/Footer";
import Home from "./components/pages/blog/Home";
import List from "./components/pages/blog/crud/List";

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
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
