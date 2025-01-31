let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;
let moves = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset the game
const resetGame = () => {
  turn0 = true;
  moves = 0;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("winner");
  });
  msgContainer.classList.add("hide");
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for a draw
const checkDraw = () => {
  if (moves === 9) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

// Check for a winner
const checkWinner = () => {
  for (const pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      boxes[pattern[0]].classList.add("winner");
      boxes[pattern[1]].classList.add("winner");
      boxes[pattern[2]].classList.add("winner");
      showWinner(pos1);
      return true;
    }
  }
  return false;
};

// Add click event listeners
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = turn0 ? "O" : "X";
    turn0 = !turn0;
    box.disabled = true;
    moves++;

    if (!checkWinner()) {
      checkDraw();
    }
  });
});

// Event listeners for buttons
newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
