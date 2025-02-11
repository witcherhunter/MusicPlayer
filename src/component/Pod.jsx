import React, { useState, useRef, useEffect } from "react";
import { IoIosTime } from "react-icons/io";
import { MdAvTimer } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import data from "../data";
import Player from "./Player";
function Pod({
  setVisible,
  audioRef,
  isPlaying,
  setIsPlaying,
  currentSong,
  setSongInfo,
  songInfo,
  songs,
  setSongs,
  setCurrentSong,
  songEnd,
  currentSong1,
  timeUpdate,
  changeCurrentSong,
  skipTrack,
  playSong,
  currentCover,
  initail,
  setButtonsEnabled,
  buttonsEnabled,
  canvasRef
}) {
  
  return (
    <div className="flex flex-col  justify-center items-center   ">
      <div className="flex flex-col justify-center items-center bg-gray-100 p-[1rem]  ">
        <img
          className="w-full h-[20rem] rounded-lg flex flex-col justify-center items-center"
          src={initail?currentCover:currentSong.cover}
        />
        <div className="flex flex-col max-w-[60rem]">
          <h1 className="flex items-center flex-warp text-amber-950 p-[.5rem]  lg:pl-[10rem] sm:max-w-full sm:pl-0 ">
            {currentSong.name}
          </h1>

          <p className="flex  flex-warp text-[.7rem] text-gray-500 pr-2">
            {initail?"Hi, welcom to music player":currentSong.dis}
          </p>
          <div className="flex flex-row  justify-between itemc-center max-w-[14rem] mt-3 pr-1">
            <div className="flex flex-row  items-center">
              <IoIosTime className="w-3 h-3 text-gray-400" />
              <span className="text-[.5rem] text-gray-500">
                1402/02/0
              </span>
            </div>
            <div className="flex flex-row  items-center">
              <FaRegCalendarCheck className="w-3 h-3 text-gray-400 mx-1" />
              <span className="text-[.5rem] text-gray-500">
                3:15   </span>
            </div>
            {/* <div className="flex flex-row  items-center">
             <span className="text-[.5rem] text-gray-500">تاریخ انتشار</span>
             <IoIosTime className="w-3 h-3 text-gray-400"/>
            </div> */}
          </div>

          <Player
            setVisible={setVisible}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentSong={currentSong}
            setSongInfo={setSongInfo}
            songInfo={songInfo}
            songs={songs}
            setSongs={setSongs}
            id={songs.id}
            setCurrentSong={setCurrentSong}
            songEnd={songEnd}
            timeUpdate={timeUpdate}
            currentSong1={currentSong1}
            changeCurrentSong={changeCurrentSong}
            skipTrack={skipTrack}
            playSong={playSong}
            setButtonsEnabled={setButtonsEnabled}
            buttonsEnabled={buttonsEnabled}
            canvasRef={canvasRef}
          />
        </div>
      </div>
    </div>
  );
}

export default Pod;
