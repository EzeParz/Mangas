/* const contenedor1 = document.querySelector(".mySwiper").closest(".swiper-contenedor");
const contenedor2 = document.querySelector(".mySwiper2").closest(".swiper-contenedor");

const swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: contenedor1.querySelector(".swiper-button-next"),
    prevEl: contenedor1.querySelector(".swiper-button-prev"),
  },
  pagination: {
    el: contenedor1.querySelector(".swiper-pagination"),
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 }
  }
}); */
function iniciarSwiper1() {

    const contenedor1 =
        document.querySelector(".mySwiper")
        .closest(".swiper-contenedor");

    new Swiper(".mySwiper", {
        navigation: {
            nextEl: contenedor1.querySelector(".swiper-button-next"),
            prevEl: contenedor1.querySelector(".swiper-button-prev"),
        },
        pagination: {
            el: contenedor1.querySelector(".swiper-pagination"),
            clickable: true,
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
        }
    });

}
function iniciarSwiper2() {

    const contenedor2 =
        document.querySelector(".mySwiper2")
        .closest(".swiper-contenedor");

    new Swiper(".mySwiper2", {
        navigation: {
            nextEl: contenedor2.querySelector(".swiper-button-next"),
            prevEl: contenedor2.querySelector(".swiper-button-prev"),
        },
        pagination: {
            el: contenedor2.querySelector(".swiper-pagination"),
            clickable: true,
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
        }
    });

}

/* const swiper2 = new Swiper(".mySwiper2", {
  navigation: {
    nextEl: contenedor2.querySelector(".swiper-button-next"),
    prevEl: contenedor2.querySelector(".swiper-button-prev"),
  },
  pagination: {
    el: contenedor2.querySelector(".swiper-pagination"),
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 }
  }
}); */