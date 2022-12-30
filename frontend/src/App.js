import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/shared/Header";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/shared/PrivateRoute";
import Post from "./pages/Post";
function App() {
  return (
    <>
      <Router>

   <div className="max-w-6xl mx-auto px-4 ">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/post/:postId" element={<PrivateRoute />}>
              <Route path="/post/:postId" element={<Post />} />
            </Route>
            <Route path="/profile/:userId" element={<PrivateRoute />}>
              <Route path="/profile/:userId" element={<Profile />} />
            </Route>
          </Routes>
        </div>
       
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
