window.onload = function () {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  // Biar background putih
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let img = new Image();
  img.src = "Documentation/UI/default.png"; // ganti dengan gambar peringatan/default Anda
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
};
const categories = ["back","skin","nose","mouth","tatto","eyes","eyebrow","clothes","hand","hair","face","offhand","head","accessories"];
const mandatory = ["skin","nose","mouth","eyes","eyebrow",""];

function showOptions(category, btn) {
  document.querySelectorAll('.options').forEach(opt => opt.classList.remove('active'));
  const el = document.getElementById(category + '-options');
  if (el) el.classList.add('active');

  document.querySelectorAll('.menu button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  window.scrollTo({top: el.offsetTop - 100, behavior: "smooth"});
}

function toggleLayer(layerId, imgEl) {
  const target = document.getElementById(layerId);
  if (target.src.includes(imgEl.src)) {
    target.src = "";
    imgEl.classList.remove("selected");
  } else {
    document.querySelectorAll(`#${layerId}-options img`).forEach(el => el.classList.remove("selected"));
    target.src = imgEl.src;
    imgEl.classList.add("selected");
  }
}

function resetCharacter() {
  document.querySelectorAll('.layer').forEach(l => l.src = "");
  document.querySelectorAll('.options img').forEach(el => el.classList.remove("selected"));
  document.querySelectorAll('.menu button').forEach(b => b.classList.remove('active'));
}

function randomCharacter() {
  categories.forEach(cat => {
    const opts = document.querySelectorAll(`#${cat}-options img`);
    if (opts.length > 0) {
      if (mandatory.includes(cat) || Math.random() > 0.5) {
        const choice = opts[Math.floor(Math.random() * opts.length)];
        document.getElementById(cat).src = choice.src;
        document.querySelectorAll(`#${cat}-options img`).forEach(el => el.classList.remove("selected"));
        choice.classList.add("selected");
      } else {
        document.getElementById(cat).src = "";
      }
    }
  });
}


function downloadCharacter() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let withSrc = categories.filter(id => document.getElementById(id).src);
  let loaded = 0;

  withSrc.forEach(id => {
    let img = document.getElementById(id);
    if (img.src) {
      let temp = new Image();
      temp.crossOrigin = "anonymous";
      temp.src = img.src;
      temp.onload = function() {
        ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);
        loaded++;
        if (loaded === withSrc.length) {
          let link = document.createElement("a");
          link.download = "character.png";
          link.href = canvas.toDataURL();
          link.click();
        }
      }
    }
  });
}

/* Modal Info */
function toggleInfo() {
  const modal = document.getElementById("infoModal");
  modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}
