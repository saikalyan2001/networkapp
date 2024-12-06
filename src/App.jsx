import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Chat from "./Pages/Chat/Chat";
import Explore from "./Pages/Explore/Explore";
import Stories from "./Pages/Stories/Stories";
import Profile from "./Pages/Profile/Profile";
import Posts from "./SubPages/Posts/Posts";
import Likes from "./SubPages/Likes/Likes";
import Saved from "./SubPages/Saved/Saved";
import { useState } from "react";
import PostCreation from "./Components/PostCreation/PostCreation";
import Feed from "./Feed/Feed";
import "./App.css";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import SignUp from "./Pages/SingUp/SignUp";
import useAuthStore from "./store/authStore";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Samp from "./Samp";

function App() {
  const [posts, setPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [authUser] = useAuthState(auth);


  return (



    <Router>
          <div className="app">

      {/* <Navbar 
          isCreating={isCreating} setIsCreating={setIsCreating}
      />
       */}
      <PostCreation 
          posts={posts} setPosts={setPosts}          
          isCreating={isCreating} setIsCreating={setIsCreating}
      />


      <div>
        {/* <PageLayout> */}
        <Routes>
          <Route path="/" element={authUser ? <Home posts={posts} /> : <Navigate to="/auth" /> } />
          <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/explore" element={<Explore posts={posts} />} />
          <Route path="/stories" element={<Stories  />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/profile/posts" element={<Posts posts={posts} />} />
          <Route path="/profile/likes" element={<Likes />} />
          <Route path="/profile/saved" element={<Saved />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/samp" element={<Samp />} />
        </Routes>
        {/* </PageLayout> */}
      </div>
      </div>

    </Router>

  );
}

export default App;
