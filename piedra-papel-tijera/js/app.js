window.addEventListener("load", () => {
  // querying elements
  let playerScore = document.querySelector(".row.bottom").firstElementChild;
  let cpuScore = document.querySelector(".row.bottom").lastElementChild;
  let roundNumber = document.querySelector(".round");
  let display = document.querySelector(".display");
  let userMove =
    document.querySelector(".results").firstElementChild.firstElementChild;
  let cpuMove =
    document.querySelector(".results").lastElementChild.firstElementChild;

  let option1 =
    document.querySelector(".play").firstElementChild.nextElementSibling;
  let option2 = option1.nextElementSibling;
  let option3 = option2.nextElementSibling;
//   console.log(option3);
});
