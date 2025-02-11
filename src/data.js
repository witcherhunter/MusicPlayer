import { v4 as uuidv4 } from "uuid";


function chillHop() {

return [
  {
    name: "This is a man",
    cover:
      "https://worldofmusic.ir/upls/cover/12650.jpg",
    artist: "Mama Aiuto, Daphné",
    audio: "./assets/amir.mp3", // استفاده از مسیر نسبی از public
    color: ["#2a7070", "#2B759A"],
    id: uuidv4(),
   
    dis: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',

   },
  {
    name: "Velocities",
    cover:
      "https://behmelody.in/wp-content/uploads/2021/09/Jakson-Top-Songs-500x500.jpg",
    artist: "Sleepy Fish",
    audio: "./assets/10023.mp3", // استفاده از مسیر نسبی از public
    color: ["#286a8d", "#8BCEDF"],
    id: uuidv4(),
   
    dis: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
    {
      name: "Colors Fade",
      cover:
        "https://worldofmusic.ir/upls/artists/eagles.jpg",
      artist: "Sleepy Fish",
      audio: "./assets/song1.mp3",
      color: ["#9c5a47", "#FEFEFE"],
      id: uuidv4(),
     
      dis:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',

    },

    {
      name: "Far From Home",
      cover:
        "https://womtherapy.ir/upls/cover/1111.jpg",
      artist: "Toonorth",
      audio: "./assets/song2.mp3",
      color: ["#5d45a3", "#524B52"],
      id: uuidv4(),
     
      dis:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',

    },


  ];
}

export default chillHop;
