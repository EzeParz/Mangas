# MangaZeco 📚

MangaZeco es una página web pensada para descubrir y explorar mangas de una forma simple.

La desarrollé como proyecto de frontend usando principalmente **HTML, CSS y JavaScript**, trabajando con contenido dinámico, favoritos, rankings, búsqueda y páginas individuales para cada manga.

🔗 **Demo:** https://mangas-red.vercel.app/  
💻 **Repositorio:** https://github.com/EzeParz/Mangas

---

## Sobre MangaZeco

La idea de MangaZeco nació como una plataforma donde poder buscar mangas, ver información de cada uno y guardar en favoritos.

Al principio, el proyecto estaba pensado para trabajar con la **API de Jikan**, obteniendo los datos de ahí.

Con el tiempo empecé a tener problemas con la API y algunas partes del sitio dejaron de funcionar correctamente. Para poder mantener el proyecto estable, decidí adaptar el código y utilizar un archivo **JSON local** que simula los datos que antes recibía desde la API.

Aunque ahora los datos son locales, la página sigue utilizando `fetch()` y JavaScript para cargarlos y mostrarlos dinámicamente.

---

## Funcionalidades

- Buscador de mangas.
- Directorio con mangas ordenados por ranking.
- Carga progresiva de contenido.
- Página individual para cada manga.
- Sistema de favoritos.
- Inicio de sesión simulado desde frontend.
- Rankings y mangas destacados.
- Carruseles interactivos.
- Sección de noticias.
- Diseño responsive.

---

## Tecnologías

- HTML
- CSS
- JavaScript
- Bootstrap
- Bootstrap Icons
- Swiper.js
- Fetch API
- LocalStorage
- JSON
- Vercel

---

## ¿Cómo funciona?

Una parte importante del proyecto está generada directamente desde JavaScript.

Por ejemplo, el directorio obtiene la información desde el JSON y crea las cards automáticamente. También permite buscar mangas, ordenarlos y cargar más contenido sin tener todo escrito en el HTML.

Las páginas individuales también funcionan de forma dinámica.

Cuando se entra a un manga, la URL contiene su identificador:

```text
manga.html?id=25
```

JavaScript obtiene ese ID y busca en los datos qué manga tiene que mostrar.

---

## Acceso de prueba

Para probar el inicio de sesión del proyecto, podés utilizar las credenciales predeterminadas:

```text
Usuario: admin 
Contraseña: admin 
```

Estas credenciales forman parte de una simulación de login realizada completamente desde frontend.

---

## Favoritos y sesión

Para los favoritos utilicé `localStorage`, de forma que los mangas guardados no desaparezcan cada vez que se recarga la página.

También hice una simulación de login completamente desde frontend.

---

## Organización del código

Preferí dividir el JavaScript en varios archivos según la función que cumplen o la página donde se utilizan.

De esta forma evité tener un solo archivo demasiado largo y me resultó más fácil mantener organizado el proyecto.

---

## Estructura

```text
Mangas/
│
├── css/
├── datos/
├── imagen/
├── js/
├── páginas/
├── .gitignore
└── index.html
```

---

## Lo que trabajé en este proyecto

Con MangaZeco pude practicar y aplicar varias cosas de frontend, entre ellas:

- Manipulación del DOM.
- `fetch()` y carga de datos.
- JSON.
- `localStorage`.
- Arrays y métodos como `filter`, `find`, `map` y `sort`.
- Eventos.
- Parámetros en la URL.
- Contenido generado dinámicamente.
- Diseño responsive.
- Uso de librerías externas.
- Organización de JavaScript en distintos archivos.
- Deploy con Vercel.

---

## Autor

**Ezequiel Parziale**

Proyecto realizado como parte de mi portfolio de desarrollo frontend.
