// Mobile menu toggle
document.getElementById("menuBtn").addEventListener("click", function () {
    document.getElementById("navLinks").classList.toggle("open");
});

// Load projects from projects.json with error handling
async function loadProjects() {
    const box = document.getElementById("projectList");
    try {
        const response = await fetch("projects.json");
        if (!response.ok) {
            throw new Error("Server responded with status " + response.status);
        }
        const projects = await response.json();
        box.innerHTML = projects.map(p => `
            <div class="card">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <p class="tech">${p.tech}</p>
            </div>`).join("");
    } catch (error) {
        // Server error / network error: show a friendly message
        console.error(error);
        box.innerHTML = `<div class="error-box">
            Something went wrong while loading projects. Please try again later.</div>`;
    }
}

// Contact form validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const msg = document.getElementById("cMsg").value.trim();
    const status = document.getElementById("formStatus");

    if (!name || !email || !msg) {
        status.style.color = "#dc2626";
        status.textContent = "Please fill in all the fields.";
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
        status.style.color = "#dc2626";
        status.textContent = "Please enter a valid email address.";
    } else {
        status.style.color = "#16a34a";
        status.textContent = "Thank you, " + name + "! Your message has been noted.";
        this.reset();
    }
});

loadProjects();
