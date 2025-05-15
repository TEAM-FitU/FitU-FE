import "./App.css";
import Header from "./components/Header.jsx";
import ClosetRegistrationPage from "./pages/ClosetRegistrationPage/ClosetRegistrationPage.jsx";
import MyClosetPage from "./pages/MyClosetPage/MyClosePage.jsx";

function App() {
    return (
        <>
            <Header />
            {/* <ClosetRegistrationPage /> */}
            <MyClosetPage />
        </>
    );
}

export default App;
