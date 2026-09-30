
document.addEventListener("DOMContentLoaded", function () {

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    const totalProductos = document.getElementById("totalProductos");
    const totalClientes = document.getElementById("totalClientes");
    const totalVentas = document.getElementById("totalVentas");
    const totalInventario = document.getElementById("totalInventario");

    const stockBajo = document.getElementById("stockBajo");
    const productosRegistrados = document.getElementById("productosRegistrados");
    const clientesRegistrados = document.getElementById("clientesRegistrados");


    totalProductos.textContent = productos.length;

    totalClientes.textContent = clientes.length;


    let dineroVentas = 0;

    ventas.forEach(function (venta) {

        if (venta.total) {
            dineroVentas += Number(venta.total);
        } else if (venta.precio) {
            dineroVentas += Number(venta.precio);
        }

    });

    totalVentas.textContent = "Bs. " + dineroVentas.toFixed(2);


    let cantidadInventario = 0;
    let productosStockBajo = 0;

    productos.forEach(function (producto) {

        cantidadInventario += Number(producto.stock) || 0;

        if (Number(producto.stock) <= 5) {
            productosStockBajo++;
        }

    });


    totalInventario.textContent = cantidadInventario;

    stockBajo.textContent = productosStockBajo;

    productosRegistrados.textContent = productos.length;

    clientesRegistrados.textContent = clientes.length;

});