const contenedor = document.getElementById("contenedor-manga");
const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));
const estaLogueado = localStorage.getItem("adminLogueado") === "true";

fetch("../data/topManga300.json")
    .then(res => res.json())
    .then(mangas => {

        // Solo mangas
        mangas = mangas.filter(manga => manga.format === "MANGA");

        // Buscar el manga por ID
        const manga = mangas.find(m => m.id === id);

        // Ranking de popularidad
        function obtenerRanking(manga) {
            return manga.rankings.find(r =>
                r.type === "POPULAR" && r.allTime
            )?.rank ?? "-";
        }

        if (!manga) {
            contenedor.innerHTML = "<h2>Manga no encontrado</h2>";
            return;
        }

        const perfilManga = document.createElement("div");
        perfilManga.classList.add("contenedor-perfil-manga");

        const generos = manga.genres
            .map(genero => `<span class="genero">${genero}</span>`)
            .join("");

        function normalizarStatus(status) {
            status = status.toLowerCase();

            if (status.includes("finished")) return "status-finished";
            if (status.includes("releasing")) return "status-airing";
            if (status.includes("hiatus")) return "status-hiatus";
            if (status.includes("cancel")) return "status-cancelled";

            return "status-unknown";
        }

        const statusClass = normalizarStatus(manga.status);

        const titulo = manga.title.english || manga.title.romaji;
        const ranking = obtenerRanking(manga);
        const autor = manga.staff?.edges?.[0]?.node?.name?.full || "Desconocido";

        if(estaLogueado){

            perfilManga.innerHTML = `
            <div class="cabecera-manga">

                <div class="contenedor-img-manga">
                    <img src="${manga.coverImage.extraLarge}" alt="${titulo}">
                </div>

                <div class="description-manga">

                    <h1>${titulo}</h1>

                    <div class="datos">
                        <h3>Rank #${ranking}</h3>
                        <h3 class="${statusClass}">${manga.status}</h3>
                        <h3>${autor}</h3>
                        <h3>⭐ ${(manga.averageScore / 10).toFixed(1)}</h3>
                    </div>

                    <div class="contenedor-generos">
                        ${generos}
                    </div>
                    <button id="fav" class="btn-fav btn-fav-none">
                    <i class="bi bi-suit-heart-fill iconoFav"></i>
                    <span>Agregar</span>
                    </button>
                    <br>

                    <div class="p-description">
                        <p class="sinopsis">${manga.description}</p>
                        <button class="btn-ver-mas">Ver más</button>
                    </div>

                </div>

            </div>
        `;
        }
        else{
            perfilManga.innerHTML = `
            <div class="cabecera-manga">

                <div class="contenedor-img-manga">
                    <img src="${manga.coverImage.extraLarge}" alt="${titulo}">
                </div>

                <div class="description-manga">

                    <h1>${titulo}</h1>

                    <div class="datos">
                        <h3>Rank #${ranking}</h3>
                        <h3 class="${statusClass}">${manga.status}</h3>
                        <h3>${autor}</h3>
                        <h3>⭐ ${(manga.averageScore / 10).toFixed(1)}</h3>
                    </div>

                    <div class="contenedor-generos">
                        ${generos}
                    </div>
                    <div class="contenedor-favoritos">
                    <button id="fav" class="btn-fav btn-fav-none">
                    <i class="bi bi-suit-heart-fill iconoFav"></i>
                    <span>Agregar</span>
                    </button>
                    </div>
                    <br>

                    <div class="p-description">
                        <p class="sinopsis">${manga.description}</p>
                        <button class="btn-ver-mas">Ver más</button>
                    </div>

                </div>

            </div>
        `;
        }

        contenedor.appendChild(perfilManga);

        const boton = perfilManga.querySelector(".btn-ver-mas");
        const sinopsis = perfilManga.querySelector(".sinopsis");

        boton.addEventListener("click", () => {
            sinopsis.classList.toggle("expandida");
            boton.textContent = sinopsis.classList.contains("expandida")
                ? "Ver menos"
                : "Ver mas";
        });
        const btnFav = perfilManga.querySelector(".btn-fav");
        const iconoFav = perfilManga.querySelector(".iconoFav");
        const span = btnFav?.querySelector("span");

        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


        if (favoritos.includes(id) && iconoFav && span) {
            iconoFav.classList.add("activo");
            span.textContent = "Agregado";
        }

        if (!btnFav || !iconoFav || !span) {
            return;
        }

        btnFav.addEventListener("click", () => {

            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

            if (favoritos.includes(id)) {

                favoritos = favoritos.filter(fav => fav !== id);

                iconoFav.classList.remove("activo");
                span.textContent = "Agregar";

            } else {

                favoritos.push(id);

                iconoFav.classList.add("activo");
                span.textContent = "Agregado";
            }

            localStorage.setItem("favoritos", JSON.stringify(favoritos));

        });

    })
    .catch(error => console.error(error));

