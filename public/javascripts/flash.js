
const flash = document.getElementById("flash-message");
if (flash){
  setTimeout(function(){
    console.log('close alert')
    flash.classList.add("hidden");
  },3000)
}

