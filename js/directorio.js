let paginaActual = 1;
const mangasPorPagina = 20;

const contenedor = document.getElementById("contenedor-directorio");
const inputBuscar = document.getElementById("buscarManga");
const btnCargarMas = document.getElementById("cargarMas");

let mangas = [];

// Obtiene el ranking de popularidad
function obtenerRanking(manga) {
    return manga.rankings.find(r =>
        r.type === "POPULAR" && r.allTime
    )?.rank ?? "-";
}

// Dibuja las cards
function mostrarMangas(lista, nuevaCarga = false) {

    const inicio = (paginaActual - 1) * mangasPorPagina;
    const fin = inicio + mangasPorPagina;

    lista.slice(inicio, fin).forEach(manga => {

        const card = document.createElement("div");
        card.classList.add("card", "manga-card");

        if (nuevaCarga) {
            card.classList.add("card-nueva");
        }

        const titulo = manga.title.english || manga.title.romaji;

        card.innerHTML = `
            <a href="manga.html?id=${manga.id}">
                <div class="img-manga">
                    <img src="${manga.coverImage.extraLarge}" class="card-img-top" alt="${titulo}">
                </div>

                <div class="card-body">
                    <h5>${titulo}</h5>
                    <p>#${obtenerRanking(manga)}</p>
                </div>
            </a>
        `;

        contenedor.appendChild(card);
    });

    if (fin >= lista.length) {
        btnCargarMas.style.display = "none";
    } else {
        btnCargarMas.style.display = "block";
    }
}

// Carga inicial
fetch("../data/topManga300.json")
    .then(res => res.json())
    .then(datos => {

        mangas = datos
            .filter(manga => manga.format === "MANGA")
            .sort((a, b) => obtenerRanking(a) - obtenerRanking(b));

        mostrarMangas(mangas);

    })
    .catch(error => console.error(error));

// Botón "Cargar más"
btnCargarMas.addEventListener("click", () => {
    paginaActual++;
    mostrarMangas(mangas, true);
});

// Buscador
inputBuscar.addEventListener("keydown", (e) => {

    if (e.key !== "Enter") return;

    const texto = e.target.value.trim().toLowerCase();

    paginaActual = 1;
    contenedor.innerHTML = "";

    if (texto === "") {
        mostrarMangas(mangas);
        return;
    }

    const resultados = mangas.filter(manga => {

        const romaji = manga.title.romaji?.toLowerCase() || "";
        const english = manga.title.english?.toLowerCase() || "";
        const native = manga.title.native?.toLowerCase() || "";

        return (
            romaji.includes(texto) ||
            english.includes(texto) ||
            native.includes(texto)
        );

    });

    if (resultados.length === 0) {
        contenedor.innerHTML = "<h2>No se encontraron mangas.</h2>";
        btnCargarMas.style.display = "none";
        return;
    }

    mostrarMangas(resultados);
});