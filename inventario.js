let productos = JSON.parse(localStorage.getItem("productos")) || [];

function mostrarInventario() {

    let tabla = document.getElementById("tablaInventario");

    tabla.innerHTML = "";

    let totalProductos = productos.length;
    let productosDisponibles = 0;
    let productosAgotados = 0;

    productos.forEach(function(producto, index) {

        let estado = "";

        if (producto.stock === 0) {
            estado = "🔴 Agotado";
            productosAgotados++;
        } else if (producto.stock <= 5) {
            estado = "🟡 Poco stock";
            productosDisponibles++;
        } else {
            estado = "🟢 Disponible";
            productosDisponibles++;
        }

        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${producto.nombre}</td>
            <td>Bs ${Number(producto.precio).toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td>${estado}</td>
        `;

        tabla.appendChild(fila);
    });

    document.getElementById("totalProductos").textContent =
        totalProductos;

    document.getElementById("productosDisponibles").textContent =
        productosDisponibles;

    document.getElementById("productosAgotados").textContent =
        productosAgotados;
}

document.addEventListener("DOMContentLoaded", function() {

    productos =
        JSON.parse(localStorage.getItem("productos")) || [];

    mostrarInventario();

});