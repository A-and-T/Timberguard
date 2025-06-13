// include.js

function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error('Fetch error');
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Special behavior if it's the header
      if (id === "header") {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (hamburger && navLinks) {
          hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
          });
        }
      }

      // Special behavior if it's the footer (add smart map link)
      if (id === "footer") {
        console.log("Footer loaded ✅");
        const mapLink = document.getElementById("smart-map-link");
        if (!mapLink) {
          console.log("Did not find Map link");
          return;
        }

        const address = "4311 Claire Ln, Rhinelander, WI 54501";
        const encoded = encodeURIComponent(address);
        const ua = navigator.userAgent;

        if (/iPhone|iPad|iPod/i.test(ua)) {
          mapLink.href = `maps://?q=${encoded}`;
        } else if (/Android/i.test(ua)) {
          mapLink.href = `geo:0,0?q=${encoded}`;
        } else {
          mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
          mapLink.target = "_blank";
          mapLink.rel = "noopener noreferrer";
        }
      }
    })
    .catch(error => {
      console.error(`Error loading ${file}:`, error);
    });
}

// Load header and footer (must be outside DOMContentLoaded)
loadHTML("header", "header.html");
loadHTML("footer", "footer.html");
