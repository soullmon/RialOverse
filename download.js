function downloadCharacter() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  // Set ukuran canvas sesuai character
  canvas.width = 1000;
  canvas.height = 1000;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ambil semua layer character
  let layers = document.querySelectorAll("#character img");
  let loaded = 0;

  layers.forEach(img => {
    if (img.src) {
      let temp = new Image();
      temp.crossOrigin = "anonymous";
      temp.src = img.src;

      temp.onload = function () {
        ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);
        loaded++;

        if (loaded === layers.length) {
          let link = document.createElement("a");
          link.download = "character.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
      };
    } else {
      loaded++;
    }
  });
}
