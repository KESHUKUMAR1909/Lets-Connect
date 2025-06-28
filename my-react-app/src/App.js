import logo from './logo.svg';
import './App.css';
import Landing from './pages/landing';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/:url' element={<VideoMeetComponent/>} />
        </Routes>

      </AuthProvider>
    </Router>
  );
}

export default App;
