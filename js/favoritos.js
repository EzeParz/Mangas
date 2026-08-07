
const contenedorFavoritos = document.getElementById("contenedor-favoritos");

function obtenerFavoritos() {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function renderizarFavoritos(mangas) {

    const favoritos = obtenerFavoritos();

    contenedorFavoritos.innerHTML = "";

    if (favoritos.length === 0) {
        contenedorFavoritos.innerHTML = `
            <div class="sin-favoritos">
                <h2>Aun no agregaste nada a tus Favoritos</h2><br>
                <h5>Explorá el <a href="../pages/directorio.html">directorio</a> y agrega el manga que te guste.</h5>
            </div>
        `;
        return;
    }

    // Mantiene el orden en el que fueron agregados
    const mangasFavoritos = favoritos
        .map(id => mangas.find(m => m.id === id))
        .filter(Boolean);

    mangasFavoritos.forEach(manga => {

        const titulo = manga.title.english || manga.title.romaji;

        const card = document.createElement("div");
        card.classList.add("manga-card", "card-nueva");
        card.dataset.id = manga.id;

        card.innerHTML = `
            <div class="contenedor-tarjeta-fav" style="position: relative;">
                <a href="../pages/manga.html?id=${manga.id}">
                    <div class="img-manga">
                        <img src="${manga.coverImage.extraLarge}" alt="${titulo}">
                    </div>
                    <div class="card-body">
                        <h5>${titulo}</h5><br>
                    </div>
                </a>
            </div>
        `;

        contenedorFavoritos.appendChild(card);
    });

    // Botones para quitar de favoritos
    document.querySelectorAll(".btn-quitar-fav").forEach(boton => {

        boton.addEventListener("click", (e) => {

            e.preventDefault();

            const id = Number(boton.dataset.id);

            let favoritosActuales = obtenerFavoritos();
            favoritosActuales = favoritosActuales.filter(fav => fav !== id);

            localStorage.setItem("favoritos", JSON.stringify(favoritosActuales));

            renderizarFavoritos(mangas);
        });
    });
}

fetch("../data/topManga300.json")
    .then(res => res.json())
    .then(mangas => {

        mangas = mangas.filter(manga => manga.format === "MANGA");

        renderizarFavoritos(mangas);
    })
    .catch(error => {
        console.error(error);
        contenedorFavoritos.innerHTML = "<h2>Ocurrió un error al cargar tus favoritos</h2>";
    });