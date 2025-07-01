const API_BASE = "https://telephone-backend-1.onrender.com";

const form = document.getElementById("postForm");
const liste = document.getElementById("liste-posts");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  try {
    await fetch(`${API_BASE}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    form.reset();
    chargerPosts();
  } catch (err) {
    alert("Erreur lors de l’envoi du formulaire");
    console.error(err);
  }
});

async function chargerPosts() {
  try {
    const res = await fetch(`${API_BASE}/api/posts`);
    const posts = await res.json();

    if (posts.length === 0) {
      liste.innerHTML = `<h3 style="color:#666;text-align:center;">Aucun numéro partagé pour le moment.</h3>`;
      return;
    }

    liste.innerHTML = posts.map(p => `
      <div style="border:1px solid #ccc;padding:10px;margin:10px;border-radius:8px;">
        <strong>${p.numero}</strong> – <em>${p.emission}</em><br>
        🎁 Gain : ${p.gain}<br>
        ⏳ Expire le : ${new Date(p.dateExpiration).toLocaleDateString()}<br>
        <p>${p.commentaire || ''}</p>
      </div>
    `).join('');
  } catch (err) {
    console.error("Erreur lors du chargement des posts :", err);
    liste.innerHTML = `<h3 style="color:#900;">Impossible de charger les numéros.</h3>`;
  }
}

chargerPosts();
