import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import List from "./pages/blog/List";
import Record from "./pages/blog/Record";
import Add from './pages/blog/Add';
// import Remove from './pages/blog/crud/Remove';
import Edit from './pages/blog/Edit';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {useAuthContext} from "./hooks/useAuthContext";

function App() {
  const {user} = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/list"/>: <Home/>}/>
            <Route path="/list" element={user ? <List/> : <Navigate to="/"/>}/>
            <Route path="/add" element={user ? <Add/>  : <Navigate to="/"/>}/>
            <Route path="/record/:id" element={user ? <Record/>  : <Navigate to="/"/>}/>
            <Route path="edit/:id" element={user ? <Edit/>  : <Navigate to="/"/>}/>
            {/* <Route path="/remove/:id" element={user ? <Remove/>  : <Navigate to="/"/>}/> */}
            <Route path="/signup" element={!user ? <Signup/>: <Navigate to="/list"/>}/>
            <Route path="/login" element={!user ? <Login/>: <Navigate to="/list"/>}/>
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
