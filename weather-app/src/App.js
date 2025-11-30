import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import WeatherDashboard from './pages/WeatherDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<WeatherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 