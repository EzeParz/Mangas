const contenedorPopulares = document.getElementById("populares");
const contenedorActualizados = document.getElementById("actualizados");

fetch("../data/topManga300.json")
    .then(respuesta => respuesta.json())
    .then(mangas => {
        mangas = mangas.filter(manga => manga.format === "MANGA");
        // Devuelve el ranking de popularidad de AniList
        function obtenerRanking(manga) {
            return manga.rankings.find(r =>
                r.type === "POPULAR" && r.allTime
            )?.rank ?? 999999;
        }

        // ==========================
        // POPULARES DEL DÍA
        // ==========================

        const populares = [...mangas]
            .sort((a, b) => obtenerRanking(a) - obtenerRanking(b))
            .slice(0, 10);

        populares.forEach(manga => {

            const slide = document.createElement("div");
            slide.classList.add("swiper-slide");

            const titulo = manga.title.english || manga.title.romaji;
            const ranking = obtenerRanking(manga);

            slide.innerHTML = `
                <div class="card manga-card">
                    <a href="./pages/manga.html?id=${manga.id}">
                        <div class="img-manga">
                            <img src="${manga.coverImage.extraLarge}" class="card-img-top" alt="${titulo}">
                        </div>

                        <div class="card-body">
                            <h5>${titulo}</h5>
                            <p>#${ranking}</p>
                        </div>
                    </a>
                </div>
            `;

            contenedorPopulares.appendChild(slide);

        });

        iniciarSwiper1();

        // ==========================
        // ÚLTIMOS ACTUALIZADOS
        // ==========================

        const top100 = [...mangas]
            .sort((a, b) => obtenerRanking(a) - obtenerRanking(b))
            .slice(0, 100);

        // Mezclamos los 100 más populares
        top100.sort(() => Math.random() - 0.5);

        // Mostramos 10
        top100.slice(0, 10).forEach(manga => {

            const slide = document.createElement("div");
            slide.classList.add("swiper-slide");

            const titulo = manga.title.english || manga.title.romaji;
            const ranking = obtenerRanking(manga);

            slide.innerHTML = `
                <div class="card manga-card">
                    <a href="./pages/manga.html?id=${manga.id}">
                        <div class="img-manga">
                            <img src="${manga.coverImage.extraLarge}" class="card-img-top" alt="${titulo}">
                        </div>

                        <div class="card-body">
                            <h5>${titulo}</h5>
                            <p>#${ranking}</p>
                        </div>
                    </a>
                </div>
            `;

            contenedorActualizados.appendChild(slide);

        });

        iniciarSwiper2();

    })
    .catch(error => {
        console.error("Error al cargar los mangas:", error);
    });