const tituloModal = document.getElementById("tituloModal");
const formLogin = document.getElementById("formLogin");
const logoutContainer = document.getElementById("logoutContainer");



function actualizarInterfaz() {

    const logueado = localStorage.getItem("adminLogueado") === "true";

    const avatarDesktop = document.getElementById("avatarDesktop");
    const avatarMobile = document.getElementById("avatarMobile");

    const btnFavoritos = document.getElementById("btnFavoritos");

    if (logueado) {

        tituloModal.textContent = "Administrador";

        formLogin.style.display = "none";

        logoutContainer.style.display = "block";

        avatarDesktop.src = "./img/iconoProfileIniciado.png";
        avatarMobile.src = "./img/iconoProfileIniciado.png";
        avatarDesktop.classList.remove("iconoProfile");
        avatarMobile.classList.remove("iconoProfile");
        avatarDesktop.classList.add("iconoProfile-2");
        avatarMobile.classList.add("iconoProfile-2");

        btnFavoritos.style.display = "block";

    } else {

        tituloModal.textContent = "Iniciar Sesión";

        formLogin.style.display = "block";

        logoutContainer.style.display = "none";

        avatarDesktop.src = "./img/iconoProfile.svg";
        avatarMobile.src = "./img/iconoProfile.svg";
        avatarDesktop.classList.remove("iconoProfile-2");
        avatarMobile.classList.remove("iconoProfile-2");
        avatarDesktop.classList.add("iconoProfile");
        avatarMobile.classList.add("iconoProfile");

        btnFavoritos.style.display = "none";

    }

}

let usuarios = [];

async function cargarUsuarios() {
    const respuesta = await fetch("../data/usuarios.json");
    usuarios = await respuesta.json();
    console.log(usuarios);
}

cargarUsuarios();

document.getElementById("btnPress").addEventListener("click", (e) => {

    e.preventDefault();

    const usuarioIngresado = document.getElementById("usuario").value;
    const passwordIngresado = document.getElementById("password").value;

    const usuarioEncontrado = buscarUsuario(usuarioIngresado, passwordIngresado);

    if (usuarioEncontrado) {

        // Guardar sesión
        localStorage.setItem("adminLogueado", "true");

        actualizarInterfaz();

        console.log("Sesión iniciada");

        const modal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
        );

        modal.hide();        

    } else {

        alert("Usuario o contraseña incorrectos");

}
});

function buscarUsuario(usuario, password) {
    return usuarios.find(u => u.usuario === usuario && u.password === password);
}

actualizarInterfaz();

document.getElementById("btnLogout").addEventListener("click", () => {

    localStorage.removeItem("adminLogueado");

    actualizarInterfaz();

    const modal = bootstrap.Modal.getInstance(
    document.getElementById("loginModal")
    );

    modal.hide();

});