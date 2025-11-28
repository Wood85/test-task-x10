const categories = [
  { id: "All", label: "All" },
  { id: "Marketing", label: "Marketing" },
  { id: "Management", label: "Management" },
  { id: "HR & Recruting", label: "HR & Recruting" },
  { id: "Design", label: "Design" },
  { id: "Development", label: "Development" },
];

const items = [
  {
    title: "The Ultimate Google Ads Training Course",
    category: "Marketing",
    price: "100",
    author: "Jerome Bell",
  },
  {
    title: "Prduct Management Fundamentals",
    category: "Management",
    price: "480",
    author: "Marvin McKinney",
  },
  {
    title: "HR  Management and Analytics",
    category: "HR & Recruting",
    price: "200",
    author: "Leslie Alexander Li",
  },
  {
    title: "Brand Management & PR Communications",
    category: "Marketing",
    price: "530",
    author: "Kristin Watson",
  },
  {
    title: "Graphic Design Basic",
    category: "Design",
    price: "500",
    author: "by Guy Hawkins",
  },
  {
    title: "Business Development Management",
    category: "Management",
    price: "400",
    author: "Dianne Russell",
  },
  {
    title: "Highload Software Architecture",
    category: "Development",
    price: "600",
    author: "Brooklyn Simmons",
  },
  {
    title: "Human Resources – Selection and Recruitment",
    category: "HR & Recruting",
    price: "150",
    author: "Kathryn Murphy",
  },
  {
    title: "User Experience. Human-centered Design",
    category: "Design",
    price: "240",
    author: "Cody Fisher",
  },
];

const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let filteredItems = [...items];
let activeCategory = "All";
let searchQuery = "";

function renderFilters() {
  const container = document.querySelector(".tabs");
  const template = document.querySelector(".tabs__btn-template");
  container.innerHTML = "";

  categories.forEach((cat) => {
    const node = template.content.cloneNode(true);
    const btn = node.querySelector(".tabs__button");

    btn.dataset.category = cat.id;
    btn.firstChild.textContent = cat.label;

    const countDiv = btn.querySelector(".tabs__button-count");
    const count =
      cat.id === "All"
        ? items.length
        : items.filter((item) => item.category === cat.id).length;
    countDiv.textContent = count;

    if (cat.id === activeCategory) btn.classList.add("active");

    btn.addEventListener("click", () => {
      activeCategory = cat.id;
      searchQuery = "";
      document.querySelector(".search__input").value = "";
      currentPage = 1;
      setActiveTab(btn);
      filterAndRender();
    });

    container.appendChild(node);
  });
}

function setActiveTab(btn) {
  document.querySelector(".tabs__button.active")?.classList.remove("active");
  btn.classList.add("active");
}

function filterAndRender() {
  filteredItems = [...items];
  if (activeCategory !== "All") {
    filteredItems = filteredItems.filter(
      (item) => item.category === activeCategory
    );
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredItems = filteredItems.filter((item) =>
      item.title.toLowerCase().includes(q)
    );
  }

  currentPage = 1;
  renderCardsPage();
}

function renderCardsPage() {
  const container = document.querySelector(".cards");
  const template = document.querySelector(".cards__card-template");
  container.innerHTML = "";

  const end = currentPage * ITEMS_PER_PAGE;
  const itemsToShow = filteredItems.slice(0, end);

  itemsToShow.forEach((item) => {
    const node = template.content.cloneNode(true);
    node.querySelector(".course__category").textContent = item.category;
    node.querySelector(".course__title").textContent = item.title;
    node.querySelector(".course__price").textContent = item.price;
    node.querySelector(".course__author").textContent = `by ${item.author}`;
    container.appendChild(node);
  });

  const loadMoreBtn = document.querySelector(".content__load-more");
  if (itemsToShow.length >= filteredItems.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

document.querySelector(".content__load-more").addEventListener("click", () => {
  currentPage++;
  renderCardsPage();
});

const form = document.querySelector(".search");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = document.querySelector(".search__input").value.trim();
  activeCategory = "All";
  document.querySelector(".tabs__button.active")?.classList.remove("active");
  currentPage = 1;
  filterAndRender();
});

renderFilters();
filterAndRender();
