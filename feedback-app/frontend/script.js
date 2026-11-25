const API_URL = "http://localhost:3000/api/feedback";

const form = document.getElementById("feedback-form");
const nameInput = document.getElementById("user-name");
const messageInput = document.getElementById("user-message");
const listEl = document.getElementById("feedback-list");
const errorBox = document.getElementById("error-box");

// 1. READ: Fetch all feedback from Express
async function fetchFeedback() {
  showError(null);
  try {
    // TODO 1: Use fetch(API_URL), check response.ok, parse JSON, and pass data to renderFeedback(data)
    // Hint: Check fetchTasks() in TaskFlow!
     const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to load feedback");
    const data = await response.json();
    renderFeedback(data);

  } catch (err) {
    showError(err.message);
  }
}

// 2. CREATE: Send new feedback to Express
async function submitFeedback(e) {
  e.preventDefault();
  showError(null);

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  const btn = form.querySelector("button");
  btn.disabled = true;
  btn.textContent = "Posting...";

  try {
    // TODO 2: Send a POST request to API_URL with JSON headers and body: { name, message }
    // If !response.ok, read the error JSON from the server and throw new Error(errData.error)
    // On success: call form.reset() and fetchFeedback() to refresh the list!
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error);
    }

    form.reset();
    await fetchFeedback();
  } catch (err) {
    showError(err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "Post Feedback";
  }
}

// --- Already Built Helpers ---
function renderFeedback(items) {
  listEl.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = item.name;
    const span = document.createElement("span");
    span.textContent = item.message;
    li.appendChild(strong);
    li.appendChild(span);
    listEl.appendChild(li);
  });
}

function showError(msg) {
  errorBox.classList.toggle("hidden", !msg);
  errorBox.textContent = msg || "";
}

form.addEventListener("submit", submitFeedback);
fetchFeedback();