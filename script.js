const rowsData = {
  trending: [1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057],
  popular: [1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067],
  continue: [1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077],
  scifi: [1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087],
  action: [1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097],
};

const titles = [
  "Dark Horizon", "The Last Signal", "Crimson Path", "Silent Echo",
  "Beyond Midnight", "Iron Tide", "The Vanishing", "Neon Shadows",
  "Frozen Frontier", "Rising Storm", "The Hollow", "Edge of Tomorrow City"
];

function randomTitle() {
  return titles[Math.floor(Math.random() * titles.length)];
}

function buildRows() {
  Object.keys(rowsData).forEach((rowKey) => {
    const container = document.querySelector(`.row-scroll[data-row="${rowKey}"]`);
    if (!container) return;

    rowsData[rowKey].forEach((imgId) => {
      const card = document.createElement("div");
      card.className = "card-item";
      card.style.backgroundImage = `url('https://picsum.photos/id/${imgId}/300/170')`;

      const overlay = document.createElement("div");
      overlay.className = "card-overlay";
      overlay.textContent = randomTitle();

      card.appendChild(overlay);
      container.appendChild(card);
    });
  });
}

function handleNavbarScroll() {
  const nav = document.getElementById("mainNav");
  if (window.scrollY > 60) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

function enableDragScroll() {
  document.querySelectorAll(".row-scroll").forEach((row) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    row.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - row.offsetLeft;
      scrollLeft = row.scrollLeft;
    });

    row.addEventListener("mouseleave", () => (isDown = false));
    row.addEventListener("mouseup", () => (isDown = false));

    row.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - row.offsetLeft;
      const walk = (x - startX) * 1.5;
      row.scrollLeft = scrollLeft - walk;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildRows();
  enableDragScroll();
  window.addEventListener("scroll", handleNavbarScroll);
});