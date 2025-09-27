document.getElementById("downloadBtn").addEventListener("click", function () {
  let canvas = document.getElementById("canvas"); 
  let ctx = canvas.getContext("2d");

  // ukuran 1000x1000
  canvas.width = 1000;
  canvas.height = 1000;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let withSrc = categories.filter(id => document.getElementById(id).src);
  let loaded = 0;

  if (withSrc.length === 0) return;

  withSrc.forEach(id => {
    let img = document.getElementById(id);
    if (img.src) {
      let temp = new Image();
      temp.crossOrigin = "anonymous"; // aman untuk CORS
      temp.src = img.src;
      temp.onload = function () {
        ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);
        loaded++;

        if (loaded === withSrc.length) {
          // konversi langsung ke dataURL
          let dataURL = canvas.toDataURL("image/png");
          let link = document.createElement("a");
          link.download = "character.png";
          link.href = dataURL;

          if (typeof link.download !== "undefined") {
            // download langsung (desktop browser)
            document.body.appendChild(link);
            link.

