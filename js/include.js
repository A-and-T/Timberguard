// include.js
function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error('Fetch error');
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // reattach hamburger menu handler if it's the header
      if (id === "header") {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (hamburger && navLinks) {
          hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
          });
        }
      }
    })
    .catch(error => {
      console.error(`Error loading ${file}:`, error);
    });
}
