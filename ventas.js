
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
let informesVentas = JSON.parse(localStorage.getItem("informesVentas")) || [];

const DURACION_PERIODO = 15;

function obtenerFechaActual() {
    return new Date().toISOString();
}

function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-BO");
}

function iniciarPeriodo() {
    let inicio = localStorage.getItem("inicioPeriodo");

    if (!inicio) {
        inicio = obtenerFechaActual();
        localStorage.setItem("inicioPeriodo", inicio);
    }

    return inicio;
}

function comprobarPeriodo() {
    let inicioPeriodo = iniciarPeriodo();

    let fechaInicio = new Date(inicioPeriodo);
    let fechaActual = new Date();

    let diferenciaMilisegundos =
        fechaActual - fechaInicio;

    let diasTranscurridos =
        diferenciaMilisegundos / (1000 * 60 * 60 * 24);

    if (diasTranscurridos >= DURACION_PERIODO) {
        cerrarPeriodo();
    }
}

function cerrarPeriodo() {

    if (ventas.length === 0) {
        localStorage.setItem(
            "inicioPeriodo",
            obtenerFechaActual()
        );

        return;
    }

    let inicioPeriodo =
        localStorage.getItem("inicioPeriodo");

    let fechaCierre =
        obtenerFechaActual();

    let totalIngresos = 0;
    let productosVendidos = 0;

    ventas.forEach(function(venta) {

        totalIngresos += Number(venta.total) || 0;
        productosVendidos += Number(venta.cantidad) || 0;

    });

    let informe = {
        id: Date.now(),

        fechaInicio: inicioPeriodo,

        fechaFin: fechaCierre,

        cantidadVentas: ventas.length,

        productosVendidos: productosVendidos,

        totalIngresos: totalIngresos
    };

    informesVentas.push(informe);

    localStorage.setItem(
        "informesVentas",
        JSON.stringify(informesVentas)
    );

    ventas = [];

    localStorage.setItem(
        "ventas",
        JSON.stringify(ventas)
    );

    localStorage.setItem(
        "inicioPeriodo",
        fechaCierre
    );

    alert(
        "📊 INFORME DE 15 DÍAS GENERADO\n\n" +

        "Período: " +
        formatearFecha(inicioPeriodo) +
        " - " +
        formatearFecha(fechaCierre) +
        "\n\n" +

        "🛒 Ventas realizadas: " +
        informe.cantidadVentas +
        "\n" +

        "📦 Productos vendidos: " +
        informe.productosVendidos +
        "\n" +

        "💰 Ingresos: Bs. " +
        informe.totalIngresos.toFixed(2) +

        "\n\n" +

        "El registro de ventas fue limpiado."
    );
}


function cargarProductos() {

    let selectProducto =
        document.getElementById("producto");

    selectProducto.innerHTML = `
        <option value="">
            Seleccione un producto
        </option>
    `;

    productos.forEach(function(producto) {

        let opcion =
            document.createElement("option");

        opcion.value = producto.id;

        opcion.textContent =
            producto.nombre;

        selectProducto.appendChild(opcion);

    });
}


function cargarClientes() {

    let selectCliente =
        document.getElementById("cliente");

    selectCliente.innerHTML = `
        <option value="">
            Seleccione un cliente
        </option>
    `;

    clientes.forEach(function(cliente) {

        let opcion =
            document.createElement("option");

        opcion.value = cliente.id;

        opcion.textContent =
            cliente.nombre;

        selectCliente.appendChild(opcion);

    });
}


function mostrarPrecio() {

    let idProducto =
        document.getElementById("producto").value;

    let precioInput =
        document.getElementById("precio");

    if (idProducto === "") {

        precioInput.value = "";

        return;
    }

    let productoSeleccionado =
        productos.find(function(producto) {

            return producto.id == idProducto;

        });

    if (productoSeleccionado) {

        precioInput.value =
            productoSeleccionado.precio;

    } else {

        precioInput.value = "";

    }
}


function registrarVenta() {

    let idCliente =
        document.getElementById("cliente").value;

    let idProducto =
        document.getElementById("producto").value;

    let precio =
        Number(
            document.getElementById("precio").value
        );

    let cantidad =
        Number(
            document.getElementById("cantidad").value
        );


    if (idCliente === "") {

        alert("Seleccione un cliente.");

        return;
    }


    if (idProducto === "") {

        alert("Seleccione un producto.");

        return;
    }


    if (cantidad <= 0 || isNaN(cantidad)) {

        alert("Ingrese una cantidad válida.");

        return;
    }


    let clienteSeleccionado =
        clientes.find(function(cliente) {

            return cliente.id == idCliente;

        });


    let productoSeleccionado =
        productos.find(function(producto) {

            return producto.id == idProducto;

        });


    if (!clienteSeleccionado) {

        alert("No se encontró el cliente.");

        return;
    }


    if (!productoSeleccionado) {

        alert("No se encontró el producto.");

        return;
    }


    if (cantidad > productoSeleccionado.stock) {

        alert(
            "❌ No hay suficiente stock.\n\n" +
            "Stock disponible: " +
            productoSeleccionado.stock
        );

        return;
    }


    let total =
        precio * cantidad;


    let venta = {

        id: ventas.length + 1,

        fecha: obtenerFechaActual(),

        cliente:
            clienteSeleccionado.nombre,

        clienteId:
            clienteSeleccionado.id,

        producto:
            productoSeleccionado.nombre,

        productoId:
            productoSeleccionado.id,

        precio: precio,

        cantidad: cantidad,

        total: total

    };


    ventas.push(venta);


    productoSeleccionado.stock =
        Number(productoSeleccionado.stock) -
        cantidad;


    localStorage.setItem(
        "ventas",
        JSON.stringify(ventas)
    );

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );


    alert(
        "✅ Venta registrada correctamente.\n\n" +
        "Total: Bs " +
        total.toFixed(2)
    );


    document.getElementById("cliente").value = "";

    document.getElementById("producto").value = "";

    document.getElementById("precio").value = "";

    document.getElementById("cantidad").value = "";


    mostrarVentas();
}


function eliminarVenta(id) {

    let venta =
        ventas.find(function(venta) {

            return venta.id === id;

        });


    if (!venta) {

        return;
    }


    let confirmar =
        confirm(
            "¿Está seguro de eliminar esta venta?"
        );


    if (!confirmar) {

        return;
    }


    let producto =
        productos.find(function(producto) {

            return producto.id == venta.productoId;

        });


    if (producto) {

        producto.stock =
            Number(producto.stock) +
            Number(venta.cantidad);

    }


    ventas =
        ventas.filter(function(venta) {

            return venta.id !== id;

        });


    localStorage.setItem(
        "ventas",
        JSON.stringify(ventas)
    );

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );


    mostrarVentas();


    alert(
        "✅ Venta eliminada y stock restaurado."
    );
}


function mostrarVentas() {

    let tabla =
        document.getElementById("tablaVentas");

    tabla.innerHTML = "";

    ventas.forEach(function(venta) {

        let fecha = "Sin fecha";

        if (venta.fecha) {

            let fechaCompleta =
                new Date(venta.fecha);

            fecha =
                fechaCompleta.toLocaleDateString("es-BO") +
                " " +
                fechaCompleta.toLocaleTimeString(
                    "es-BO",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );
        }

        let fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>${venta.id}</td>

            <td>${fecha}</td>

            <td>${venta.cliente}</td>

            <td>${venta.producto}</td>

            <td>
                Bs ${Number(venta.precio).toFixed(2)}
            </td>

            <td>${venta.cantidad}</td>

            <td>
                Bs ${Number(venta.total).toFixed(2)}
            </td>

            <td>
                <button
                    type="button"
                    onclick="eliminarVenta(${venta.id})"
                >
                    🗑️ Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);

    });
}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        productos =
            JSON.parse(
                localStorage.getItem("productos")
            ) || [];


        clientes =
            JSON.parse(
                localStorage.getItem("clientes")
            ) || [];


        ventas =
            JSON.parse(
                localStorage.getItem("ventas")
            ) || [];


        informesVentas =
            JSON.parse(
                localStorage.getItem("informesVentas")
            ) || [];


        comprobarPeriodo();


        ventas =
            JSON.parse(
                localStorage.getItem("ventas")
            ) || [];


        cargarProductos();

        cargarClientes();

        mostrarVentas();

    }
);
