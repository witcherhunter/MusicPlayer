// import { computeHeadingLevel } from "@testing-library/react";
// import React, { useRef, useState, useEffect } from "react";

// const AudioVisualizer = ({audioReff,songfirst,onSongSelect}) => {
//   const [loading, setLoading] = useState(false);
//   const audioContextRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);
// //   const audioReff = useRef(null);
//   const analyzerRef = useRef(null);

// useEffect(() => {
//     if (!audioContextRef.current) {
//       audioContextRef.current = new AudioContext();
//       analyzerRef.current = audioContextRef.current.createAnalyser();
//       console.log("Audio Context initialized:", audioContextRef.current);
//     }

//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     return () => {
//       if (analyzerRef.current) {
//         analyzerRef.current.disconnect();
//       }
//     };
//   }, []);

//   const visulizer = (bufferLength, barWidth, dataArray, ctx) => {
//     let x = 0;
//     for (let i = 0; i < bufferLength; i++) {
//       const barHeight = dataArray[i];
//       const y = canvasRef.current.height / 2;
//       const xPos = x + 3 * (i * barWidth);

//       ctx.fillStyle = currentColor;
//       ctx.fillRect(xPos, y - barHeight, barWidth, 10);

//       ctx.beginPath();
//       ctx.moveTo(xPos + barWidth / 2, y);
//       ctx.lineTo(xPos + barWidth / 2, y - barHeight);
//       ctx.strokeStyle = "green";
//       ctx.lineWidth = 10;
//       ctx.stroke();

//       x += barWidth;
//     }
//   };

  // const setupAudio = () => {
  //   const audioCtx = audioContextRef.current;

  //   // قطع کردن منبع قبلی اگر وجود دارد
  //   if (sourceRef.current) {
  //     sourceRef.current.disconnect();
  //   }

  //   // ایجاد منبع جدید و متصل کردن به آنالیزر
  //   sourceRef.current = audioCtx.createMediaElementSource(audioReff.current); // تغییر به audioReff.current
  //   sourceRef.current.connect(analyzerRef.current);
  //   analyzerRef.current.connect(audioCtx.destination);

  //   // تنظیمات تحلیلگر و ویژوالایزر
  //   const bufferLength = analyzerRef.current.frequencyBinCount;
  //   const dataArray = new Uint8Array(bufferLength);
  //   const ctx = canvasRef.current.getContext("2d");

  //   const updateVisualizer = () => {
  //     analyzerRef.current.getByteFrequencyData(dataArray);
  //     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  //     visulizer(bufferLength, canvasRef.current.width / bufferLength, dataArray, ctx);
  //     requestAnimationFrame(updateVisualizer);
  //   };

  //   requestAnimationFrame(updateVisualizer);
  // };

//   const handleFileChange = (index) => {
//     const selectedSong = songs[index];

//     if (selectedSong) {
//       const audio1 = audioReff.current;

//       // توقف آهنگ قبلی
//       audio1.pause();

//       // تنظیم منبع آهنگ جدید
//       audio1.src = selectedSong.audio;

//       // بارگذاری آهنگ جدید
//       audio1.load();

//       // بررسی اینکه آهنگ درست بارگذاری شده
//       console.log("Selected song audio:", selectedSong.audio);

//       audio1.oncanplaythrough = () => {
//         audio1
//           .play()
//           .then(() => {
//             console.log("Audio is playing:", audio1.src);
//             setupAudio(); // راه‌اندازی ویژوالایزر پس از پخش آهنگ
//           })
//           .catch((error) => {
//             console.error("Error playing audio:", error);
//           });
//       };

//       audio1.onended = () => {
//         handleFileChange((index + 1) % songs.length); // پخش آهنگ بعدی
//       };
//     } else {
//       console.error("Selected song or audio URL is undefined.");
//     }
//   };
  

//   return (
//     <div>
//       {loading && <div>Loading...</div>}

//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "50%",
//           backgroundColor: "black",
//         }}
//       >
//         {/* Your container content */}
//       </div>
//       <input
//         type="file"
//         onChange={onSongSelect}
//         ref={fileInputRef}
//         style={{
//           position: "absolute",
//           top: "150px",
//           color: "white",
//           zIndex: 1,
//         }}
//       />

//       {/* <audio
//         id="audio1"
//         // ref={audioRefff}
//         style={{
//           width: "50%",
//           margin: "50px auto",
//           display: "block",
//         }}
//       ></audio> */}
//       <canvas
//         id="canvas1"
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "50%",
//         }}
//       ></canvas>
//     </div>
//   );
// };

// export default AudioVisualizer;
