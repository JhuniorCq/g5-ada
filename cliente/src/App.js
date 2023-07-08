import {BrowserRouter, Routes, Route} from "react-router-dom";
import StorePage from "./components/storePage";
import CommunityPage from "./components/communityPage";
import ProfilePage from "./components/profilePage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import SearchPage from "./components/searchPage";
import AppInfoPage from "./components/appInfoPage";
import LibraryPage from "./components/libraryPage";
import CartPage from "./components/cartPage";
import WishPage from "./components/wishlistPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StorePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/community" element={<CommunityPage/>}/>
                <Route path="/gamelibrary" element={<LibraryPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/appInfo" element={<AppInfoPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/wishlist" element={<WishPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
