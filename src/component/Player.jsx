import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { MdVolumeMute } from "react-icons/md";
import { BsVolumeMuteFill } from "react-icons/bs";
import { MdForward30 } from "react-icons/md";
import { MdOutlineReplay30 } from "react-icons/md";
import '../App.css'
import '../styles/player.css'

const Player = ({
  setSongInfo,
  songInfo,
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setSongs,
  setCurrentSong,
  playSong,
  id,
  timeUpdate,
  songEnd,
  setVisible,
  changeCurrentSong,
  setButtonsEnabled,
  buttonsEnabled,
  canvasRef

}) => {
  //useEffect
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);
  //Event Handler


  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);


  // const PuseSong = () => {
  //   if (!isPlaying) {
  //     audioRef.current.play();
  //     setIsPlaying(!isPlaying);
  //   } else {
  //     audioRef.current.pause();
  //     setIsPlaying(!isPlaying);
  //   }
  // };



  const drag = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };


  const skipTrack = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === "back") {
      if (currentIndex === 0) {
        currentIndex = songs.length - 1;
        await setCurrentSong(songs[currentIndex]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[currentIndex - 1]);
    }
    if (isPlaying) audioRef.current.play();
  };



  // const skipTrack = async (direction) => {
  //   let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  //   console.log('Current Index:', currentIndex); // Current index before change

  //   if (direction === "forward") {
  //     const newIndex = (currentIndex + 1) % songs.length;
  //     console.log('New Index (Forward):', newIndex); // New index for the next song
  //     const newSong = songs[newIndex];
  //     console.log('New Song (Forward):', newSong); // New song object
  //     await changeCurrentSong(newSong);
  //   } else if (direction === "back") {
  //     const newIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
  //     console.log('New Index (Back):', newIndex); // New index for the previous song
  //     const newSong = songs[newIndex];
  //     console.log('New Song (Back):', newSong); // New song object
  //     await changeCurrentSong(newSong);
  //   }

  //   // Wait for the state to update before playing the song
  //   setTimeout(() => {
  //     if (isPlaying) audioRef.current.play();
  //   }, 0);
  // };


  // const skipTrack = (direction) => {
  //   let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  //   console.log('Current Index:', currentIndex); // Current index before change

  //   let newIndex;
  //   if (direction === "forward") {
  //     newIndex = (currentIndex + 1) % songs.length;
  //   } else if (direction === "back") {
  //     newIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
  //   }
  //   console.log('New Index:', newIndex); // New index for the next or previous song
  //   const newSong = songs[newIndex];
  //   console.log('New Song:', newSong); // New song object

  //   setCurrentSong(newSong, () => {
  //     // This callback ensures that the state is updated before playing the song
  //     if (isPlaying) {
  //       audioRef.current.play();
  //     }
  //   });
  // };

  // const playSong1 = () => {
  //   playSong()
  // };

  // const handleSongSelect = () => {
  //   setButtonsEnabled(true); // دکمه‌ها فعال می‌شوند
  // };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 30, audioRef.current.duration);
    }
  };

  // تابع برای بردن آهنگ 30 ثانیه به عقب
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 30, 0);
    }
  }
  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume; // Set audio volume directly
  };

  // Mute/Unmute toggle handler
  const toggleMute = () => {
    if (isMuted) {
      // Unmute: Set volume to the previous volume level
      audioRef.current.volume = volume;
      setIsMuted(isMuted)
    } else {
      // Mute: Set volume to 0
      audioRef.current.volume = 0;
      setIsMuted(!isMuted);
    }
    setIsMuted(!isMuted);

  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };


  return (

    <div dir="ltr" className="mt-3  relative">
      <div className="bottom-0   flex flex-col items-center justify-between w-full">
        <div className="time-control w-full  flex mt-[15rem]">
          <canvas
            id="canvas1"
            ref={canvasRef}
            className="absolute"
          ></canvas>
          <p className="text-sm">{getTime(songInfo.currentTime)}</p>
          <div
            style={{
              background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
            }}
            className="w-full  h-4 relative rounded-full overflow-hidden"
          >
            <input
              className="slider-thumb w-full h-4  relative rounded-full transform translate-y-4.5"
              min={0}
              max={songInfo.duration || 0}
              value={songInfo.currentTime}
              onChange={drag}
              type="range"
            />
            <div
              style={trackAnim}
              className="bg-white w-full h-full absolute top-0 left-0 transform translate-x-1/2 pointer-events-none animate-track"
            ></div>
          </div>
          <p className="text-sm">{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
        </div>

        <div className="flex justify-around items-center p-4 w-full">
          <FaCircleChevronLeft
            onClick={() => skipTrack("back")}
            className={!buttonsEnabled ? 'text-gray-400 cursor-not-allowed' : ''}
          />

          <MdOutlineReplay30
            onClick={() => skipBackward()}
            className={!buttonsEnabled ? 'text-gray-400 cursor-not-allowed' : ''}
          />
          {isPlaying ? (
            <FaCirclePause
              className={`plays ${!buttonsEnabled ? 'text-gray-400 cursor-not-allowed' : ''}`}
              onClick={buttonsEnabled ? playSong : null}
            />
          ) : (
            <FaPlayCircle
              onClick={buttonsEnabled ? playSong : null}
              className={!buttonsEnabled ? 'text-gray-400 cursor-not-allowed' : ''}
            />
          )}
          <MdForward30
            onClick={() => skipForward()}
            className={!buttonsEnabled ? 'text-gray-400 cursor-not-allowed' : ''}
          />
          <FaCircleChevronRight
            onClick={() => skipTrack("forward")}
            className={!buttonsEnabled ? 'text-gray-400 cursor-not-allowed' : ''}
          />
        </div>
        <div className="volume-control flex items-center mt-4">
          <button onClick={toggleMute} className="ml-2">
            {isMuted ? <MdVolumeMute className='text-red-600' /> : <BsVolumeMuteFill />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={changeVolume}
            className="slider-thumb w-full h-4 rounded-full overflow-hidden"
          />
        </div>

      </div>
    </div>


  );
};

export default Player;
