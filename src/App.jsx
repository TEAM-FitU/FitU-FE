import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SetSituationPage from './pages/SetSituationPage/SetSituationPage.jsx';
import RecommendationResultPage from './pages/RecommendationResultPage/RecommendationResultPage.jsx';

function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/set-situation" element={<SetSituationPage />} />
                <Route path="/recommendation-result" element={<RecommendationResultPage />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;