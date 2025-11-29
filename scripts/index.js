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
    img: "./assets/images/8.webp",
  },
  {
    title: "Prduct Management Fundamentals",
    category: "Management",
    price: "480",
    author: "Marvin McKinney",
    img: "./assets/images/3.webp",
  },
  {
    title: "HR\u00A0\u00A0Management and Analytics",
    category: "HR & Recruting",
    price: "200",
    author: "Leslie Alexander Li",
    img: "./assets/images/2.webp",
  },
  {
    title: "Brand Management & PR Communications",
    category: "Marketing",
    price: "530",
    author: "Kristin Watson",
    img: "./assets/images/9.webp",
  },
  {
    title: "Graphic Design Basic",
    category: "Design",
    price: "500",
    author: "by Guy Hawkins",
    img: "./assets/images/1.webp",
  },
  {
    title: "Business Development Management",
    category: "Management",
    price: "400",
    author: "Dianne Russell",
    img: "./assets/images/7.webp",
  },
  {
    title: "Highload Software Architecture",
    category: "Development",
    price: "600",
    author: "Brooklyn Simmons",
    img: "./assets/images/4.webp",
  },
  {
    title: "Human Resources – Selection and Recruitment",
    category: "HR & Recruting",
    price: "150",
    author: "Kathryn Murphy",
    img: "./assets/images/6.webp",
  },
  {
    title: "User Experience. Human-centered Design",
    category: "Design",
    price: "240",
    author: "Cody Fisher",
    img: "./assets/images/5.webp",
  },
  {
    title: "Brand Management & PR Communications",
    category: "Marketing",
    price: "530",
    author: "Kristin Watson",
    img: "./assets/images/9.webp",
  },
  {
    title: "Human Resources – Selection and Recruitment",
    category: "HR & Recruting",
    price: "150",
    author: "Kathryn Murphy",
    img: "./assets/images/6.webp",
  },
  {
    title: "Business Development Management",
    category: "Management",
    price: "400",
    author: "Dianne Russell",
    img: "./assets/images/7.webp",
  },
  {
    title: "Graphic Design Basic",
    category: "Design",
    price: "500",
    author: "by Guy Hawkins",
    img: "./assets/images/1.webp",
  },
  {
    title: "Business Development Management",
    category: "HR & Recruting",
    price: "400",
    author: "Dianne Russell",
    img: "./assets/images/7.webp",
  },
  {
    title: "Highload Software Architecture",
    category: "Design",
    price: "600",
    author: "Brooklyn Simmons",
    img: "./assets/images/4.webp",
  },
  {
    title: "The Ultimate Google Ads Training Course",
    category: "Marketing",
    price: "100",
    author: "Jerome Bell",
    img: "./assets/images/8.webp",
  },
  {
    title: "Human Resources – Selection and Recruitment",
    category: "HR & Recruting",
    price: "150",
    author: "Kathryn Murphy",
    img: "./assets/images/6.webp",
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
    const category = node.querySelector(".course__category");
    category.textContent = item.category;

    if (item.category === "HR & Recruting") {
      category.classList.add(`course__category_recruting`);
    } else {
      category.classList.add(`course__category_${item.category.toLowerCase()}`);
    }
    node.querySelector(".course__title").textContent = item.title;
    node.querySelector(".course__price").textContent = `$${item.price}`;
    node.querySelector(".course__author").textContent = `by ${item.author}`;
    const img = node.querySelector(".course__image");
    img.src = item.img;
    img.alt = item.title;

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
