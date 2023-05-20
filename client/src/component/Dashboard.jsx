import React from "react";
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";

import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardAlbumd from "./DashboardAlbums";
import DashboardArtistd from "./DashboardArtists";
import DashboardHome from "./DashboardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardUsers from "./DashboardUsers";
import DashboardNewSong from "./DashboardNewSong";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
        <Header />
        <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
            {/* prettier-ignore */}
            <NavLink to={"/dashboard/home"}><IoHome className="text-2xl text-textColor" /></NavLink>
            {/* prettier-ignore */}
            <NavLink to={"/dashboard/users"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Users </NavLink>
            {/* prettier-ignore */}
            <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Songs </NavLink>
            {/* prettier-ignore */}
            <NavLink to={"/dashboard/artists"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Artists </NavLink>
            {/* prettier-ignore */}
            <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Albums </NavLink>
        </div>

        <div className="my-4 w-full p-4">
            <Routes>
                <Route path="/home" element={<DashboardHome />} />
                <Route path="/users" element={<DashboardUsers />} />
                <Route path="/songs" element={<DashboardSongs />} />
                <Route path="/artists" element={<DashboardArtistd />} />
                <Route path="/albums" element={<DashboardAlbumd />} />
                <Route path="/newSong" element={<DashboardNewSong />} />
            </Routes>
        </div>
    </div>
    );
};

export default Dashboard;