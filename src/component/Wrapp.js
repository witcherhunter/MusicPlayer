import React, { useState, useRef, useEffect } from "react";
import Pod from "./Pod";
import Songs from "./Songs";
import data from "../data";
// import '../../public/amir.mp3'

function Wrapp() {
  const [loading, setLoading] = useState(false);
  const [currentCover, setCurrentCover] = useState('/logo512.png')
  const sourceRef = useRef(null);
  const audioContextRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const analyzerRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("#2a7070");
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [initail, setInitail] = useState(true)
  const [buttonsEnabled, setButtonsEnabled] = useState(false);

  // اینجا هم مرکز هست تمام دیتا های وب ایدیو ای پی ای و کانواس این جا داخل این یوافکت گرفته میشود
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      analyzerRef.current = audioContextRef.current.createAnalyser();
    }

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return () => {
      if (analyzerRef.current) {
        analyzerRef.current.disconnect();
      }
    };
  }, []);
  // وصله به المنت ایدیو منبع فایل صوتی رو میگیره 
  const handleFileChange = async (index) => {
    const selectedSong = songs[index];

    if (selectedSong) {
      const audio1 = audioRef.current;
      audio1.pause();

      try {
        const response = await fetch(selectedSong.audio);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        audio1.src = url;
        audio1.load();

        audio1.oncanplaythrough = () => {
          audio1.play().then(() => {
            setupAudio();
          });
        };

        audio1.onended = () => {
          handleFileChange((index + 1) % songs.length);
        };
      } catch (error) {
        console.error("Error loading audio file:", error);
      }
    }
  };
  // فانکشن ست اپ ایدیو برای اینکع سورس صدا رو درست که ویژولایزر رو اپدیت کنه 
  const setupAudio = () => {
    const audioCtx = audioContextRef.current;

    if (sourceRef.current) {
      sourceRef.current.disconnect();
    } else {
      sourceRef.current = audioCtx.createMediaElementSource(audioRef.current);

    }

    sourceRef.current.connect(analyzerRef.current);
    analyzerRef.current.connect(audioCtx.destination);

    const bufferLength = analyzerRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const ctx = canvasRef.current.getContext("2d");
    // analyzerRef.current.fftSize = 256;

    const updateVisualizer = () => {
      analyzerRef.current.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      visulizer(bufferLength, canvasRef.current.width / bufferLength, dataArray, ctx);
      requestAnimationFrame(updateVisualizer);
    };
    // console.log(audioContextRef)
    // console.log(analyzerRef)
    // console.log(dataArray)
    // console.log(analyzerRef.current.frequencyBinCount);
    // console.log(bufferLength)


    requestAnimationFrame(updateVisualizer);
  };
  // فانکشن پایین برای تنیظیمات کانواس هستت که چحوری تکون بخوره 
  const visulizer = (bufferLength, barWidth, dataArray, ctx) => {
    let x = 0;
    const canvasHeight = canvasRef.current.height;
    const barMaxHeight = canvasHeight / 2; // حداکثر ارتفاع هر ستون
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * barMaxHeight; // ارتفاع ستون براساس داده‌های فرکانس
      const y = canvasHeight / 2;

      // ستون‌ها را برای بالا و پایین رسم کن
      ctx.fillStyle = currentColor;
      ctx.fillRect(x, y - barHeight, barWidth, barHeight); // ستون بالا
      ctx.fillRect(x, y, barWidth, barHeight); // ستون پایین

      x += barWidth + 2; // فاصله بین ستون‌ها
    }
  };



  // خط اهنگ با استفاده از این فانکشن اپدیت میشود
  const timeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const animation = Math.round((current / duration) * 100);
    setSongInfo({
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };
  //فانکشن برای دکمه پخش هست این کامپونتت جاهای دیگه هم استفاده شده.
  //مثلا وقتی که روی یک اهنگ از روی پلی لیست کلیک میکنیم این فانکشن تریگر میشه
  const playSong = async () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => {
        // موفقیت در پخش
      }).catch((error) => {
        console.error("Error trying to play the audio: ", error);
      });
    }
    await setIsPlaying(!isPlaying);
  };
  //وقتی که اهنگ تموم میشه میره اهنگ بعدی به صورت خودکار
  const songEnd = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.pause();
  };




  return (
    <div className="relative">

    
    <div className="flex flex-col items-center  ">
     

      <Pod
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs={setSongs}
        timeUpdate={timeUpdate}
        setCurrentSong={setCurrentSong}
        playSong={playSong}
        currentCover={currentCover}
        initail={initail}
        setButtonsEnabled={setButtonsEnabled}
        buttonsEnabled={buttonsEnabled}
        canvasRef={canvasRef}
      />
      <Songs
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        songs={songs}
        setSongs={setSongs}
        setCurrentCover={setCurrentCover}
        isPlaying={isPlaying}
        onSongSelect={(index) => handleFileChange(index)}
        playSong={playSong}
        setInitail={setInitail}
        setButtonsEnabled={setButtonsEnabled}
      />
      <audio
        id="audio1"
        onTimeUpdate={timeUpdate}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEnd}
      preload="none"
      ></audio>
    </div>
    </div>
  );
}

export default Wrapp;
