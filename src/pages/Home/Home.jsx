import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Header from "../../components/Header/Header.jsx";
import Playlist from "../Playlist/Playlist.jsx";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser.js";
import { useSelector } from "react-redux";
import Notification from "../../components/Notification/Notification.jsx";
import { ShowOnLogin } from "../../protect/hiddenLink.jsx";

const Home = () => {
  const { isLoading, user, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  //useRedirectLoggedOutUser("/login")
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <div className="spotify-clone">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="main-content">
        <div className={" sticky top-0 bg-black z-[999]"}>
          {/* Header */}
          <Header onSearch={handleSearch} />
          <ShowOnLogin>{!user?.isVerified && <Notification />}</ShowOnLogin>
          {/* Categories */}
          <div className="categories text-[20px]">
            <div className="category-tab active">All</div>
            <div className="category-tab">Music</div>
            <div className="category-tab">Podcasts</div>
          </div>
        </div>

        {/* Playlists */}
        <Playlist searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default Home;
