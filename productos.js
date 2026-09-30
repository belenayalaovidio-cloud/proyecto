function guardarProducto() {
    const nombre = document.getElementById("nombre").value.trim();
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;

    if (nombre === "" || precio === "" || stock === "") {
        alert("Complete todos los campos");
        return;
    }

    // Obtener productos existentes
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Crear nuevo producto
    const producto = {
        id: Date.now(),
        nombre: nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock)
    };

    // Agregar producto
    productos.push(producto);

    // Guardar en LocalStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto guardado correctamente");

    // Limpiar formulario
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";

    // Mostrar productos
    mostrarProductos();
}

// Eliminar producto
function eliminarProducto(id) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos = productos.filter(producto => producto.id !== id);

    localStorage.setItem("productos", JSON.stringify(productos));

    mostrarProductos();
}


// Mostrar productos guardados
function mostrarProductos() {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const tabla = document.getElementById("tablaProductos");

    if (!tabla) return;

    tabla.innerHTML = "";

   productos.forEach((producto, index) => {

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${producto.nombre}</td>
        <td>Bs ${producto.precio.toFixed(2)}</td>
        <td>${producto.stock}</td>
        <td class="acciones"></td>
    `;

    const acciones = fila.querySelector(".acciones");

    const editar = document.createElement("button");
    editar.type = "button";
    editar.textContent = "✏️ Editar";

    editar.addEventListener("click", function() {
        const nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
        if (nuevoNombre === null) return;

        const nuevoPrecio = prompt("Nuevo precio:", producto.precio);
        if (nuevoPrecio === null) return;

        const nuevoStock = prompt("Nuevo stock:", producto.stock);
        if (nuevoStock === null) return;

        producto.nombre = nuevoNombre.trim();
        producto.precio = parseFloat(nuevoPrecio);
        producto.stock = parseInt(nuevoStock);

        localStorage.setItem("productos", JSON.stringify(productos));

        mostrarProductos();
    });

    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.textContent = "🗑️ Eliminar";

    eliminar.addEventListener("click", function() {
        productos = productos.filter(p => p.id !== producto.id);

        localStorage.setItem("productos", JSON.stringify(productos));

        mostrarProductos();
    });

    acciones.appendChild(editar);
    acciones.appendChild(eliminar);

    tabla.appendChild(fila);
});

    // Activar los botones de eliminar
    const botones = document.querySelectorAll(".btn-eliminar");
    const botonesEditar = document.querySelectorAll(".btn-editar");

botonesEditar.forEach(boton => {
    boton.addEventListener("click", function() {

        const id = Number(this.dataset.id);

        let productos = JSON.parse(localStorage.getItem("productos")) || [];

        const producto = productos.find(producto => producto.id === id);

        if (!producto) return;

        const nuevoNombre = prompt("Ingrese el nuevo nombre:", producto.nombre);

        if (nuevoNombre === null) return;

        const nuevoPrecio = prompt("Ingrese el nuevo precio:", producto.precio);

        if (nuevoPrecio === null) return;

        const nuevoStock = prompt("Ingrese el nuevo stock:", producto.stock);

        if (nuevoStock === null) return;

        if (nuevoNombre.trim() === "" || nuevoPrecio === "" || nuevoStock === "") {
            alert("Complete todos los campos");
            return;
        }

        producto.nombre = nuevoNombre.trim();
        producto.precio = parseFloat(nuevoPrecio);
        producto.stock = parseInt(nuevoStock);

        localStorage.setItem("productos", JSON.stringify(productos));

        mostrarProductos();

        alert("Producto actualizado correctamente");
    });
});

    botones.forEach(boton => {
        boton.addEventListener("click", function() {
            const id = Number(this.dataset.id);

            let productos = JSON.parse(localStorage.getItem("productos")) || [];

            productos = productos.filter(producto => producto.id !== id);

            localStorage.setItem("productos", JSON.stringify(productos));

            mostrarProductos();
        });
    });
}

// Cargar productos cuando se abre la página
document.addEventListener("DOMContentLoaded", function() {
    mostrarProductos();
});