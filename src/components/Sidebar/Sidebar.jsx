import React from "react";
import logo from "../../assets/Melodify.png"
const Sidebar = () => {
    return (
        <aside className="sidebar w-[275px]">
            <div className="sidebar-logo text-center">
                <img src={logo} alt={"logo"}/>
                Melodify
            </div>
            {/* Sidebar items */}
            <ul className="sidebar-list">
                <li>Library</li>
                <li>Recently Played</li>
                <li>Playlists</li>
            </ul>
        </aside>
    )
}

export default Sidebar