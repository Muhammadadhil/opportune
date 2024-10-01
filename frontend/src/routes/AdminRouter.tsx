import { Routes, Route } from "react-router-dom";

function AdminRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default AdminRoute;
