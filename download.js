document.getElementById("downloadBtn").addEventListener("click", function () {
  let canvas = document.getElementById("canvas"); 
  let ctx = canvas.getContext("2d");

  // size(1200x1200)
  canvas.width = 1200;
  canvas.height = 1200;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let withSrc = categories.filter(id => document.getElementById(id).src);
  let loaded = 0;

  if (withSrc.length === 0) return;

  withSrc.forEach(id => {
    let img = document.getElementById(id);
    if (img.src) {
      let temp = new Image();
      temp.crossOrigin = "anonymous"; // safe A CORS
      temp.src = img.src;
      temp.onload = function () {
        ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);
        loaded++;

        if (loaded === withSrc.length) {
          // Konversi canvas ke blob → download
          canvas.toBlob(function (blob) {
            let link = document.createElement("a");
            link.download = "character.png";
            let url = URL.createObjectURL(blob);
            link.href = url;

            if (typeof link.download !== "undefined") {
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            } else {
              // fallback Android/iOS
              window.open(url, "_blank");
            }
          }, "image/png");
        }
      };
    }
  });
});