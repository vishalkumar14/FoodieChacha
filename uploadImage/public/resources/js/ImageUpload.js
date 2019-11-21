const input = document.getElementById("myImage");
const form = document.getElementById("ImageForm");
const ImageForm = document.getElementById("ImageFormContainer");
const profile = document.getElementById("profilePic");

input.addEventListener("change", function(e) {
  if (this.files && this.files.length >= 1) {
    form.submit();
  }
});

profile.addEventListener("mousemove", function(e) {
  ImageForm.style.visibility = "visible";
  ImageForm.style.zIndex = 100;
  ImageForm.style.animation = "moveInBottom 0.2s  ease-out";
});
profile.addEventListener("mouseleave", function(e) {
  ImageForm.style.visibility = "hidden";
  ImageForm.style.zIndex = -1;
  ImageForm.style.animation = "";
});
ImageForm.addEventListener("mouseover", function(e) {
  ImageForm.style.visibility = "visible";
  ImageForm.style.zIndex = 100;
  ImageForm.style.animation = "";
  profile.style.filter = "blur(1.5px)";
});
ImageForm.addEventListener("mouseleave", function(e) {
  ImageForm.style.visibility = "hidden";
  ImageForm.style.zIndex = -1;
  ImageForm.style.animation = "";
  profile.style.filter = "";
});
