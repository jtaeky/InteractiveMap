// // // script.js
//developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API

async function getCurrentPosition() {
  let cp = [51.505, -0.09];
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          cp = [position.coords.latitude, position.coords.longitude];
          resolve(cp);
        }
      },
      (error) => reject(error)
    );
  });
}

function addPixelatedOverlay() {
  for (let i = 0; i < 1000; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixelated");
    overlay.appendChild(pixel);
  }
}

async function initApp() {
  const currentPosition = await getCurrentPosition();
  console.log("currentPosition =", currentPosition);

  const map = L.map("map").setView(currentPosition, 2);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  addPixelatedOverlay();

  const marker = L.marker(currentPosition).addTo(map);

  marker.bindPopup("THIS IS WHERE YOU ARE NOW!").openPopup();

  const popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }

  map.on("click", onMapClick);
}

initApp();

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

// var popup = L.popup();

// ==================================================================================================================

// console.log("HI");

// const container = document.getElementById("map-container");
// const cols = 30;
// const rows = 20;

// let delay = 0;

// for (let y = 0; y < rows; y++) {
//   for (let x = 0; x < cols; x++) {
//     const tile = document.createElement("div");
//     tile.classList.add("tile");
//     tile.style.color = "white";

//     // Animate each tile from left to right
//     setTimeout(() => {
//       tile.style.opacity = 1;
//     }, delay);

//     delay += 10; // controls animation speed
//     container.appendChild(tile);
//   }
// }

// // const getMicAudio = async () => {
//   const stream = await navigator.mediaDevices.getUserMedia({
//     audio: true,
//   });

//   console.log("stream =", stream);

//   let chunks = [];

//   if (stream) {
//     const mediaRecorder = new MediaRecorder(stream);

//     mediaRecorder.start();

//     mediaRecorder.ondataavailable = (e) => {
//       console.log("are you getting pushed?");
//       chunks.push(e.data);
//     };

//     setTimeout(() => {
//       mediaRecorder.stop();
//       console.log("chunks =", chunks);

//       const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

//       console.log("blob =", blob);

//       //   const audioURL = window.URL.createObjectURL(blob);

//       //   const audio = document.createElement("audio");
//       //   audio.src = audioURL;

//       //   document.body.appendChild(audio);

//       //   audio.play();
//     }, 3000);
//   }
// };

// getMicAudio();
