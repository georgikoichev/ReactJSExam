import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthContext from "./contexts/AuthContext";

import * as authService from "./services/authService";

import Navigation from "./components/core/Navigation";
import Home from "./components/core/Home";

import AllPosts from "./components/posts/AllPosts";
import PostDetails from "./components/posts/PostDetails";
import CreatePost from "./components/posts/CreatePost";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Logout from "./components/user/Logout";
import EditPost from "./components/posts/EditPost";

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    localStorage.removeItem("accessToken");
    return {};
  });

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);

    setAuth(result);
    localStorage.setItem("accessToken", result.accessToken);

    navigate("/");
  };

  const registerSubmitHandler = async (values) => {
    const result = await authService.register(values.email, values.password);

    setAuth(result);
    localStorage.setItem("accessToken", result.accessToken);

    navigate("/");
  }

  const logoutHandler = () => {
    setAuth({});

    localStorage.removeItem("accessToken");
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    email: auth.email,
    isAuthenticated: !!auth.accessToken,
  }

  return (
    <AuthContext.Provider value={values}>
      <div id="box">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/posts" element={<AllPosts />}/>
          <Route path="/posts/create" element={<CreatePost />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/posts/:postId" element={<PostDetails />}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="posts/:postId/edit" element={<EditPost />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App
