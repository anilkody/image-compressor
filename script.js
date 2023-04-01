// Get references to HTML elements
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("file-upload");
const compressBtn = document.getElementById("compress-btn");
const compressedImage = document.getElementById("compressed-image");
const downloadBtn = document.getElementById("download-btn");

// Listen for file drop or selection
dropzone.addEventListener("drop", handleFileSelect);
fileInput.addEventListener("change", handleFileSelect);

// Compress image and display result
function handleFileSelect(event) {
  event.preventDefault();
  const file = event.dataTransfer
    ? event.dataTransfer.files[0]
    : event.target.files[0];
  if (file.type.match("image.*")) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        compressedImage.src = dataUrl;
        downloadBtn.href = dataUrl;
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please select an image file");
  }
}

// Download the compressed image
downloadBtn.addEventListener("click", function () {
  downloadBtn.download = "compressed.jpg";
});
