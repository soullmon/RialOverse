function downloadCharacter() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  // Atur ukuran hasil gambar (misalnya 1200x1200 px)
  canvas.width = 1000;
  canvas.height = 1000;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ambil semua layer di #character
  let layers = document.querySelectorAll("#character img");

  // Filter hanya yang punya src (aktif)
  let activeLayers = Array.from(layers).filter(img => img.src);

  console.log("Layer aktif:", activeLayers.length);

  let loaded = 0;
  let images = [];

  activeLayers.forEach((img, index) => {
    let temp = new Image();
    temp.crossOrigin = "anonymous";
    temp.src = img.src;

    temp.onload = function () {
      images[index] = temp; // simpan urutan gambar sesuai layer
      loaded++;

      console.log(`Layer berhasil dimuat: ${img.id}`);

      // Kalau semua layer selesai dimuat, gambar semuanya ke canvas
      if (loaded === activeLayers.length) {
        images.forEach(image => {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        });

        console.log("Semua layer sudah digambar. Membuat file PNG...");
        let link = document.createElement("a");
        link.download = "character.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };

    temp.onerror = function () {
      loaded++;
      console.warn(`Layer gagal dimuat: ${img.id}`);
    };
  });
}
