const cardGrid = document.getElementById("cardGrid");
const countText = document.getElementById("countText");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "전체";

function getBadgeClass(status) {
  if (status === "출석") return "badge--present";
  if (status === "결석") return "badge--absent";
  if (status === "지각") return "badge--late";
  return "";
}

function filterStudents(filter) {
  if (filter === "전체") return serverStudents;
  return serverStudents.filter(s => s.status === filter);
}

function render(students) {
  // 2) '총 n명' 갱신
  countText.textContent = `총 ${students.length}명`;

  // 카드 렌더
  cardGrid.innerHTML = "";

  if (students.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "해당 조건의 학생이 없습니다.";
    cardGrid.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  students.forEach(student => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
          <div class="card__top">
            <div>
              <div class="card__id">${student.id}</div>
              <div class="card__name">${student.name}</div>
            </div>
            <span class="badge ${getBadgeClass(student.status)}">${student.status}</span>
          </div>

          <div class="card__meta">
            <span class="pill">${student.className}</span>
            <span class="pill">상태: ${student.status}</span>
          </div>
        `;

    fragment.appendChild(card);
  });

  cardGrid.appendChild(fragment);
}

function setActiveButton(filter) {
  filterButtons.forEach(btn => {
    const isActive = btn.dataset.filter === filter;
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

// 1) 필터 버튼 클릭 시 필터링
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    setActiveButton(currentFilter);

    const filtered = filterStudents(currentFilter);
    render(filtered);
  });
});

// 초기 렌더: 전체
render(filterStudents(currentFilter));