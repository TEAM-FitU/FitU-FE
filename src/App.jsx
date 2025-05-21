import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SetProfile from './pages/Profile/SetProfile';
import Home from './pages/Home';
import MyProfile from './pages/Profile/MyProfile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/set-profile" element={<SetProfile />} />
                <Route path="/my-profile" element={<MyProfile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;