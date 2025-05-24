import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SetProfile from "./pages/SetProfilePage";
import Home from "./pages/HomePage";
import MyProfile from "./pages/MyProfilePage";

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