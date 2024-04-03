import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

function App() {
  return (
    <Router> {/* Wrap your entire application with BrowserRouter */}
      <div className="App">
        <Navbar />
      </div>
    </Router>
  );
}

export default App;

