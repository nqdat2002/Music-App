import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { AiOutlineClear } from 'react-icons/ai';
import { motion } from "framer-motion";
import { useStateValue } from '../Context/StateProvider';
import { getAllSongs } from '../api';
import { actionType } from '../Context/reducer';
import SongCard from "./SongCard";


const DashboardSongs = () => {
    const [songFilter, setSongFilter] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [filteredSongs, setFilteredSongs] = useState(null);

    const [{ allSongs }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                // console.log(data.data);
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                });
            });
        }
    }, []);

    useEffect(() => {
        if (songFilter.length > 0) {
            const filtered = allSongs.filter(
                (data) =>
                    data.artist.toLowerCase().includes(songFilter) ||
                    data.language.toLowerCase().includes(songFilter) ||
                    data.name.toLowerCase().includes(songFilter)
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(null);
        }
    }, [songFilter]);

    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <div className="w-full flex justify-center items-center gap-24">
                <NavLink
                    to={"/dashboard/newSong"}
                    className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
                >
                    <IoAdd />
                    Add New
                </NavLink>
                <input
                    type="text"
                    placeholder="Search here"
                    className={`w-340 px-4 py-2 border ${isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
                        } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
                    value={songFilter}
                    onChange={(e) => setSongFilter(e.target.value)}
                    onBlur={() => setIsFocus(false)}
                    onFocus={() => setIsFocus(true)}
                />

                {songFilter && (
                    <motion.i
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileTap={{ scale: 0.75 }}
                        onClick={() => {
                            setSongFilter("");
                            setFilteredSongs(null);
                        }}
                    >
                        <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
                    </motion.i>
                )}
            </div>

            <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
                <div className="absolute top-4 left-4">
                    <p className="text-xl font-bold">
                        <span className="text-sm font-semibold text-textColor">
                            Count :{" "}
                        </span>
                        {filteredSongs ? filteredSongs?.length : allSongs?.length}
                    </p>
                </div>

                <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
            </div>
        </div>
    );
};

export const SongContainer = ({ data }) => {
    return (
        <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
            {data && data.map((song, i) => <SongCard key={song._id} data={song} index={i} />
            )}
        </div>
    );
};

export default DashboardSongs;