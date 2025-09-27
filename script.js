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

document.getElementById("downloadBtn").addEventListener("click", function () {
  const canvas = document.getElementById("canvas");

  // Cek apakah canvas sudah ada isinya
  if (!canvas) {
    alert("Canvas tidak ditemukan!");
    return;
  }

  const link = document.createElement("a");
  link.download = "avatar.png"; // nama file hasil download
  link.href = canvas.toDataURL("image/png"); // ambil data gambar dari canvas
  link.click(); // trigger download
});

/* Modal Info */
function toggleInfo() {
  const modal = document.getElementById("infoModal");
  modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}
