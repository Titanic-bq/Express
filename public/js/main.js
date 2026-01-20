const output = document.querySelector("output");
const button = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form");

async function showPosts() {
  try {
    const res = await fetch("http://localhost:8000/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    output.innerHTML = "";
    posts.forEach((post) => {
      const element = document.createElement("div");
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.log("Error fetching posts", error);
  }
}

button.addEventListener("click", showPosts);

// Submit

async function addpost(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Failed to add post");
    }
    const posts = await res.json();

    const postEl = document.createElement("div");
    postEl.textContent = posts.title;
    output.appendChild(postEl);
  } catch (error) {
    console.error("Error adding post", error);
  }
}

// Event listeners

button.addEventListener("click", showPosts);
form.addEventListener("submit", addpost);
