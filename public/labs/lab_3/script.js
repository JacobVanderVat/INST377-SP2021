let width = 130;
let count = 4;
let list = carousel.querySelector("ul");
let listItems = carousel.querySelectorAll("li");
let imageArray = Array.from(listItems);
let position = 0;

imageArray.forEach((element) => {
  element.style.position = "relative";
});

function movePrev() {
  position += width * count;
  position = Math.min(position, 0);
  list.style.marginLeft = position + "px";
}

function moveNext() {
  position -= width * count;
  position = Math.max(position, -width * (listItems.length - count));
  list.style.marginLeft = position + "px";
}

function listner() {
  const backArrow = document.querySelector(".prev");
  const forwardArrow = document.querySelector(".next");
  backArrow.addEventListener("click", (event) => {
    movePrev();
  });
  forwardArrow.addEventListener("click", (event) => {
    moveNext();
  });
}

window.onload = listner;
