let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function guardarCliente() {

    let nombre = document.getElementById("nombre").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let correo = document.getElementById("correo").value.trim();

    if (nombre === "" || telefono === "" || correo === "") {
        alert("Complete todos los campos");
        return;
    }
if (!correo.includes("@")) {
        alert("Ingrese un correo electrónico válido con @");
        return;
}
    let cliente = {
        id: clientes.length + 1,
        nombre: nombre,
        telefono: telefono,
        correo: correo
    };

    clientes.push(cliente);

    localStorage.setItem("clientes", JSON.stringify(clientes));

    alert("Cliente guardado correctamente");

    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";

    mostrarClientes();
}

function mostrarClientes() {

    let tabla = document.getElementById("tablaClientes");

    tabla.innerHTML = "";

    clientes.forEach(function(cliente) {

        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.correo}</td>
        `;

        tabla.appendChild(fila);
    });
}

document.addEventListener("DOMContentLoaded", function() {

    clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    mostrarClientes();

});