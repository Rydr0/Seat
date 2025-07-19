const boys = [];
const girls = [];

function renderSeats() {
  const boysRows = document.getElementById("boysRows");
  const girlsRows = document.getElementById("girlsRows");
  boysRows.innerHTML = "";
  girlsRows.innerHTML = "";

  const boysLayout = [3, 3, 3, 3, 3, 3, 4];
  const girlsLayout = [3, 3, 3, 3, 3, 4, 4];

  let boyIndex = 0;
  for (let r = 0; r < boysLayout.length; r++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let s = 0; s < boysLayout[r]; s++) {
      if (boyIndex >= boys.length) break;
      const seat = createSeat(boys[boyIndex], boyIndex, 'boy');
      row.appendChild(seat);
      boyIndex++;
    }
    boysRows.appendChild(row);
  }

  let girlIndex = 0;
  for (let r = 0; r < girlsLayout.length; r++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let s = 0; s < girlsLayout[r]; s++) {
      if (girlIndex >= girls.length) break;
      const seat = createSeat(girls[girlIndex], girlIndex, 'girl');
      row.appendChild(seat);
      girlIndex++;
    }
    girlsRows.appendChild(row);
  }
}

function createSeat(name, index, gender) {
  const div = document.createElement("div");
  div.className = `seat ${gender}`;
  div.textContent = name;

  const btn = document.createElement("button");
  btn.textContent = "×";
  btn.className = "remove-btn";
  btn.onclick = (e) => {
    e.stopPropagation();
    if (gender === 'boy') {
      boys.splice(index, 1);
    } else {
      girls.splice(index, 1);
    }
    renderSeats();
  };

  div.onclick = () => {
    div.classList.toggle('active');
  };

  div.appendChild(btn);
  return div;
}

function addStudent() {
  const name = document.getElementById("studentName").value.trim();
  const gender = document.getElementById("gender").value;
  if (!name) return;

  if (gender === "boy" && boys.length < 22) {
    boys.push(name);
  } else if (gender === "girl" && girls.length < 23) {
    girls.push(name);
  } else {
    alert("Maximum number of students reached for " + gender + "s");
    return;
  }

  shuffleArray(gender === "boy" ? boys : girls);
  renderSeats();
  document.getElementById("studentName").value = "";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Dark Mode Toggle
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
