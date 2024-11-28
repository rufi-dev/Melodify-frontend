import React, { useEffect, useState } from "react";
import axios from "axios";
import SongDetails from "../SongDetails/SongDetails.jsx";

const Playlist = ({ searchTerm }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);

  const [selectedSong, setSelectedSong] = useState(null);

  const clientID = "70033cec1d354e92accad1ff835be7fc";
  const clientSecret = "6fcaca8347514c45b27e86651a982fc9";

  const fetchSpotifyToken = async () => {
    const tokenURL = "https://accounts.spotify.com/api/token";
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${clientID}:${clientSecret}`),
    };

    try {
      const response = await fetch(tokenURL, {
        method: "POST",
        headers,
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token: " + response.statusText);
      }

      const responseData = await response.json();
      setAccessToken(responseData.access_token);
      setTokenExpiry(Date.now() + responseData.expires_in * 1000);
    } catch (error) {
      console.error("Error fetching Spotify token:", error);
    }
  };

  const fetchAllSongs = async () => {
    if (!accessToken || Date.now() > tokenExpiry) {
      await fetchSpotifyToken();
    }

    if (accessToken) {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch playlist: " + response.statusText);
        }

        const data = await response.json();
        setSongs(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    }
  };
  useEffect(() => {
    const loadSongs = async () => {
        try {
            await fetchAllSongs();
        } catch (error) {
            setLoading(false);
            console.error(error);
            alert("Error: " + error.message);
        }
    };

    loadSongs();
}, [accessToken, tokenExpiry]);
 // Depend on accessToken and tokenExpiry

  if (loading) {
    return <p>Loading...</p>;
  }
  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  const handleClosePopup = () => {
    setSelectedSong(null);
  };

  
  const filteredSongs = songs.filter((song) =>
    song.track.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(songs);

  return (
    <section className="playlists">
      <h2 className={"text-[30px] my-5"}>More of what you like</h2>
      <div className="playlist-grid">
        {filteredSongs.map((song, index) => (
          <div
            className="playlist-item cursor-pointer"
            key={index}
            onClick={() => handleSongClick(song)}
          >
            <img src={song.track.album.images[0]?.url} alt="Playlist cover" />
            <div>
              <p className={"truncate w-full text-[1.4rem]"}>
                {song.track.name}
              </p>
              <p className={"opacity-50 truncate w-full"}>
                {song.track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedSong && (
        <SongDetails song={selectedSong} onClose={handleClosePopup} />
      )}
    </section>
  );
};

export default Playlist;
