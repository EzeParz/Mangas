
const contenedorManga = document.getElementById("contenedor-galeria-manga");
const parametros1 = new URLSearchParams(window.location.search);
const idGaleria = parametros1.get("id");

fetch(`https://api.jikan.moe/v4/manga/${idGaleria}/pictures`)
    .then(response => response.json())
    .then(datos => {

        console.log(datos);

        const perfilManga1 = document.createElement("div");
        perfilManga1.classList.add("contenedor-galeria-manga1");


        const galeria = datos.data
            .map(imagen => `
                <div class="swiper-slide">
                    <img
                        src="${imagen.jpg.large_image_url || imagen.jpg.image_url}"
                        alt="Imagen del manga"
                        class="imagen-galeria"
                    >
                </div>
            `)
            .join("");

        perfilManga1.innerHTML = `
            <div class="swiper-contenedor">
                <div class="swiper swiperGaleria">
                <div class="swiper-button-prev"></div>
                    <div class="swiper-wrapper">
                        ${galeria}
                    </div>

                    <div class="swiper-pagination"></div>
                    
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        `;

        contenedorManga.appendChild(perfilManga1);

        new Swiper(".swiperGaleria", {
/*             slidesPerView: 1,*/
            spaceBetween: 20, 

            navigation: {
                nextEl: contenedorManga.querySelector(".swiper-button-next"),
                prevEl: contenedorManga.querySelector(".swiper-button-prev"),
            },

            pagination: {
                el: contenedorManga.querySelector(".swiper-pagination"),
                clickable: true,
            },

            breakpoints: {
                0:    { slidesPerView: 1 },
                576:  { slidesPerView: 2 },
                768:  { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
            }
        });

    })
    .catch(error => {
        console.error("Error:", error);
    });