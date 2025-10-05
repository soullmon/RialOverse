const categories = ["back","skin","nose","mouth","tatto","eyes","eyebrow","clothes","hand","hair","face","accessories","head","offhand"];
const mandatory = ["skin","nose","mouth","eyes","eyebrow","hand","hair"];

function showOptions(category, btn) {
  document.querySelectorAll('.options').forEach(opt => opt.classList.remove('active'));
  const el = document.getElementById(category + '-options');
  if (el) el.classList.add('active');

  document.querySelectorAll('.menu button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  window.scrollTo({top: el.offsetTop - 100, behavior: "smooth"});
}
// list ID  valid Special Item 
// ===== Special Item Unlock System ===
// ===== Sistem Unlock Opsi Special Item =====

// Daftar ID dan daftar item spesial yang bisa dipilih
const specialItems = {
  "1407324448851234856": [
    { layer: "clothes", src: "Documentation/section/clothes/club1.png" },
    { layer: "clothes", src: "Documentation/section/clothes/club2.png" },
    { layer: "clothes", src: "Documentation/section/clothes/club3.png" },
    { layer: "clothes", src: "Documentation/section/clothes/club4.png" },
    { layer: "face", src: "Documentation/section/face/club1.png" },
    { layer: "face", src: "Documentation/section/face/club2.png" },
    { layer: "face", src: "Documentation/section/face/club3.png" }
  ],

  "1420355807379193937": [
    { layer: "clothes", src: "Documentation/section/clothes/builder1.png" },
    { layer: "clothes", src: "Documentation/section/clothes/helper1.png" }
  ],

  "1393211299017658379": [
    { layer: "head", src: "Documentation/section/head/royal1.png" },
    { layer: "head", src: "Documentation/section/head/royal2.png" },
    { layer: "head", src: "Documentation/section/head/royal3.png" }
  ]
};


function unlockSpecialItems() {
  const inputId = document.getElementById("userId").value.trim();
  const items = specialItems[inputId];
  const section = document.getElementById("special-options");
  const container = document.getElementById("special-items-container");

  container.innerHTML = ""; // empty kontainer 

  if (items) {
    // show section special item
    section.style.display = "flex";

    // add setiap item ke opsi
    items.forEach(item => {
      const img = document.createElement("img");
      img.src = item.src;
      img.onclick = () => toggleLayer(item.layer, img);

      container.appendChild(img);
    });

    alert("✅ ID VALID!");
  } else {
    section.style.display = "none";
    alert("❌ ID INVALID");
  }
}




 
  /* list ID  valid Special Item
const validIds = ["1393211226967900190","1420355807379193937"];
function checkId() {
  const inputId1 = document.getElementById("userId").value.trim().toUpperCase();
  const specialSection = document.getElementById("special-section2");

  if (validIds.includes(inputId)) {
    alert("✅ ID VALID,YOU GET SPECIAL ITEMS");
    specialSection.style.display = "flex"; // Show rare item
  } else {
    alert("❌ ID INVALID.");
    specialSection.style.display = "none";
  }
}

    // list ID  valid Special Item Royal
const validIds = ["1393211299017658379"];
function checkId() {
  const inputId1 = document.getElementById("userId").value.trim().toUpperCase();
  const specialSection = document.getElementById("special-section3");

  if (validIds.includes(inputId)) {
    alert("✅ ID VALID,YOU GET SPECIAL ITEMS ROYAL");
    specialSection.style.display = "flex"; // Show rare item
  } else {
    alert("❌ ID INVALID.");
    specialSection.style.display = "none";
  }
} */
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
