import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ClosetRegistrationPage from "./pages/ClosetRegistrationPage/ClosetRegistrationPage.jsx";
import MyClosetPage from "./pages/MyClosetPage/MyClosetPage.jsx";
import SetProfilePage from "./pages/SetProfilePage";
import HomePage from "./pages/HomePage";
import MyProfilePage from "./pages/MyProfilePage";
import CompletePage from "./pages/CompletePage.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/set-profile' element={<SetProfilePage />} />
                    <Route path='/my-profile' element={<MyProfilePage />} />
                    <Route path='/my-closet' element={<MyClosetPage />} />
                    <Route path='/closet-add' element={<ClosetRegistrationPage showProgress={false} title='옷 등록' />} />
                    <Route path='/closet-registration' element={<ClosetRegistrationPage showProgress={true} title='FitU' />} />
                    <Route path='/completion' element={<CompletePage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
