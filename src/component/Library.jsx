import React, { useState, useEffect } from "react";
import { IoIosTime } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa";
import "../sowrd.css";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import '../styles/player.css'

function Library({ audioRef, isPlaying, setIsPlaying, songs, setSongs, setCurrentSong, currentSong, song, setButtonsEnabled, id, onSongSelect, onTimeUpdate, setInitail, onLoadedMetadata, src, onEnded, playSong, currentCover, setCurrentCover }) {
  const [isLoading, setIsLoading] = useState(true); // حالت بارگذاری اولیه
  const [audioUrl, setAudioUrl] = useState(song.audio);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioDurationFormatted, setAudioDurationFormatted] = useState(0);


  useEffect(() => {
    // بررسی بارگذاری کامل همه آهنگ‌ها
    const handleSongLoad = () => {
      setIsLoading(false); // پس از بارگذاری، حالت بارگذاری را خاموش می‌کنیم
    };

    // اضافه کردن رویداد `canplaythrough` به هر آهنگ
    songs.forEach((song) => {
      const audio = new Audio(song.audio); // ایجاد نمونه صوتی برای هر آهنگ
      audio.addEventListener("canplaythrough", handleSongLoad); // بررسی بارگذاری
    });

  }, [songs]);
  //
  useEffect(() => {
    function getAudioDurationInSeconds(audioUrl) {
      return new Promise((resolve, reject) => {
        const audio = new Audio(audioUrl);

        audio.addEventListener("loadedmetadata", () => {
          resolve(audio.duration);
        });

        audio.addEventListener("error", (error) => {
          reject(error);
        });
      });
    }

    getAudioDurationInSeconds(audioUrl)
      .then((duration) => setAudioDuration(duration))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [audioUrl]);

  useEffect(() => {
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);

      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");

      return `${formattedMinutes}:${formattedSeconds}`;
    }

    setAudioDurationFormatted(formatTime(audioDuration));
  }, [audioDuration]);


  const songSelect = () => {
    setInitail(false);
    setButtonsEnabled(true);

    if (song.id === currentSong.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error trying to play the audio: ", error);
        });
        setIsPlaying(true);
      }
      return;
    }

    const newSongs = songs.map((songItem) => ({
      ...songItem,
      active: songItem.id === id,
    }));
    setSongs(newSongs);
    setCurrentSong(song);

    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current.src = song.audio;

    audioRef.current.play().catch((error) => {
      console.error("Error trying to play the audio: ", error);
    });
    setIsPlaying(true);

    const index = songs.findIndex((s) => s.id === id);
    if (onSongSelect) {
      onSongSelect(index);
    }
    setCurrentCover(song.cover);
  };

  return (
    <div>
      {isLoading ? (
        <div>در حال بارگذاری پلی‌لیست...</div>
      ) : (
        <div className="mb-4" onClick={songSelect}>
          <div
            className={`flex flex-col justify-center items-center max-w-[60rem] mb-5 mt-5 cursor-pointer gap-2 ${song.active ? "bg-[#0b2142]" : "bg-[#bedeec]"} rounded-lg`}
      
          >
            <div className="desktop-only">

              <div className="flex  lg:max-w-full flex-row-reverse bg-gray-100 rounded-lg ">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col justify-start items-center">
                    <div className="flex flex-col  justify-center items-center gap-2  ">
                      <img className="  lg:w-[10rem] lg:h-[10rem]  md:w-[5rem] md:h-[5rem] sm:w-[10rem] sm:h-[10rem]   lg:m-[.8rem] md:m-[.4rem] sm:m-[.4rem] rounded-lg " draggable="false" src={song.cover} alt="" />
                      {isPlaying && currentSong.id === id ? (
                        <div className="button-container">
                          <div className="flex flex-row justify-center items-center gap-2 ">
                            <FaCirclePause className="plays1" onClick={playSong} />
                            <p className="mb-1.5">pause</p>
                          </div>
                        </div>
                      ) : (
                        <div className="button-container">
                          <div className="flex flex-row justify-center items-center gap-2 button">
                            <FaPlayCircle onClick={playSong} />
                            <p className="mb-1.5">Play</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-end justify-end">
                        <div className="flex flex-row items-center">
                          <FaRegCalendarCheck className="w-3 h-3 text-gray-400 mx-1" />
                          <span className="text-[.5rem] text-gray-500">تاریخ انتشار: 1402/02/03</span>
                        </div>
                        <div className="flex items-center ">
                          <IoIosTime className="w-3 h-3 text-gray-400 mx-1" />
                          <span className="text-[.5rem] text-gray-500">
                            زمان پادکست:
                            {audioDurationFormatted !== 0
                              ? audioDurationFormatted
                              : "در حال بارگزاری ..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="mr-4 ">{song.name}</h3>
                  <p className=" w-full  text-[.7rem] text-gray-500 p-[1rem]">{song.dis}</p>
                </div>

              </div>
            </div>

            <div className="mt-3 lg:w-[80%] sm:w-full  "></div>
          </div>

          <div className="mobile-only">
            <div className="flex flex-col justify-between items-center  w-full">
              <div className="flex flex-row ">
                <img className="  lg:w-[10rem] lg:h-[10rem]  md:w-[5rem] md:h-[5rem] sm:w-[10rem] sm:h-[10rem]   lg:m-[.8rem] md:m-[.4rem] sm:m-[.4rem] rounded-lg " draggable="false" src={song.cover} alt="" />
                <div className="flex flex-col justify-between ">

                  <h3 className="mr-4 ">{song.name}</h3>
                  <div className="flex items-end justify-end">
                    <div className="flex flex-row items-center">
                      <FaRegCalendarCheck className="w-3 h-3 text-gray-400 mx-1" />
                      <span className="text-[.5rem] text-gray-500">تاریخ انتشار: 1402/02/03</span>
                    </div>
                    <div className="flex items-center ">
                      <IoIosTime className="w-3 h-3 text-gray-400 mx-1" />
                      <span className="text-[.5rem] text-gray-500">
                        زمان پادکست:
                        {audioDurationFormatted !== 0
                          ? audioDurationFormatted
                          : "در حال بارگزاری ..."}
                      </span>
                    </div>
                  </div>
                  {isPlaying && currentSong.id === id ? (
                    <div className="button-container">
                      <div className="flex flex-row justify-center items-center gap-2 ">
                        <FaCirclePause className="plays1" onClick={playSong} />
                        <p className="mb-1.5">توقف</p>
                      </div>
                    </div>
                  ) : (
                    <div className="button-container">
                      <div className="flex flex-row justify-center items-center gap-2 button">
                        <FaPlayCircle onClick={playSong} />
                        <p className="mb-1.5">پخش</p>
                      </div>
                    </div>
                  )}
                </div>


              </div>
              <p className=" w-full  text-[.7rem] text-gray-500 p-[1rem]">{song.dis}</p>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}

export default Library;