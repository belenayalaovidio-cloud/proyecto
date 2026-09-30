let ventas =
    JSON.parse(localStorage.getItem("ventas")) || [];

let informesVentas =
    JSON.parse(localStorage.getItem("informesVentas")) || [];


function mostrarReporteActual() {

    let totalVendido = 0;
    let numeroVentas = ventas.length;
    let productosVendidos = 0;
    let productosCantidad = {};


    ventas.forEach(function(venta) {

        totalVendido += Number(venta.total) || 0;

        productosVendidos +=
            Number(venta.cantidad) || 0;


        if (!productosCantidad[venta.producto]) {

            productosCantidad[venta.producto] = 0;

        }


        productosCantidad[venta.producto] +=
            Number(venta.cantidad) || 0;

    });


    let productoMasVendido = "Ninguno";
    let mayorCantidad = 0;


    for (let producto in productosCantidad) {

        if (
            productosCantidad[producto] >
            mayorCantidad
        ) {

            mayorCantidad =
                productosCantidad[producto];

            productoMasVendido =
                producto;

        }

    }


    document.getElementById("totalVendido").textContent =
        "Bs " + totalVendido.toFixed(2);

    document.getElementById("numeroVentas").textContent =
        numeroVentas;

    document.getElementById("productosVendidos").textContent =
        productosVendidos;

    document.getElementById("productoMasVendido").textContent =
        productoMasVendido;


    mostrarTablaVentas();
}


function mostrarTablaVentas() {

    let tabla =
        document.getElementById("tablaReportes");

    tabla.innerHTML = "";


    if (ventas.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="7">
                    No hay ventas registradas
                    en el período actual.
                </td>
            </tr>
        `;

        return;
    }


    ventas.forEach(function(venta) {

        let fecha = "Sin fecha";


        if (venta.fecha) {

            fecha =
                new Date(venta.fecha)
                .toLocaleDateString("es-BO");

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
        `;


        tabla.appendChild(fila);

    });
}


function formatearFecha(fecha) {

    if (!fecha) {
        return "Sin fecha";
    }


    return new Date(fecha)
        .toLocaleDateString("es-BO");
}


function mostrarHistorial() {

    let contenedor =
        document.getElementById("historialInformes");

    contenedor.innerHTML = "";


    if (informesVentas.length === 0) {

        contenedor.innerHTML = `
            <p>
                📭 Todavía no hay informes
                de períodos anteriores.
            </p>
        `;

        return;
    }


    informesVentas
        .slice()
        .reverse()
        .forEach(function(informe) {

            let tarjeta =
                document.createElement("div");


            tarjeta.className =
                "reporte-card";


            tarjeta.innerHTML = `
                <h3>📅 Período de 15 días</h3>

                <p>
                    <strong>Desde:</strong>
                    ${formatearFecha(informe.fechaInicio)}
                </p>

                <p>
                    <strong>Hasta:</strong>
                    ${formatearFecha(informe.fechaFin)}
                </p>

                <hr>

                <p>
                    🛒 Ventas realizadas:
                    <strong>
                        ${informe.cantidadVentas}
                    </strong>
                </p>

                <p>
                    📦 Productos vendidos:
                    <strong>
                        ${informe.productosVendidos}
                    </strong>
                </p>

                <p>
                    💰 Ingresos:
                    <strong>
                        Bs ${Number(
                            informe.totalIngresos
                        ).toFixed(2)}
                    </strong>
                </p>
            `;


            contenedor.appendChild(tarjeta);

        });
}



document.addEventListener(
    "DOMContentLoaded",
    function() {

        ventas =
            JSON.parse(
                localStorage.getItem("ventas")
            ) || [];


        informesVentas =
            JSON.parse(
                localStorage.getItem("informesVentas")
            ) || [];


        mostrarReporteActual();

        mostrarHistorial();

    }
);