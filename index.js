const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

const positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const initial = () => {
  selected = [];

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
    cell.addEventListener("click", newMove);
  });
};

const newMove = (event) => {
  const index = event.target.getAttribute("data-i");
  event.target.innerHTML = player;

  event.target.removeEventListener("click", newMove);

  selected[index] = player;

  setTimeout(() => {
    check();
  }, 100);

  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
};

const modal = document.querySelector(".modalContainer");

const openModal = (playerLastMove) => {
  if (selected.filter((cell) => cell).length === 9) {
    document.querySelector(".winnerTitle").innerHTML = "EMPATE";
  } else {
    document.querySelector(
      ".winnerTitle"
    ).innerHTML = `JOGADOR "${playerLastMove}" VENCEU`;
  }

  modal.classList.add("active");
};

const closeModal = () => {
  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", () => {
    window.location.reload();
  });
  modal.classList.remove("active");
};

const check = () => {
  let playerLastMove = player === "X" ? "O" : "X";

  const cells = selected
    .map((cell, i) => [cell, i])
    .filter((cell) => cell[0] === playerLastMove)
    .map((cell) => cell[1]);

  for (pos of positions) {
    if (pos.every((cell) => cells.includes(cell))) {
      openModal(playerLastMove);
      initial();
    }
  }

  if (selected.filter((cell) => cell).length === 9) {
    openModal();
    initial();
    return;
  }
};

initial();
closeModal();
