import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { Link } from 'react-router-dom';

function App() {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const savedToken = localStorage.getItem('token');
  //   if (savedToken) {
  //     setToken(savedToken);
  //   }
  // }, []);

  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1>Welcome to Chat App</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
