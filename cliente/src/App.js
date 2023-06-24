import {BrowserRouter, Routes, Route} from "react-router-dom";
import StorePage from "./components/storePage";
import CommunityPage from "./components/communityPage";
import AboutPage from "./components/aboutPage";
import SupportPage from "./components/supportPage";
import ProfilePage from "./components/profilePage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import SearchPage from "./components/searchPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StorePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/community" element={<CommunityPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/support" element={<SupportPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
