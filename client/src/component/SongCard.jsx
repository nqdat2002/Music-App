import React from 'react';
import { motion } from "framer-motion";
import { useState } from 'react';
import { useStateValue } from '../Context/StateProvider';
import {IoTrash } from "react-icons/io5";
import { actionType } from '../Context/reducer';
import { deleteSongById, getAllSongs} from '../api';
import AlertError from './AlertError';
import AlertSuccess from './AlertSuccess';

const SongCard = ({ data, index }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);

    const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

    const addSongToContext = () => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: true,
            });
        }
        if (song !== index) {
            dispatch({
                type: actionType.SET_SONG,
                song: index,
            });
        }
    };

    const openLink = () =>{
        window.open(data.songUrl + '');
    };

    const deleteObject = (id) => {
        // console.log(id);
        deleteSongById(id).then((res) => {
            // console.log(res.data);
            if (res.data.success) {
                setAlert("success");
                setAlertMsg(res.data.msg);
                getAllSongs().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_SONGS,
                        allSongs: data.data,
                    });
                });
                setTimeout(() => {
                    setAlert(false);
                }, 4000);
            } else {
                setAlert("error");
                setAlertMsg(res.data.msg);
                setTimeout(() => {
                    setAlert(false);
                }, 4000);
            }
        });
    };
    return (
        <motion.div
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
            onClick={addSongToContext}
        >
            {isDeleted && (
                <motion.div
                    
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="absolute z-10 p-2 inset-0 bg-card backdrop-blur-md flex flex-col gap-6 items-center justify-center"
                >
                    <p className="text-sm text-center text-textColor font-semibold">
                        Are you sure do you want to delete this song?
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
                            onClick={() => deleteObject(data._id)}
                        >
                            Yes
                        </button>
                        <button
                            className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
                            onClick={() => setIsDeleted(false)}
                        >
                            No
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={data.imageURL}
                    alt=""
                    className=" w-full h-full rounded-lg object-cover"
                    onClick={openLink}
                />
            </div>

            <p className="text-base text-headingColor font-semibold my-2" onClick={openLink}>
                {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
                <span className="block text-sm text-gray-400 my-1">{data.artist}</span>
            </p>

            <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
                <motion.i whileTap={{ scale: 0.75 }} onClick={() => setIsDeleted(true)}>
                    <IoTrash className="text-base text-red-400 drop-shadow-md hover:text-red-600" />
                </motion.i>
            </div>

            {alert && (
                <>
                    {alert === "success" ? (
                        <AlertSuccess msg={alertMsg} />
                    ) : (
                        <AlertError msg={alertMsg} />
                    )}
                </>
            )}
        </motion.div>
    );
};

export default SongCard;