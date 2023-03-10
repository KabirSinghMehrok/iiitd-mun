// Setting up icons
const sunIcon = document.getElementById("sun");
const moonIcon = document.getElementById("moon");
console.log(sunIcon)
// console.log(document.getElementsByTagName("img"))
console.log(document.getElementById("sun"))
console.log(moonIcon)

// Theme variables
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log(userTheme)
console.log(systemTheme)

// Icon toggling
const iconToggle = () => {
  moonIcon.classList.toggle("display-none");
  sunIcon.classList.toggle("display-none");
}

// Initial Theme Check
const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    moonIcon.classList.add("display-none");
    return;
  }
  sunIcon.classList.add("display-none");
};

// Manual Theme Switch
const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
};

// Call theme switch on button click
sunIcon.addEventListener("click", () => {
  themeSwitch();
})

moonIcon.addEventListener("click", () => {
  themeSwitch();
})

// Invoke theme check on initial load
themeCheck();