fetch('/content.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const pages = ["index", "about", "services", "gallery", "contact"];
    const path = window.location.pathname.toLowerCase();
    console.log("Current path:", path);

    let page = "index"; // default

    for (const name of pages) {
      if (path.includes(name)) {
        page = name;
        break;
      }
    }

    console.log("Detected page:", page);

    const content = data[page];
    if (!content) {
      console.error("No content found for this page in content.json");
      return;
    }

    for (let key in content) {
      const el = document.getElementById(key);
      if (el) {
        el.innerText = content[key];
      } else {
        console.warn(`Missing element with ID '${key}'`);
      }
    }
  })
  .catch(error => {
    console.error("Error loading content.json:", error);
  });
