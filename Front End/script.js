const form = document.getElementById("postForm");
const liste = document.getElementById("liste-posts");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  try {
    await fetch("https://telephone-backend-1.onrender.com", {
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
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  try {
    const res = await fetch("https://telephone-backend-1.onrender.com");
    const posts = await res.json();

    loader.style.display = 'none';

    if (posts.length === 0) {
      liste.innerHTML = `<h2 class="Aucun">Aucun numéro de téléphone partagé pour le moment 😕</h2>
                         <h3>Sois le premier à en publier un !</h3>`;
      return;
    }

    liste.innerHTML = posts.map(p => `
      <div style="border:1px solid #ccc;padding:10px;margin:10px;">
        <strong>${p.numero}</strong> – <em>${p.emission}</em><br>
        🎁 Gain : ${p.gain}<br>
        ⏳ Expire le : ${new Date(p.dateExpiration).toLocaleDateString()}<br>
        <p>${p.commentaire || ''}</p>
      </div>
    `).join('');
  } catch (err) {
    loader.style.display = 'none';
    console.error("Erreur lors du chargement des posts :", err);
  }
}



chargerPosts();
