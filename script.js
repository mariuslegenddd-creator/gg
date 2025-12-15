/***********************
  DATA
************************/
let votes = JSON.parse(localStorage.getItem("votes")) || [0, 0, 0, 0, 0, 0];
let hasVoted = localStorage.getItem("hasVoted") === "true";

/***********************
  RENDER VOTES (BILDER)
************************/
function renderVotes() {
  votes.forEach((count, i) => {
    const container = document.getElementById(`votes-${i}`);
    if (!container) return;

    container.innerHTML = "";
    addVotesImages(container, count);
  });

  updateWinner();
}

function addVotesImages(container, number) {
  // "votes" bilde
  const votesImg = document.createElement("img");
  votesImg.src = "bilder/votes.png";
  container.appendChild(votesImg);

  // tall som bilder (støtter 10+)
  number
    .toString()
    .split("")
    .forEach(digit => {
      const img = document.createElement("img");
      img.src = `bilder/${digit}.png`;
      container.appendChild(img);
    });
}

/***********************
  STEMMEFUNKSJON
************************/
function vote(index) {
  if (hasVoted) {
    alert("You have already voted");
    return;
  }

  votes[index]++;
  hasVoted = true;

  localStorage.setItem("votes", JSON.stringify(votes));
  localStorage.setItem("hasVoted", "true");

  renderVotes();
}

/***********************
  WINNER-LOGIKK
************************/
function updateWinner() {
  const maxVotes = Math.max(...votes);
  const winnerIndex = votes.indexOf(maxVotes);

  const winnerPhoto = document.getElementById("winner-photo");
  const allPhotos = document.querySelectorAll(".grid .photo");

  if (winnerPhoto && allPhotos[winnerIndex]) {
    winnerPhoto.src = allPhotos[winnerIndex].src;
  }
}

/***********************
  INIT
************************/
renderVotes();

