import "./App.css";
import { Route, Routes, useNavigate, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Home, Login, Dashboard} from "./component";
import { getAuth } from "firebase/auth";
import {app} from "./config/firebase.config";

import {AnimatePresence, motion} from "framer-motion";
import { validateUser, getAllSongs } from "./api";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import Loader from "./component/Loader";
import MusicPlayer from "./component/MusicPlayer";

function App() {
    const firebaseAuth = getAuth(app);
    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");
    const navigate = useNavigate();

    const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        firebaseAuth.onAuthStateChanged((userCred) => {
            if(userCred) {
                userCred.getIdToken().then((token) =>{
                    validateUser(token).then((data) =>{
                        dispatch({ 
                            type: actionType.SET_USER,
                            user: data,
                        })
                    })
                });
            }else{
                setIsLoading(false);
                setAuth(false);
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                });
                window.localStorage.setItem("auth", "false");
                navigate("/login");
            }
        })
    }, []);
    useEffect(() => {
        if (!allSongs && user) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                });
            });
        }
    }, []);
    return (
        <AnimatePresence>
            <div className="h-auto flex items-center justify-center min-w-[680px]">
            {isLoading || (!user && (
                <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
                    <Loader />
                </div>
            ))}
                <Routes>
                    <Route path="/login" element={<Login setAuth={setAuth}/>} />
                    {/* <Route exact path="/" component={() => (<Redirect to='/home' />)} /> */}
                    <Route path="/*" element={<Home />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                </Routes>

                {isSongPlaying && user && (
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        className={`fixed min-w-[700px] h-26 inset-x-9 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
                    >
                    <MusicPlayer />
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    );
}

export default App;
