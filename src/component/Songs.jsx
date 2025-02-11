import React, { useState, useRef } from "react";
import { IoIosTime } from "react-icons/io";
import { MdAvTimer } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import Library from "./Library"
import chillHop from "../data";
import "../sowrd.css";

function Songs({ setActiveSong,songs ,setCurrentSong,audioRef,setIsPlaying,setSongs,isPlaying,currentSong,onSongSelect,onTimeUpdate,onLoadedMetadata,setButtonsEnabled,src,onEnded,setupAudio,setInitail,playSong,setCurrentCover,currentCover}) {
  // const data = chillHop();

  // const [tracks, setTracks] = useState(data);

  // const changeCurrentSong = (newSong) => {
  //   setCurrentPlay(newSong);
  // };

  // const handleSongClick = (track) => {
  //   setActiveSong(track.id);
  //   // onSongSelect(track);
  //   changeCurrentSong(track)
  // };

  return (
    <div >
      
            {songs.map((song) => (
          <Library
          setInitail={setInitail}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songs={songs}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            song={song}
            id={song.id}
            key={song.id}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            playSong={playSong}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            setupAudio={setupAudio}
            src={src}
            onEnded={onEnded}
            setCurrentCover={setCurrentCover}
            currentCover={currentCover}
            setButtonsEnabled={setButtonsEnabled}
          />
        ))}
    </div>
  );
}

export default Songs;
