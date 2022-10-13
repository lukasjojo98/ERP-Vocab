window.onclick = function(event) {
  if(event.target == document.getElementById("checkbutton")){
  modal.style.display = "block";
  }
  else if (event.target == modal){
  modal.style.display = "none";
  }
}