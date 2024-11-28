import "./SongDetails.css";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import the heart icons
import { useState, useEffect, useRef } from "react";
import { GoDotFill } from "react-icons/go";

const SongDetails = ({ song, onClose }) => {
    const [liked, setLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // State to track if music is playing
    const audioRef = useRef(null); // Create a reference for the audio element

    if (!song) return null;

    useEffect(() => {
        // Add overflow-hidden when the popup is opened
        document.body.classList.add("overflow-hidden");

        // Cleanup function to remove overflow-hidden when the popup is closed
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const toggleLike = () => {
        setLiked(!liked); // Toggle the liked state
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause(); // Pause the audio
        } else {
            audioRef.current.play(); // Play the audio
        }
        setIsPlaying(!isPlaying); // Toggle the playing state
    };

    function msToMinutesAndSeconds(ms) {
        const minutes = Math.floor(ms / 60000); // 60000 ms in a minute
        const seconds = Math.floor((ms % 60000) / 1000); // Get remaining seconds
        return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`; // Format with leading zero for seconds
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-[99999]">
            <div className="px-[30px] pb-[30px] pt-[15px] rounded-lg max-w-md relative bg-custom-radial w-full">
                {/* Close button */}
                <div className={"flex justify-between items-center pb-4"}>
                    <p className="text-gray-300 text-lg">{song.track.album.name}</p>
                    <button className="text-white hover:text-gray-500" onClick={onClose}>
                        <IoClose size={25} className={"ml-auto"} />
                    </button>
                </div>

                {/* Image */}
                <div className={"w-full h-[350px]"}>
                    <img
                        className="navigation-image mx-auto"
                        src={song.track.album.images[0]?.url}
                        alt={song.track.name}
                    />
                </div>
                <hr className="hr2" />

                {/* Lyrics */}
                <div className="lyrics-section scroll-auto max-h-[150px] my-5 pr-2 custom-scrollbar">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor,
                        quae harum! Minima debitis, culpa fuga nesciunt cumque quos dolorem
                        quae fugit animi molestias quam mollitia rem veniam assumenda
                        praesentium id.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor,
                        quae harum! Minima debitis, culpa fuga nesciunt cumque quos dolorem
                        quae fugit animi molestias quam mollitia rem veniam assumenda
                        praesentium id.
                    </p>
                </div>
                <hr className="hr3" />

                {/* Title, Artist, and Like Button */}
                <div className="flex justify-between">
                    {/* Song Title and Artist */}
                    <div>
                        <h3 className="text-2xl font-semibold name w-full">{song.track.name}</h3>
                        <p className={"flex items-center text-lg text-gray-600 gap-2"}><GoDotFill /> {song.track.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>

                    {/* Like button (Row aligned) */}
                    <button onClick={toggleLike} className="focus:outline-none ml-4">
                        {liked ? (
                            <AiFillHeart size={30} className="text-[#1ed760]" />
                        ) : (
                            <AiOutlineHeart size={30} className="text-gray-500 hover:text-[#1ed760]" />
                        )}
                    </button>
                </div>

                <div className="play">
                    <div className="container">
                        <div>
                            <p>2:16</p>
                            <span></span>
                            <p>{msToMinutesAndSeconds(song.track.duration_ms)}</p>
                        </div>

                        {/* Controls */}
                        <div className="controls mt-2">
                            <RxTrackPrevious className={"hover:text-[#1ed760]"} />
                            <button onClick={togglePlayPause} className="focus:outline-none">
                                {isPlaying ? (
                                    <CiPause1 className={"hover:text-[#1ed760]"} />
                                ) : (
                                    <CiPlay1 className={"hover:text-[#1ed760]"} />
                                )}
                            </button>
                            <RxTrackNext className={"hover:text-[#1ed760]"} />
                        </div>
                    </div>
                </div>

                {/* Audio element */}
                <audio ref={audioRef} src={song.track.uri} />
            </div>
        </div>
    );
};

export default SongDetails;
