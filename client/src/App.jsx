import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import List from "./pages/blog/List";
import Record from "./pages/blog/Record";
import Add from './pages/blog/Add';
import Blog from './pages/Home/Blog';
import Edit from './pages/blog/Edit';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import './index.css';
import useLocalStorage from "use-local-storage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light'
      ? 'dark' : 'light';
    setTheme(newTheme);
  }
  return (
    <div className="App" data-theme={theme}>
      <Router>
        <Header theme={switchTheme} imgIcon={theme}/>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/list" /> : <Home />} />
          <Route path="/:id" element={user ? <Navigate to="/list" /> : <Blog />} />
          <Route path="/list" element={user ? <List /> : <Navigate to="/" />} />
          <Route path="/list" element={<List />} />
          <Route path="/add" element={user ? <Add /> : <Navigate to="/" />} />
          <Route path="/record/:id" element={user ? <Record /> : <Navigate to="/" />} />
          <Route path="edit/:id" element={user ? <Edit /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/list" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/list" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
