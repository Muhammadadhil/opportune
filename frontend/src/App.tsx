import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserTypeSelection from "./pages/UserType";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Signup />} />
            <Route path="/type" element={<UserTypeSelection />} />
        </Routes>
    );
}

export default App;
